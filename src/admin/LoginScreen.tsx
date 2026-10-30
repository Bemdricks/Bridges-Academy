import { FormEvent, useState } from 'react';
import { AUTH_ERROR_KEY, supabase } from '@/lib/supabase';
import logo from '@/images/logo.png';

interface LoginScreenProps {
  notice?: string;
}

export default function LoginScreen({ notice = '' }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(() => {
    const stored = sessionStorage.getItem(AUTH_ERROR_KEY) ?? '';
    if (stored) sessionStorage.removeItem(AUTH_ERROR_KEY);
    return stored;
  });
  const [message, setMessage] = useState(notice);
  const [submitting, setSubmitting] = useState(false);
  const [sendingLink, setSendingLink] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (!supabase) {
      setError('The site is not connected to its database yet.');
      return;
    }
    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);
    if (signInError) setError(signInError.message);
  };

  const sendReset = async () => {
    setError('');
    setMessage('');
    if (!email.trim()) {
      setError('Enter your email first, then request the link.');
      return;
    }
    if (!supabase) {
      setError('The site is not connected to its database yet.');
      return;
    }
    setSendingLink(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin`,
    });
    setSendingLink(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setMessage('Check your email for a link to choose a password.');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm px-8 py-10">
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="" className="h-16 w-auto" />
          </div>
          <h1 className="font-display font-bold text-3xl text-neutral-900">Staff sign in</h1>
          <p className="text-neutral-600 text-sm mt-2 mb-8">
            Review interest lists, visit requests, meeting RSVPs, and partnership notes.
          </p>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label htmlFor="staff-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email
              </label>
              <input
                id="staff-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div>
              <label htmlFor="staff-password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Password
              </label>
              <input
                id="staff-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            {error && (
              <p className="text-sm text-error-700 bg-error-50 border border-red-100 rounded-xl px-4 py-3" role="alert">
                {error}
              </p>
            )}
            {(message || notice) && !error && (
              <p className="text-sm text-brand-800 bg-brand-50 border border-brand-100 rounded-xl px-4 py-3">
                {message || notice}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-brand-800 hover:bg-brand-900 disabled:bg-brand-400 text-white font-semibold rounded-full transition-colors text-sm"
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
            <button
              type="button"
              onClick={sendReset}
              disabled={sendingLink}
              className="w-full text-sm text-brand-700 hover:underline disabled:text-neutral-400"
            >
              {sendingLink ? 'Sending…' : 'Email me a link to set my password'}
            </button>
          </form>
        </div>
        <p className="text-center mt-6">
          <a href="/" className="text-sm text-brand-700 hover:underline">Back to the website</a>
        </p>
      </div>
    </div>
  );
}
