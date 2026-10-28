import { supabase } from '@/lib/supabase';
import { inboxes, type InboxId, type Submission, type SubmissionStatus } from '@/admin/inboxes';

export type StaffAccess = 'ok' | 'denied' | 'setup';

export async function checkStaff(userId: string): Promise<{ access: StaffAccess; message?: string }> {
  if (!supabase) return { access: 'setup', message: 'The site is not connected to its database yet.' };

  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    const missing = error.code === '42P01' || error.code === 'PGRST205' || /admin_users/i.test(error.message);
    if (missing) return { access: 'setup' };
    return { access: 'setup', message: error.message };
  }

  if (!data) return { access: 'denied' };
  return { access: 'ok' };
}

export async function loadInboxes(): Promise<Record<InboxId, { rows: Submission[]; error: string | null }>> {
  const client = supabase;
  if (!client) return blankInboxes('Database is not connected.');

  const loaded = blankInboxes(null);
  await Promise.all(
    inboxes.map(async (inbox) => {
      const { data, error } = await client
        .from(inbox.table)
        .select('*')
        .order('created_at', { ascending: false });
      loaded[inbox.id] = { rows: (data ?? []) as Submission[], error: error?.message ?? null };
    }),
  );

  return loaded;
}

function blankInboxes(error: string | null): Record<InboxId, { rows: Submission[]; error: string | null }> {
  return {
    interest: { rows: [], error },
    visit: { rows: [], error },
    rsvp: { rows: [], error },
    partner: { rows: [], error },
    team: { rows: [], error },
  };
}

export async function updateSubmission(
  table: string,
  id: string,
  patch: { status?: SubmissionStatus; notes?: string | null },
) {
  if (!supabase) throw new Error('Database is not connected.');
  const { error } = await supabase.from(table).update(patch).eq('id', id);
  if (error) throw new Error(error.message);
}
