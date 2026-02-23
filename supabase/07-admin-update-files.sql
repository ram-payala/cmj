-- =============================================================================
-- 07 - Allow admins to update submission_files (e.g. move stage)
-- Run in Supabase SQL Editor after 06-user-role.sql
-- =============================================================================

DROP POLICY IF EXISTS "Admins can update submission files" ON public.submission_files;
CREATE POLICY "Admins can update submission files" ON public.submission_files
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.role::text = 'admin'
    )
  )
  WITH CHECK (true);
