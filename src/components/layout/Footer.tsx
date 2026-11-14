import { HeartPulse, Phone } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { NAV_LINKS } from '@/data/navigation';

const YEAR = new Date().getFullYear();

export function Footer() {
  const primaryLinks = NAV_LINKS.slice(0, 4);
  const secondaryLinks = NAV_LINKS.slice(4);

  return (
    <footer className="relative bg-ink-900 text-paper">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="dark" />
          <p className="mt-5 max-w-sm font-display text-2xl leading-[1.25] text-paper">
            Every drop connects a life.
          </p>
          <p className="mt-4 max-w-sm text-sm text-paper/75">
            BloodLink helps voluntary donors, hospitals, and authorised blood banks find each other when it matters most.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4 lg:col-start-6">
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-brand-300">Explore</h3>
            <ul className="mt-4 space-y-1">
              {primaryLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-paper/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-brand-300">Learn and give</h3>
            <ul className="mt-4 space-y-1">
              {secondaryLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-paper/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="rounded-2xl border border-paper/15 bg-white/5 p-6 lg:col-span-3 lg:col-start-10">
          <div className="flex items-center gap-2 text-brand-300">
            <HeartPulse className="h-5 w-5" aria-hidden="true" />
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em]">Emergency helpline</h3>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-paper/80">
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            Helpline number: to be announced before launch
          </p>
          <p className="mt-3 text-xs leading-relaxed text-paper/60">
            Placeholder only. Replace with your verified helpline before going live.
          </p>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-paper/65 sm:flex-row sm:items-center sm:justify-between">
          <p>Prototype for demonstration. BloodLink does not provide medical services.</p>
          <p>
            &copy; {YEAR} BloodLink. Donor details, hospitals, and figures are fictional sample data.
          </p>
        </div>
      </div>
    </footer>
  );
}
