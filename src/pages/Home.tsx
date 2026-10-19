import { useState, useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, Wrench, Globe, Star, Heart, ChevronDown } from 'lucide-react';

type Page = 'home' | 'approach' | 'story' | 'families' | 'beyond' | 'involved';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

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
  { icon: Star, title: 'Personalized Learning', desc: 'Each child learns at their own level and pace — no one-size-fits-all.' },
  { icon: Wrench, title: 'Applied Learning', desc: 'Skills are used right away in real projects, not just practiced on worksheets.' },
  { icon: Globe, title: 'Pathway Exploration', desc: 'Children meet people in many careers, including the trades, and see what they could become.' },
  { icon: Heart, title: 'Life Skills', desc: 'A weekly block teaches asking for help, managing feelings, resolving conflict, and speaking up.' },
  { icon: BookOpen, title: 'Belonging & Excellence', desc: 'Every child is known by name and held to high expectations with strong support.' },
];

const bridgeStops = [
  { label: 'Me', desc: 'Every child is known by name, greeted every morning, and valued for who they are.' },
  { label: 'We', desc: 'Children learn to listen, collaborate, and lead — skills that matter for life.' },
  { label: 'School', desc: 'A place of high expectations and high support, where asking for help is celebrated.' },
  { label: 'Beyond', desc: 'Monthly real-world experiences — trades, careers, businesses — show what\'s possible.' },
];

