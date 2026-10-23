import { useRef, useEffect, useState } from 'react';
import { ArrowRight, MapPin, Users, Lightbulb, Calendar } from 'lucide-react';

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

const experiences = [
  { title: 'Local Businesses', desc: 'Students visit nearby businesses and learn how they operate — from bakeries to hardware stores.', icon: '🏪', color: 'bg-brand-50 border-brand-100' },
  { title: 'Trades & Crafts', desc: 'Electricians, plumbers, carpenters, and builders visit and show students what the work actually looks like.', icon: '🔧', color: 'bg-amber-50 border-amber-100' },
  { title: 'Banking & Finance', desc: 'A trip to a real bank helps students understand saving, spending, and how money works.', icon: '🏦', color: 'bg-brand-50 border-brand-100' },
  { title: 'Careers & Professions', desc: 'Nurses, engineers, chefs, artists, and coaches share their stories and answer real questions.', icon: '💼', color: 'bg-neutral-50 border-neutral-200' },
  { title: 'Community Partners', desc: 'Local organizations welcome students for real visits that make the world feel bigger.', icon: '🤝', color: 'bg-brand-50 border-brand-100' },
  { title: 'Student Ventures', desc: 'Students plan and run their own small ventures — setting savings goals and seeing results.', icon: '🌱', color: 'bg-amber-50 border-amber-100' },
];

const workshops = [
  { title: 'How to Support Learning at Home', desc: 'Practical tools for continuing the classroom work at home, without stress.' },
  { title: 'Understanding the Carmel Approach', desc: 'A deeper look at how Know, Apply, Explore works and what it looks like for your child.' },
  { title: 'Life Skills in Everyday Life', desc: 'How to practice asking for help, emotional regulation, and conflict resolution as a family.' },
  { title: 'Financial Literacy for Families', desc: 'Simple ways to bring money conversations into your home in ways children understand.' },
];

const locations = [
  { name: 'Stockbridge', type: 'Primary area', color: 'bg-brand-600' },
  { name: 'McDonough', type: 'Nearby', color: 'bg-amber-500' },
  { name: 'Locust Grove', type: 'Nearby', color: 'bg-brand-800' },
  { name: 'Henry County', type: 'Surrounding area', color: 'bg-neutral-500' },
];

