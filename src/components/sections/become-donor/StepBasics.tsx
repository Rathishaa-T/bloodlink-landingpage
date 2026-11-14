import { BLOOD_GROUPS, describeBloodGroup, type BloodGroup } from '@/data/bloodGroups';
import { LOCATIONS } from '@/data/locations';
import type { RegistrationErrors, RegistrationForm } from '@/components/sections/become-donor/types';
import { cx } from '@/lib/cx';

interface StepBasicsProps {
  form: RegistrationForm;
  errors: RegistrationErrors;
  onChange: (patch: Partial<RegistrationForm>) => void;
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-medium text-brand-700">
      {message}
    </p>
  );
}

export function StepBasics({ form, errors, onChange }: StepBasicsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="reg-name" className="text-sm font-semibold text-ink-900">
          Full name
        </label>
        <input
          id="reg-name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(event) => onChange({ name: event.target.value })}
          aria-invalid={Boolean(errors.name) || undefined}
          aria-describedby={errors.name ? 'reg-name-error' : undefined}
          className={cx('field mt-2', errors.name && 'field-error')}
          placeholder="e.g. Aarav Kulkarni"
        />
        <ErrorText id="reg-name-error" message={errors.name} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-age" className="text-sm font-semibold text-ink-900">
            Age
          </label>
          <input
            id="reg-age"
            type="number"
            inputMode="numeric"
            min={18}
            max={65}
            value={form.age}
            onChange={(event) => onChange({ age: event.target.value })}
            aria-invalid={Boolean(errors.age) || undefined}
            aria-describedby={errors.age ? 'reg-age-error' : undefined}
            className={cx('field mt-2', errors.age && 'field-error')}
            placeholder="18 to 65"
          />
          <ErrorText id="reg-age-error" message={errors.age} />
        </div>

        <div>
          <label htmlFor="reg-city" className="text-sm font-semibold text-ink-900">
            City or area
          </label>
          <input
            id="reg-city"
            type="text"
            list="reg-city-options"
            autoComplete="address-level2"
            value={form.city}
            onChange={(event) => onChange({ city: event.target.value })}
            aria-invalid={Boolean(errors.city) || undefined}
            aria-describedby={errors.city ? 'reg-city-error' : undefined}
            className={cx('field mt-2', errors.city && 'field-error')}
            placeholder="e.g. Koramangala, Bengaluru"
          />
          <datalist id="reg-city-options">
            {LOCATIONS.map((location) => (
              <option key={location} value={location} />
            ))}
          </datalist>
          <ErrorText id="reg-city-error" message={errors.city} />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-ink-900">Blood group</legend>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {BLOOD_GROUPS.map((option: BloodGroup) => {
            const selected = form.group === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                aria-label={describeBloodGroup(option)}
                onClick={() => onChange({ group: option })}
                className={cx(
                  'min-h-11 rounded-xl border font-semibold transition-all duration-200 active:scale-95',
                  selected
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-ink-900/15 bg-white text-ink-800 hover:border-brand-600 hover:text-brand-700',
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
        <ErrorText id="reg-group-error" message={errors.group} />
      </fieldset>
    </div>
  );
}
