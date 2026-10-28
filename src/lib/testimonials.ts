import { supabase } from '@/lib/supabase';

export interface Testimonial {
  id?: string;
  quote: string;
  name: string;
  detail: string;
  initial: string;
  published?: boolean;
  sort_order?: number;
}

interface TestimonialRow {
  id: string;
  quote: string;
  family_name: string;
  detail: string | null;
  published: boolean;
  sort_order: number;
}

export const fallbackTestimonials: Testimonial[] = [
  {
    quote:
      'Our daughter, Madisyn, was blessed to have Ms. Bridges as her teacher and mentor in 8th grade. As a family, we value learning that grows the whole child, not just test scores. Under Ms. Bridges, Madisyn excelled academically and grew as a leader, public speaker, artist, and budding entrepreneur. Our experience was nothing short of phenomenal! If you want an innovative education for your child with no fluff and real results, we highly recommend Ms. Bridges.',
    name: 'The Benford Family',
    detail: 'Parents of Madisyn',
    initial: 'B',
  },
  {
    quote:
      'Thank you to Miss Bridges for helping Malia excel both academically and personally. Through your guidance and support, she has gained the confidence to grow as an individual and thrive academically. She has found her voice, learned to lead, and become more confident in expressing herself in the classroom, within the community, and through extracurricular activities. I am truly grateful for the positive impact you have made on her growth and development. Thank you for believing in her and helping her become the confident young lady she is today!',
    name: 'The Pendleton Family',
    detail: 'Parents of Malia',
    initial: 'P',
  },
];

export function initialFor(name: string) {
  const cleaned = name.replace(/^the\s+/i, '').trim();
  return (cleaned[0] ?? 'C').toUpperCase();
}

function fromRow(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    quote: row.quote,
    name: row.family_name,
    detail: row.detail ?? '',
    initial: initialFor(row.family_name),
    published: row.published,
    sort_order: row.sort_order,
  };
}

export async function fetchTestimonials(includeHidden = false): Promise<{ rows: Testimonial[]; error: string | null }> {
  if (!supabase) return { rows: [], error: 'Database is not connected.' };

  let query = supabase
    .from('testimonials')
    .select('id, quote, family_name, detail, published, sort_order')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (!includeHidden) query = query.eq('published', true);

  const { data, error } = await query;
  if (error) return { rows: [], error: error.message };
  return { rows: ((data ?? []) as TestimonialRow[]).map(fromRow), error: null };
}

export interface TestimonialInput {
  id?: string;
  name: string;
  detail: string;
  quote: string;
  published: boolean;
}

export async function saveTestimonial(input: TestimonialInput) {
  if (!supabase) throw new Error('Database is not connected.');
  const payload = {
    family_name: input.name.trim(),
    detail: input.detail.trim() || null,
    quote: input.quote.trim(),
    published: input.published,
  };
  const { error } = input.id
    ? await supabase.from('testimonials').update(payload).eq('id', input.id)
    : await supabase.from('testimonials').insert(payload);
  if (error) throw new Error(error.message);
}

export async function removeTestimonial(id: string) {
  if (!supabase) throw new Error('Database is not connected.');
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
