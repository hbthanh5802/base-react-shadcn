import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  size?: 'small' | 'medium' | 'large';
  readOnly?: boolean;
}

const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size = 'large', readOnly = false, disabled, ...props }, ref) => {
    const rootSizeClasses = {
      large: 'peer h-6 w-6 shrink-0 rounded-md',
      medium: 'peer h-[18px] w-[18px] shrink-0 rounded-[4px]',
      small: 'peer h-4 w-4 shrink-0 rounded-[3px]',
    }[size];

    const iconSizeClasses = {
      large: 'h-4 w-4',
      medium: 'h-3 w-3',
      small: 'h-2.5 w-2.5',
    }[size];

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          [
            rootSizeClasses,
            'border transition-all duration-150 ease-out',
            'border-input bg-background text-primary-foreground',
            'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
            'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
            'hover:border-primary-500 hover:shadow-[0_0_0_3px_rgb(5_150_105_/_0.15)]',
            'active:border-primary-700 active:bg-primary-700 active:shadow-[0_0_0_3px_rgb(5_150_105_/_0.25)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'data-[ui-hover=true]:border-primary-500 data-[ui-hover=true]:shadow-[0_0_0_3px_rgb(5_150_105_/_0.15)]',
            'data-[ui-pressed=true]:border-primary-700 data-[ui-pressed=true]:bg-primary-700 data-[ui-pressed=true]:shadow-[0_0_0_3px_rgb(5_150_105_/_0.25)]',
            'data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-primary data-[ui-focus=true]:ring-offset-2 data-[ui-focus=true]:ring-offset-background',
            readOnly
              ? [
                  'disabled:cursor-default disabled:border-input disabled:bg-background disabled:opacity-100',
                  'disabled:data-[state=checked]:border-primary disabled:data-[state=checked]:bg-primary disabled:data-[state=checked]:text-primary-foreground',
                  'disabled:data-[state=indeterminate]:border-primary disabled:data-[state=indeterminate]:bg-primary disabled:data-[state=indeterminate]:text-primary-foreground',
                ]
              : [
                  'disabled:cursor-not-allowed disabled:border-border disabled:bg-muted/50 disabled:opacity-60',
                  'disabled:data-[state=checked]:border-border disabled:data-[state=checked]:bg-muted',
                  'disabled:data-[state=indeterminate]:border-border disabled:data-[state=indeterminate]:bg-muted',
                ],
          ],
          className,
        )}
        disabled={disabled || readOnly}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          forceMount
          className={cn(
            'flex h-full w-full items-center justify-center text-current',
            '[&[data-state=checked]_.icon-check]:block [&[data-state=indeterminate]_.icon-minus]:block',
          )}
        >
          <Check className={cn('icon-check hidden', iconSizeClasses)} />
          <Minus className={cn('icon-minus hidden', iconSizeClasses)} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
