import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { BankCard } from '@/components/sections/blood-banks/BankCard';
import { BankMap } from '@/components/sections/blood-banks/BankMap';
import { FilterChip } from '@/components/ui/FilterChip';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BLOOD_BANKS, type Component, type FacilityType } from '@/data/bloodBanks';

const TYPES: Array<FacilityType | 'All'> = ['All', 'Hospital', 'Blood Bank'];
const COMPONENTS: Array<Component | 'All'> = ['All', 'Whole blood', 'Platelets', 'Plasma', 'Red cells', 'Cryoprecipitate'];

export function BloodBankNetwork() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<FacilityType | 'All'>('All');
  const [open24x7, setOpen24x7] = useState(false);
  const [componentFilter, setComponentFilter] = useState<Component | 'All'>('All');
  const [activeId, setActiveId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return BLOOD_BANKS.filter(
      (bank) =>
        (term === '' || bank.name.toLowerCase().includes(term) || bank.area.toLowerCase().includes(term)) &&
        (typeFilter === 'All' || bank.type === typeFilter) &&
        (!open24x7 || bank.open24x7) &&
        (componentFilter === 'All' || bank.components.includes(componentFilter)),
    );
  }, [query, typeFilter, open24x7, componentFilter]);

  const resetFilters = () => {
    setQuery('');
    setTypeFilter('All');
    setOpen24x7(false);
    setComponentFilter('All');
  };

  return (
    <section id="blood-banks" aria-labelledby="banks-title" className="scroll-mt-24 bg-blush-50 py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeader
            index="04"
            eyebrow="Blood bank network"
            title={<span id="banks-title">Authorised hospitals and blood banks, in one directory.</span>}
            description="Check current stock by blood group, opening hours, and the components each facility can supply."
          />

          <div className="mt-10 space-y-4 rounded-2xl bg-white p-5 shadow-card">
            <label htmlFor="bank-search" className="sr-only">
              Search by name or area
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden="true" />
              <input
                id="bank-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or area"
                className="field pl-11"
              />
            </div>
            <div role="group" aria-label="Facility type" className="flex flex-wrap gap-2">
              {TYPES.map((type) => (
                <FilterChip key={type} active={typeFilter === type} onClick={() => setTypeFilter(type)}>
                  {type === 'All' ? 'All facilities' : type}
                </FilterChip>
              ))}
              <FilterChip active={open24x7} onClick={() => setOpen24x7((value) => !value)}>
                Open 24x7
              </FilterChip>
            </div>
            <div role="group" aria-label="Component available" className="flex flex-wrap gap-2">
              {COMPONENTS.map((component) => (
                <FilterChip
                  key={component}
                  active={componentFilter === component}
                  onClick={() => setComponentFilter(component)}
                >
                  {component === 'All' ? 'Any component' : component}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p aria-live="polite" className="text-sm text-ink-700">
              Showing <span className="font-semibold text-ink-900">{visible.length}</span> of {BLOOD_BANKS.length}{' '}
              listings
            </p>
          </div>

          {visible.length > 0 ? (
            <ul className="mt-4 grid gap-5 md:grid-cols-2">
              {visible.map((bank) => (
                <li key={bank.id}>
                  <BankCard bank={bank} active={bank.id === activeId} onActivate={setActiveId} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-ink-900/20 bg-white p-8 text-center">
              <p className="font-display text-xl text-ink-900">No listings match these filters.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 inline-flex min-h-11 items-center rounded-full border border-ink-900/20 px-5 text-sm font-semibold hover:border-brand-600 hover:text-brand-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <BankMap banks={visible} activeId={activeId} onActivate={setActiveId} />
          </div>
        </div>
      </div>
    </section>
  );
}
