import { ChevronDown } from 'lucide-react';
import { openRoles, openRolesIntro, type OpenRole } from '@/data/openRoles';

export default function OpenRoles({ onApply }: { onApply: (title: string) => void }) {
  return (
    <div className="space-y-4 mb-8">
      <div>
        <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">{openRolesIntro.headline}</h2>
        <p className="text-neutral-600 text-sm leading-relaxed">{openRolesIntro.body}</p>
        <p className="text-neutral-600 text-sm leading-relaxed mt-3">{openRolesIntro.close}</p>
        <p className="text-brand-700 text-sm font-semibold mt-3">Built to Belong. Built to Become.</p>
      </div>
      {openRoles.map((role) => (
        <RoleCard key={role.title} role={role} onApply={onApply} />
      ))}
    </div>
  );
}

function RoleCard({ role, onApply }: { role: OpenRole; onApply: (title: string) => void }) {
  return (
    <details className="group bg-neutral-50 rounded-2xl border border-neutral-100">
      <summary className="cursor-pointer list-none px-5 py-4 flex items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{role.type} · {role.department}</p>
          <h3 className="font-display font-bold text-lg text-neutral-900 mt-1">{role.title}</h3>
        </div>
        <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0 mt-1 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 space-y-4 text-sm text-neutral-600 leading-relaxed">
        <p>{role.summary}</p>
        <BulletList title="Responsibilities" items={role.responsibilities} />
        <BulletList title="Qualifications" items={role.qualifications} />
        {role.preferred.length > 0 && <BulletList title="Preferred" items={role.preferred} />}
        {role.schedule && (
          <p><span className="font-semibold text-neutral-800">Schedule. </span>{role.schedule}</p>
        )}
        <button
          type="button"
          onClick={() => onApply(role.title)}
          className="inline-flex px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-full text-sm"
        >
          Apply for this role
        </button>
      </div>
    </details>
  );
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-semibold text-neutral-800 mb-1.5">{title}</h4>
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
