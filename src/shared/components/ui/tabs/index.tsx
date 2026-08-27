import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva('inline-flex items-center overflow-x-auto scrollbar-none', {
  variants: {
    variant: {
      underline: 'gap-3 border-b border-border',
      contained: 'gap-1 rounded-lg bg-muted p-1',
      card: 'gap-2 border-b border-border w-full items-end',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: { variant: 'underline' },
});

const tabsTriggerVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none',
  {
    variants: {
      variant: {
        underline:
          'border-b-2 border-transparent !text-muted-foreground hover:!text-foreground data-[state=active]:border-primary data-[state=active]:!text-primary !ring-0 !outline-0 focus:!ring-0 focus:!outline-0',
        contained:
          'rounded-md !text-muted-foreground hover:bg-muted/60 hover:!text-foreground data-[state=active]:bg-background data-[state=active]:!text-foreground data-[state=active]:shadow-xs',
        card: 'border border-b-0 border-border bg-muted/30 !text-muted-foreground hover:!text-foreground rounded-t-lg rounded-b-none data-[state=active]:bg-background data-[state=active]:!text-primary data-[state=active]:border-b-transparent data-[state=active]:shadow-[0_-2px_4px_rgba(0,0,0,0.05)] focus-visible:ring-0 focus-visible:ring-offset-0',
      },
      size: {
        sm: 'text-body-2-sb',
        md: 'text-body-1-sb',
        lg: 'text-title-3-sb',
      },
      fullWidth: {
        true: 'flex-1',
      },
    },
    compoundVariants: [
      { variant: 'underline', size: 'sm', className: 'pt-0 pb-2 px-1' },
      { variant: 'underline', size: 'md', className: 'pt-2 pb-2 px-1.5' },
      { variant: 'underline', size: 'lg', className: 'pt-2 pb-2 px-2' },
      { variant: 'contained', size: 'sm', className: 'py-2 px-3' },
      { variant: 'contained', size: 'md', className: 'py-2.5 px-3' },
      { variant: 'contained', size: 'lg', className: 'py-3 px-4' },
      { variant: 'card', size: 'sm', className: 'py-1.5 px-3' },
      { variant: 'card', size: 'md', className: 'py-2 px-4' },
      { variant: 'card', size: 'lg', className: 'py-2.5 px-5' },
    ],
    defaultVariants: { variant: 'underline', size: 'md' },
  },
);

interface TabsListProps
  extends
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant = 'underline', fullWidth, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, fullWidth }), className)}
      {...props}
    />
  ),
);
TabsList.displayName = TabsPrimitive.List.displayName;

interface TabsTriggerProps
  extends
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  badge?: number | string;
}

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(
  (
    { className, variant = 'underline', size = 'md', fullWidth, badge, children, ...props },
    ref,
  ) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {children}
      {badge != null && (
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-body-3-sb tabular-nums text-foreground">
          {badge}
        </span>
      )}
    </TabsPrimitive.Trigger>
  ),
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-4 focus-visible:outline-none', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger, tabsTriggerVariants };
