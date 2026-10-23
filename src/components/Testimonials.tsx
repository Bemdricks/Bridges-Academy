import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Our daughter, Madisyn, was blessed to have Ms. Bridges as her teacher and mentor in 8th grade. As a family, we value learning that grows the whole child, not just test scores. Under Ms. Bridges, Madisyn excelled academically and grew as a leader, public speaker, artist, and budding entrepreneur. Our experience was nothing short of phenomenal! If you want an innovative education for your child with no fluff and real results, we highly recommend Ms. Bridges.',
    name: 'The Benford Family',
    detail: 'Parents of Madisyn',
    initial: 'B',
  },
];

interface TestimonialsProps {
  tone?: 'white' | 'stone';
}

export default function Testimonials({ tone = 'white' }: TestimonialsProps) {
  const bg = tone === 'stone' ? 'bg-neutral-50' : 'bg-white';
  const card = tone === 'stone' ? 'bg-white' : 'bg-neutral-50';

  return (
    <section className={`py-20 md:py-28 ${bg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">What families say.</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Carmel Academy opens in August 2027. These words come from families who have already learned with Ms. Bridges.
          </p>
        </div>
        <div className="space-y-6">
          {testimonials.map((item) => (
            <figure key={item.name} className={`${card} rounded-3xl border border-neutral-100 shadow-sm p-8 md:p-12`}>
              <Quote className="w-8 h-8 text-amber-500 mb-6" aria-hidden="true" />
              <blockquote>
                <p className="text-neutral-800 text-lg md:text-xl leading-relaxed">{item.quote}</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-brand-700 text-white font-display font-bold text-lg flex items-center justify-center shrink-0">
                  {item.initial}
                </span>
                <span>
                  <span className="block font-semibold text-neutral-900">{item.name}</span>
                  <span className="block text-sm text-brand-700">{item.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
