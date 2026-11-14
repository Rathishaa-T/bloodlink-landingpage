import { CheckCircle2 } from 'lucide-react';
import { DONATION_GAPS, ELIGIBILITY_RULES } from '@/data/awareness';

export function EligibilityPanel() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {ELIGIBILITY_RULES.map((rule) => {
        const Icon = rule.icon;
        return (
          <article key={rule.id} className="flex gap-4 rounded-2xl border border-ink-900/10 bg-white p-6 shadow-card">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blush text-brand-700">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-ink-900">
                {rule.title}
                <CheckCircle2 className="h-4 w-4 text-success-700" aria-label="Checklist item" />
              </h3>
              <p className="mt-2 text-sm text-ink-600">{rule.detail}</p>
            </div>
          </article>
        );
      })}

      <article className="rounded-2xl bg-ink-900 p-6 text-paper md:col-span-2">
        <h3 className="text-lg font-semibold text-paper">Minimum gap between donations</h3>
        <p className="mt-2 text-sm text-paper/75">Your body needs time to rebuild. Plan your next donation after this gap.</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {DONATION_GAPS.map((gap) => (
            <div key={gap.id} className="rounded-xl border border-paper/15 bg-white/5 p-5">
              <dt className="text-sm text-paper/75">{gap.label}</dt>
              <dd className="mt-1 font-display text-4xl text-brand-300">
                {gap.months} <span className="font-sans text-base text-paper">months</span>
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </div>
  );
}
