/*
# Staff dashboard access

Creates the form tables when they are missing, then lets signed-in staff
read and update submissions. Public visitors can still submit forms,
and still cannot read them.

After this script succeeds:
1. In Supabase Authentication, create a staff user and turn off public sign-ups.
2. Run this separately, with the real staff email:

   insert into public.admin_users (user_id)
   select id from auth.users where email = 'staff@example.com'
   on conflict do nothing;
*/

-- Form tables (safe to run when the original schema was never applied) --------
CREATE TABLE IF NOT EXISTS public.interest_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL,
  email text NOT NULL,
  phone text,
  zip_code text,
  child_grade text,
  questions text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.visit_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL,
  email text NOT NULL,
  phone text,
  preferred_date text,
  preferred_time text,
  children_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.rsvp_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  guests_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.partner_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  role_type text,
  message text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.team_interest_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  role_interest text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.interest_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_interest_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_interest" ON public.interest_submissions;
CREATE POLICY "public_insert_interest" ON public.interest_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_visit" ON public.visit_bookings;
CREATE POLICY "public_insert_visit" ON public.visit_bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_rsvp" ON public.rsvp_submissions;
CREATE POLICY "public_insert_rsvp" ON public.rsvp_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_partner" ON public.partner_submissions;
CREATE POLICY "public_insert_partner" ON public.partner_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_team" ON public.team_interest_submissions;
CREATE POLICY "public_insert_team" ON public.team_interest_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

GRANT INSERT ON public.interest_submissions TO anon, authenticated;
GRANT INSERT ON public.visit_bookings TO anon, authenticated;
GRANT INSERT ON public.rsvp_submissions TO anon, authenticated;
GRANT INSERT ON public.partner_submissions TO anon, authenticated;
GRANT INSERT ON public.team_interest_submissions TO anon, authenticated;

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "staff_read_own_row" ON public.admin_users;
CREATE POLICY "staff_read_own_row" ON public.admin_users
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

GRANT SELECT ON public.admin_users TO authenticated;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_staff() FROM public;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated;

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
    EXECUTE format('ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT ''new''', t);
    EXECUTE format('ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS notes text', t);
    EXECUTE format('ALTER TABLE public.%I DROP CONSTRAINT IF EXISTS %I', t, t || '_status_check');
    EXECUTE format(
      'ALTER TABLE public.%I ADD CONSTRAINT %I CHECK (status IN (''new'', ''contacted'', ''archived''))',
      t, t || '_status_check'
    );

    EXECUTE format('DROP POLICY IF EXISTS "staff_select_%s" ON public.%I', t, t);
    EXECUTE format(
      'CREATE POLICY "staff_select_%s" ON public.%I FOR SELECT TO authenticated USING (public.is_staff())',
      t, t
    );

    EXECUTE format('DROP POLICY IF EXISTS "staff_update_%s" ON public.%I', t, t);
    EXECUTE format(
      'CREATE POLICY "staff_update_%s" ON public.%I FOR UPDATE TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff())',
      t, t
    );

    EXECUTE format('GRANT SELECT, UPDATE ON public.%I TO authenticated', t);
  END LOOP;
END $$;
