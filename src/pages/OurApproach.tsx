import { useRef, useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Wrench, Globe, Star, Heart, Clock, Users, Lightbulb, Award } from 'lucide-react';

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

const pillars = [
  { icon: Star, num: '01', title: 'Personalized Learning', desc: 'Each child learns at their own level and pace. No one moves on until they\'re ready, and no one waits when they\'re ahead. Teachers track each child closely and adjust every day.' },
  { icon: Wrench, num: '02', title: 'Applied Learning', desc: 'Skills go straight into real projects. Children build, budget, design, and solve — the kind of work that looks like real life, not worksheets that get filed away.' },
  { icon: Globe, num: '03', title: 'Pathway Exploration', desc: 'Children meet electricians, nurses, bankers, chefs, and engineers. They visit real workplaces and see themselves in careers they may never have imagined.' },
  { icon: Heart, num: '04', title: 'Life Skills', desc: 'Once a week, students practice asking for help, calming themselves down, resolving conflict, and speaking up for what they need. These are skills that last a lifetime.' },
  { icon: BookOpen, num: '05', title: 'Belonging & Excellence', desc: 'Every child is greeted by name every single morning. Every child is held to high expectations. And every child has a trusted adult in their corner.' },
];

const daySchedule = [
  { time: 'Morning', part: 'Arrival & Morning Circle', what: 'Each child is greeted by name, shares how they\'re feeling, and sets a personal goal for the day.', builds: 'Belonging, emotional awareness', icon: Heart },
  { time: 'Mid-Morning', part: 'Core Learning', what: 'Reading, writing, and math in small groups, at each child\'s own level.', builds: 'Know', icon: BookOpen },
  { time: 'Late Morning', part: 'Applied Project Time', what: 'Students build, solve, or run something real — like a class business or community project.', builds: 'Apply', icon: Wrench },
  { time: 'Midday', part: 'Leadership Roles', what: 'Students take on classroom and school jobs that carry real responsibility.', builds: 'Leadership', icon: Award },
  { time: 'Afternoon', part: 'Explore Time', what: 'A guest from a trade or career visits, or students work toward their venture and savings goal.', builds: 'Explore', icon: Globe },
  { time: 'End of Day', part: 'Closing Circle', what: 'The class celebrates wins and reflects on the day together.', builds: 'Belonging, confidence', icon: Star },
];

