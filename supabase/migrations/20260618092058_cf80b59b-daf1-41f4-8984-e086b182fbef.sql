
-- ============ ROLES ============
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- ============ MEMBERS ============
DO $$ BEGIN
  CREATE TYPE public.member_status AS ENUM ('Pending','Approved','Rejected','Suspended');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE SEQUENCE IF NOT EXISTS public.mjmk_membership_seq START 10030;

CREATE TABLE IF NOT EXISTS public.members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_number text UNIQUE,
  full_name text NOT NULL,
  father_name text NOT NULL,
  gender text,
  dob date,
  blood_group text,
  mobile_number text NOT NULL UNIQUE,
  whatsapp_number text,
  email text,
  voter_id_number text NOT NULL UNIQUE,
  photo_url text,
  voter_id_url text,
  state text,
  district text,
  taluk text,
  village text,
  address text,
  membership_type text,
  designation text,
  referral_name text,
  referral_mobile text,
  status public.member_status NOT NULL DEFAULT 'Pending',
  qr_code_url text,
  id_card_url text,
  approved_at timestamptz,
  approved_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS members_status_idx ON public.members(status);
CREATE INDEX IF NOT EXISTS members_district_idx ON public.members(district);

GRANT INSERT ON public.members TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.members TO authenticated;
GRANT ALL ON public.members TO service_role;

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Public submission (always forced to Pending via trigger)
DROP POLICY IF EXISTS "Anyone can submit membership" ON public.members;
CREATE POLICY "Anyone can submit membership" ON public.members
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view members" ON public.members;
CREATE POLICY "Admins can view members" ON public.members
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admins can update members" ON public.members;
CREATE POLICY "Admins can update members" ON public.members
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admins can delete members" ON public.members;
CREATE POLICY "Admins can delete members" ON public.members
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Force inserts to Pending and clear admin-only fields
CREATE OR REPLACE FUNCTION public.members_force_pending()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  NEW.status := 'Pending';
  NEW.membership_number := NULL;
  NEW.qr_code_url := NULL;
  NEW.id_card_url := NULL;
  NEW.approved_at := NULL;
  NEW.approved_by := NULL;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS members_force_pending_trg ON public.members;
CREATE TRIGGER members_force_pending_trg
  BEFORE INSERT ON public.members
  FOR EACH ROW EXECUTE FUNCTION public.members_force_pending();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS members_set_updated_at ON public.members;
CREATE TRIGGER members_set_updated_at
  BEFORE UPDATE ON public.members
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Public view: only approved members, only safe columns
CREATE OR REPLACE VIEW public.public_members AS
SELECT membership_number, full_name, photo_url, district, designation, blood_group, approved_at
FROM public.members
WHERE status = 'Approved' AND membership_number IS NOT NULL;

GRANT SELECT ON public.public_members TO anon, authenticated;

-- Approve member RPC (admin only) — assigns membership number atomically
CREATE OR REPLACE FUNCTION public.approve_member(_member_id uuid)
RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _num text;
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT membership_number INTO _num FROM public.members WHERE id = _member_id;
  IF _num IS NULL THEN
    _num := 'MJMK2026' || nextval('public.mjmk_membership_seq')::text;
  END IF;

  UPDATE public.members
  SET status = 'Approved',
      membership_number = _num,
      approved_at = COALESCE(approved_at, now()),
      approved_by = COALESCE(approved_by, auth.uid())
  WHERE id = _member_id;

  RETURN _num;
END $$;

GRANT EXECUTE ON FUNCTION public.approve_member(uuid) TO authenticated;
