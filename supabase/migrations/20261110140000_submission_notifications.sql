/*
# One email per dashboard submission

Run this in the Supabase SQL editor before relying on activity alerts.

Adds notified_at so each interest signup, visit request, meeting RSVP,
partner note, and job application emails the school a single time.
*/

DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'interest_submissions',
    'visit_bookings',
    'rsvp_submissions',
    'partner_submissions',
    'team_interest_submissions'
  ]
  LOOP
    EXECUTE format('ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS notified_at timestamptz', t);
  END LOOP;
END $$;
