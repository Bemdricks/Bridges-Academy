export type InboxId = 'interest' | 'visit' | 'rsvp' | 'partner' | 'team';
export type SubmissionStatus = 'new' | 'contacted' | 'archived';

export interface InboxField {
  key: string;
  label: string;
  long?: boolean;
}

export interface Inbox {
  id: InboxId;
  table: string;
  label: string;
  description: string;
  nameKey: 'parent_name' | 'name';
  fields: InboxField[];
}

export const inboxes: Inbox[] = [
  {
    id: 'interest',
    table: 'interest_submissions',
    label: 'Interest list',
    description: 'Families who want enrollment updates',
    nameKey: 'parent_name',
    fields: [
      { key: 'parent_name', label: 'Parent / guardian' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'zip_code', label: 'ZIP code' },
      { key: 'child_grade', label: 'Rising grade' },
      { key: 'questions', label: 'Questions', long: true },
    ],
  },
  {
    id: 'visit',
    table: 'visit_bookings',
    label: 'Visit requests',
    description: 'Families who asked to tour the school',
    nameKey: 'parent_name',
    fields: [
      { key: 'parent_name', label: 'Parent / guardian' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'preferred_date', label: 'Preferred date' },
      { key: 'preferred_time', label: 'Preferred time' },
      { key: 'children_count', label: 'Children' },
    ],
  },
  {
    id: 'rsvp',
    table: 'rsvp_submissions',
    label: 'Meeting RSVPs',
    description: 'Families coming to the interest meeting',
    nameKey: 'name',
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'guests_count', label: 'Guests' },
    ],
  },
  {
    id: 'partner',
    table: 'partner_submissions',
    label: 'Partners',
    description: 'Businesses, trades, and mentors',
    nameKey: 'name',
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'organization', label: 'Organization' },
      { key: 'role_type', label: 'How they can help' },
      { key: 'message', label: 'Message', long: true },
    ],
  },
  {
    id: 'team',
    table: 'team_interest_submissions',
    label: 'Team interest',
    description: 'People who want to join the staff',
    nameKey: 'name',
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role_interest', label: 'Role' },
      { key: 'message', label: 'Message', long: true },
    ],
  },
];

export interface Submission {
  id: string;
  created_at: string;
  email: string;
  status?: string | null;
  notes?: string | null;
  parent_name?: string | null;
  name?: string | null;
  phone?: string | null;
  zip_code?: string | null;
  child_grade?: string | null;
  questions?: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
  children_count?: number | null;
  guests_count?: number | null;
  organization?: string | null;
  role_type?: string | null;
  role_interest?: string | null;
  message?: string | null;
}

export const statuses: { id: SubmissionStatus; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'archived', label: 'Archived' },
];

export function submissionName(row: Submission, inbox: Inbox) {
  const value = row[inbox.nameKey];
  return value?.trim() || 'Untitled';
}

export function submissionStatus(row: Submission): SubmissionStatus {
  if (row.status === 'contacted' || row.status === 'archived') return row.status;
  return 'new';
}

export function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function fieldValue(row: Submission, key: string) {
  const value = row[key as keyof Submission];
  if (value == null || value === '') return '';
  return String(value);
}
