
-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  district TEXT NOT NULL,
  age INTEGER,
  occupation TEXT,
  email TEXT,
  interest TEXT NOT NULL DEFAULT 'Supporter',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public registration form)
CREATE POLICY "Anyone can submit registration"
  ON public.registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admin) can view
CREATE POLICY "Authenticated users can view registrations"
  ON public.registrations FOR SELECT
  TO authenticated
  USING (true);
