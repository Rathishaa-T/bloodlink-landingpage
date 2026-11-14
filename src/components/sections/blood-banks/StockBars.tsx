import { BLOOD_GROUPS, type BloodGroup } from '@/data/bloodGroups';
import type { StockLevel } from '@/data/bloodBanks';

const LEVEL_STYLES: Record<StockLevel, { width: string; bar: string; label: string }> = {
  low: { width: 'w-1/4', bar: 'bg-brand-600', label: 'Low' },
  medium: { width: 'w-3/5', bar: 'bg-warning-500', label: 'Medium' },
  good: { width: 'w-full', bar: 'bg-success-500', label: 'Good' },
};

interface StockBarsProps {
  stock: Record<BloodGroup, StockLevel>;
  facilityName: string;
}

export function StockBars({ stock, facilityName }: StockBarsProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">Stock by blood group</p>
      <ul className="mt-3 grid grid-cols-4 gap-x-3 gap-y-3 sm:grid-cols-8">
        {BLOOD_GROUPS.map((group) => {
          const level = LEVEL_STYLES[stock[group]];
          return (
            <li key={group} aria-label={`${facilityName}, ${group}: ${level.label} stock`}>
              <div className="flex items-baseline justify-between text-xs font-semibold text-ink-900">
                <span>{group}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
                <div className={`h-full rounded-full ${level.bar} ${level.width}`} />
              </div>
              <span className="mt-1 block text-[11px] text-ink-600">{level.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
