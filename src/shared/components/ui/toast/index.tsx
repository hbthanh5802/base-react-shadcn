import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib/utils';

const toastVariants = cva(
  'pointer-events-auto flex w-full max-w-sm min-h-12 h-auto items-start gap-3 rounded-xl border p-4 shadow-lg transition-all break-words',
  {
    variants: {
      variant: {
        info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-700 dark:bg-blue-900/40 dark:text-blue-200',
        success:
          'border-success-200 bg-success-50 text-success-800 dark:border-success-700 dark:bg-success-900/40 dark:text-success-200',
        warning:
          'border-warning-200 bg-warning-50 text-warning-800 dark:border-warning-700 dark:bg-warning-900/40 dark:text-warning-200',
        error:
          'border-error-200 bg-error-50 text-error-800 dark:border-error-700 dark:bg-error-900/40 dark:text-error-200',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

const toastIconColorMap = {
  info: 'text-blue-500',
  success: 'text-success-500',
  warning: 'text-warning-500',
  error: 'text-error-500',
};

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9v5M10 6.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6.5 10L8.8 12.5L13.5 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M10 2L18.66 17H1.34L10 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M10 8v4M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const iconMap = { info: InfoIcon, success: SuccessIcon, warning: WarningIcon, error: ErrorIcon };

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  onDismiss?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'info', title, description, action, onDismiss, ...props }, ref) => {
    const { t } = useTranslation('components');
    const Icon = iconMap[variant ?? 'info'];
    return (
      <div ref={ref} className={cn(toastVariants({ variant }), className)} role="alert" {...props}>
        <span className={cn('mt-0.5 shrink-0', toastIconColorMap[variant ?? 'info'])}>
          <Icon />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1 break-words">
          <p className="whitespace-normal break-words text-body-2-sb">{title}</p>
          {description && (
            <p className="whitespace-normal break-words text-body-3-rg opacity-80">{description}</p>
          )}
          {action && <div className="mt-2">{action}</div>}
        </div>
        {onDismiss && (
          <button
            type="button"
            aria-label={t('toast.dismiss')}
            onClick={onDismiss}
            className="shrink-0 self-start rounded p-0.5 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);
Toast.displayName = 'Toast';

export { Toast, toastVariants };
