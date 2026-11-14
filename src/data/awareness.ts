import type { LucideIcon } from 'lucide-react';
import { Calendar, Scale, Activity, HeartPulse } from 'lucide-react';

export interface EligibilityRule {
  id: string;
  icon: LucideIcon;
  title: string;
  detail: string;
}

export const ELIGIBILITY_RULES: EligibilityRule[] = [
  { id: 'age', icon: Calendar, title: 'Age 18 to 65', detail: 'Generally between 18 and 65 years old, in good general health.' },
  { id: 'weight', icon: Scale, title: 'Weight at least 45 kg', detail: 'Donors need to weigh at least 45 kilograms on the day of donation.' },
  { id: 'hb', icon: Activity, title: 'Haemoglobin at least 12.5 g/dL', detail: 'A simple finger-prick test checks your haemoglobin before every donation.' },
  { id: 'healthy', icon: HeartPulse, title: 'Healthy on the day', detail: 'You should feel well, with no fever, active infection, or recent illness.' },
];

export interface DonationGap {
  id: string;
  label: string;
  months: number;
}

export const DONATION_GAPS: DonationGap[] = [
  { id: 'men', label: 'Men', months: 3 },
  { id: 'women', label: 'Women', months: 4 },
];

export interface DonationStep {
  id: string;
  title: string;
  duration: string;
  summary: string;
  detail: string;
}

export const DONATION_STEPS: DonationStep[] = [
  {
    id: 'register',
    title: 'Register',
    duration: '2 min',
    summary: 'Share basic details and a valid ID.',
    detail: 'Give us your basic details and a valid photo ID. Your information stays confidential and is used only to contact you about donations.',
  },
  {
    id: 'screening',
    title: 'Health screening',
    duration: '10 min',
    summary: 'A short, private check with a trained staff member.',
    detail: 'A staff member checks your temperature, pulse, blood pressure, and haemoglobin, and asks a few questions about your health history.',
  },
  {
    id: 'donate',
    title: 'Donate',
    duration: 'About 10 min',
    summary: 'Roughly 350 ml, collected in a sterile, single-use kit.',
    detail: 'A sterile, single-use needle is used. The donation itself takes about 8 to 10 minutes, and you can relax in a comfortable chair.',
  },
  {
    id: 'rest',
    title: 'Rest and refreshments',
    duration: '15 min',
    summary: 'Sit back, have a snack, and drink fluids.',
    detail: 'Rest for about 15 minutes with a snack and a drink. Avoid heavy lifting for the rest of the day and keep up your fluids.',
  },
];

export interface Myth {
  id: string;
  myth: string;
  fact: string;
}

export const MYTHS: Myth[] = [
  {
    id: 'weak',
    myth: 'Donating blood makes you weak.',
    fact: 'Your body replaces the fluid within about 24 hours, and the red cells over several weeks. Most healthy donors feel fine after a short rest and a drink.',
  },
  {
    id: 'pain',
    myth: "It's painful.",
    fact: 'You feel a brief pinch when the needle goes in. The donation itself is usually comfortable, and most donors describe it as easier than they expected.',
  },
  {
    id: 'tattoo',
    myth: 'You can never donate after getting a tattoo.',
    fact: 'It is usually a waiting period, not a lifetime ban. The wait depends on where and how the tattoo was done, so check with your donation centre.',
  },
  {
    id: 'lab',
    myth: 'Lab-made blood means donors are no longer needed.',
    fact: 'Blood cannot be manufactured. It only comes from donors, and components such as platelets have short shelf lives, so regular donors matter.',
  },
  {
    id: 'group',
    myth: 'Only O negative blood is needed.',
    fact: 'Every blood group is needed. O negative is vital in emergencies, but patients of all groups depend on regular donations.',
  },
  {
    id: 'infection',
    myth: 'Donating can give you an infection.',
    fact: 'Needles and collection kits are sterile and single-use, so you cannot catch an infection from donating blood.',
  },
];
