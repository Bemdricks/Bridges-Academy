/*
# How families heard about the interest meeting

Run this in the Supabase SQL editor before the RSVP form is used.

Adds the answer to "How did you hear about us?" on meeting RSVPs.
*/

ALTER TABLE public.rsvp_submissions
  ADD COLUMN IF NOT EXISTS heard_about text;
