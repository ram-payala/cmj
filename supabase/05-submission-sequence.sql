-- =============================================================================
-- 05 - Global submission number sequence (CMJ)
-- Run after 01. Set starting value as needed (e.g. 1 for new project).
-- =============================================================================

CREATE SEQUENCE IF NOT EXISTS public.submission_global_seq;

-- Start at 1 so first submission is #1 (change 525 to your desired start)
SELECT setval('public.submission_global_seq', 1, true);

CREATE OR REPLACE FUNCTION public.generate_submission_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  next_no BIGINT;
BEGIN
  IF NEW.submission_number IS NULL THEN
    next_no := nextval('public.submission_global_seq');
    NEW.submission_number := '#' || next_no::text;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS generate_submission_number_trigger ON public.submissions;
DROP TRIGGER IF EXISTS set_submission_number ON public.submissions;
CREATE TRIGGER generate_submission_number_trigger
  BEFORE INSERT ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.generate_submission_number();
