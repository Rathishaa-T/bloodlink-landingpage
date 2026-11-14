import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { HERO_STATS } from '@/data/impact';
import { useCountUp } from '@/hooks/useCountUp';

function TrustStat({ value, label, active, suffix }: { value: number; label: string; active: boolean; suffix: string }) {
  const count = useCountUp(value, active);

  return (
    <div>
      <p className="font-display text-3xl font-semibold tabular-nums text-ink-900 sm:text-4xl">
        {count.toLocaleString('en-IN')}
        <span className="text-brand-600">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-ink-600">{label}</p>
    </div>
  );
}

export function TrustStrip({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className={className}>
      <div className="grid grid-cols-3 gap-4 sm:gap-8">
        {HERO_STATS.map((stat) => (
          <TrustStat
            key={stat.id}
            value={stat.value}
            label={stat.label}
            active={inView}
            suffix={stat.suffix}
          />
        ))}
      </div>
      <p className="mt-4 text-xs text-ink-500">Illustrative sample figures.</p>
    </div>
  );
}
