import * as SelectPrimitive from '@radix-ui/react-select';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
type SelectDisplayPosition = 'auto' | 'top' | 'bottom';

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    displayValueClassName?: string;
    error?: boolean;
  }
>(({ className, children, displayValueClassName, error, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-11 w-full items-center justify-between rounded-lg border border-input bg-background px-3.5 text-sm font-medium text-foreground transition-all',
      'hover:border-primary-400 focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
      'disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground',
      error && 'border-error-600 focus-visible:border-error-600 focus-visible:ring-error-600/20',
      'aria-invalid:border-error-600 aria-invalid:focus-visible:border-error-600 aria-invalid:focus-visible:ring-error-600/20',
      className,
    )}
    {...props}
  >
    <span className={cn('text-left', displayValueClassName)}>{children}</span>
    <SelectPrimitive.Icon asChild>
      <ArrowDown2 className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 text-muted-foreground',
      className,
    )}
    {...props}
  >
    <ArrowUp2 className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 text-muted-foreground',
      className,
    )}
    {...props}
  >
    <ArrowDown2 className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    displayPosition?: SelectDisplayPosition;
  }
>(
  (
    {
      className,
      children,
      position = 'popper',
      displayPosition = 'auto',
      side,
      avoidCollisions = true,
      sideOffset = 6,
      ...props
    },
    ref,
  ) => {
    const resolvedSide = displayPosition === 'auto' ? side : displayPosition;
    const resolvedAvoidCollisions = displayPosition === 'auto' ? avoidCollisions : false;

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            'relative z-50 max-h-80 min-w-[8rem] overflow-hidden rounded-xl border border-border/80 bg-popover text-popover-foreground shadow-lg duration-150',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            position === 'popper' &&
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            className,
          )}
          position={position}
          side={resolvedSide}
          avoidCollisions={resolvedAvoidCollisions}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport
            className={cn(
              'p-1.5',
              position === 'popper' &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
            )}
          >
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  },
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-3 pr-8 text-sm font-medium text-popover-foreground outline-none transition-colors',
      'hover:bg-muted/80 focus:bg-primary/10 focus:text-foreground',
      'data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary data-[state=checked]:font-semibold',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-2.5 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary font-bold" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border/80', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
