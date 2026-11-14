import type { BloodGroup } from '@/data/bloodGroups';

export interface Donor {
  id: string;
  firstName: string;
  lastInitial: string;
  group: BloodGroup;
  area: string;
  distanceKm: number;
  monthsSinceDonation: number | null;
  availableNow: boolean;
  availableFrom?: string;
}

// Fictional donors. Only first name and last initial are ever shown.
export const DONORS: Donor[] = [
  { id: 'd-01', firstName: 'Aarav', lastInitial: 'K', group: 'O−', area: 'Indiranagar, Bengaluru', distanceKm: 2.4, monthsSinceDonation: 4, availableNow: true },
  { id: 'd-02', firstName: 'Priya', lastInitial: 'S', group: 'O+', area: 'Koramangala, Bengaluru', distanceKm: 3.1, monthsSinceDonation: null, availableNow: true },
  { id: 'd-03', firstName: 'Rohan', lastInitial: 'M', group: 'A+', area: 'Indiranagar, Bengaluru', distanceKm: 1.2, monthsSinceDonation: 7, availableNow: false, availableFrom: 'in 2 weeks' },
  { id: 'd-04', firstName: 'Ananya', lastInitial: 'D', group: 'B+', area: 'Jayanagar, Bengaluru', distanceKm: 5.8, monthsSinceDonation: 5, availableNow: true },
  { id: 'd-05', firstName: 'Kabir', lastInitial: 'V', group: 'AB+', area: 'Whitefield, Bengaluru', distanceKm: 9.6, monthsSinceDonation: 12, availableNow: true },
  { id: 'd-06', firstName: 'Ishita', lastInitial: 'R', group: 'O−', area: 'Koramangala, Bengaluru', distanceKm: 4.0, monthsSinceDonation: 6, availableNow: false, availableFrom: 'next month' },
  { id: 'd-07', firstName: 'Vikram', lastInitial: 'N', group: 'B−', area: 'Jayanagar, Bengaluru', distanceKm: 6.3, monthsSinceDonation: null, availableNow: true },
  { id: 'd-08', firstName: 'Neha', lastInitial: 'P', group: 'A−', area: 'Indiranagar, Bengaluru', distanceKm: 2.9, monthsSinceDonation: 9, availableNow: true },
  { id: 'd-09', firstName: 'Siddharth', lastInitial: 'G', group: 'O+', area: 'Whitefield, Bengaluru', distanceKm: 10.2, monthsSinceDonation: 4, availableNow: true },
  { id: 'd-10', firstName: 'Meghna', lastInitial: 'L', group: 'AB−', area: 'Koramangala, Bengaluru', distanceKm: 3.7, monthsSinceDonation: 15, availableNow: true },
  { id: 'd-11', firstName: 'Arjun', lastInitial: 'T', group: 'A+', area: 'Jayanagar, Bengaluru', distanceKm: 5.1, monthsSinceDonation: 3, availableNow: false, availableFrom: 'in 1 week' },
  { id: 'd-12', firstName: 'Tara', lastInitial: 'B', group: 'O−', area: 'Whitefield, Bengaluru', distanceKm: 11.4, monthsSinceDonation: 8, availableNow: true },
  { id: 'd-13', firstName: 'Dev', lastInitial: 'H', group: 'B+', area: 'Indiranagar, Bengaluru', distanceKm: 1.8, monthsSinceDonation: null, availableNow: true },
  { id: 'd-14', firstName: 'Sana', lastInitial: 'F', group: 'A+', area: 'Koramangala, Bengaluru', distanceKm: 4.6, monthsSinceDonation: 10, availableNow: true },
];
