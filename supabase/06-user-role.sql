-- =============================================================================
-- 06 - User role (user / admin) for CMJ
-- Run in Supabase SQL Editor after users table exists.
-- By default new users get role 'user'. Set one user to 'admin' manually in Table Editor.
-- =============================================================================

DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('user', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS role public.user_role NOT NULL DEFAULT 'user';

-- Admins can view all submissions (RLS: add policy)
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.submissions;
CREATE POLICY "Admins can view all submissions" ON public.submissions
  FOR SELECT USING (
    (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
  );

-- Admins can view all submission_contributors
DROP POLICY IF EXISTS "Admins can view all contributors" ON public.submission_contributors;
CREATE POLICY "Admins can view all contributors" ON public.submission_contributors
  FOR SELECT USING (
    (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
  );

-- Admins can view all submission_files
DROP POLICY IF EXISTS "Admins can view all files" ON public.submission_files;
CREATE POLICY "Admins can view all files" ON public.submission_files
  FOR SELECT USING (
    (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
  );

-- Optional: allow admins to update submission status (for workflow)
-- Uncomment if you want admin to change status:
-- DROP POLICY IF EXISTS "Admins can update any submission status" ON public.submissions;
-- CREATE POLICY "Admins can update any submission status" ON public.submissions
--   FOR UPDATE USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin')
--   WITH CHECK (true);
