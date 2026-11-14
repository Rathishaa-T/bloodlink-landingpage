import { Droplet } from 'lucide-react';
import type { BloodGroup } from '@/data/bloodGroups';

interface DonorCardPreviewProps {
  name: string;
  group: BloodGroup;
  city: string;
  donorId: string;
}

export function DonorCardPreview({ name, group, city, donorId }: DonorCardPreviewProps) {
  return (
    <div
      role="img"
      aria-label={`Sample donor card for ${name}, blood group ${group}, donor ID ${donorId}`}
      className="relative mx-auto aspect-[1.6/1] w-full max-w-md overflow-hidden rounded-3xl bg-ink-900 p-6 text-paper shadow-lift sm:p-7"
    >
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-600/30" aria-hidden="true" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border border-brand-300/20" aria-hidden="true" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-lg">
            <Droplet className="h-5 w-5 fill-brand-600 text-brand-600" aria-hidden="true" />
            BloodLink Donor
          </span>
          <span className="font-display text-4xl font-semibold text-brand-300">{group}</span>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-paper/60">Donor ID</p>
          <p className="font-mono text-lg tracking-wider text-paper">{donorId}</p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-semibold">{name}</p>
            <p className="truncate text-sm text-paper/70">{city}</p>
          </div>
          <p className="shrink-0 rounded-full bg-paper/10 px-3 py-1 text-xs text-paper/80">Sample card</p>
        </div>
      </div>
    </div>
  );
}
