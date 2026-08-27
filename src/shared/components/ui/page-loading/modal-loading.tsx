import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export interface ModalLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: 'skeleton' | 'spinner';
  skeleton?: React.ReactNode;
  rows?: number;
  columns?: number;
}

export function ModalLoading({
  className,
  layout = 'skeleton',
  skeleton,
  rows = 6,
  columns = 2,
  ...props
}: ModalLoadingProps) {
  if (layout === 'spinner') {
    return (
      <div
        className={cn('flex min-h-[400px] items-center justify-center p-8', className)}
        {...props}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (skeleton) {
    return (
      <div className={className} {...props}>
        {skeleton}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      {/* Content Form Skeleton */}
      <div
        className={cn('grid grid-cols-1 gap-x-6 gap-y-6', {
          'md:grid-cols-2': columns === 2,
          'md:grid-cols-3': columns === 3,
          'md:grid-cols-4': columns === 4,
        })}
      >
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-4 w-32 animate-pulse rounded bg-foreground/10" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-foreground/15" />
          </div>
        ))}
      </div>
    </div>
  );
}
