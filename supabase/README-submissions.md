# CMJ Submission Backend – Supabase Setup

Run these scripts in **Supabase Dashboard → SQL Editor** in order. They do **not** modify the existing `public.users` table.

| Order | File | Purpose |
|-------|------|---------|
| 1 | `01-submission-types-and-tables.sql` | ENUMs (`submission_status`, `article_type`), tables (`submissions`, `submission_contributors`, `submission_files`), indexes, `updated_at` and submission-number trigger |
| 2 | `02-submission-rls.sql` | RLS on all three tables (users see only their own submissions, contributors, files) |
| 3 | `03-submission-view.sql` | `submission_details` view (submission + user + contributors + files) and grants |
| 4 | `04-submission-storage.sql` | Storage bucket `submission-files` and RLS (path: `submission-files/{user_id}/...`) |
| 5 | `05-submission-sequence.sql` | Global sequence for submission numbers; default start is `#1` (edit `setval` to e.g. `525` if you need to continue from an existing range) |

## File stage tracking

- Each row in `submission_files` has a **`stage`** column of type `submission_status` (default `'submission'`).
- Use it to show counts per stage (e.g. Submission(5), Review(0), Copyediting(0), Production(0)) and to move files between stages when the workflow advances.

## Tables overview

- **submissions** – One per manuscript; `user_id` → `public.users(id)`; `status` and `submission_number` (e.g. #1, #2).
- **submission_contributors** – Co-authors etc.; `submission_id` → `submissions(id)`.
- **submission_files** – Uploaded files; `submission_id` → `submissions(id)`; `stage` for workflow; `file_path` is the path in the `submission-files` bucket.

## Storage path

Upload to: `submission-files/{user_id}/{timestamp}_{original_name}` (or similar). RLS allows access only when the first path segment equals the authenticated user’s id.
