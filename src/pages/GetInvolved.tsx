import { useState } from 'react';
import { CheckCircle, AlertCircle, Calendar, Users, Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Page = 'home' | 'approach' | 'story' | 'families' | 'beyond' | 'involved';
interface Props { onNavigate: (page: Page) => void; }

type TabId = 'rsvp' | 'partner' | 'team' | 'contact';

interface RsvpForm { name: string; email: string; phone: string; guests_count: number; }
interface PartnerForm { name: string; email: string; organization: string; role_type: string; message: string; }
interface TeamForm { name: string; email: string; role_interest: string; message: string; }

const roleTypes = ['Business / Employer', 'Tradesperson', 'Mentor / Coach', 'Community Organization', 'Other'];
const teachRoles = ['Lead Teacher', 'Assistant Teacher', 'Administrator', 'Counselor / Support', 'Other'];

export default function GetInvolved({ onNavigate }: Props) {
  const nav = (page: Page) => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const [activeTab, setActiveTab] = useState<TabId>('rsvp');

  const [rsvp, setRsvp] = useState<RsvpForm>({ name: '', email: '', phone: '', guests_count: 1 });
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpDone, setRsvpDone] = useState(false);
  const [rsvpError, setRsvpError] = useState('');

  const [partner, setPartner] = useState<PartnerForm>({ name: '', email: '', organization: '', role_type: '', message: '' });
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [partnerDone, setPartnerDone] = useState(false);
  const [partnerError, setPartnerError] = useState('');

  const [team, setTeam] = useState<TeamForm>({ name: '', email: '', role_interest: '', message: '' });
  const [teamSubmitting, setTeamSubmitting] = useState(false);
  const [teamDone, setTeamDone] = useState(false);
  const [teamError, setTeamError] = useState('');

  const submitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitting(true);
    setRsvpError('');
    if (!supabase) { setRsvpSubmitting(false); setRsvpError('Something went wrong. Please try again.'); return; }
    const { error } = await supabase.from('rsvp_submissions').insert({
      name: rsvp.name, email: rsvp.email,
      phone: rsvp.phone || null, guests_count: rsvp.guests_count,
    });
    setRsvpSubmitting(false);
    if (error) { setRsvpError('Something went wrong. Please try again.'); return; }
    setRsvpDone(true);
  };

  const submitPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSubmitting(true);
    setPartnerError('');
    if (!supabase) { setPartnerSubmitting(false); setPartnerError('Something went wrong. Please try again.'); return; }
    const { error } = await supabase.from('partner_submissions').insert({
      name: partner.name, email: partner.email,
      organization: partner.organization || null,
      role_type: partner.role_type || null,
      message: partner.message || null,
    });
    setPartnerSubmitting(false);
    if (error) { setPartnerError('Something went wrong. Please try again.'); return; }
    setPartnerDone(true);
  };

  const submitTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeamSubmitting(true);
    setTeamError('');
    if (!supabase) { setTeamSubmitting(false); setTeamError('Something went wrong. Please try again.'); return; }
    const { error } = await supabase.from('team_interest_submissions').insert({
      name: team.name, email: team.email,
      role_interest: team.role_interest || null,
      message: team.message || null,
    });
    setTeamSubmitting(false);
    if (error) { setTeamError('Something went wrong. Please try again.'); return; }
    setTeamDone(true);
  };

  const tabs: { id: TabId; label: string; icon: React.ElementType; short: string }[] = [
    { id: 'rsvp', label: 'Interest Meeting RSVP', icon: Calendar, short: 'RSVP' },
    { id: 'partner', label: 'Partner With Us', icon: Briefcase, short: 'Partner' },
    { id: 'team', label: 'Join Our Team', icon: Users, short: 'Join Team' },
    { id: 'contact', label: 'Contact', icon: Mail, short: 'Contact' },
  ];

  const inputClass = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition";
  const labelClass = "block text-sm font-medium text-neutral-700 mb-1.5";

  const SuccessCard = ({ headline, sub, onReset }: { headline: string; sub: string; onReset: () => void }) => (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <CheckCircle className="w-14 h-14 text-success-500" />
      <h3 className="font-display font-bold text-2xl text-neutral-900">{headline}</h3>
      <p className="text-neutral-600 max-w-sm text-sm leading-relaxed">{sub}</p>
      <button onClick={onReset} className="mt-3 text-brand-700 text-sm font-medium hover:underline">Submit another response</button>
    </div>
  );

  const ErrorMsg = ({ msg }: { msg: string }) => (
    <div className="flex items-center gap-2 text-error-700 bg-error-50 rounded-xl px-4 py-3 text-sm border border-red-100">
      <AlertCircle className="w-4 h-4 flex-shrink-0" /> {msg}
    </div>
  );

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-4 border-white" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border-2 border-white" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 border border-white/30">Get Involved</span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white mb-5">Be part of building something.</h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed">
            Bridges Academy is being built by a community that believes every child deserves more. Whether you're a family, a partner, or a future team member — there's a place for you here.
          </p>
        </div>
      </section>

      {/* Meeting banner */}
      <section className="py-14 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100 text-center md:text-left md:flex md:items-center md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <Calendar className="w-5 h-5 text-brand-600" />
                <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Free Interest Meeting</span>
              </div>
              <h2 className="font-display font-bold text-3xl text-neutral-900 mb-2">Come hear our story.</h2>
              <p className="text-neutral-600">
                December 2026 &mdash; date and location to be announced. Free and open to all families. 6 p.m.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('rsvp')}
              className="flex-shrink-0 mt-5 md:mt-0 px-7 py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-full transition-colors text-sm inline-flex items-center gap-2 mx-auto md:mx-0"
            >
              Reserve Your Spot
            </button>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab bar */}
          <div className="flex gap-2 mb-10 bg-white rounded-2xl p-2 border border-neutral-100 shadow-sm overflow-x-auto">
            {tabs.map(({ id, short, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === id ? 'bg-brand-700 text-white shadow-sm' : 'text-neutral-600 hover:text-brand-700'
                }`}
              >
                <Icon className="w-4 h-4" />{short}
              </button>
            ))}
          </div>

          {/* RSVP */}
          {activeTab === 'rsvp' && (
            <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">Reserve Your Spot</h2>
              <p className="text-neutral-500 text-sm mb-7">Secure your place at the free December interest meeting. Date and location will be confirmed soon.</p>
              {rsvpDone ? (
                <SuccessCard headline="You're reserved!" sub="We'll send you details about the date, time, and location as soon as they're confirmed. See you there!" onReset={() => setRsvpDone(false)} />
              ) : (
                <form onSubmit={submitRsvp} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Your Name <span className="text-error-500">*</span></label>
                      <input type="text" required className={inputClass} placeholder="Your full name" value={rsvp.name} onChange={e => setRsvp(s => ({ ...s, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelClass}>Email <span className="text-error-500">*</span></label>
                      <input type="email" required className={inputClass} placeholder="you@example.com" value={rsvp.email} onChange={e => setRsvp(s => ({ ...s, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input type="tel" className={inputClass} placeholder="(555) 000-0000" value={rsvp.phone} onChange={e => setRsvp(s => ({ ...s, phone: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelClass}>Guests (including you)</label>
                      <input type="number" min={1} max={20} className={inputClass} value={rsvp.guests_count} onChange={e => setRsvp(s => ({ ...s, guests_count: parseInt(e.target.value) || 1 }))} />
                    </div>
                  </div>
                  {rsvpError && <ErrorMsg msg={rsvpError} />}
                  <button type="submit" disabled={rsvpSubmitting} className="w-full py-4 bg-brand-700 hover:bg-brand-800 disabled:bg-brand-400 text-white font-semibold rounded-xl transition-colors text-sm">
                    {rsvpSubmitting ? 'Sending…' : 'Reserve My Spot'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Partner */}
          {activeTab === 'partner' && (
            <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">Partner With Bridges</h2>
              <p className="text-neutral-500 text-sm mb-7">Bring your expertise into the classroom. Help students see what's possible. Tell us about yourself and we'll be in touch.</p>
              {partnerDone ? (
                <SuccessCard headline="Thank you for reaching out!" sub="We're excited to connect. Monique's team will be in touch about how you can be part of the real-world experience program." onReset={() => setPartnerDone(false)} />
              ) : (
                <form onSubmit={submitPartner} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Your Name <span className="text-error-500">*</span></label>
                      <input type="text" required className={inputClass} placeholder="Your full name" value={partner.name} onChange={e => setPartner(s => ({ ...s, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelClass}>Email <span className="text-error-500">*</span></label>
                      <input type="email" required className={inputClass} placeholder="you@example.com" value={partner.email} onChange={e => setPartner(s => ({ ...s, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Organization / Business</label>
                    <input type="text" className={inputClass} placeholder="Your company or organization" value={partner.organization} onChange={e => setPartner(s => ({ ...s, organization: e.target.value }))} />
                  </div>
                  <div>
                    <label className={labelClass}>How you'd like to be involved</label>
                    <select className={`${inputClass} bg-white`} value={partner.role_type} onChange={e => setPartner(s => ({ ...s, role_type: e.target.value }))}>
                      <option value="">Select a role</option>
                      {roleTypes.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Tell us more (optional)</label>
                    <textarea rows={3} className={`${inputClass} resize-none`} placeholder="What you do, what you'd like to share with students, any questions…" value={partner.message} onChange={e => setPartner(s => ({ ...s, message: e.target.value }))} />
                  </div>
                  {partnerError && <ErrorMsg msg={partnerError} />}
                  <button type="submit" disabled={partnerSubmitting} className="w-full py-4 bg-brand-700 hover:bg-brand-800 disabled:bg-brand-400 text-white font-semibold rounded-xl transition-colors text-sm">
                    {partnerSubmitting ? 'Sending…' : 'Partner With Bridges'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Team */}
          {activeTab === 'team' && (
            <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">Join Our Team</h2>
              <p className="text-neutral-500 text-sm mb-7">Bridges Academy is looking for educators who believe every child can thrive. Tell us about yourself — we'll be in touch as hiring begins.</p>
              {teamDone ? (
                <SuccessCard headline="We'd love to connect!" sub="Thank you for your interest in joining the Bridges Academy team. We'll be in touch as our hiring process begins ahead of the August 2027 opening." onReset={() => setTeamDone(false)} />
              ) : (
                <form onSubmit={submitTeam} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Your Name <span className="text-error-500">*</span></label>
                      <input type="text" required className={inputClass} placeholder="Your full name" value={team.name} onChange={e => setTeam(s => ({ ...s, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelClass}>Email <span className="text-error-500">*</span></label>
                      <input type="email" required className={inputClass} placeholder="you@example.com" value={team.email} onChange={e => setTeam(s => ({ ...s, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Role you're interested in</label>
                    <select className={`${inputClass} bg-white`} value={team.role_interest} onChange={e => setTeam(s => ({ ...s, role_interest: e.target.value }))}>
                      <option value="">Select a role</option>
                      {teachRoles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Tell us about yourself (optional)</label>
                    <textarea rows={4} className={`${inputClass} resize-none`} placeholder="Your background, what draws you to Bridges Academy, what you'd bring to the team…" value={team.message} onChange={e => setTeam(s => ({ ...s, message: e.target.value }))} />
                  </div>
                  {teamError && <ErrorMsg msg={teamError} />}
                  <button type="submit" disabled={teamSubmitting} className="w-full py-4 bg-brand-700 hover:bg-brand-800 disabled:bg-brand-400 text-white font-semibold rounded-xl transition-colors text-sm">
                    {teamSubmitting ? 'Sending…' : 'Express My Interest'}
                  </button>
                  <p className="text-xs text-neutral-400 text-center">Hiring begins ahead of the August 2027 opening.</p>
                </form>
              )}
            </div>
          )}

          {/* Contact */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">Get in Touch</h2>
              <p className="text-neutral-500 text-sm mb-8">Have a question not answered on the site? We'd love to hear from you.</p>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: 'info@bridgesacademy.org', type: 'email' },
                  { icon: Phone, label: 'Phone', value: 'Coming soon', type: 'text' },
                  { icon: MapPin, label: 'Location', value: 'Stockbridge area, Henry County, Georgia', type: 'text' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                      <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-brand-600" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-0.5">{item.label}</p>
                        <p className="text-neutral-800 text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 bg-brand-50 rounded-xl p-5 border border-brand-100">
                <p className="text-brand-800 text-sm font-semibold mb-2">Looking for something specific?</p>
                <p className="text-brand-700 text-sm">
                  For the interest list and visit booking, visit <button onClick={() => nav('families')} className="underline font-medium">Families</button>. For the December meeting RSVP, use the RSVP tab above.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
