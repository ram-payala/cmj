-- =============================================================================
-- 04 - Storage bucket and policies for submission files (CMJ)
-- Run after 03. Folder structure: submission-files/{user_id}/{path}
-- =============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('submission-files', 'submission-files', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Users can upload their own submission files" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own submission files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own submission files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own submission files" ON storage.objects;

CREATE POLICY "Users can upload their own submission files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'submission-files'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own submission files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'submission-files'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own submission files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'submission-files'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own submission files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'submission-files'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
