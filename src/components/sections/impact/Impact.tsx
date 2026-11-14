import { DropGrid } from '@/components/sections/impact/DropGrid';
import { ImpactCounters } from '@/components/sections/impact/ImpactCounters';
import { LifeSplit } from '@/components/sections/impact/LifeSplit';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Impact() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="relative scroll-mt-24 overflow-hidden bg-ink-900 py-20 text-paper lg:py-28"
    >
      <div className="container-page">
        <SectionHeader
          tone="dark"
          index="06"
          eyebrow="Our impact"
          title={<span id="impact-title">One donation can reach three patients.</span>}
          description="Every figure on this page is illustrative sample data, shown to explain how donations are used."
        />

        <div className="mt-16">
          <LifeSplit />
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3">
            <DropGrid />
          </div>
          <div className="lg:col-span-2">
            <ImpactCounters />
          </div>
        </div>
      </div>
    </section>
  );
}
