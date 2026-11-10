import { createClient } from '@supabase/supabase-js';
import { inboxes, type Submission } from '../../src/admin/inboxes';
import { activityMessage, findPendingRow } from './activityEmail';

interface NoticeBody {
  table?: unknown;
  email?: unknown;
  name?: unknown;
}

export default async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (req.method !== 'POST') return json({ ok: false }, 405);

  let payload: NoticeBody;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false }, 400);
  }

  const inbox = inboxes.find((item) => item.table === payload.table);
  const email = typeof payload.email === 'string' ? payload.email : '';
  const name = typeof payload.name === 'string' ? payload.name : '';
  if (!inbox || !email.trim() || !name.trim()) return json({ ok: false }, 400);

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!supabaseUrl || !serviceKey || !resendKey) return json({ ok: false, reason: 'not-configured' }, 503);

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from(inbox.table)
    .select('*')
    .eq('email', email)
    .eq(inbox.nameKey, name)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error || !data?.length) return json({ ok: false }, 404);

  const row = findPendingRow(data as Submission[]);
  if (!row) return json({ ok: true, skipped: true });

  const { data: claimed, error: claimError } = await supabase
    .from(inbox.table)
    .update({ notified_at: new Date().toISOString() })
    .eq('id', row.id)
    .is('notified_at', null)
    .select('id');

  const columnMissing = Boolean(claimError && /notified_at/i.test(claimError.message));
  if (!columnMissing && (claimError || !claimed?.length)) return json({ ok: true, skipped: true });

  const dashboardUrl = `${new URL(req.url).origin}/admin`;
  const message = activityMessage(inbox, row, dashboardUrl);
  const sent = await sendEmail(resendKey, message);
  if (!sent) {
    if (!columnMissing) {
      await supabase.from(inbox.table).update({ notified_at: null }).eq('id', row.id);
    }
    return json({ ok: false }, 502);
  }

  return json({ ok: true });
};

async function sendEmail(apiKey: string, message: { subject: string; text: string; replyTo: string }) {
  const to = (process.env.NOTIFY_EMAIL || 'info@carmelacademy.school')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const from = process.env.NOTIFY_FROM || 'Carmel Academy <info@carmelacademy.school>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: message.replyTo,
        subject: message.subject,
        text: message.text,
      }),
    });
    if (!response.ok) {
      console.error('Activity email failed', response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Activity email failed', error);
    return false;
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
