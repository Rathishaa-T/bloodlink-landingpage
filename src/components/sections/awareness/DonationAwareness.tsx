import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Info } from 'lucide-react';
import { EligibilityPanel } from '@/components/sections/awareness/EligibilityPanel';
import { MythPanel } from '@/components/sections/awareness/MythPanel';
import { TimelinePanel } from '@/components/sections/awareness/TimelinePanel';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cx } from '@/lib/cx';

const TABS = [
  { id: 'eligibility', label: 'Eligibility', panel: EligibilityPanel },
  { id: 'how', label: 'How donation works', panel: TimelinePanel },
  { id: 'myths', label: 'Myth vs fact', panel: MythPanel },
] as const;

export function DonationAwareness() {
  const [activeId, setActiveId] = useState<(typeof TABS)[number]['id']>('eligibility');
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0];
  const ActivePanel = active.panel;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = TABS.length - 1;
    else return;
    event.preventDefault();
    const next = TABS[nextIndex];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <section id="awareness" aria-labelledby="awareness-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeader
          index="05"
          eyebrow="Donation awareness"
          title={<span id="awareness-title">Everything a first-time donor wants to know.</span>}
          description="Clear, friendly facts about who can donate, what happens on the day, and what is simply not true."
        />

        <div
          role="tablist"
          aria-label="Donation awareness topics"
          className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((tab, index) => {
            const selected = tab.id === activeId;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[tab.id] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cx(
                  'min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors duration-200',
                  selected
                    ? 'border-ink-900 bg-ink-900 text-paper'
                    : 'border-ink-900/15 bg-white text-ink-800 hover:border-brand-600 hover:text-brand-700',
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          tabIndex={0}
          className="mt-8 rounded-3xl bg-blush-50/60 p-4 sm:p-6"
        >
          <ActivePanel />
        </div>

        <p className="mt-8 flex gap-3 rounded-2xl border border-ink-900/10 bg-white p-5 text-sm text-ink-700">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
          This is general information, not medical advice. Eligibility is decided by a trained health professional at
          each donation centre.
        </p>
      </div>
    </section>
  );
}
