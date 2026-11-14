import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';

const BASE =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-offset-paper';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-lift',
  secondary: 'border border-ink-900/20 bg-white text-ink-900 hover:border-brand-600 hover:text-brand-700',
  ghost: 'text-ink-800 hover:bg-ink-900/5 hover:text-brand-700',
  inverse: 'bg-paper text-ink-900 hover:bg-white focus-visible:ring-offset-ink-900',
};

export function buttonClass(variant: ButtonVariant = 'primary', extra?: string): string {
  return cx(BASE, VARIANTS[variant], extra);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = 'primary', className, type = 'button', children, ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...props}>
      {children}
    </button>
  );
}
