
-- Public upload to member-photos and member-voter-ids (registration)
DROP POLICY IF EXISTS "Public can upload member photos" ON storage.objects;
CREATE POLICY "Public can upload member photos" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'member-photos');

DROP POLICY IF EXISTS "Public can upload voter ids" ON storage.objects;
CREATE POLICY "Public can upload voter ids" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'member-voter-ids');

-- Admins can read all member buckets
DROP POLICY IF EXISTS "Admins read member buckets" ON storage.objects;
CREATE POLICY "Admins read member buckets" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id IN ('member-photos','member-voter-ids','member-id-cards','member-qr')
    AND public.has_role(auth.uid(),'admin')
  );

DROP POLICY IF EXISTS "Admins manage member buckets" ON storage.objects;
CREATE POLICY "Admins manage member buckets" ON storage.objects
  FOR ALL TO authenticated
  USING (
    bucket_id IN ('member-photos','member-voter-ids','member-id-cards','member-qr')
    AND public.has_role(auth.uid(),'admin')
  )
  WITH CHECK (
    bucket_id IN ('member-photos','member-voter-ids','member-id-cards','member-qr')
    AND public.has_role(auth.uid(),'admin')
  );
