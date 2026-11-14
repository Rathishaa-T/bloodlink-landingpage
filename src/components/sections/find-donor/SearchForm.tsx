import type { FormEvent } from 'react';
import { Loader2, Search } from 'lucide-react';
import { CityAutocomplete } from '@/components/sections/find-donor/CityAutocomplete';
import { BLOOD_GROUPS, describeBloodGroup, type BloodGroup } from '@/data/bloodGroups';
import { cx } from '@/lib/cx';

export interface SearchErrors {
  group?: string;
  location?: string;
}

interface SearchFormProps {
  group: BloodGroup | null;
  onGroupChange: (group: BloodGroup) => void;
  location: string;
  onLocationChange: (value: string) => void;
  availableNow: boolean;
  onAvailableNowChange: (value: boolean) => void;
  errors: SearchErrors;
  loading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function SearchForm({
  group,
  onGroupChange,
  location,
  onLocationChange,
  availableNow,
  onAvailableNowChange,
  errors,
  loading,
  onSubmit,
}: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <fieldset>
        <legend className="text-sm font-semibold text-ink-900">Blood group needed</legend>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {BLOOD_GROUPS.map((option) => {
            const selected = option === group;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                aria-label={describeBloodGroup(option)}
                onClick={() => onGroupChange(option)}
                className={cx(
                  'min-h-11 rounded-xl border text-base font-semibold transition-all duration-200 active:scale-95',
                  selected
                    ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                    : 'border-ink-900/15 bg-white text-ink-800 hover:border-brand-600 hover:text-brand-700',
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
        {errors.group && (
          <p role="alert" className="mt-2 text-sm font-medium text-brand-700">
            {errors.group}
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor="donor-location" className="text-sm font-semibold text-ink-900">
          Where do you need the donor?
        </label>
        <div className="mt-3">
          <CityAutocomplete
            id="donor-location"
            value={location}
            onChange={onLocationChange}
            invalid={Boolean(errors.location)}
            errorId="donor-location-error"
          />
        </div>
        {errors.location && (
          <p id="donor-location-error" role="alert" className="mt-2 text-sm font-medium text-brand-700">
            {errors.location}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 rounded-2xl bg-blush-50 p-4">
        <div>
          <p id="available-label" className="text-sm font-semibold text-ink-900">
            Available now
          </p>
          <p className="text-sm text-ink-600">Only show donors who can donate today.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={availableNow}
          aria-labelledby="available-label"
          onClick={() => onAvailableNowChange(!availableNow)}
          className={cx(
            'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200',
            availableNow ? 'bg-success-500' : 'bg-ink-300',
          )}
        >
          <span
            className={cx(
              'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200',
              availableNow ? 'translate-x-6' : 'translate-x-1',
            )}
          />
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 text-base font-semibold text-paper transition-colors duration-200 hover:bg-brand-700 disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 motion-safe:animate-spin" aria-hidden="true" />
        ) : (
          <Search className="h-5 w-5" aria-hidden="true" />
        )}
        {loading ? 'Searching donors' : 'Search donors'}
      </button>
    </form>
  );
}
