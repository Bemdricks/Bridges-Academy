/*
# Testimonials

Staff can add family quotes in the dashboard. The public site only reads
quotes marked as published.

Run this in the Supabase SQL editor after the staff dashboard migration.
*/

CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_name text NOT NULL,
  detail text,
  quote text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_testimonials" ON public.testimonials;
CREATE POLICY "public_read_published_testimonials" ON public.testimonials
  FOR SELECT TO anon, authenticated
  USING (published = true);

DROP POLICY IF EXISTS "staff_select_testimonials" ON public.testimonials;
CREATE POLICY "staff_select_testimonials" ON public.testimonials
  FOR SELECT TO authenticated
  USING (public.is_staff());

DROP POLICY IF EXISTS "staff_insert_testimonials" ON public.testimonials;
CREATE POLICY "staff_insert_testimonials" ON public.testimonials
  FOR INSERT TO authenticated
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS "staff_update_testimonials" ON public.testimonials;
CREATE POLICY "staff_update_testimonials" ON public.testimonials
  FOR UPDATE TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS "staff_delete_testimonials" ON public.testimonials;
CREATE POLICY "staff_delete_testimonials" ON public.testimonials
  FOR DELETE TO authenticated
  USING (public.is_staff());

GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;

INSERT INTO public.testimonials (family_name, detail, quote, published, sort_order)
SELECT
  'The Benford Family',
  'Parents of Madisyn',
  $q$Our daughter, Madisyn, was blessed to have Ms. Bridges as her teacher and mentor in 8th grade. As a family, we value learning that grows the whole child, not just test scores. Under Ms. Bridges, Madisyn excelled academically and grew as a leader, public speaker, artist, and budding entrepreneur. Our experience was nothing short of phenomenal! If you want an innovative education for your child with no fluff and real results, we highly recommend Ms. Bridges.$q$,
  true,
  1
WHERE NOT EXISTS (
  SELECT 1 FROM public.testimonials WHERE family_name = 'The Benford Family'
);

INSERT INTO public.testimonials (family_name, detail, quote, published, sort_order)
SELECT
  'The Pendleton Family',
  'Parents of Malia',
  $q$Thank you to Miss Bridges for helping Malia excel both academically and personally. Through your guidance and support, she has gained the confidence to grow as an individual and thrive academically. She has found her voice, learned to lead, and become more confident in expressing herself in the classroom, within the community, and through extracurricular activities. I am truly grateful for the positive impact you have made on her growth and development. Thank you for believing in her and helping her become the confident young lady she is today!$q$,
  true,
  2
WHERE NOT EXISTS (
  SELECT 1 FROM public.testimonials WHERE family_name = 'The Pendleton Family'
);
