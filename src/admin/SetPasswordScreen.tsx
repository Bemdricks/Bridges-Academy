import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabase';
import logo from '@/images/logo.png';

interface SetPasswordScreenProps {
  email: string;
  onDone: () => void;
  onSignOut: () => void;
}

export default function SetPasswordScreen({ email, onDone, onSignOut }: SetPasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Use at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Those passwords do not match.');
      return;
    }
    if (!supabase) {
      setError('The site is not connected to its database yet.');
      return;
    }
    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    onDone();
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm px-8 py-10">
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="" className="h-16 w-auto" />
          </div>
          <h1 className="font-display font-bold text-3xl text-neutral-900">Choose a password</h1>
          <p className="text-neutral-600 text-sm mt-2 mb-8">
            {email ? <>This password is only for {email}. </> : null}
            You will use it the next time you sign in. Nobody else needs to know it.
          </p>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Password
              </label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            {error && (
              <p className="text-sm text-error-700 bg-error-50 border border-red-100 rounded-xl px-4 py-3" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-brand-800 hover:bg-brand-900 disabled:bg-brand-400 text-white font-semibold rounded-full transition-colors text-sm"
            >
              {submitting ? 'Saving…' : 'Save password'}
            </button>
          </form>
        </div>
        <p className="text-center mt-6">
          <button type="button" onClick={onSignOut} className="text-sm text-brand-700 hover:underline">
            Sign out
          </button>
        </p>
      </div>
    </div>
  );
}
