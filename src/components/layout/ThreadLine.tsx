import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// A continuous vein-like path, stretched over the full page height
const THREAD_PATH = 'M12 0 C20 120 4 240 12 360 S20 600 12 720 S4 880 12 1000';

export function ThreadLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end end'] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-2 z-10 w-6"
    >
      <svg viewBox="0 0 24 1000" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <path
          d={THREAD_PATH}
          fill="none"
          stroke="#E8C9C4"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d={THREAD_PATH}
          fill="none"
          stroke="#B3122B"
          strokeWidth={2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
