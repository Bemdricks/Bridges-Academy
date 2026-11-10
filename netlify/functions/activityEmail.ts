import { fieldValue, submissionName, type Inbox, type Submission } from '../../src/admin/inboxes';

export const ACTIVITY_WINDOW_MS = 15 * 60 * 1000;

const notices: Record<Inbox['id'], string> = {
  interest: 'interest list signup',
  visit: 'visit request',
  rsvp: 'meeting RSVP',
  partner: 'partner inquiry',
  team: 'team application',
};

export function findPendingRow(rows: Submission[], now = Date.now(), windowMs = ACTIVITY_WINDOW_MS) {
  const cutoff = now - windowMs;
  return rows.find((row) => {
    const created = new Date(row.created_at).getTime();
    return Number.isFinite(created) && created >= cutoff && !row.notified_at;
  }) ?? null;
}

export function activityMessage(inbox: Inbox, row: Submission, dashboardUrl: string) {
  const who = oneLine(submissionName(row, inbox));
  const notice = notices[inbox.id];
  const lines = inbox.fields.map((field) => fieldLine(field, row));

  return {
    subject: `New ${notice}: ${who}`,
    replyTo: row.email,
    text: [
      `A new ${notice} is on the Carmel Academy dashboard.`,
      '',
      ...lines,
      '',
      `Open the dashboard: ${dashboardUrl}`,
    ].join('\n'),
  };
}

function fieldLine(field: Inbox['fields'][number], row: Submission) {
  if (field.key === 'resume_path') {
    return `Resume: ${fieldValue(row, field.key) ? 'Uploaded' : 'None'}`;
  }
  const value = fieldValue(row, field.key) || '—';
  if (field.long) return `${field.label}:\n${value}`;
  return `${field.label}: ${oneLine(value)}`;
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}
