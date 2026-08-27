import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn('grid gap-2', className)} {...props} />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioButton = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      [
        'peer h-6 w-6 shrink-0 rounded-full border-2 border-neutral-400 dark:border-neutral-600 bg-background text-primary transition-all duration-150 ease-out cursor-pointer active:scale-90',
        'data-[state=checked]:border-primary',
        'hover:border-primary-500 hover:shadow-[0_0_0_3px_rgb(5_150_105_/_0.15)]',
        'active:border-primary-700 active:shadow-[0_0_0_3px_rgb(5_150_105_/_0.25)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'data-[ui-hover=true]:border-primary-500 data-[ui-hover=true]:shadow-[0_0_0_3px_rgb(5_150_105_/_0.15)]',
        'data-[ui-pressed=true]:border-primary-700 data-[ui-pressed=true]:shadow-[0_0_0_3px_rgb(5_150_105_/_0.25)]',
        'data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-primary data-[ui-focus=true]:ring-offset-2 data-[ui-focus=true]:ring-offset-background',
        'disabled:cursor-not-allowed disabled:border-border disabled:bg-muted/50 disabled:opacity-60',
      ],
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <span className="h-2.5 w-2.5 rounded-full bg-primary peer-disabled:bg-muted-foreground" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioButton.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioButton, RadioGroup };
