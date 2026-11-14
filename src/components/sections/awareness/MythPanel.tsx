import { useState } from 'react';
import { MYTHS, type Myth } from '@/data/awareness';

function FlipCard({ myth }: { myth: Myth }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((value) => !value)}
      className="flip-card block min-h-[240px] w-full text-left"
      data-flipped={flipped}
    >
      <span className="flip-inner relative block h-full min-h-[240px] w-full">
        <span
          aria-hidden={flipped}
          className="flip-face absolute inset-0 flex flex-col rounded-2xl border border-ink-900/10 bg-white p-6 shadow-card"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">Myth</span>
          <span className="mt-3 font-display text-2xl leading-[1.2] text-ink-900">{myth.myth}</span>
          <span className="mt-auto pt-4 text-sm font-medium text-ink-600">Tap to see the fact</span>
        </span>
        <span
          aria-hidden={!flipped}
          className="flip-face flip-back absolute inset-0 flex flex-col rounded-2xl bg-ink-900 p-6 text-paper shadow-lift"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">Fact</span>
          <span className="mt-3 text-[15px] leading-relaxed text-paper">{myth.fact}</span>
        </span>
      </span>
    </button>
  );
}

export function MythPanel() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {MYTHS.map((myth) => (
        <li key={myth.id}>
          <FlipCard myth={myth} />
        </li>
      ))}
    </ul>
  );
}
