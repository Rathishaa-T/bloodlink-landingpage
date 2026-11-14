import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { IMPACT_COUNTERS } from '@/data/impact';
import { useCountUp } from '@/hooks/useCountUp';

function CounterCard({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const count = useCountUp(value, inView);

  return (
    <div ref={ref} className="rounded-2xl border border-paper/10 bg-white/[0.04] p-5">
      <p className="font-display text-3xl tabular-nums text-paper sm:text-4xl">{count.toLocaleString('en-IN')}</p>
      <p className="mt-2 text-sm text-paper/75">{label}</p>
    </div>
  );
}

export function ImpactCounters() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {IMPACT_COUNTERS.map((counter) => (
          <CounterCard key={counter.id} label={counter.label} value={counter.value} />
        ))}
      </div>
      <p className="text-xs text-paper/60">Illustrative sample data, not measured results.</p>
    </div>
  );
}
