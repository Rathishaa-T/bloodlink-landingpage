import { DonorCard } from '@/components/sections/find-donor/DonorCard';
import { Button } from '@/components/ui/Button';
import type { BloodGroup } from '@/data/bloodGroups';
import type { Donor } from '@/data/donors';
import { Search, UserRoundX } from 'lucide-react';

export type SearchStatus = 'idle' | 'loading' | 'done';

interface DonorResultsProps {
  status: SearchStatus;
  results: Donor[];
  searched: { group: BloodGroup; location: string; availableNow: boolean } | null;
  onIncludeUnavailable: () => void;
}

export function DonorResults({ status, results, searched, onIncludeUnavailable }: DonorResultsProps) {
  if (status === 'idle' || !searched) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-ink-900/20 bg-paper p-8 text-center">
        <Search className="h-8 w-8 text-ink-400" aria-hidden="true" />
        <p className="mt-3 font-display text-xl text-ink-900">Your matches will appear here</p>
        <p className="mt-2 max-w-sm text-sm text-ink-600">
          Choose a blood group and an area, then search. We only show first names and last initials.
        </p>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="space-y-4">
        <p className="sr-only">Searching for donors</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1, 2].map((item) => (
            <div key={item} aria-hidden="true" className="h-56 rounded-2xl bg-ink-100/70 motion-safe:animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-blush-50 p-8 text-center">
        <UserRoundX className="h-8 w-8 text-brand-600" aria-hidden="true" />
        <p className="mt-3 font-display text-xl text-ink-900">No {searched.group} donors nearby just yet</p>
        <p className="mt-2 max-w-sm text-sm text-ink-600">
          Try a wider area, or include donors who are not available today. Many donors can be reached within a few
          weeks.
        </p>
        {searched.availableNow && (
          <Button variant="secondary" className="mt-6" onClick={onIncludeUnavailable}>
            Include unavailable donors
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm text-ink-700">
          <span className="font-semibold text-ink-900">{results.length}</span> {searched.group} donors near{' '}
          <span className="font-semibold text-ink-900">{searched.location || 'you'}</span>
        </p>
        <p className="text-xs text-ink-500">Sorted by distance</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {results.map((donor) => (
          <li key={donor.id}>
            <DonorCard donor={donor} />
          </li>
        ))}
      </ul>
    </div>
  );
}
