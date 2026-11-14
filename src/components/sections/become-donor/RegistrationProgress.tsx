import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cx } from '@/lib/cx';

const LABELS = ['Basics', 'Eligibility', 'Availability'];

export function RegistrationProgress({ step }: { step: number }) {
  const reduceMotion = useReducedMotion();
  const percent = ((step - 1) / (LABELS.length - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="relative">
        <div className="absolute inset-x-4 top-4 h-0.5 rounded-full bg-ink-100" aria-hidden="true" />
        <motion.div
          className="absolute left-4 top-4 h-0.5 origin-left rounded-full bg-brand-600"
          style={{ width: `calc((100% - 2rem) * ${percent / 100})` }}
          initial={false}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
          aria-hidden="true"
        />
        <ol className="relative grid grid-cols-3">
          {LABELS.map((label, index) => {
            const number = index + 1;
            const done = step > number;
            const current = step === number;
            return (
              <li key={label} aria-current={current ? 'step' : undefined} className="flex flex-col items-center gap-2">
                <span
                  className={cx(
                    'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300',
                    done && 'bg-brand-600 text-white',
                    current && 'bg-ink-900 text-paper ring-4 ring-brand-600/20',
                    !done && !current && 'bg-white text-ink-500 ring-1 ring-ink-200',
                  )}
                >
                  {done ? <Check className="h-4 w-4" aria-hidden="true" /> : number}
                </span>
                <span className={cx('text-xs font-medium sm:text-sm', current ? 'text-ink-900' : 'text-ink-600')}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
