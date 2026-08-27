import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  variant?: 'default' | 'compact';
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon,
      title,
      description,
      primaryAction,
      secondaryAction,
      variant = 'default',
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center text-center',
        variant === 'default' ? 'gap-4 py-8 sm:py-12' : 'gap-3 py-4 sm:py-6',
        className,
      )}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            'flex shrink-0 items-center justify-center rounded-xl bg-accent text-muted-foreground',
            variant === 'default' ? 'h-12 w-12' : 'h-9 w-9',
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <p
          className={cn(
            variant === 'default'
              ? 'text-title-2-sb text-foreground'
              : 'text-body-1-sb text-foreground',
          )}
        >
          {title}
        </p>
        {description && (
          <p
            className={cn(
              variant === 'default'
                ? 'text-body-2-rg text-muted-foreground'
                : 'text-body-3-rg text-muted-foreground',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-3">
          {secondaryAction}
          {primaryAction}
        </div>
      )}
    </div>
  ),
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };
