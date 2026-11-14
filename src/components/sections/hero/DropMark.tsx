import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const DROP_PATH = 'M100 8 C100 8 28 102 28 152 A72 72 0 0 0 172 152 C172 102 100 8 100 8 Z';

export function DropMark() {
  const clipId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex aspect-[5/6] w-full max-w-sm items-center justify-center">
      {!reduceMotion &&
        [0, 1.2].map((delay) => (
          <motion.span
            key={delay}
            aria-hidden="true"
            className="absolute h-[70%] w-[70%] rounded-full border border-brand-600/30"
            initial={{ scale: 0.7, opacity: 0.6 }}
            animate={{ scale: 1.45, opacity: 0 }}
            transition={{ duration: 3.2, delay, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}

      <svg
        viewBox="0 0 200 240"
        role="img"
        aria-label="A blood drop that fills as donors join the network"
        className="relative h-auto w-[62%] drop-shadow-[0_24px_40px_rgba(179,18,43,0.25)]"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={DROP_PATH} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <motion.rect
            x={0}
            y={0}
            width={200}
            height={240}
            fill="#B3122B"
            initial={reduceMotion ? false : { y: 240 }}
            animate={{ y: 0 }}
            transition={{ duration: 2.4, ease: [0.45, 0, 0.2, 1], delay: 0.3 }}
          />
        </g>
        <path d={DROP_PATH} fill="none" stroke="#B3122B" strokeWidth={2.5} />
      </svg>
    </div>
  );
}
