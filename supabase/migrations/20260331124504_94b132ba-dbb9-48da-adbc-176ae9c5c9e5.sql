
-- Create complaints table
CREATE TABLE public.complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id text NOT NULL UNIQUE,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  district text NOT NULL,
  bank_name text NOT NULL,
  complaint_type text NOT NULL,
  comments text NOT NULL,
  file_url text,
  status text NOT NULL DEFAULT 'Open',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a complaint
CREATE POLICY "Anyone can submit complaint"
ON public.complaints FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Authenticated users can view complaints
CREATE POLICY "Authenticated users can view complaints"
ON public.complaints FOR SELECT
TO authenticated
USING (true);

-- Authenticated users can update complaint status
CREATE POLICY "Authenticated users can update complaints"
ON public.complaints FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create storage bucket for complaint proofs
INSERT INTO storage.buckets (id, name, public) VALUES ('complaint-proofs', 'complaint-proofs', true);

-- Allow anyone to upload to complaint-proofs bucket
CREATE POLICY "Anyone can upload complaint proofs"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'complaint-proofs');

-- Allow public read access to complaint proofs
CREATE POLICY "Public read access for complaint proofs"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'complaint-proofs');
