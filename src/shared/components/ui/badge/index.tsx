import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib/utils';

const badgeVariants = cva(
  'inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-semibold transition-colors',
  {
    variants: {
      variant: {
        filled: '',
        light: '',
        outline: 'border bg-transparent',
        dot: 'bg-transparent',
      },
      tone: {
        brand: '',
        gray: '',
        error: '',
        warning: '',
        success: '',
        blue: '',
        purple: '',
        pink: '',
        orange: '',
        teal: '',
      },
      size: {
        sm: 'h-5 rounded-full px-2 text-body-3-sb',
        md: 'h-6 rounded-full px-2.5 text-body-3-sb',
        lg: 'h-7 rounded-full px-3 text-body-2-sb',
      },
    },
    compoundVariants: [
      // filled
      { variant: 'filled', tone: 'brand', className: 'bg-primary-600 text-neutral-0' },
      { variant: 'filled', tone: 'gray', className: 'bg-gray-700 text-neutral-0' },
      { variant: 'filled', tone: 'error', className: 'bg-error-600 text-neutral-0' },
      { variant: 'filled', tone: 'warning', className: 'bg-warning-600 text-neutral-0' },
      { variant: 'filled', tone: 'success', className: 'bg-success-600 text-neutral-0' },
      { variant: 'filled', tone: 'blue', className: 'bg-blue-600 text-neutral-0' },
      { variant: 'filled', tone: 'purple', className: 'bg-[#6938EF] text-neutral-0' },
      { variant: 'filled', tone: 'pink', className: 'bg-[#DD2590] text-neutral-0' },
      { variant: 'filled', tone: 'orange', className: 'bg-[#E04F16] text-neutral-0' },
      { variant: 'filled', tone: 'teal', className: 'bg-[#0E9384] text-neutral-0' },
      // light
      {
        variant: 'light',
        tone: 'brand',
        className: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200',
      },
      {
        variant: 'light',
        tone: 'gray',
        className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
      },
      {
        variant: 'light',
        tone: 'error',
        className: 'bg-error-100 text-error-700 dark:bg-error-900 dark:text-error-200',
      },
      {
        variant: 'light',
        tone: 'warning',
        className: 'bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-200',
      },
      {
        variant: 'light',
        tone: 'success',
        className: 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-200',
      },
      {
        variant: 'light',
        tone: 'blue',
        className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
      },
      {
        variant: 'light',
        tone: 'purple',
        className: 'bg-[#D9D6FE] text-[#4A1FB8] dark:bg-[#2D1B6B] dark:text-[#BDB4FE]',
      },
      {
        variant: 'light',
        tone: 'pink',
        className: 'bg-[#FCCEEE] text-[#9E165F] dark:bg-[#4A0E2A] dark:text-[#FDB5D9]',
      },
      {
        variant: 'light',
        tone: 'orange',
        className: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200',
      },
      {
        variant: 'light',
        tone: 'teal',
        className: 'bg-[#99F6E0] text-[#125D56] dark:bg-[#0A3530] dark:text-[#5FE8CE]',
      },
      // outline
      { variant: 'outline', tone: 'brand', className: 'border-primary-600 text-primary-600' },
      { variant: 'outline', tone: 'gray', className: 'border-gray-300 text-gray-700' },
      { variant: 'outline', tone: 'error', className: 'border-error-500 text-error-600' },
      { variant: 'outline', tone: 'warning', className: 'border-warning-400 text-warning-600' },
      { variant: 'outline', tone: 'success', className: 'border-success-400 text-success-600' },
      { variant: 'outline', tone: 'blue', className: 'border-blue-400 text-blue-600' },
      { variant: 'outline', tone: 'purple', className: 'border-[#9B8AFB] text-[#6938EF]' },
      { variant: 'outline', tone: 'pink', className: 'border-[#F670C7] text-[#DD2590]' },
      { variant: 'outline', tone: 'orange', className: 'border-orange-400 text-orange-600' },
      { variant: 'outline', tone: 'teal', className: 'border-[#2ED3B7] text-[#0E9384]' },
      // dot
      { variant: 'dot', tone: 'brand', className: 'text-primary-700' },
      { variant: 'dot', tone: 'gray', className: 'text-gray-700' },
      { variant: 'dot', tone: 'error', className: 'text-error-700' },
      { variant: 'dot', tone: 'warning', className: 'text-warning-700' },
      { variant: 'dot', tone: 'success', className: 'text-success-700' },
      { variant: 'dot', tone: 'blue', className: 'text-blue-700' },
      { variant: 'dot', tone: 'purple', className: 'text-[#4A1FB8]' },
      { variant: 'dot', tone: 'pink', className: 'text-[#9E165F]' },
      { variant: 'dot', tone: 'orange', className: 'text-orange-700' },
      { variant: 'dot', tone: 'teal', className: 'text-[#125D56]' },
    ],
    defaultVariants: {
      variant: 'light',
      tone: 'gray',
      size: 'md',
    },
  },
);

const dotColorMap: Record<string, string> = {
  brand: 'bg-primary-600',
  gray: 'bg-gray-500',
  error: 'bg-error-600',
  warning: 'bg-warning-500',
  success: 'bg-success-500',
  blue: 'bg-blue-500',
  purple: 'bg-[#7A5AF8]',
  pink: 'bg-[#EE46BC]',
  orange: 'bg-[#EF6820]',
  teal: 'bg-[#15B79E]',
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  onDismiss?: () => void;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = 'light', tone = 'gray', size = 'md', onDismiss, children, ...props },
    ref,
  ) => {
    const { t } = useTranslation('components');
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, tone, size, className }))} {...props}>
        {variant === 'dot' && (
          <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotColorMap[tone ?? 'gray'])} />
        )}
        {children}
        {onDismiss && (
          <button
            type="button"
            aria-label={t('badge.dismiss')}
            onClick={onDismiss}
            className="inline-flex shrink-0 items-center justify-center rounded-full opacity-70 hover:opacity-100"
          >
            <X size={14} />
          </button>
        )}
      </span>
    );
  },
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
