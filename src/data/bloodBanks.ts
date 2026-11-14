import type { BloodGroup } from '@/data/bloodGroups';

export type FacilityType = 'Hospital' | 'Blood Bank';
export type Component = 'Whole blood' | 'Platelets' | 'Plasma' | 'Red cells' | 'Cryoprecipitate';
export type StockLevel = 'low' | 'medium' | 'good';

export interface BloodBank {
  id: string;
  name: string;
  type: FacilityType;
  area: string;
  hours: string;
  open24x7: boolean;
  components: Component[];
  stock: Record<BloodGroup, StockLevel>;
  // Position on the stylised map, in a 400 x 320 viewBox
  pin: { x: number; y: number };
}

const stock = (
  levels: [StockLevel, StockLevel, StockLevel, StockLevel, StockLevel, StockLevel, StockLevel, StockLevel],
): Record<BloodGroup, StockLevel> => ({
  'A+': levels[0],
  'A−': levels[1],
  'B+': levels[2],
  'B−': levels[3],
  'AB+': levels[4],
  'AB−': levels[5],
  'O+': levels[6],
  'O−': levels[7],
});

// Fictional facilities for demonstration only.
export const BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb-01',
    name: 'Kaveri Lifeline Hospital',
    type: 'Hospital',
    area: 'Indiranagar, Bengaluru',
    hours: 'Open 24x7',
    open24x7: true,
    components: ['Whole blood', 'Platelets', 'Plasma', 'Red cells'],
    stock: stock(['good', 'low', 'medium', 'low', 'good', 'low', 'good', 'medium']),
    pin: { x: 150, y: 210 },
  },
  {
    id: 'bb-02',
    name: 'Nilgiri Community Blood Centre',
    type: 'Blood Bank',
    area: 'Koramangala, Bengaluru',
    hours: '8:00 AM to 8:00 PM',
    open24x7: false,
    components: ['Whole blood', 'Red cells'],
    stock: stock(['medium', 'low', 'good', 'low', 'low', 'low', 'good', 'low']),
    pin: { x: 135, y: 232 },
  },
  {
    id: 'bb-03',
    name: 'Saffron Valley Hospital',
    type: 'Hospital',
    area: 'Andheri West, Mumbai',
    hours: 'Open 24x7',
    open24x7: true,
    components: ['Whole blood', 'Platelets', 'Plasma', 'Cryoprecipitate', 'Red cells'],
    stock: stock(['good', 'medium', 'good', 'medium', 'good', 'low', 'good', 'medium']),
    pin: { x: 80, y: 190 },
  },
  {
    id: 'bb-04',
    name: 'Indigo Hill Blood Bank',
    type: 'Blood Bank',
    area: 'Dadar, Mumbai',
    hours: '9:00 AM to 6:00 PM',
    open24x7: false,
    components: ['Whole blood', 'Plasma'],
    stock: stock(['medium', 'medium', 'low', 'good', 'medium', 'low', 'good', 'good']),
    pin: { x: 92, y: 178 },
  },
  {
    id: 'bb-05',
    name: 'Tamarind Grove Medical Centre',
    type: 'Hospital',
    area: 'Saket, New Delhi',
    hours: 'Open 24x7',
    open24x7: true,
    components: ['Whole blood', 'Platelets', 'Red cells'],
    stock: stock(['low', 'low', 'medium', 'good', 'good', 'low', 'medium', 'low']),
    pin: { x: 150, y: 80 },
  },
  {
    id: 'bb-06',
    name: 'Harbour Light Blood Bank',
    type: 'Blood Bank',
    area: 'Salt Lake, Kolkata',
    hours: '24x7 emergency desk',
    open24x7: true,
    components: ['Whole blood', 'Red cells', 'Plasma'],
    stock: stock(['good', 'medium', 'good', 'low', 'medium', 'low', 'good', 'low']),
    pin: { x: 290, y: 150 },
  },
  {
    id: 'bb-07',
    name: 'Lotus Pearl Hospital',
    type: 'Hospital',
    area: 'Banjara Hills, Hyderabad',
    hours: 'Open 24x7',
    open24x7: true,
    components: ['Whole blood', 'Platelets', 'Plasma', 'Cryoprecipitate'],
    stock: stock(['medium', 'low', 'medium', 'low', 'good', 'medium', 'medium', 'good']),
    pin: { x: 175, y: 215 },
  },
  {
    id: 'bb-08',
    name: 'Brahmaputra Care Clinic',
    type: 'Hospital',
    area: 'Viman Nagar, Pune',
    hours: '7:00 AM to 10:00 PM',
    open24x7: false,
    components: ['Whole blood', 'Red cells'],
    stock: stock(['good', 'low', 'good', 'low', 'medium', 'low', 'medium', 'low']),
    pin: { x: 115, y: 200 },
  },
];
