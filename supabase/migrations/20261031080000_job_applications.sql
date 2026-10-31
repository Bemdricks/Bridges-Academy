/*
# Resume uploads for job applications

Run this in the Supabase SQL editor before applicants submit resumes.

Adds a private resumes bucket and a resume_path column on team applications.
Visitors can upload a file. Only staff can open it.
*/

ALTER TABLE public.team_interest_submissions
  ADD COLUMN IF NOT EXISTS resume_path text;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes',
  'resumes',
  false,
  5242880,
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO UPDATE
SET
  public = false,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "applicants_upload_resumes" ON storage.objects;
CREATE POLICY "applicants_upload_resumes" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    bucket_id = 'resumes'
    AND name LIKE 'applications/%'
  );

DROP POLICY IF EXISTS "staff_read_resumes" ON storage.objects;
CREATE POLICY "staff_read_resumes" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'resumes' AND public.is_staff());
