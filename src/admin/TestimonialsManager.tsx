import { FormEvent, useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import {
  fetchTestimonials,
  removeTestimonial,
  saveTestimonial,
  type Testimonial,
  type TestimonialInput,
} from '@/lib/testimonials';

const emptyForm: TestimonialInput = { name: '', detail: '', quote: '', published: true };

export default function TestimonialsManager() {
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<TestimonialInput>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const refresh = async () => {
    setLoading(true);
    const result = await fetchTestimonials(true);
    setRows(result.rows);
    setError(result.error ?? '');
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await saveTestimonial(form);
      setForm(emptyForm);
      await refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save this testimonial.');
    } finally {
      setSaving(false);
    }
  };

  const edit = (row: Testimonial) => {
    setForm({
      id: row.id,
      name: row.name,
      detail: row.detail,
      quote: row.quote,
      published: row.published !== false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (row: Testimonial) => {
    if (!row.id) return;
    if (!window.confirm(`Remove the testimonial from ${row.name}?`)) return;
    setError('');
    try {
      await removeTestimonial(row.id);
      if (form.id === row.id) setForm(emptyForm);
      await refresh();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'Could not remove this testimonial.');
    }
  };

  return (
    <div>
      <p className="text-brand-600 font-semibold text-xs uppercase tracking-widest">Website</p>
      <h1 className="font-display font-bold text-4xl text-neutral-900 mt-2">Testimonials</h1>
      <p className="text-neutral-600 mt-2 text-sm max-w-2xl">
        Add a family’s own words. Published quotes appear in the carousel on the website.
      </p>

      {error && (
        <p className="mt-4 text-sm text-error-700 bg-error-50 border border-red-100 rounded-xl px-4 py-3" role="alert">
          {error.includes('testimonials')
            ? 'The testimonials table is not in the database yet. Run supabase/migrations/20261027162000_testimonials.sql in the Supabase SQL editor, then refresh.'
            : error}
        </p>
      )}

      <form onSubmit={submit} className="mt-8 bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 max-w-3xl">
        <h2 className="font-display font-bold text-2xl text-neutral-900">{form.id ? 'Edit testimonial' : 'Add a testimonial'}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium text-neutral-700 mb-1.5">Family name</span>
            <input
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="The Benford Family"
              className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-neutral-700 mb-1.5">Detail</span>
            <input
              value={form.detail}
              onChange={(event) => setForm((current) => ({ ...current, detail: event.target.value }))}
              placeholder="Parents of Madisyn"
              className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-neutral-700 mb-1.5">Quote</span>
          <textarea
            required
            rows={6}
            value={form.quote}
            onChange={(event) => setForm((current) => ({ ...current, quote: event.target.value }))}
            className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))}
            className="rounded border-neutral-300"
          />
          Show on the website
        </label>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-800 text-white text-sm font-semibold disabled:bg-brand-400"
          >
            <Plus className="w-4 h-4" />
            {saving ? 'Saving…' : form.id ? 'Save changes' : 'Add testimonial'}
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm(emptyForm)} className="text-sm text-neutral-500 hover:text-neutral-800">
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <ul className="mt-8 space-y-3 max-w-3xl">
        {loading && <li className="text-sm text-neutral-500">Loading testimonials…</li>}
        {!loading && rows.length === 0 && !error && (
          <li className="text-sm text-neutral-500 bg-white border border-neutral-200 rounded-2xl px-5 py-8">No testimonials yet.</li>
        )}
        {rows.map((row) => (
          <li key={row.id} className="bg-white border border-neutral-200 rounded-2xl px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-neutral-900">{row.name}</p>
                <p className="text-xs text-brand-700">{row.detail || 'No detail'}</p>
                <p className="text-sm text-neutral-600 italic mt-2 line-clamp-3">{row.quote}</p>
                <p className="text-xs mt-2 text-neutral-400">{row.published === false ? 'Hidden' : 'On the website'}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button type="button" onClick={() => edit(row)} className="p-2 rounded-lg text-brand-800 hover:bg-brand-50" aria-label={`Edit ${row.name}`}>
                  <Pencil className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => remove(row)} className="p-2 rounded-lg text-error-700 hover:bg-error-50" aria-label={`Remove ${row.name}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
