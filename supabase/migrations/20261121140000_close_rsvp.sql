/*
# Close toy-drive RSVPs

Visitors can no longer insert meeting RSVPs. Staff can still read and
update the rows already collected.
*/

DROP POLICY IF EXISTS "public_insert_rsvp" ON public.rsvp_submissions;

REVOKE INSERT ON public.rsvp_submissions FROM anon, authenticated;
