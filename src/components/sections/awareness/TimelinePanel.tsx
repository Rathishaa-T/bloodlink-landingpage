import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DONATION_STEPS } from '@/data/awareness';
import { cx } from '@/lib/cx';

export function TimelinePanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const step = DONATION_STEPS[activeIndex];
  const progress = activeIndex / (DONATION_STEPS.length - 1);

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-card sm:p-8">
      <div className="relative">
        <div className="absolute left-[12.5%] right-[12.5%] top-5 h-0.5 rounded-full bg-ink-100" aria-hidden="true" />
        <motion.div
          className="absolute left-[12.5%] top-5 h-0.5 w-[75%] origin-left rounded-full bg-brand-600"
          initial={false}
          animate={{ scaleX: progress }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
          aria-hidden="true"
        />
        <ol className="relative grid grid-cols-4">
          {DONATION_STEPS.map((item, index) => {
            const reached = index <= activeIndex;
            return (
              <li key={item.id} className="flex justify-center">
                <button
                  type="button"
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className="group flex min-h-11 flex-col items-center gap-2 px-1"
                >
                  <span
                    className={cx(
                      'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300',
                      index === activeIndex
                        ? 'bg-brand-600 text-white ring-4 ring-brand-600/20'
                        : reached
                          ? 'bg-brand-100 text-brand-700'
                          : 'bg-white text-ink-600 ring-1 ring-ink-200 group-hover:ring-brand-600',
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cx(
                      'text-center text-xs font-medium sm:text-sm',
                      index === activeIndex ? 'text-ink-900' : 'text-ink-600',
                    )}
                  >
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step.id}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          className="mt-8 rounded-2xl bg-blush-50 p-6"
          aria-live="polite"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">
            Step {activeIndex + 1} · {step.duration}
          </p>
          <h3 className="mt-2 text-2xl">{step.title}</h3>
          <p className="mt-2 font-medium text-ink-800">{step.summary}</p>
          <p className="mt-3 text-ink-600">{step.detail}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
