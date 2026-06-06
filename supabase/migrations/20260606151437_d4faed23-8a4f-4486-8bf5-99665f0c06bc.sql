CREATE TABLE public.party_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  designation VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.party_registrations TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.party_registrations TO authenticated;
GRANT ALL ON public.party_registrations TO service_role;

ALTER TABLE public.party_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit party registration"
  ON public.party_registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can view party registrations"
  ON public.party_registrations FOR SELECT
  TO authenticated
  USING (true);