import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, '').replace(/\/rest\/v1$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const SET_PASSWORD_KEY = 'carmel-set-password';
export const AUTH_ERROR_KEY = 'carmel-auth-error';

function redirectAuthCallbackToAdmin(): boolean {
  if (typeof window === 'undefined') return false;

  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const type = hash.get('type');
  const errorDescription = hash.get('error_description');
  const isCallback = type === 'invite' || type === 'recovery' || hash.has('access_token') || Boolean(errorDescription);
  if (!isCallback) return false;

  if (type === 'invite' || type === 'recovery') {
    sessionStorage.setItem(SET_PASSWORD_KEY, '1');
  }
  if (errorDescription) {
    sessionStorage.setItem(AUTH_ERROR_KEY, errorDescription);
  }

  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/admin') return false;

  document.documentElement.style.visibility = 'hidden';
  window.location.replace('/admin' + window.location.search + window.location.hash);
  return true;
}

const redirecting = redirectAuthCallbackToAdmin();

export const supabase: SupabaseClient | null =
  !redirecting && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