export default function Beyond({ onNavigate }: Props) {
  const nav = (page: Page) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const expRef = useInView();
  const venturesRef = useInView();
  const workshopsRef = useInView();

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/9290014/pexels-photo-9290014.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)' }}
        />
        <div className="absolute inset-0 bg-brand-900/80" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 text-sm font-medium rounded-full mb-6 border border-amber-500/30">
            Beyond the Classroom
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white mb-5">Beyond.</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Once a month, learning leaves the classroom. Students step into the real world — and bring it back with them.
          </p>
          <button
            onClick={() => nav('families')}
            className="mt-8 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-brand-900 font-semibold rounded-full transition-colors inline-flex items-center gap-2"
          >
            Book a Visit <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* The idea */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">The Explore step</span>
              <h2 className="font-display font-bold text-4xl text-neutral-900 mt-3 mb-6">The world is the classroom.</h2>
              <p className="text-neutral-600 leading-relaxed mb-5">
                At Carmel, learning doesn't stop at the school door. Once a month, students step out into Henry County and beyond — visiting real workplaces, meeting people who do real work, and seeing themselves in futures they may not have imagined.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                This is the Explore step — the third and outermost ring of the Carmel model. Students take what they Know and have Applied, and they test it in the real world.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { img: 'https://images.pexels.com/photos/12887137/pexels-photo-12887137.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', label: 'Field explorations' },
                { img: 'https://images.pexels.com/photos/4544774/pexels-photo-4544774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', label: 'Hands-on projects' },
                { img: 'https://images.pexels.com/photos/12887055/pexels-photo-12887055.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', label: 'Community visits' },
                { img: 'https://images.pexels.com/photos/5905479/pexels-photo-5905479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', label: 'Real-world discovery' },
              ].map((item) => (
                <div key={item.label} className="relative rounded-xl overflow-hidden h-36">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white text-xs font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-world experiences */}
      <section className="py-20 bg-neutral-50">
        <div ref={expRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${expRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Monthly experiences</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">Where students go.</h2>
            <p className="text-neutral-600 mt-4 max-w-xl mx-auto">Every month, a new kind of real-world experience — designed to show children how wide the world really is.</p>
          </div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-100 ${expRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {experiences.map((exp) => (
              <div key={exp.title} className={`${exp.color} border rounded-2xl p-6 hover:shadow-md transition-shadow`}>
                <span className="text-3xl mb-4 block">{exp.icon}</span>
                <h3 className="font-display font-bold text-xl text-neutral-900 mb-2">{exp.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we serve - community map */}
      <section className="py-20 bg-brand-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Our community</span>
            <h2 className="font-display font-bold text-4xl text-white mt-3">Serving Henry County.</h2>
            <p className="text-brand-300 mt-4 max-w-lg mx-auto">Carmel Academy serves families across Stockbridge, McDonough, Locust Grove, and the wider Henry County area.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <div key={loc.name} className="bg-brand-800 rounded-2xl p-5 border border-brand-700 text-center hover:bg-brand-700/70 transition-colors">
                <div className={`w-3 h-3 rounded-full ${loc.color} mx-auto mb-3`} />
                <div className="flex items-center justify-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-brand-400" />
                  <h3 className="font-semibold text-white text-sm">{loc.name}</h3>
                </div>
                <p className="text-brand-400 text-xs">{loc.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student ventures */}
      <section className="py-20 bg-white">
        <div ref={venturesRef.ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${venturesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Student ventures</span>
              <h2 className="font-display font-bold text-4xl text-neutral-900 mt-3 mb-5">Little leaders. Real goals.</h2>
              <p className="text-neutral-600 leading-relaxed mb-5">
                At Carmel, students don't just learn about money — they practice it. Each student works toward a savings goal, and the class can run a small venture together: making something, selling something, or solving a problem for their community.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-6">
                This builds financial literacy, responsibility, and the confidence that comes from seeing a plan through to the end.
              </p>
              <div className="flex gap-3 flex-wrap">
                {['Savings goals', 'Class businesses', 'Financial literacy', 'Leadership'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-full border border-brand-100">{tag}</span>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
              <Lightbulb className="w-8 h-8 text-amber-700 mb-4" />
              <h3 className="font-display font-bold text-2xl text-neutral-900 mb-4">What student ventures look like</h3>
              <ul className="space-y-4">
                {[
                  'A class store where students manage inventory and make change',
                  'A school garden maintained and sold at a community market',
                  'A simple greeting card business for a school event',
                  'A savings challenge where each child sets a goal and tracks progress',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-neutral-700">
                    <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Family workshops */}
      <section className="py-20 bg-neutral-50">
        <div ref={workshopsRef.ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${workshopsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">For families</span>
              <h2 className="font-display font-bold text-4xl text-neutral-900 mt-3">Workshops that bring learning home.</h2>
              <p className="text-neutral-600 mt-4 max-w-xl mx-auto">Families are invited to regular workshops so what happens at school continues at home. You are a partner in this — not a visitor.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {workshops.map((w) => (
                <div key={w.title} className="bg-white rounded-2xl p-6 border border-neutral-100 hover:shadow-md transition-shadow flex gap-4">
                  <Calendar className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-base mb-1">{w.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-16 bg-brand-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-10 h-10 text-brand-300 mx-auto mb-4" />
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Are you a business, tradesperson, or mentor?</h2>
          <p className="text-brand-200 mb-8 max-w-xl mx-auto">Partner with Carmel Academy to give students real-world experiences they'll never forget — and be part of building Henry County's next generation.</p>
          <button onClick={() => nav('involved')} className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-brand-900 font-semibold rounded-full transition-colors inline-flex items-center gap-2">
            Partner With Us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
