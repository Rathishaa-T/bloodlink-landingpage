import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { LIFE_COMPONENTS } from '@/data/impact';

const DROP_PATH = 'M100 8 C100 8 28 102 28 152 A72 72 0 0 0 172 152 C172 102 100 8 100 8 Z';
const BRANCHES = [
  { d: 'M150 130 C250 130 290 40 420 40', cy: 40, fill: '#E25A74' },
  { d: 'M150 130 C250 130 300 130 420 130', cy: 130, fill: '#F3D9A4' },
  { d: 'M150 130 C250 130 290 220 420 220', cy: 220, fill: '#F6E3E0' },
];

export function LifeSplit() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <svg
        ref={ref}
        viewBox="0 0 480 260"
        role="img"
        aria-label="One blood donation split into red cells, plasma, and platelets, helping up to three patients"
        className="h-auto w-full"
      >
        <g transform="translate(20 26) scale(0.8)">
          <path d={DROP_PATH} fill="#B3122B" />
        </g>
        {BRANCHES.map((branch, index) => (
          <g key={branch.cy}>
            <motion.path
              d={branch.d}
              fill="none"
              stroke="#B3122B"
              strokeWidth={3}
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1, delay: 0.4 + index * 0.15, ease: 'easeInOut' }}
            />
            <motion.circle
              cx={440}
              cy={branch.cy}
              r={28}
              fill={branch.fill}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
            />
          </g>
        ))}
      </svg>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-300">One donation, up to three lives</p>
        <dl className="mt-6 space-y-5">
          {LIFE_COMPONENTS.map((item) => (
            <div key={item.id} className="border-l-2 border-brand-600/60 pl-5">
              <dt className="font-display text-xl text-paper">{item.name}</dt>
              <dd className="mt-1 text-sm text-paper/80">{item.use}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-paper/60">Sample illustration. Not a clinical diagram.</p>
      </div>
    </div>
  );
}
