import type { LucideIcon } from 'lucide-react';
import { HeartHandshake, Megaphone, Building2 } from 'lucide-react';

export interface ActionCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ACTION_CARDS: ActionCardData[] = [
  {
    id: 'register',
    icon: HeartHandshake,
    title: 'Register as a donor',
    description: 'Join a verified network of donors and get matched with nearby requests.',
  },
  {
    id: 'drive',
    icon: Building2,
    title: 'Host a donation drive',
    description: 'Bring donors together at your college, office, or community hall.',
  },
  {
    id: 'awareness',
    icon: Megaphone,
    title: 'Spread awareness',
    description: 'Share a simple message that helps someone decide to donate today.',
  },
];

export const DRIVE_STEPS = [
  'Choose a date and venue with space for a mobile collection team.',
  'Confirm a partner blood bank or hospital to run the collection.',
  'Share the drive with your community and register volunteers.',
  'Follow up with donors and thank everyone who came.',
];

export const SHARE_MESSAGE =
  'One blood donation can help up to three patients. I am registering as a BloodLink donor. Join me and find out how easy it is.';

export const TESTIMONIAL = {
  quote:
    'I had no idea one donation could help three different patients until a BloodLink request reached my phone late one evening. I reached the hospital within the hour, and by morning a family I will never meet had their surgery.',
  name: 'Meera R.',
  role: 'Donor, Pune',
  note: 'Sample story. Fictional, for demonstration only.',
};
