import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { DonorResults, type SearchStatus } from '@/components/sections/find-donor/DonorResults';
import { SearchForm, type SearchErrors } from '@/components/sections/find-donor/SearchForm';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { BloodGroup } from '@/data/bloodGroups';
import type { Donor } from '@/data/donors';
import { compatibilityHint, findDonors } from '@/lib/findDonors';

const SEARCH_DELAY_MS = 900;

interface SearchParams {
  group: BloodGroup;
  location: string;
  availableNow: boolean;
}

export function FindDonor() {
  const [group, setGroup] = useState<BloodGroup | null>(null);
  const [location, setLocation] = useState('');
  const [availableNow, setAvailableNow] = useState(true);
  const [errors, setErrors] = useState<SearchErrors>({});
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [results, setResults] = useState<Donor[]>([]);
  const [searched, setSearched] = useState<SearchParams | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const runSearch = (params: SearchParams) => {
    window.clearTimeout(timerRef.current);
    setSearched(params);
    setStatus('loading');
    timerRef.current = window.setTimeout(() => {
      setResults(findDonors(params));
      setStatus('done');
    }, SEARCH_DELAY_MS);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: SearchErrors = {};
    if (!group) nextErrors.group = 'Choose a blood group to continue.';
    if (!location.trim()) nextErrors.location = 'Add an area or city, for example Indiranagar, Bengaluru.';
    setErrors(nextErrors);
    if (!group || nextErrors.group || nextErrors.location) return;
    runSearch({ group, location: location.trim(), availableNow });
  };

  const includeUnavailable = () => {
    setAvailableNow(false);
    if (searched) runSearch({ ...searched, availableNow: false });
  };

  return (
    <section id="find-donor" aria-labelledby="find-donor-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader
            index="01"
            eyebrow="Find a donor"
            title={<span id="find-donor-title">Find a donor who matches your blood group.</span>}
            description="Search by blood group and area to see verified donors who are willing to help. Results sort by distance so you can act quickly."
          />

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl bg-blush p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                <Info className="h-4 w-4" aria-hidden="true" />
                Compatibility hint
              </p>
              <p className="mt-2 text-ink-800">{compatibilityHint(group)}</p>
            </div>
            <div className="flex gap-4 rounded-2xl border border-ink-900/10 bg-white p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success-700" aria-hidden="true" />
              <div>
                <p className="font-semibold text-ink-900">Privacy first</p>
                <p className="mt-1 text-sm text-ink-600">
                  Donors appear by first name and last initial only. Phone numbers stay private until a donor accepts a
                  request.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-ink-900/10 bg-white p-6 shadow-card sm:p-8">
            <SearchForm
              group={group}
              onGroupChange={(next) => {
                setGroup(next);
                setErrors((current) => ({ ...current, group: undefined }));
              }}
              location={location}
              onLocationChange={(value) => {
                setLocation(value);
                setErrors((current) => ({ ...current, location: undefined }));
              }}
              availableNow={availableNow}
              onAvailableNowChange={setAvailableNow}
              errors={errors}
              loading={status === 'loading'}
              onSubmit={handleSubmit}
            />
          </div>

          <div aria-live="polite" className="mt-8">
            <DonorResults
              status={status}
              results={results}
              searched={searched}
              onIncludeUnavailable={includeUnavailable}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
