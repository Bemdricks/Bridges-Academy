import { useState } from 'react';
import { CheckCircle, AlertCircle, ChevronDown, ChevronUp, Calendar, UserPlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Page = 'home' | 'approach' | 'story' | 'families' | 'beyond' | 'involved';
interface Props { onNavigate: (page: Page) => void; }

type TabId = 'interest' | 'visit';

interface InterestForm {
  parent_name: string;
  email: string;
  phone: string;
  zip_code: string;
  child_grade: string;
  questions: string;
}

interface VisitForm {
  parent_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  children_count: number;
}

const grades = ['Pre-K', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3'];
const times = ['Morning (9–11 am)', 'Midday (11 am–1 pm)', 'Afternoon (1–3 pm)'];

const faqs = [
  { q: 'What grades does Bridges Academy serve?', a: 'Bridges Academy opens in August 2027 as a K–3 school, serving Kindergarten through 3rd grade. The school is designed to grow over time.' },
  { q: 'Where is the school located?', a: 'Bridges Academy will be in the Stockbridge area of Henry County, Georgia. The exact address will be announced once the location is confirmed. We serve families in Stockbridge, McDonough, Locust Grove, and the surrounding area.' },
  { q: 'Is there a cost to attend?', a: 'Tuition and financial aid details are being finalized and will be shared once confirmed. Join the interest list to receive updates as details are announced.' },
  { q: 'What does a typical school day look like?', a: 'Every day includes a morning greeting circle, core learning in small groups, applied project time, leadership roles, explore time with guest visitors or ventures, and a closing circle. See Our Approach for the full picture.' },
  { q: 'How is Bridges different from other K–3 schools?', a: 'Bridges teaches social-emotional skills, life skills, leadership, entrepreneurship, financial literacy, and real-world experience alongside strong academics — all by design, not by accident.' },
  { q: 'How do I join the interest list?', a: 'Fill in the form on this page. It takes about a minute. You\'ll receive a confirmation and be among the first to hear updates, visit invitations, and enrollment news.' },
  { q: 'Can I visit before the school opens?', a: 'Yes. Book a visit using the form below and Monique\'s team will reach out to schedule a time.' },
  { q: 'When is the interest meeting?', a: 'A free interest meeting is planned for December 2026 at 6 p.m. The date and location will be confirmed soon. RSVP on the Get Involved page.' },
];

export default function Families({ onNavigate }: Props) {
  const nav = (page: Page) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const [activeTab, setActiveTab] = useState<TabId>('interest');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Interest form
  const [interest, setInterest] = useState<InterestForm>({
    parent_name: '', email: '', phone: '', zip_code: '', child_grade: '', questions: '',
  });
  const [iSubmitting, setISubmitting] = useState(false);
  const [iDone, setIDone] = useState(false);
  const [iError, setIError] = useState('');

  // Visit form
  const [visit, setVisit] = useState<VisitForm>({
    parent_name: '', email: '', phone: '', preferred_date: '', preferred_time: '', children_count: 1,
  });
  const [vSubmitting, setVSubmitting] = useState(false);
  const [vDone, setVDone] = useState(false);
  const [vError, setVError] = useState('');

  const submitInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    setISubmitting(true);
    setIError('');
    if (!supabase) { setISubmitting(false); setIError('Something went wrong. Please try again.'); return; }
    const { error } = await supabase.from('interest_submissions').insert({
      parent_name: interest.parent_name,
      email: interest.email,
      phone: interest.phone || null,
      zip_code: interest.zip_code || null,
      child_grade: interest.child_grade || null,
      questions: interest.questions || null,
    });
    setISubmitting(false);
    if (error) { setIError('Something went wrong. Please try again.'); return; }
    setIDone(true);
    setInterest({ parent_name: '', email: '', phone: '', zip_code: '', child_grade: '', questions: '' });
  };

  const submitVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVSubmitting(true);
    setVError('');
    if (!supabase) { setVSubmitting(false); setVError('Something went wrong. Please try again.'); return; }
    const { error } = await supabase.from('visit_bookings').insert({
      parent_name: visit.parent_name,
      email: visit.email,
      phone: visit.phone || null,
      preferred_date: visit.preferred_date || null,
      preferred_time: visit.preferred_time || null,
      children_count: visit.children_count,
    });
    setVSubmitting(false);
    if (error) { setVError('Something went wrong. Please try again.'); return; }
    setVDone(true);
    setVisit({ parent_name: '', email: '', phone: '', preferred_date: '', preferred_time: '', children_count: 1 });
  };

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-4 border-white" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border-2 border-white" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 border border-white/30">For Families</span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white mb-5">Join Us.</h1>
          <p className="text-white/90 text-xl max-w-xl mx-auto leading-relaxed">
            Bridges Academy opens August 2027 for K–3 students in Stockbridge and Henry County, Georgia. Take the first step today.
          </p>
        </div>
      </section>

      {/* Tab forms */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex gap-3 mb-10 bg-white rounded-2xl p-2 border border-neutral-100 shadow-sm">
            {[
              { id: 'interest' as TabId, label: 'Join the Interest List', icon: UserPlus },
              { id: 'visit' as TabId, label: 'Book a Visit', icon: Calendar },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === id
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-brand-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Interest form */}
          {activeTab === 'interest' && (
            <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">Join the Interest List</h2>
              <p className="text-neutral-500 text-sm mb-7">Be first to hear updates, visit invitations, and enrollment news.</p>

              {iDone ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle className="w-14 h-14 text-success-500" />
                  <h3 className="font-display font-bold text-2xl text-neutral-900">You're on the list!</h3>
                  <p className="text-neutral-600 max-w-sm">Thank you for your interest in Bridges Academy. We'll be in touch with updates, visit invitations, and enrollment news.</p>
                  <button onClick={() => setIDone(false)} className="mt-4 text-brand-700 text-sm font-medium hover:underline">Submit another response</button>
                </div>
              ) : (
                <form onSubmit={submitInterest} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Parent / Guardian Name <span className="text-coral-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={interest.parent_name}
                        onChange={e => setInterest(s => ({ ...s, parent_name: e.target.value }))}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email Address <span className="text-coral-500">*</span></label>
                      <input
                        type="email"
                        required
                        value={interest.email}
                        onChange={e => setInterest(s => ({ ...s, email: e.target.value }))}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={interest.phone}
                        onChange={e => setInterest(s => ({ ...s, phone: e.target.value }))}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">ZIP Code</label>
                      <input
                        type="text"
                        value={interest.zip_code}
                        onChange={e => setInterest(s => ({ ...s, zip_code: e.target.value }))}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                        placeholder="30281"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Child's Rising Grade</label>
                    <select
                      value={interest.child_grade}
                      onChange={e => setInterest(s => ({ ...s, child_grade: e.target.value }))}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition bg-white"
                    >
                      <option value="">Select a grade</option>
                      {grades.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Questions or Comments</label>
                    <textarea
                      rows={3}
                      value={interest.questions}
                      onChange={e => setInterest(s => ({ ...s, questions: e.target.value }))}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition resize-none"
                      placeholder="Anything you'd like us to know…"
                    />
                  </div>
                  {iError && (
                    <div className="flex items-center gap-2 text-error-700 bg-error-50 rounded-xl px-4 py-3 text-sm border border-red-100">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" /> {iError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={iSubmitting}
                    className="w-full py-4 bg-brand-700 hover:bg-brand-800 disabled:bg-brand-400 text-white font-semibold rounded-xl transition-colors text-sm"
                  >
                    {iSubmitting ? 'Sending…' : 'Join the Interest List'}
                  </button>
                  <p className="text-xs text-neutral-400 text-center">Your information is kept private and never shared.</p>
                </form>
              )}
            </div>
          )}

          {/* Visit form */}
          {activeTab === 'visit' && (
            <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">Book a Visit</h2>
              <p className="text-neutral-500 text-sm mb-7">Let us know when works for you and Monique's team will reach out to confirm.</p>

              {vDone ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle className="w-14 h-14 text-success-500" />
                  <h3 className="font-display font-bold text-2xl text-neutral-900">Visit request received!</h3>
                  <p className="text-neutral-600 max-w-sm">Thank you for your interest in visiting Bridges Academy. We'll be in touch shortly to confirm your visit.</p>
                  <button onClick={() => setVDone(false)} className="mt-4 text-brand-700 text-sm font-medium hover:underline">Submit another request</button>
                </div>
              ) : (
                <form onSubmit={submitVisit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Your Name <span className="text-coral-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={visit.parent_name}
                        onChange={e => setVisit(s => ({ ...s, parent_name: e.target.value }))}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email <span className="text-coral-500">*</span></label>
                      <input
                        type="email"
                        required
                        value={visit.email}
                        onChange={e => setVisit(s => ({ ...s, email: e.target.value }))}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={visit.phone}
                      onChange={e => setVisit(s => ({ ...s, phone: e.target.value }))}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Preferred Date</label>
                      <input
                        type="date"
                        value={visit.preferred_date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setVisit(s => ({ ...s, preferred_date: e.target.value }))}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Preferred Time</label>
                      <select
                        value={visit.preferred_time}
                        onChange={e => setVisit(s => ({ ...s, preferred_time: e.target.value }))}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition bg-white"
                      >
                        <option value="">Any time</option>
                        {times.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Number of Children Attending</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={visit.children_count}
                      onChange={e => setVisit(s => ({ ...s, children_count: parseInt(e.target.value) || 1 }))}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                    />
                  </div>
                  {vError && (
                    <div className="flex items-center gap-2 text-error-700 bg-error-50 rounded-xl px-4 py-3 text-sm border border-red-100">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" /> {vError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={vSubmitting}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold rounded-xl transition-colors text-sm"
                  >
                    {vSubmitting ? 'Sending…' : 'Request a Visit'}
                  </button>
                  <p className="text-xs text-neutral-400 text-center">We'll confirm your visit by email or phone.</p>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-neutral-900 mb-8 text-center">The basics.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: 'Grades', value: 'K–3', note: 'Kindergarten through 3rd grade' },
              { label: 'Opening', value: 'Aug 2027', note: 'Stockbridge area, Henry County, GA' },
              { label: 'Tuition', value: 'TBA', note: 'Details to be announced' },
              { label: 'Class Size', value: 'Small', note: 'Small groups for personalized learning' },
            ].map((f) => (
              <div key={f.label} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 text-center">
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-2">{f.label}</p>
                <p className="font-display font-bold text-3xl text-brand-700 mb-1">{f.value}</p>
                <p className="text-neutral-500 text-xs leading-snug">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="font-display font-bold text-4xl text-neutral-900 mt-3">Common questions.</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-semibold text-neutral-900 text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-neutral-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 bg-brand-50 rounded-2xl p-6 border border-brand-100 text-center">
            <p className="text-brand-800 font-medium mb-3">Have a question that's not here?</p>
            <button onClick={() => nav('involved')} className="text-brand-700 font-semibold text-sm hover:underline">
              Get in touch on the Contact page
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
