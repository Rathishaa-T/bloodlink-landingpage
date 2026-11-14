import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { buttonClass } from '@/components/ui/Button';
import { NAV_LINKS } from '@/data/navigation';
import { cx } from '@/lib/cx';

const URGENT_HREF = '#urgent-requests';

function UrgentPill({ className }: { className?: string }) {
  return (
    <a
      href={URGENT_HREF}
      className={cx(
        'inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-700',
        className,
      )}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      <span className="sm:hidden">Urgent</span>
      <span className="hidden sm:inline">Urgent Requests</span>
    </a>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 8));

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cx(
        'sticky top-0 z-50 border-b bg-paper/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300',
        scrolled ? 'border-ink-900/10 shadow-card' : 'border-transparent',
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="group relative inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-ink-700 transition-colors hover:text-brand-700"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-2 h-px origin-left scale-x-0 bg-brand-600 transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <UrgentPill />
          <a href="#become-donor" className={cx(buttonClass('secondary'), 'hidden md:inline-flex')}>
            Become a Donor
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-900/5 xl:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t border-ink-900/10 bg-paper xl:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-11 items-center rounded-xl px-3 text-base font-medium text-ink-800 transition-colors hover:bg-blush hover:text-brand-700"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#become-donor"
                onClick={closeMenu}
                className={buttonClass('primary', 'mt-3 w-full')}
              >
                Become a Donor
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
