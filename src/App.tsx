import { BecomeDonor } from '@/components/sections/become-donor/BecomeDonor';
import { BloodBankNetwork } from '@/components/sections/blood-banks/BloodBankNetwork';
import { DonationAwareness } from '@/components/sections/awareness/DonationAwareness';
import { FindDonor } from '@/components/sections/find-donor/FindDonor';
import { Hero } from '@/components/sections/hero/Hero';
import { Impact } from '@/components/sections/impact/Impact';
import { TakeAction } from '@/components/sections/take-action/TakeAction';
import { UrgentRequests } from '@/components/sections/urgent-requests/UrgentRequests';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ThreadLine } from '@/components/layout/ThreadLine';
import { ToastProvider } from '@/components/ui/Toast';

function App() {
  return (
    <ToastProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="relative">
        <ThreadLine />
        <Hero />
        <FindDonor />
        <UrgentRequests />
        <BecomeDonor />
        <BloodBankNetwork />
        <DonationAwareness />
        <Impact />
        <TakeAction />
      </main>
      <Footer />
    </ToastProvider>
  );
}

export default App;
