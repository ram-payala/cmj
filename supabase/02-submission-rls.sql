-- =============================================================================
-- 02 - Submission RLS policies (CMJ)
-- Run after 01-submission-types-and-tables.sql
-- =============================================================================

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_contributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_files ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running (optional)
DROP POLICY IF EXISTS "Users can view their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can insert their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can update their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can delete submission status submissions" ON public.submissions;

DROP POLICY IF EXISTS "Users can view contributors of their submissions" ON public.submission_contributors;
DROP POLICY IF EXISTS "Users can manage contributors of their submissions" ON public.submission_contributors;

DROP POLICY IF EXISTS "Users can view files of their submissions" ON public.submission_files;
DROP POLICY IF EXISTS "Users can manage files of their submissions" ON public.submission_files;

-- Submissions
CREATE POLICY "Users can view their own submissions" ON public.submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions" ON public.submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions" ON public.submissions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete submission status submissions" ON public.submissions
  FOR DELETE USING (auth.uid() = user_id AND status = 'submission');

-- Submission contributors
CREATE POLICY "Users can view contributors of their submissions" ON public.submission_contributors
  FOR SELECT USING (
    submission_id IN (SELECT id FROM public.submissions WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage contributors of their submissions" ON public.submission_contributors
  FOR ALL USING (
    submission_id IN (SELECT id FROM public.submissions WHERE user_id = auth.uid())
  );

-- Submission files
CREATE POLICY "Users can view files of their submissions" ON public.submission_files
  FOR SELECT USING (
    submission_id IN (SELECT id FROM public.submissions WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage files of their submissions" ON public.submission_files
  FOR ALL USING (
    submission_id IN (SELECT id FROM public.submissions WHERE user_id = auth.uid())
  );
