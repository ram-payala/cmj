-- =============================================================================
-- 08 - Allow admins to read submission file objects in storage
-- Run in Supabase SQL Editor after 06-user-role.sql (and after bucket exists)
-- =============================================================================

DROP POLICY IF EXISTS "Admins can view all submission file objects" ON storage.objects;
CREATE POLICY "Admins can view all submission file objects" ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'submission-files'
    AND EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.role::text = 'admin'
    )
  );

