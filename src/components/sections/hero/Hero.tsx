import { ArrowRight } from 'lucide-react';
import { DropMark } from '@/components/sections/hero/DropMark';
import { TrustStrip } from '@/components/sections/hero/TrustStrip';
import { buttonClass } from '@/components/ui/Button';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-12 sm:pt-16 lg:pb-28 lg:pt-20">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-3.5 py-1.5 text-xs font-medium text-ink-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-success-500" aria-hidden="true" />
            Verified donors and blood banks across India
          </p>

          <h1 id="hero-title" className="mt-6 text-[44px] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            Every Drop <br className="hidden sm:block" />
            Connects a <em className="italic text-brand-600">Life.</em>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-ink-600 sm:text-xl">
            BloodLink links voluntary donors with hospitals and authorised blood banks, so the right blood reaches the
            right patient, faster.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#find-donor" className={buttonClass('primary', 'group w-full sm:w-auto')}>
              Find a Donor
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href="#become-donor" className={buttonClass('secondary', 'w-full sm:w-auto')}>
              Become a Donor
            </a>
          </div>

          <TrustStrip className="mt-14 border-t border-ink-900/10 pt-8" />
        </div>

        <div className="lg:col-span-5">
          <DropMark />
        </div>
      </div>
    </section>
  );
}
