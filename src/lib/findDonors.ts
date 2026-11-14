import { CAN_DONATE_TO, type BloodGroup } from '@/data/bloodGroups';
import { DONORS, type Donor } from '@/data/donors';

interface DonorSearch {
  group: BloodGroup;
  location: string;
  availableNow: boolean;
}

export function findDonors({ group, location, availableNow }: DonorSearch): Donor[] {
  const query = location.trim().toLowerCase();

  return DONORS.filter(
    (donor) =>
      donor.group === group &&
      (query === '' || donor.area.toLowerCase().includes(query)) &&
      (!availableNow || donor.availableNow),
  ).sort((a, b) => a.distanceKm - b.distanceKm);
}

export function compatibilityHint(group: BloodGroup | null): string {
  if (!group) return 'O− can donate to all groups.';
  const targets = CAN_DONATE_TO[group];
  if (targets.length === 8) return `${group} can donate to all groups.`;
  return `${group} can donate to ${targets.join(', ')}.`;
}
