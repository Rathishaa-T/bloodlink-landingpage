import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export function FilterChip({ active, onClick, children, className }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200',
        active
          ? 'border-brand-600 bg-brand-600 text-white'
          : 'border-ink-900/15 bg-white text-ink-700 hover:border-brand-600 hover:text-brand-700',
        className,
      )}
    >
      {children}
    </button>
  );
}
