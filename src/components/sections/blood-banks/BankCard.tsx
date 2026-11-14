import { BadgeCheck, Clock, MapPin } from 'lucide-react';
import { StockBars } from '@/components/sections/blood-banks/StockBars';
import type { BloodBank } from '@/data/bloodBanks';
import { cx } from '@/lib/cx';

interface BankCardProps {
  bank: BloodBank;
  active: boolean;
  onActivate: (id: string | null) => void;
}

export function BankCard({ bank, active, onActivate }: BankCardProps) {
  return (
    <article
      tabIndex={0}
      onMouseEnter={() => onActivate(bank.id)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(bank.id)}
      onBlur={() => onActivate(null)}
      className={cx(
        'rounded-2xl border bg-white p-6 shadow-card transition-all duration-300',
        active ? 'border-brand-600 shadow-lift' : 'border-ink-900/10',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-ink-900 px-3 py-1 text-xs font-semibold text-paper">{bank.type}</span>
        <span className="flex items-center gap-1.5 rounded-full bg-success-50 px-3 py-1 text-xs font-semibold text-success-700">
          <BadgeCheck className="h-4 w-4" aria-hidden="true" />
          Authorised
        </span>
      </div>

      <h3 className="mt-4 text-xl">{bank.name}</h3>
      <div className="mt-3 grid gap-2 text-sm text-ink-700 sm:grid-cols-2">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
          {bank.area}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
          {bank.hours}
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Components available">
        {bank.components.map((component) => (
          <li key={component} className="rounded-full bg-blush-50 px-3 py-1 text-xs font-medium text-ink-700">
            {component}
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-ink-900/10 pt-5">
        <StockBars stock={bank.stock} facilityName={bank.name} />
      </div>
    </article>
  );
}
