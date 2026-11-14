# BloodLink – Every Drop Connects a Life

BloodLink is a blood donation homepage prototype designed to bring voluntary donors, people searching for blood, hospitals, and authorised blood banks closer through a clear and accessible digital experience.

## Features

- **Find a Donor:** Search and filter donor information by location and blood group using demonstration data.
- **Urgent Requests:** View sample urgent blood requests.
- **Become a Donor:** A guided donor-registration interface with basic details, eligibility, and availability steps.
- **Blood Bank Network:** Explore a sample blood-bank network and stock visualisations.
- **Donation Awareness:** Learn about donation eligibility, common myths, and the donation process.
- **Impact Section:** View illustrative donation-impact statistics.
- **Take Action:** Explore ways to participate and support blood donation.
- **Responsive UI:** Layouts and interactions designed for desktop and mobile screens.
- **Interactive components:** Filters, tabs, step flows, notifications, and animated section reveals.

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Run Locally

### Prerequisites
- Node.js (LTS recommended)
- npm

### Setup

```bash
npm install
npm run dev
```

Vite will print a local development URL in the terminal (usually `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── layout/          # Navbar, footer, logo, thread line
│   ├── sections/        # Homepage sections and feature flows
│   └── ui/              # Reusable buttons, badges, toast, reveal
├── data/                 # Demonstration donors, requests, banks, awareness
├── hooks/                # Reusable React hooks
├── lib/                  # Utility functions
├── App.tsx
├── index.css
└── main.tsx
```

## Prototype Notice

BloodLink is a frontend demonstration project. The donor listings, urgent requests, blood-bank information, and impact figures are sample data. The prototype does not provide verified donor availability, real-time blood inventory, emergency matching, medical advice, or live hospital/blood-bank integrations. Please contact authorised healthcare providers for actual blood-related assistance.

## Purpose

The project demonstrates how thoughtful UI/UX and frontend technology can support blood-donation awareness and make information easier to explore.
