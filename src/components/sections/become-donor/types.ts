import type { AvailabilityOption } from '@/data/registration';
import type { BloodGroup } from '@/data/bloodGroups';

export interface RegistrationForm {
  name: string;
  age: string;
  group: BloodGroup | null;
  city: string;
  answers: Record<string, 'yes' | 'no' | undefined>;
  availability: AvailabilityOption[];
  consent: boolean;
}

export type RegistrationErrors = Partial<Record<'name' | 'age' | 'group' | 'city' | 'availability' | 'consent', string>>;

export function validateBasics(form: RegistrationForm): RegistrationErrors {
  const errors: RegistrationErrors = {};
  const age = Number(form.age);
  if (form.name.trim().length < 2) errors.name = 'Please enter your name as you would like it on your card.';
  if (!form.age || !Number.isInteger(age) || age < 18 || age > 65) errors.age = 'Donors must be between 18 and 65 years old.';
  if (!form.group) errors.group = 'Choose your blood group.';
  if (!form.city.trim()) errors.city = 'Add your city or area.';
  return errors;
}

export function validateAvailability(form: RegistrationForm): RegistrationErrors {
  const errors: RegistrationErrors = {};
  if (form.availability.length === 0) errors.availability = 'Pick at least one time you can donate.';
  if (!form.consent) errors.consent = 'Please confirm consent so we can match you with requests.';
  return errors;
}
