import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { fallbackTestimonials, fetchTestimonials, type Testimonial } from '@/lib/testimonials';

interface TestimonialsProps {
  tone?: 'white' | 'stone';
}

export default function Testimonials({ tone = 'white' }: TestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const bg = tone === 'stone' ? 'bg-neutral-50' : 'bg-white';
  const card = tone === 'stone' ? 'bg-white' : 'bg-neutral-50';

  const go = (next: number) => {
    setIndex((next + count) % count);
  };

  useEffect(() => {
    let cancelled = false;
    fetchTestimonials().then((result) => {
      if (cancelled || result.error || result.rows.length === 0) return;
      setTestimonials(result.rows);
      setIndex(0);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 8000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <section
      className={`py-20 md:py-28 ${bg}`}
      aria-roledescription="carousel"
      aria-label="Family testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">What families say.</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Carmel Academy opens in August 2027. These words come from families who have already learned with Ms. Bridges.
          </p>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex items-stretch transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((item, i) => (
              <figure
                key={item.id ?? item.name}
                className={`${card} w-full shrink-0 rounded-3xl border border-neutral-100 shadow-sm p-8 md:p-12 flex flex-col`}
                aria-hidden={i !== index}
              >
                <Quote className="w-8 h-8 text-amber-500 mb-6" aria-hidden="true" />
                <blockquote className="flex-1">
                  <p className="text-neutral-800 text-sm md:text-base italic leading-relaxed">{item.quote}</p>
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

        {count > 1 && <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="w-11 h-11 rounded-full border border-neutral-200 bg-white text-brand-800 hover:bg-brand-50 transition-colors flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose a testimonial">
            {testimonials.map((item, i) => (
              <button
                key={item.id ?? item.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show testimonial from ${item.name}`}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? 'w-8 bg-brand-700' : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="w-11 h-11 rounded-full border border-neutral-200 bg-white text-brand-800 hover:bg-brand-50 transition-colors flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>}
      </div>
    </section>
  );
}
