import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { cx } from '@/lib/cx';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeader({ index, eyebrow, title, description, tone = 'light', className }: SectionHeaderProps) {
  const isDark = tone === 'dark';

  return (
    <Reveal className={cx('max-w-2xl', className)}>
      <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em]">
        <span className={isDark ? 'text-brand-300' : 'text-brand-600'}>{index}</span>
        <span className={cx('h-px w-8', isDark ? 'bg-brand-300/60' : 'bg-brand-600/40')} aria-hidden="true" />
        <span className={isDark ? 'text-paper/80' : 'text-ink-600'}>{eyebrow}</span>
      </p>
      <h2
        className={cx(
          'mt-4 text-4xl leading-[1.2] sm:text-5xl',
          isDark ? 'text-paper' : 'text-ink-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cx('mt-4 text-base sm:text-lg', isDark ? 'text-paper/80' : 'text-ink-600')}>{description}</p>
      )}
    </Reveal>
  );
}
