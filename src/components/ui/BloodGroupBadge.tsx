import type { BloodGroup } from '@/data/bloodGroups';
import { cx } from '@/lib/cx';

interface BloodGroupBadgeProps {
  group: BloodGroup;
  size?: 'sm' | 'lg';
  className?: string;
}

export function BloodGroupBadge({ group, size = 'sm', className }: BloodGroupBadgeProps) {
  return (
    <span
      aria-label={`Blood group ${group}`}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-xl bg-brand-600 font-semibold text-white',
        size === 'sm' ? 'h-9 min-w-9 px-2 text-sm' : 'h-14 min-w-14 px-3 font-display text-2xl',
        className,
      )}
    >
      {group}
    </span>
  );
}
