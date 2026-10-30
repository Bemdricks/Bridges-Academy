import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AUTH_ERROR_KEY, SET_PASSWORD_KEY, supabase } from '@/lib/supabase';
import { checkStaff, type StaffAccess } from '@/admin/api';
import LoginScreen from '@/admin/LoginScreen';
import SetPasswordScreen from '@/admin/SetPasswordScreen';
import Dashboard from '@/admin/Dashboard';

const SITE_TITLE = 'Carmel Academy – Built to Belong. Built to Become.';

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [access, setAccess] = useState<StaffAccess | 'unknown'>('unknown');
  const [accessMessage, setAccessMessage] = useState('');
  const [choosePassword, setChoosePassword] = useState(() => sessionStorage.getItem(SET_PASSWORD_KEY) === '1');
  const [linkNotice, setLinkNotice] = useState('');

  useEffect(() => {
    document.title = 'Staff · Carmel Academy';
    return () => {
      document.title = SITE_TITLE;
    };
  }, []);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next);
      if (event === 'PASSWORD_RECOVERY') {
        sessionStorage.setItem(SET_PASSWORD_KEY, '1');
        setChoosePassword(true);
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setAccess('unknown');
      return;
    }
    let cancelled = false;
    checkStaff(session.user.id).then((result) => {
      if (cancelled) return;
      setAccess(result.access);
      setAccessMessage(result.message ?? '');
    });
    return () => {
      cancelled = true;
    };
  }, [session]);

  useEffect(() => {
    if (!ready || !window.location.hash) return;
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    if (hash.has('access_token') || hash.has('error_description') || hash.get('type')) {
      window.history.replaceState(null, '', '/admin');
    }
  }, [ready]);

  useEffect(() => {
    if (!ready || session || !choosePassword) return;
    sessionStorage.removeItem(SET_PASSWORD_KEY);
    const expired = 'That link has expired or was already used. Ask for a new invite, or sign in if you already set a password.';
    sessionStorage.setItem(AUTH_ERROR_KEY, expired);
    setChoosePassword(false);
    setLinkNotice(expired);
  }, [ready, session, choosePassword]);

  const signOut = async () => {
    sessionStorage.removeItem(SET_PASSWORD_KEY);
    setChoosePassword(false);
    await supabase?.auth.signOut();
  };

  const finishPasswordSetup = () => {
    sessionStorage.removeItem(SET_PASSWORD_KEY);
    setChoosePassword(false);
  };

  if (!ready || (session && access === 'unknown' && !choosePassword)) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center text-sm text-neutral-500">
        Loading staff tools…
      </div>
    );
  }

  if (choosePassword && session) {
    return (
      <SetPasswordScreen
        email={session.user.email ?? ''}
        onDone={finishPasswordSetup}
        onSignOut={signOut}
      />
    );
  }

  if (!session) return <LoginScreen notice={linkNotice} />;

  if (access !== 'ok') {
    return (
      <AccessGate
        email={session.user.email ?? ''}
        userId={session.user.id}
        access={access === 'setup' ? 'setup' : 'denied'}
        message={accessMessage}
        onSignOut={signOut}
      />
    );
  }

  return <Dashboard email={session.user.email ?? ''} onSignOut={signOut} />;
}

function AccessGate({
  email,
  userId,
  access,
  message,
  onSignOut,
}: {
  email: string;
  userId: string;
  access: 'setup' | 'denied';
  message: string;
  onSignOut: () => void;
}) {
  const grantSql = `insert into public.admin_users (user_id)\nselect id from auth.users where email = '${email.replace(/'/g, "''")}'\non conflict do nothing;`;

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-white border border-neutral-200 rounded-3xl shadow-sm px-8 py-10">
        <p className="text-brand-600 font-semibold text-xs uppercase tracking-widest">Staff</p>
        <h1 className="font-display font-bold text-3xl text-neutral-900 mt-2">
          {access === 'setup' ? 'Staff access is not set up yet' : 'This login is not on the staff list'}
        </h1>
        {access === 'setup' ? (
          <p className="text-neutral-600 text-sm mt-4 leading-relaxed">
            Run <span className="font-medium text-neutral-800">supabase/migrations/20261027121700_admin_dashboard.sql</span> in the Supabase SQL editor, create a staff user under Authentication, and turn off public sign-ups.
          </p>
        ) : (
          <p className="text-neutral-600 text-sm mt-4 leading-relaxed">
            Signed in as {email}. Add this account in the Supabase SQL editor, then sign in again.
          </p>
        )}
        {access === 'denied' && (
          <pre className="mt-4 text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-4 overflow-x-auto text-neutral-700">{grantSql}</pre>
        )}
        {message && <p className="text-sm text-error-700 mt-4">{message}</p>}
        <p className="text-xs text-neutral-400 mt-4 break-all">User id: {userId}</p>
        <div className="mt-6 flex items-center gap-4">
          <button type="button" onClick={onSignOut} className="px-5 py-2.5 rounded-full bg-brand-800 text-white text-sm font-semibold">
            Sign out
          </button>
          <a href="/" className="text-sm text-brand-700 hover:underline">Back to the website</a>
        </div>
      </div>
    </div>
  );
}
