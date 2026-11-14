import type { BloodGroup } from '@/data/bloodGroups';

export type Urgency = 'Critical' | 'Within 24h' | 'Scheduled';

export interface BloodRequest {
  id: string;
  group: BloodGroup;
  unitsNeeded: number;
  unitsReceived: number;
  hospital: string;
  area: string;
  postedMinutesAgo: number;
  urgency: Urgency;
  note: string;
}

// Fictional hospitals and requests for demonstration only.
export const BLOOD_REQUESTS: BloodRequest[] = [
  {
    id: 'r-101',
    group: 'O−',
    unitsNeeded: 6,
    unitsReceived: 2,
    hospital: 'Kaveri Lifeline Hospital',
    area: 'Indiranagar, Bengaluru',
    postedMinutesAgo: 14,
    urgency: 'Critical',
    note: 'Emergency surgery scheduled for tonight.',
  },
  {
    id: 'r-102',
    group: 'B+',
    unitsNeeded: 4,
    unitsReceived: 3,
    hospital: 'Saffron Valley Hospital',
    area: 'Andheri West, Mumbai',
    postedMinutesAgo: 47,
    urgency: 'Within 24h',
    note: 'Post-delivery support for a patient.',
  },
  {
    id: 'r-103',
    group: 'A+',
    unitsNeeded: 3,
    unitsReceived: 0,
    hospital: 'Tamarind Grove Medical Centre',
    area: 'Saket, New Delhi',
    postedMinutesAgo: 95,
    urgency: 'Critical',
    note: 'Needed for a patient undergoing dialysis support.',
  },
  {
    id: 'r-104',
    group: 'AB−',
    unitsNeeded: 2,
    unitsReceived: 1,
    hospital: 'Brahmaputra Care Clinic',
    area: 'Salt Lake, Kolkata',
    postedMinutesAgo: 210,
    urgency: 'Within 24h',
    note: 'Planned orthopaedic procedure this week.',
  },
  {
    id: 'r-105',
    group: 'O+',
    unitsNeeded: 8,
    unitsReceived: 5,
    hospital: 'Nilgiri Community Blood Centre',
    area: 'T. Nagar, Chennai',
    postedMinutesAgo: 340,
    urgency: 'Scheduled',
    note: 'Thalassemia day-care transfusion schedule.',
  },
  {
    id: 'r-106',
    group: 'B−',
    unitsNeeded: 3,
    unitsReceived: 1,
    hospital: 'Lotus Pearl Hospital',
    area: 'Banjara Hills, Hyderabad',
    postedMinutesAgo: 520,
    urgency: 'Scheduled',
    note: 'Platelet-related procedure on Saturday morning.',
  },
];
