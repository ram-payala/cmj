-- =============================================================================
-- 03 - Submission details view and grants (CMJ)
-- Run after 02-submission-rls.sql
-- =============================================================================

DROP VIEW IF EXISTS public.submission_details;

CREATE VIEW public.submission_details AS
SELECT
  s.*,
  u.username,
  u.full_name AS submitter_name,
  u.email AS submitter_email,
  u.affiliation AS submitter_affiliation,
  u.country AS submitter_country,
  COALESCE(
    json_agg(
      json_build_object(
        'id', sc.id,
        'name', sc.name,
        'email', sc.email,
        'affiliation', sc.affiliation,
        'role', sc.role,
        'order_index', sc.order_index
      ) ORDER BY sc.order_index
    ) FILTER (WHERE sc.id IS NOT NULL),
    '[]'::json
  ) AS contributors,
  COALESCE(
    json_agg(
      json_build_object(
        'id', sf.id,
        'file_name', sf.file_name,
        'original_name', sf.original_name,
        'file_path', sf.file_path,
        'file_size', sf.file_size,
        'mime_type', sf.mime_type,
        'file_type', sf.file_type,
        'description', sf.description,
        'is_primary', sf.is_primary,
        'stage', sf.stage,
        'upload_date', sf.upload_date
      ) ORDER BY sf.upload_date
    ) FILTER (WHERE sf.id IS NOT NULL),
    '[]'::json
  ) AS files
FROM public.submissions s
LEFT JOIN public.users u ON s.user_id = u.id
LEFT JOIN public.submission_contributors sc ON s.id = sc.submission_id
LEFT JOIN public.submission_files sf ON s.id = sf.submission_id
GROUP BY s.id, u.id;

GRANT SELECT ON public.submission_details TO authenticated;
GRANT ALL ON public.submissions TO authenticated;
GRANT ALL ON public.submission_contributors TO authenticated;
GRANT ALL ON public.submission_files TO authenticated;