const badges = [
  { title: 'Ask for Help', desc: 'Knowing when and how to ask for help is a superpower — not a weakness.', color: 'bg-brand-100 text-brand-700 border-brand-200' },
  { title: 'Emotional Regulation', desc: 'Feeling big feelings and knowing what to do with them.', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { title: 'Conflict Resolution', desc: 'Disagreements are normal. Knowing how to work through them is a skill.', color: 'bg-coral-100 text-coral-700 border-coral-200' },
  { title: 'Self-Advocacy', desc: 'Speaking up for yourself, clearly and confidently.', color: 'bg-success-50 text-success-700 border-green-200' },
];

export default function OurApproach({ onNavigate }: Props) {
  const nav = (page: Page) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const pillarsRef = useInView();
  const dayRef = useInView();
  const badgesRef = useInView();

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44">
      {/* Page hero */}
      <section className="relative py-20 md:py-28 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-2 border-white" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-white" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 text-sm font-medium rounded-full mb-6 border border-amber-500/30">
            How We Teach
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">Our Approach</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Most schools teach academics and hope everything else follows. Bridges teaches the rest on purpose — so every child graduates elementary school ready for whatever comes next.
          </p>
          <button
            onClick={() => nav('families')}
            className="mt-8 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full transition-colors inline-flex items-center gap-2"
          >
            Book a Visit <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Know Apply Explore */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">The student journey</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">Know. Apply. Explore.</h2>
            <p className="text-neutral-600 mt-4 max-w-xl mx-auto">Every child moves through these three steps again and again, building real knowledge and real confidence each time.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-xl border border-neutral-100">
            {[
              { step: 'Know', num: '1', tagline: 'Learn it at your own pace.', body: 'Children learn each skill or idea at the level that\'s right for them — not the grade average, not the child next to them. Teachers use small groups and regular check-ins to track progress closely.', what: 'Clear progress, with no one-size-fits-all pace.', color: 'bg-brand-700', light: 'bg-brand-50' },
              { step: 'Apply', num: '2', tagline: 'Use it in something real.', body: 'Right after learning a skill, children use it. They build, run, design, and solve — in class businesses, community projects, and real problems that matter to them.', what: 'Work that looks like real life, not worksheets.', color: 'bg-amber-500', light: 'bg-amber-50' },
              { step: 'Explore', num: '3', tagline: 'Take it into the world.', body: 'Once a month, students step outside the classroom and meet the people who do the work — electricians, chefs, nurses, bankers. They come home with a wider picture of what\'s possible.', what: 'Monthly real-world experiences and student ventures.', color: 'bg-coral-500', light: 'bg-coral-50' },
            ].map((item) => (
              <div key={item.step} className={`${item.light} p-8 border-r border-neutral-100 last:border-r-0`}>
                <div className={`w-10 h-10 rounded-full ${item.color} text-white flex items-center justify-center font-bold text-sm mb-4`}>{item.num}</div>
                <h3 className="font-display font-bold text-3xl text-neutral-900 mb-2">{item.step}</h3>
                <p className="text-brand-700 font-semibold text-sm mb-4">{item.tagline}</p>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6">{item.body}</p>
                <div className="bg-white rounded-xl p-4 border border-neutral-100">
                  <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-1">What families see</p>
                  <p className="text-sm text-neutral-700">{item.what}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five pillars */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div ref={pillarsRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${pillarsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Five pillars</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">What we teach on purpose.</h2>
          </div>
          <div className={`space-y-6 transition-all duration-700 delay-100 ${pillarsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-white rounded-2xl p-7 border border-neutral-100 hover:border-brand-200 hover:shadow-md transition-all flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">{p.num}</span>
                      <h3 className="font-display font-bold text-xl text-neutral-900">{p.title}</h3>
                    </div>
                    <p className="text-neutral-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Life skills badges */}
      <section className="py-20 md:py-28 bg-white">
        <div ref={badgesRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${badgesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Life skills</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">Skills that last a lifetime.</h2>
              <p className="text-neutral-600 mt-4 max-w-xl mx-auto">Once a week, every student works on these four skills — the ones no test measures, but every person needs.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {badges.map((b) => (
                <div key={b.title} className={`${b.color} border rounded-2xl p-6 hover:scale-105 transition-transform cursor-default`}>
                  <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center mb-4">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm leading-relaxed opacity-80">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Day at Bridges */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div ref={dayRef.ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${dayRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-14">
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Daily rhythm</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">A day at Bridges.</h2>
              <p className="text-neutral-600 mt-4 max-w-xl mx-auto">Every day has a rhythm that builds belonging, learning, and confidence — from the first greeting to the closing circle.</p>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-100 hidden sm:block" />
              <div className="space-y-6">
                {daySchedule.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.part} className="relative flex gap-6 items-start">
                      <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white border-2 border-brand-200 flex items-center justify-center hidden sm:flex">
                        <Icon className="w-6 h-6 text-brand-600" />
                      </div>
                      <div className="bg-white rounded-2xl p-6 flex-1 border border-neutral-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <span className="text-xs text-neutral-400 font-medium uppercase tracking-wide flex items-center gap-1.5 mb-1">
                              <Clock className="w-3 h-3" /> {item.time}
                            </span>
                            <h3 className="font-semibold text-neutral-900 text-base">{item.part}</h3>
                          </div>
                          <span className="text-xs bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-medium border border-brand-100 flex-shrink-0">
                            {item.builds}
                          </span>
                        </div>
                        <p className="text-neutral-600 text-sm mt-3 leading-relaxed">{item.what}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-10 bg-brand-50 rounded-2xl p-6 border border-brand-100">
              <div className="flex gap-3 items-start">
                <Users className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-brand-900 text-sm mb-1">Plus, twice a month</p>
                  <p className="text-brand-700 text-sm leading-relaxed">Once a month, students take part in a real-world experience beyond the classroom. Families are invited to workshops so learning continues at home.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-4">Come see it for yourself.</h2>
          <p className="text-brand-300 mb-8">Book a visit and see the Bridges approach in action.</p>
          <button onClick={() => nav('families')} className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full transition-colors inline-flex items-center gap-2">
            Book a Visit <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
