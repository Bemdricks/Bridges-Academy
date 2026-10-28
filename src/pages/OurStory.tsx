import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import Testimonials from '@/components/Testimonials';

type Page = 'home' | 'approach' | 'story' | 'families' | 'beyond' | 'involved';
interface Props { onNavigate: (page: Page) => void; }

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const values = [
  { title: 'Every child is known.', desc: 'We learn names before lesson plans. A child who feels unseen cannot learn effectively.' },
  { title: 'High expectations for all.', desc: 'We refuse to assume what a child can\'t do. We show them what\'s possible and stand beside them as they reach it.' },
  { title: 'The whole child.', desc: 'Academics alone are not enough. Social skills, emotional health, and real-world readiness are part of the curriculum.' },
  { title: 'Families as partners.', desc: 'You know your child best. We build a school where your voice is welcomed and your presence is celebrated.' },
];

export default function OurStory({ onNavigate }: Props) {
  const nav = (page: Page) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const storyRef = useInView();
  const valuesRef = useInView();
  const teamRef = useInView();

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-neutral-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Our Story</span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-neutral-900 mt-3 mb-6 leading-tight">
            Built from experience. Driven by purpose. Rooted in love.
          </h1>
          <p className="text-neutral-600 text-xl leading-relaxed max-w-2xl">
          Monique Bridges has spent her career building schools, developing teams, and creating environments where students can thrive. After opening schools in two states and growing each to more than 100 students in its first year, she is bringing that experience to her most personal undertaking yet: building the school she has always envisioned.
          Carmel Academy was created around a simple belief: every child deserves to feel a sense of belonging, discover their potential, and develop the skills to thrive beyond the classroom.
          </p>
        </div>
      </section>

      {/* Monique's story */}
      <section className="py-20 md:py-28 bg-white">
        <div ref={storyRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-14 items-start transition-all duration-700 ${storyRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/18870246/pexels-photo-18870246.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="A dedicated educator working with a student"
                  className="rounded-2xl w-full h-80 object-cover shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-700 text-white rounded-2xl p-5 shadow-lg hidden md:block">
                  <p className="font-display font-bold text-3xl">2</p>
                  <p className="text-sm text-brand-200 mt-0.5">schools opened</p>
                  <p className="font-display font-bold text-3xl mt-2">2</p>
                  <p className="text-sm text-brand-200 mt-0.5">states</p>
                </div>
              </div>
            </div>
            <div>
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Meet Monique</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mt-3 mb-6">Monique Bridges, Founder</h2>
              <div className="space-y-5 text-neutral-600 leading-relaxed">
                <p>
                Monique Bridges has spent more than a decade in education, opening schools in two states and growing each to more than 100 students in its first year. Born in Atlanta and raised on the city’s eastside, she understands the importance of creating opportunities that help children see beyond their current circumstances.
                </p>
                <p>
                As an educator, she taught several students who began the year grade levels behind and watched them rise above grade level as they gained exposure to skilled trades, career connections, bank accounts, and experiences beyond their city. She saw what became possible when students connected learning to the real world and began to envision futures they had never considered.
                </p>
                <p>
                What changed was not the children. It was what they believed was possible.
                </p>
                <p>
                That conviction became Carmel Academy: a school where belonging and excellence go hand in hand, learning connects to the real world, and every child is known, held to high standards, and given opportunities to discover what they can become.
                </p>
                <p><strong>Built to Belong. Built to Become.</strong>
                </p>
              </div>
              <blockquote className="mt-7 border-l-4 border-amber-400 pl-5">
                <Quote className="w-6 h-6 text-amber-700 mb-2" />
                <p className="text-neutral-700 italic leading-relaxed text-lg">
                  "I met a student in second grade and again in fifth, when he was performing several grade levels below expectations. With the right support, high expectations, and someone who believed in him, he grew and reached grade level."
                </p>
                <cite className="block mt-3 text-sm font-semibold text-neutral-700 not-italic">— Monique Bridges, Founder</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Why Carmel exists */}
      <section className="py-20 md:py-28 bg-brand-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Why we exist</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-3 mb-8">Built for every child.</h2>
          <p className="text-brand-300 text-lg leading-relaxed mb-6">
            The Stockbridge and South Fulton area is full of families who want more for their children — not just better test scores, but children who know how to handle hard moments, speak up for themselves, try new things, and see a wide future ahead of them.
          </p>
          <p className="text-brand-300 text-lg leading-relaxed">
            Carmel Academy exists to be that school. A place where a child is known by name, challenged with high expectations, and given the skills — social, emotional, academic, and practical — to become the person they were built to become.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div ref={valuesRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${valuesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-14">
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">What we believe</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">Our values.</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <div key={v.title} className="bg-white rounded-2xl p-7 border border-neutral-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="font-display font-bold text-xl text-neutral-900">{v.title}</h3>
                  </div>
                  <p className="text-neutral-600 leading-relaxed pl-11">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-white">
        <div ref={teamRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${teamRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-14">
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Our team</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">The people who will know your child by name.</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { name: 'Monique Bridges', role: 'Founder & Director', bio: 'Two schools. Two states. 100+ students in year one each time. Monique has dedicated her career to building schools where every child is seen and challenged to their fullest potential.', initial: 'M' },
                { name: 'Derrick Robinson', role: 'Team Member', bio: 'Derrick brings deep experience and a genuine commitment to the Carmel Academy mission. Full bio coming soon as the team prepares for the August 2027 opening.', initial: 'D' },
                { name: 'Nutan Dossa', role: 'Team Member', bio: 'Nutan is dedicated to creating learning environments where all students thrive. Full bio coming soon as the team prepares for the August 2027 opening.', initial: 'N' },
              ].map((person) => (
                <div key={person.name} className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:shadow-md transition-shadow text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-600 flex items-center justify-center mx-auto mb-5 text-white font-display font-bold text-3xl">
                    {person.initial}
                  </div>
                  <h3 className="font-display font-bold text-xl text-neutral-900">{person.name}</h3>
                  <p className="text-brand-600 text-sm font-medium mt-1 mb-4">{person.role}</p>
                  <p className="text-neutral-600 text-sm leading-relaxed">{person.bio}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-neutral-500 text-sm mb-4">Interested in joining our team?</p>
              <button onClick={() => nav('involved')} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-full transition-colors text-sm">
                See Teaching Opportunities <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Testimonials tone="stone" />

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-900 mb-4">Ready to learn more?</h2>
          <p className="text-brand-800 mb-8">Join our interest list and be first to hear news about Carmel Academy.</p>
          <button onClick={() => nav('families')} className="px-8 py-4 bg-white text-amber-700 font-semibold rounded-full hover:bg-amber-50 transition-colors inline-flex items-center gap-2">
            Join the Interest List <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
