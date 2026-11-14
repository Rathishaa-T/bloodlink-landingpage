import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { GRID_CAPTION } from '@/data/impact';
import { cx } from '@/lib/cx';

const TOTAL_DROPS = 100;

export function DropGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'center 0.45'] });
  const fillProgress = useTransform(scrollYProgress, [0, 1], [0, TOTAL_DROPS]);
  const [filled, setFilled] = useState(0);

  useMotionValueEvent(fillProgress, 'change', (value) => setFilled(Math.round(value)));

  return (
    <div ref={ref} className="rounded-3xl border border-paper/10 bg-white/[0.03] p-6 sm:p-8">
      <div
        role="img"
        aria-label={`${filled} of ${TOTAL_DROPS} drops filled, illustrative sample data`}
        className="grid grid-cols-10 gap-1.5 sm:gap-2"
      >
        {Array.from({ length: TOTAL_DROPS }, (_, index) => (
          <Droplet
            key={index}
            aria-hidden="true"
            strokeWidth={1.5}
            className={cx(
              'aspect-square w-full transition-colors duration-500',
              index < filled ? 'fill-brand-500 text-brand-500' : 'fill-transparent text-paper/25',
            )}
          />
        ))}
      </div>
      <p className="mt-6 font-display text-3xl text-paper">
        {(filled * 1000).toLocaleString('en-IN')} <span className="font-sans text-base text-paper/75">donations shown</span>
      </p>
      <p className="mt-2 text-xs text-paper/60">{GRID_CAPTION}</p>
    </div>
  );
}