const journeySteps = [
  { step: 'Know', tagline: 'Learn it.', desc: 'Children learn each skill at their own level and pace, with a teacher who knows exactly where they are.', example: 'A second grader reads at their own level in a small group of three.', color: 'bg-brand-600', img: 'https://images.pexels.com/photos/8423098/pexels-photo-8423098.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { step: 'Apply', tagline: 'Use it.', desc: 'Skills go straight into real projects, roles, and problems — not worksheets that get filed away.', example: 'Third graders run a classroom store and practice making change.', color: 'bg-amber-500', img: 'https://images.pexels.com/photos/7868892/pexels-photo-7868892.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { step: 'Explore', tagline: 'Go see it.', desc: 'Children take their learning into the wider world and meet the people who actually do the work.', example: 'A local builder visits and students plan a budget for a birdhouse.', color: 'bg-coral-500', img: 'https://images.pexels.com/photos/9291043/pexels-photo-9291043.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

export default function Home({ onNavigate }: HomeProps) {
  const [heroVisible, setHeroVisible] = useState(false);
  const diff = useInView();
  const journey = useInView();
  const bridge = useInView();
  const realWorld = useInView();
  const team = useInView();
  const meeting = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const nav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-900">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)' }}
        />
        <div className="absolute inset-0 bg-brand-900/80" />
        {/* Decorative arc */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 96V48C360 0 1080 0 1440 48V96H0Z" fill="#fafaf9" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-32 text-center">
          <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 text-sm font-medium rounded-full mb-6 border border-amber-500/30">
              Opening August 2027 · Stockbridge, Henry County, GA
            </span>
            <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6">
              Built to Belong.<br />Built to Become.
            </h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
              Bridges Academy is a new K–3 school in the Stockbridge area for families who know their child is capable of more. We see their potential, close their gaps, build their confidence, and prepare them for a successful future.
            </p>
            <p className="text-amber-300 text-sm mb-10">
              Founded by Monique Bridges — two schools, two states, 100+ students each in year one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => nav('families')}
                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full text-base transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Book a Visit <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => nav('families')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full text-base transition-all border border-white/20 hover:border-white/40"
              >
                Join the Interest List
              </button>
            </div>
          </div>
          <button
            onClick={() => document.getElementById('different')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* ── What makes Bridges different ── */}
      <section id="different" className="py-20 md:py-28 bg-neutral-50">
        <div ref={diff.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-14 items-center transition-all duration-700 ${diff.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">What makes us different</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3 mb-6 leading-tight">
                Every child is capable of more.
              </h2>
              <blockquote className="border-l-4 border-amber-400 pl-5 mb-8">
                <p className="text-neutral-600 text-lg italic leading-relaxed">
                  "I met a student in second grade and again in fifth, when he was performing several grade levels below expectations. With the right support, high expectations, and someone who believed in him, he grew and reached grade level."
                </p>
                <cite className="block mt-3 text-sm font-semibold text-neutral-700 not-italic">— Monique Bridges, Founder</cite>
              </blockquote>
              <div className="space-y-4">
                {[
                  { label: 'See their potential', body: 'High expectations and personal support for every child, from day one.' },
                  { label: 'Close their gaps', body: 'Strong academics that meet each child at their own level and pace.' },
                  { label: 'Build their confidence', body: 'Life skills that last — asking for help, handling big feelings, solving conflict, speaking up.' },
                  { label: 'Prepare for a successful future', body: 'Real-world experience with trades, banks, careers, and places beyond their own city.' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                    <p className="text-neutral-700 text-base leading-relaxed">
                      <strong className="text-neutral-900">{item.label}:</strong> {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => nav('approach')}
                className="mt-8 inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-900 transition-colors"
              >
                See our full approach <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5621962/pexels-photo-5621962.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Children working together in a supportive classroom environment"
                className="rounded-2xl object-cover w-full h-80 md:h-96 shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white rounded-2xl p-5 shadow-lg hidden md:block">
                <p className="font-display font-bold text-3xl">125</p>
                <p className="text-sm font-medium text-amber-100 mt-0.5">families by December 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Know. Apply. Explore. ── */}
      <section className="py-20 md:py-28 bg-white">
        <div ref={journey.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${journey.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">The learning journey</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">
              Learn it. Use it. Go see it.
            </h2>
          </div>
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-700 delay-100 ${journey.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {journeySteps.map((s, i) => (
              <div key={s.step} className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img src={s.img} alt={s.step} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent" />
                  <div className={`absolute top-4 left-4 ${s.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    Step {i + 1}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-2xl text-neutral-900 mb-1">{s.step}.</h3>
                  <p className="text-brand-600 font-semibold text-sm mb-3">{s.tagline}</p>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide mb-1">In the classroom</p>
                    <p className="text-sm text-neutral-700 italic">{s.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`text-center mt-10 transition-all duration-700 delay-200 ${journey.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button onClick={() => nav('approach')} className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-full transition-colors">
              Explore Our Full Approach <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Me, We, School, Beyond ── */}
      <section className="py-20 md:py-28 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 200 Q300 50 600 200 Q900 350 1200 200" stroke="white" strokeWidth="3" fill="none" />
            <path d="M0 300 Q300 150 600 300 Q900 450 1200 300" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div ref={bridge.ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${bridge.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">The Bridges model</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-3">
              A child's world keeps growing.
            </h2>
          </div>
          {/* Bridge path */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-100 ${bridge.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {bridgeStops.map((stop, i) => (
              <div key={stop.label} className="relative">
                {i < bridgeStops.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-amber-400/30 z-0" />
                )}
                <div className="bg-brand-800/60 backdrop-blur-sm border border-brand-700 rounded-2xl p-6 hover:bg-brand-700/60 transition-colors relative z-10">
                  <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-white font-display font-bold text-xl mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">{stop.label}</h3>
                  <p className="text-brand-300 text-sm leading-relaxed">{stop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Five Pillars ── */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Five pillars</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">
              What we teach on purpose.
            </h2>
            <p className="mt-4 text-neutral-600 max-w-xl mx-auto">
              Most schools teach academics and hope everything else follows. Bridges teaches the rest on purpose.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className={`bg-white rounded-2xl p-7 border border-neutral-100 hover:border-brand-200 hover:shadow-md transition-all ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-neutral-900 mb-2">{p.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Real-world strip ── */}
      <section className="py-20 md:py-28 bg-white">
        <div ref={realWorld.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${realWorld.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Explore</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3 mb-4">
              Once a month, learning leaves the classroom.
            </h2>
            <p className="text-neutral-600 mb-10 max-w-2xl">
              Students visit real workplaces — banks, trades, businesses, and careers they may never have imagined. Families are invited to workshops so the learning continues at home.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { img: 'https://images.pexels.com/photos/9291043/pexels-photo-9291043.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', label: 'Real-world explorations' },
                { img: 'https://images.pexels.com/photos/7868889/pexels-photo-7868889.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', label: 'Hands-on projects' },
                { img: 'https://images.pexels.com/photos/31874024/pexels-photo-31874024.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', label: 'Community learning' },
              ].map((item) => (
                <div key={item.label} className="relative rounded-2xl overflow-hidden h-56 group">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white font-semibold text-sm">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => nav('beyond')} className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-900 transition-colors">
                See the Beyond program <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team preview ── */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div ref={team.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${team.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Our story</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mt-3">
                The people who will know your child by name.
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { name: 'Monique Bridges', role: 'Founder & Director', bio: 'Two schools. Two states. 100+ students in year one each time. Monique has dedicated her career to building schools where every child is seen and challenged.' },
                { name: 'Derrick Robinson', role: 'Team Member', bio: 'Bio coming soon. Derrick brings expertise and dedication to the Bridges Academy mission.' },
                { name: 'Nutan Dossa', role: 'Team Member', bio: 'Bio coming soon. Nutan is committed to creating an environment where all learners thrive.' },
              ].map((person) => (
                <div key={person.name} className="bg-white rounded-2xl p-7 border border-neutral-100 hover:shadow-md transition-shadow text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4 text-brand-700 font-display font-bold text-2xl">
                    {person.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-base">{person.name}</h3>
                  <p className="text-brand-600 text-sm mb-3">{person.role}</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">{person.bio}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button onClick={() => nav('story')} className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-900 transition-colors">
                Read our full story <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interest meeting banner ── */}
      <section className="py-16 bg-coral-500">
        <div ref={meeting.ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 ${meeting.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white/90 text-sm font-medium rounded-full mb-4">
              Free &amp; Open to All Families
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Come hear our story.
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Free interest meeting in December 2026 at 6 p.m. — date and location to be announced. Come meet the team and ask every question on your mind.
            </p>
            <button
              onClick={() => nav('involved')}
              className="px-8 py-4 bg-white text-coral-600 font-semibold rounded-full hover:bg-coral-50 transition-colors text-base inline-flex items-center gap-2"
            >
              Reserve Your Spot <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mb-4">
            Is Bridges the right fit for your family?
          </h2>
          <p className="text-neutral-600 text-lg mb-10">
            Tell us a little about your family. It takes about a minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => nav('families')}
              className="px-8 py-4 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-full transition-all hover:shadow-md text-base"
            >
              Join the Interest List
            </button>
            <button
              onClick={() => nav('families')}
              className="px-8 py-4 border-2 border-brand-700 text-brand-700 hover:bg-brand-50 font-semibold rounded-full transition-colors text-base"
            >
              Book a Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
