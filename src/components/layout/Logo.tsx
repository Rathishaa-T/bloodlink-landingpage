import { Droplet } from 'lucide-react';
import { cx } from '@/lib/cx';

interface LogoProps {
  tone?: 'light' | 'dark';
  className?: string;
}

export function Logo({ tone = 'light', className }: LogoProps) {
  return (
    <a
      href="#top"
      aria-label="BloodLink home"
      className={cx('group inline-flex min-h-11 items-center gap-2.5 rounded-lg', className)}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 shadow-sm transition-transform duration-300 group-hover:-rotate-6">
        <Droplet className="h-5 w-5 fill-white text-white" aria-hidden="true" strokeWidth={1.5} />
      </span>
      <span
        className={cx(
          'font-display text-[22px] font-semibold tracking-tight',
          tone === 'dark' ? 'text-paper' : 'text-ink-900',
        )}
      >
        Blood<span className="text-brand-600">Link</span>
      </span>
    </a>
  );
}
