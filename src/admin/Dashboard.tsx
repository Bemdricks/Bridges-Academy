import { useEffect, useMemo, useState } from 'react';
import {
  Briefcase,
  Calendar,
  CalendarCheck,
  Download,
  LayoutDashboard,
  LogOut,
  Quote,
  Search,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import logo from '@/images/logo-white.png';
import { supabase } from '@/lib/supabase';
import { loadInboxes, updateSubmission } from '@/admin/api';
import TestimonialsManager from '@/admin/TestimonialsManager';
import {
  fieldValue,
  formatWhen,
  inboxes,
  statuses,
  submissionName,
  submissionStatus,
  type Inbox,
  type InboxId,
  type Submission,
  type SubmissionStatus,
} from '@/admin/inboxes';

const icons = {
  interest: UserPlus,
  visit: CalendarCheck,
  rsvp: Calendar,
  partner: Briefcase,
  team: Users,
} as const;

interface DashboardProps {
  email: string;
  onSignOut: () => void;
}

type InboxData = Record<InboxId, { rows: Submission[]; error: string | null }>;

const emptyData: InboxData = {
  interest: { rows: [], error: null },
  visit: { rows: [], error: null },
  rsvp: { rows: [], error: null },
  partner: { rows: [], error: null },
  team: { rows: [], error: null },
};

export default function Dashboard({ email, onSignOut }: DashboardProps) {
  const [data, setData] = useState<InboxData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<InboxId | 'overview' | 'testimonials'>('overview');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'all'>('all');
  const [noteDraft, setNoteDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [panelError, setPanelError] = useState('');

  const refresh = async () => {
    setLoading(true);
    const next = await loadInboxes();
    setData(next);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const inbox = inboxes.find((item) => item.id === view) ?? null;
  const rows = inbox ? data[inbox.id].rows : [];
  const selected = rows.find((row) => row.id === selectedId) ?? null;

  useEffect(() => {
    setNoteDraft(selected?.notes ?? '');
    setPanelError('');
  }, [selected?.id, selected?.notes]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (statusFilter !== 'all' && submissionStatus(row) !== statusFilter) return false;
      if (!needle || !inbox) return true;
      const haystack = [submissionName(row, inbox), row.email, row.notes, ...inbox.fields.map((field) => fieldValue(row, field.key))]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [rows, query, statusFilter, inbox]);

  const openInbox = (id: InboxId, rowId?: string) => {
    setView(id);
    setSelectedId(rowId ?? null);
    setQuery('');
    setStatusFilter('all');
  };

  const savePatch = async (row: Submission, current: Inbox, patch: { status?: SubmissionStatus; notes?: string | null }) => {
    setSaving(true);
    setPanelError('');
    try {
      await updateSubmission(current.table, row.id, patch);
      setData((prev) => ({
        ...prev,
        [current.id]: {
          ...prev[current.id],
          rows: prev[current.id].rows.map((item) => (item.id === row.id ? { ...item, ...patch } : item)),
        },
      }));
    } catch (error) {
      setPanelError(error instanceof Error ? error.message : 'Could not save this change.');
    } finally {
      setSaving(false);
    }
  };

  const recent = inboxes
    .flatMap((item) => data[item.id].rows.map((row) => ({ row, inbox: item })))
    .sort((a, b) => +new Date(b.row.created_at) - +new Date(a.row.created_at))
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-neutral-50 lg:flex">
      <aside className="bg-brand-900 text-white lg:w-64 lg:min-h-screen lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col">
        <div className="flex items-center justify-between gap-3 px-4 py-4 lg:px-5 lg:py-6">
          <a href="/" className="flex items-center gap-3 min-w-0">
            <img src={logo} alt="" className="h-16 w-auto shrink-0" />
            
          </a>
          <button type="button" onClick={onSignOut} className="lg:hidden p-2 text-brand-100" aria-label="Sign out">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex lg:flex-col gap-1 overflow-x-auto px-3 pb-4 lg:px-3 lg:flex-1" aria-label="Staff sections">
          <SidebarButton active={view === 'overview'} onClick={() => { setView('overview'); setSelectedId(null); }} icon={LayoutDashboard} label="Overview" />
          <SidebarButton active={view === 'testimonials'} onClick={() => { setView('testimonials'); setSelectedId(null); }} icon={Quote} label="Testimonials" />
          {inboxes.map((item) => {
            const count = data[item.id].rows.filter((row) => submissionStatus(row) === 'new').length;
            return (
              <SidebarButton
                key={item.id}
                active={view === item.id}
                onClick={() => openInbox(item.id)}
                icon={icons[item.id]}
                label={item.label}
                count={count}
              />
            );
          })}
        </nav>
        <div className="hidden lg:block px-4 py-5 border-t border-white/10">
          <p className="text-xs text-brand-200 truncate" title={email}>{email}</p>
          <button type="button" onClick={onSignOut} className="mt-3 inline-flex items-center gap-2 text-sm text-white hover:text-amber-200">
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8">
        {view === 'overview' ? (
          <Overview loading={loading} data={data} recent={recent} onOpen={openInbox} onRefresh={refresh} />
        ) : view === 'testimonials' ? (
          <TestimonialsManager />
        ) : inbox && (
          <InboxView
            inbox={inbox}
            rows={filtered}
            total={rows.length}
            loading={loading}
            error={data[inbox.id].error}
            query={query}
            statusFilter={statusFilter}
            onQuery={setQuery}
            onStatus={setStatusFilter}
            onRefresh={refresh}
            onSelect={setSelectedId}
          />
        )}
      </main>

      {inbox && selected && (
        <DetailPanel
          inbox={inbox}
          row={selected}
          noteDraft={noteDraft}
          saving={saving}
          error={panelError}
          onNote={setNoteDraft}
          onClose={() => setSelectedId(null)}
          onStatus={(status) => savePatch(selected, inbox, { status })}
          onSaveNote={() => savePatch(selected, inbox, { notes: noteDraft.trim() || null })}
        />
      )}
    </div>
  );
}

function SidebarButton({
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof LayoutDashboard;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 lg:w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
        active ? 'bg-white/15 text-white' : 'text-brand-100 hover:bg-white/10'
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="flex-1 whitespace-nowrap">{label}</span>
      {count ? <span className="text-xs bg-amber-500 text-brand-900 font-semibold rounded-full min-w-5 h-5 px-1.5 inline-flex items-center justify-center">{count}</span> : null}
    </button>
  );
}

function Overview({
  loading,
  data,
  recent,
  onOpen,
  onRefresh,
}: {
  loading: boolean;
  data: InboxData;
  recent: { row: Submission; inbox: Inbox }[];
  onOpen: (id: InboxId, rowId?: string) => void;
  onRefresh: () => void;
}) {
  const newCount = inboxes.reduce((sum, inbox) => sum + data[inbox.id].rows.filter((row) => submissionStatus(row) === 'new').length, 0);

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-brand-600 font-semibold text-xs uppercase tracking-widest">Dashboard</p>
          <h1 className="font-display font-bold text-4xl text-neutral-900 mt-2">What needs a reply.</h1>
          <p className="text-neutral-600 mt-2">{loading ? 'Loading submissions…' : `${newCount} new ${newCount === 1 ? 'submission' : 'submissions'}`}</p>
        </div>
        <button type="button" onClick={onRefresh} className="text-sm font-medium text-brand-700 hover:underline">Refresh</button>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {inboxes.map((inbox) => {
          const rows = data[inbox.id].rows;
          const fresh = rows.filter((row) => submissionStatus(row) === 'new').length;
          const Icon = icons[inbox.id];
          return (
            <button
              key={inbox.id}
              type="button"
              onClick={() => onOpen(inbox.id)}
              className="text-left bg-white border border-neutral-200 rounded-2xl p-5 hover:border-brand-200 transition-colors"
            >
              <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 inline-flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <h2 className="font-display font-bold text-2xl text-neutral-900 mt-4">{inbox.label}</h2>
              <p className="text-sm text-neutral-500 mt-1">{inbox.description}</p>
              <p className="mt-4 text-sm">
                <span className="font-semibold text-neutral-900">{rows.length}</span>
                <span className="text-neutral-500"> total</span>
                <span className="text-neutral-300 mx-2">·</span>
                <span className="font-semibold text-amber-700">{fresh} new</span>
              </p>
              {data[inbox.id].error && <p className="text-xs text-error-700 mt-3">{data[inbox.id].error}</p>}
            </button>
          );
        })}
      </div>
      <section className="mt-10">
        <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">Latest</h2>
        {recent.length === 0 ? (
          <p className="text-neutral-500 text-sm bg-white border border-neutral-200 rounded-2xl px-5 py-8">No submissions yet.</p>
        ) : (
          <ul className="bg-white border border-neutral-200 rounded-2xl divide-y divide-neutral-100">
            {recent.map(({ row, inbox }) => (
              <li key={`${inbox.id}-${row.id}`}>
                <button type="button" onClick={() => onOpen(inbox.id, row.id)} className="w-full text-left px-5 py-4 hover:bg-neutral-50 flex items-center gap-4">
                  <StatusPill status={submissionStatus(row)} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-neutral-900 truncate">{submissionName(row, inbox)}</span>
                    <span className="block text-xs text-neutral-500 truncate">{inbox.label} · {row.email}</span>
                  </span>
                  <span className="text-xs text-neutral-400 shrink-0">{formatWhen(row.created_at)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function InboxView({
  inbox,
  rows,
  total,
  loading,
  error,
  query,
  statusFilter,
  onQuery,
  onStatus,
  onRefresh,
  onSelect,
}: {
  inbox: Inbox;
  rows: Submission[];
  total: number;
  loading: boolean;
  error: string | null;
  query: string;
  statusFilter: SubmissionStatus | 'all';
  onQuery: (value: string) => void;
  onStatus: (value: SubmissionStatus | 'all') => void;
  onRefresh: () => void;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-brand-600 font-semibold text-xs uppercase tracking-widest">Inbox</p>
          <h1 className="font-display font-bold text-4xl text-neutral-900 mt-2">{inbox.label}</h1>
          <p className="text-neutral-600 mt-2 text-sm">{inbox.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => downloadCsv(inbox, rows)} className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 border border-brand-200 rounded-full px-4 py-2 hover:bg-brand-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button type="button" onClick={onRefresh} className="text-sm font-medium text-brand-700 hover:underline">Refresh</button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
        <label className="relative flex-1">
          <span className="sr-only">Search {inbox.label}</span>
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search by name, email, or note"
            className="w-full border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </label>
        <div className="flex gap-2">
          <FilterChip active={statusFilter === 'all'} onClick={() => onStatus('all')} label="All" />
          {statuses.map((status) => (
            <FilterChip key={status.id} active={statusFilter === status.id} onClick={() => onStatus(status.id)} label={status.label} />
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-error-700 bg-error-50 border border-red-100 rounded-xl px-4 py-3 mb-4">{error}</p>}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Detail</th>
              <th className="px-4 py-3 font-medium">Submitted</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <button type="button" onClick={() => onSelect(row.id)} className="font-medium text-brand-800 hover:underline text-left">
                    {submissionName(row, inbox)}
                  </button>
                </td>
                <td className="px-4 py-3 text-neutral-600">{row.email}</td>
                <td className="px-4 py-3 text-neutral-600 hidden md:table-cell">{previewDetail(inbox, row)}</td>
                <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">{formatWhen(row.created_at)}</td>
                <td className="px-4 py-3"><StatusPill status={submissionStatus(row)} /></td>
              </tr>
            ))}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-neutral-500">
                  {total === 0 ? 'No submissions yet.' : 'Nothing matches this search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DetailPanel({
  inbox,
  row,
  noteDraft,
  saving,
  error,
  onNote,
  onClose,
  onStatus,
  onSaveNote,
}: {
  inbox: Inbox;
  row: Submission;
  noteDraft: string;
  saving: boolean;
  error: string;
  onNote: (value: string) => void;
  onClose: () => void;
  onStatus: (status: SubmissionStatus) => void;
  onSaveNote: () => void;
}) {
  const status = submissionStatus(row);
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-brand-900/40" onClick={onClose}>
      <aside
        className="w-full max-w-md h-full bg-white shadow-xl overflow-y-auto"
        role="dialog"
        aria-label={submissionName(row, inbox)}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-neutral-100">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-600 font-semibold">{inbox.label}</p>
            <h2 className="font-display font-bold text-2xl text-neutral-900 mt-1">{submissionName(row, inbox)}</h2>
            <p className="text-xs text-neutral-500 mt-1">{formatWhen(row.created_at)}</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Close details">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="flex flex-wrap gap-2">
            {statuses.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={saving}
                onClick={() => onStatus(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  status === item.id ? 'bg-brand-800 text-white border-brand-800' : 'bg-white text-neutral-600 border-neutral-200 hover:border-brand-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <dl className="space-y-4">
            {inbox.fields.map((field) => {
              const value = fieldValue(row, field.key);
              return (
                <div key={field.key}>
                  <dt className="text-xs uppercase tracking-wide text-neutral-400">{field.label}</dt>
                  <dd className={`mt-1 text-sm text-neutral-800 ${field.long ? 'whitespace-pre-wrap leading-relaxed' : ''}`}>
                    {field.key === 'resume_path' ? (value ? <ResumeLink path={value} /> : '—') : null}
                    {field.key === 'email' && value ? <a className="text-brand-700 hover:underline" href={`mailto:${value}`}>{value}</a> : null}
                    {field.key === 'phone' && value ? <a className="text-brand-700 hover:underline" href={`tel:${value}`}>{value}</a> : null}
                    {field.key !== 'email' && field.key !== 'phone' && field.key !== 'resume_path' ? (value || '—') : null}
                    {(field.key === 'email' || field.key === 'phone') && !value ? '—' : null}
                  </dd>
                </div>
              );
            })}
          </dl>
          <div>
            <label htmlFor="staff-note" className="text-xs uppercase tracking-wide text-neutral-400">Private note</label>
            <textarea
              id="staff-note"
              value={noteDraft}
              onChange={(event) => onNote(event.target.value)}
              rows={4}
              placeholder="Add a note for the team"
              className="mt-2 w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <button
              type="button"
              onClick={onSaveNote}
              disabled={saving || noteDraft === (row.notes ?? '')}
              className="mt-3 px-4 py-2 rounded-full bg-brand-800 text-white text-sm font-semibold disabled:bg-neutral-300"
            >
              {saving ? 'Saving…' : 'Save note'}
            </button>
          </div>
          {error && <p className="text-sm text-error-700">{error}</p>}
        </div>
      </aside>
    </div>
  );
}

function ResumeLink({ path }: { path: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const open = async () => {
    if (!supabase) return;
    setBusy(true);
    setError('');
    const { data, error: linkError } = await supabase.storage.from('resumes').createSignedUrl(path, 60 * 10);
    setBusy(false);
    if (linkError || !data?.signedUrl) {
      setError('Could not open this resume.');
      return;
    }
    window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <span>
      <button type="button" onClick={open} disabled={busy} className="text-brand-700 hover:underline disabled:text-neutral-400">
        {busy ? 'Opening…' : 'View resume'}
      </button>
      {error && <span className="block text-error-700 mt-1">{error}</span>}
    </span>
  );
}

function StatusPill({ status }: { status: SubmissionStatus }) {
  const styles = {
    new: 'bg-amber-100 text-amber-800',
    contacted: 'bg-brand-50 text-brand-700',
    archived: 'bg-neutral-100 text-neutral-500',
  } as const;
  const label = statuses.find((item) => item.id === status)?.label ?? status;
  return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>{label}</span>;
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-xs font-semibold border ${
        active ? 'bg-brand-800 text-white border-brand-800' : 'bg-white text-neutral-600 border-neutral-200'
      }`}
    >
      {label}
    </button>
  );
}

function previewDetail(inbox: Inbox, row: Submission) {
  const preferred = inbox.fields.find((field) => !['parent_name', 'name', 'email', 'phone', 'resume_path'].includes(field.key) && !field.long);
  if (!preferred) return '—';
  return fieldValue(row, preferred.key) || '—';
}

function downloadCsv(inbox: Inbox, rows: Submission[]) {
  const columns = [...inbox.fields.map((field) => field.key), 'status', 'notes', 'created_at'];
  const header = [...inbox.fields.map((field) => field.label), 'Status', 'Notes', 'Submitted'];
  const lines = rows.map((row) => columns.map((key) => csvEscape(key === 'created_at' ? formatWhen(row.created_at) : fieldValue(row, key))).join(','));
  const csv = `\uFEFF${header.map(csvEscape).join(',')}\n${lines.join('\n')}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `carmel-${inbox.id}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}
