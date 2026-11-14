export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: 'find-donor', label: 'Find a Donor', href: '#find-donor' },
  { id: 'urgent-requests', label: 'Urgent Requests', href: '#urgent-requests' },
  { id: 'become-donor', label: 'Become a Donor', href: '#become-donor' },
  { id: 'blood-banks', label: 'Blood Banks', href: '#blood-banks' },
  { id: 'awareness', label: 'Awareness', href: '#awareness' },
  { id: 'impact', label: 'Impact', href: '#impact' },
  { id: 'take-action', label: 'Take Action', href: '#take-action' },
];
