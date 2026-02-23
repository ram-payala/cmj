-- =============================================================================
-- 01 - Submission types and tables (CMJ)
-- Run this first in Supabase SQL Editor.
-- Does NOT drop or modify public.users. References public.users(id).
-- =============================================================================

-- Enable extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUMs (skip if already exist)
DO $$ BEGIN
  CREATE TYPE submission_status AS ENUM (
    'submission',
    'review',
    'copyediting',
    'production'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE article_type AS ENUM (
    'original_research_article',
    'clinical_trial_or_case_study',
    'review_article',
    'systematic_review',
    'meta_analysis',
    'theoretical_and_methodological_article',
    'short_communication',
    'case_report'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Main submissions table (references existing public.users)
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  title VARCHAR(500) NOT NULL,
  article_type article_type NOT NULL,
  keywords TEXT,
  abstract TEXT NOT NULL,

  editor_comments TEXT,

  status submission_status DEFAULT 'submission',
  submission_number VARCHAR(20) UNIQUE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,

  word_count INTEGER DEFAULT 0,
  page_count INTEGER DEFAULT 0,

  privacy_consent BOOLEAN DEFAULT FALSE,
  privacy_consent_date TIMESTAMPTZ
);

-- Submission contributors (co-authors, etc.)
CREATE TABLE IF NOT EXISTS public.submission_contributors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  affiliation TEXT NOT NULL,

  role VARCHAR(50) DEFAULT 'co_author',
  order_index INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Submission files (with stage for tracking per workflow stage)
CREATE TABLE IF NOT EXISTS public.submission_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,

  file_name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_extension VARCHAR(10),

  file_type VARCHAR(50) NOT NULL,
  description TEXT,
  is_primary BOOLEAN DEFAULT FALSE,

  -- Which stage this file belongs to (for counts per stage)
  stage submission_status DEFAULT 'submission',

  uploaded_by UUID REFERENCES public.users(id),
  upload_date TIMESTAMPTZ DEFAULT NOW(),

  processing_status VARCHAR(20) DEFAULT 'pending',
  processing_notes TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON public.submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_submissions_submission_number ON public.submissions(submission_number);

CREATE INDEX IF NOT EXISTS idx_submission_contributors_submission_id ON public.submission_contributors(submission_id);
CREATE INDEX IF NOT EXISTS idx_submission_contributors_email ON public.submission_contributors(email);

CREATE INDEX IF NOT EXISTS idx_submission_files_submission_id ON public.submission_files(submission_id);
CREATE INDEX IF NOT EXISTS idx_submission_files_file_type ON public.submission_files(file_type);
CREATE INDEX IF NOT EXISTS idx_submission_files_upload_date ON public.submission_files(upload_date);
CREATE INDEX IF NOT EXISTS idx_submission_files_stage ON public.submission_files(stage);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_submissions_updated_at ON public.submissions;
CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_submission_contributors_updated_at ON public.submission_contributors;
CREATE TRIGGER update_submission_contributors_updated_at
  BEFORE UPDATE ON public.submission_contributors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Submission number trigger (uses global sequence from 05 script; placeholder until then)
CREATE OR REPLACE FUNCTION public.generate_submission_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  next_no BIGINT;
BEGIN
  IF NEW.submission_number IS NULL THEN
    IF EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'submission_global_seq') THEN
      next_no := nextval('public.submission_global_seq');
    ELSE
      next_no := (SELECT COALESCE(MAX(CAST(NULLIF(TRIM(BOTH '#' FROM submission_number), '') AS INTEGER)), 0) + 1 FROM public.submissions WHERE submission_number ~ '^#[0-9]+$');
    END IF;
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
