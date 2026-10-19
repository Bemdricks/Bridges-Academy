/*
# Bridges Academy – Initial Schema

Creates four submission tables for the academy's forms.

1. New Tables
  - `interest_submissions` – families joining the interest list (name, email, phone, zip, child grade, questions)
  - `visit_bookings` – families booking a school visit (name, email, phone, preferred date/time, child count)
  - `rsvp_submissions` – families reserving a spot at the December interest meeting
  - `partner_submissions` – employers/tradespeople/mentors interested in partnering
  - `team_interest_submissions` – prospective teachers expressing interest in joining

2. Security
  - RLS enabled on all tables.
  - Public INSERT allowed (no auth required) so the anon-key frontend can submit forms.
  - No public SELECT – form data is admin-only and never shown back to users in the UI.
*/

-- Interest List ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS interest_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL,
  email text NOT NULL,
  phone text,
  zip_code text,
  child_grade text,
  questions text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interest_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_interest" ON interest_submissions;
CREATE POLICY "public_insert_interest" ON interest_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Visit Bookings ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS visit_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL,
  email text NOT NULL,
  phone text,
  preferred_date text,
  preferred_time text,
  children_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE visit_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_visit" ON visit_bookings;
CREATE POLICY "public_insert_visit" ON visit_bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- RSVP Submissions -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rsvp_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  guests_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvp_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_rsvp" ON rsvp_submissions;
CREATE POLICY "public_insert_rsvp" ON rsvp_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Partner Submissions ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS partner_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  role_type text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partner_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_partner" ON partner_submissions;
CREATE POLICY "public_insert_partner" ON partner_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Team Interest ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_interest_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  role_interest text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_interest_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_team" ON team_interest_submissions;
CREATE POLICY "public_insert_team" ON team_interest_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);
