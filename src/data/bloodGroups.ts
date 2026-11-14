export const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'] as const;

export type BloodGroup = (typeof BLOOD_GROUPS)[number];

export function describeBloodGroup(group: BloodGroup): string {
  return `Blood group ${group.replace('+', ' positive').replace('−', ' negative')}`;
}

export const CAN_DONATE_TO: Record<BloodGroup, readonly BloodGroup[]> = {
  'O−': BLOOD_GROUPS,
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A−': ['A−', 'A+', 'AB−', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B−': ['B−', 'B+', 'AB−', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB−': ['AB−', 'AB+'],
  'AB+': ['AB+'],
};
