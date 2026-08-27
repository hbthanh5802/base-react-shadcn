import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Check, X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  iconMode?: 'none' | 'active' | 'all';
  readOnly?: boolean;
}

const Switch = React.forwardRef<React.ComponentRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, iconMode = 'none', readOnly = false, disabled, ...props }, ref) => (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        [
          'peer inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-transparent transition-all duration-150 ease-out',
          'bg-input data-[state=checked]:bg-primary',
          'hover:shadow-[0_0_0_3px_rgb(5_150_105_/_0.15)]',
          'active:shadow-[0_0_0_3px_rgb(5_150_105_/_0.2)] active:data-[state=checked]:bg-primary-800 active:data-[state=unchecked]:bg-neutral-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'data-[ui-hover=true]:shadow-[0_0_0_3px_rgb(5_150_105_/_0.15)]',
          'data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-primary data-[ui-focus=true]:ring-offset-2 data-[ui-focus=true]:ring-offset-background',
          'data-[ui-pressed=true]:data-[state=checked]:bg-primary-800 data-[ui-pressed=true]:data-[state=unchecked]:bg-neutral-300',
          'data-[ui-pressed=true]:shadow-[0_0_0_3px_rgb(5_150_105_/_0.2)]',
          readOnly
            ? 'disabled:cursor-default disabled:bg-input disabled:shadow-none disabled:data-[state=checked]:bg-primary'
            : 'disabled:cursor-not-allowed disabled:bg-muted disabled:shadow-none disabled:data-[state=checked]:bg-muted-foreground/30',
        ],
        className,
      )}
      disabled={disabled || readOnly}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn([
          'pointer-events-none relative block h-[18px] w-[18px] rounded-full bg-background shadow transition-transform duration-150 ease-out',
          'translate-x-0.5 data-[state=checked]:translate-x-[18px]',
          '[&[data-state=checked]_.icon-check]:block [&[data-state=unchecked]_.icon-x]:block',
          readOnly ? 'disabled:bg-background' : 'disabled:bg-muted-foreground/40',
        ])}
      >
        {iconMode !== 'none' && (
          <>
            <Check
              className={cn([
                'absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2',
                'icon-check text-primary',
                'peer-disabled:text-muted-foreground',
              ])}
            />
            {iconMode === 'all' && (
              <X
                className={cn([
                  'absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2',
                  'icon-x text-muted-foreground',
                  'peer-disabled:text-muted-foreground',
                ])}
              />
            )}
          </>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  ),
);
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
