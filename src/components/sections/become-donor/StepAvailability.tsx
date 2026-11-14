import { AVAILABILITY_OPTIONS } from '@/data/registration';
import type { RegistrationErrors, RegistrationForm } from '@/components/sections/become-donor/types';
import { cx } from '@/lib/cx';

interface StepAvailabilityProps {
  form: RegistrationForm;
  errors: RegistrationErrors;
  onChange: (patch: Partial<RegistrationForm>) => void;
}

export function StepAvailability({ form, errors, onChange }: StepAvailabilityProps) {
  const toggle = (option: (typeof AVAILABILITY_OPTIONS)[number]) => {
    const selected = form.availability.includes(option)
      ? form.availability.filter((item) => item !== option)
      : [...form.availability, option];
    onChange({ availability: selected });
  };

  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="text-sm font-semibold text-ink-900">When can you usually donate?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {AVAILABILITY_OPTIONS.map((option) => {
            const selected = form.availability.includes(option);
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => toggle(option)}
                className={cx(
                  'min-h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-200',
                  selected
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-ink-900/15 bg-white text-ink-800 hover:border-brand-600',
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
        {errors.availability && (
          <p role="alert" className="mt-2 text-sm font-medium text-brand-700">
            {errors.availability}
          </p>
        )}
      </fieldset>

      <div className="rounded-2xl bg-blush-50 p-5">
        <label className="flex min-h-11 cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => onChange({ consent: event.target.checked })}
            aria-invalid={Boolean(errors.consent) || undefined}
            aria-describedby={errors.consent ? 'reg-consent-error' : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-brand-600"
          />
          <span className="text-sm text-ink-800">
            I agree that BloodLink may use these details to match me with blood requests. I understand this is a
            prototype and nothing is submitted.
          </span>
        </label>
        {errors.consent && (
          <p id="reg-consent-error" role="alert" className="mt-2 text-sm font-medium text-brand-700">
            {errors.consent}
          </p>
        )}
      </div>
    </div>
  );
}
