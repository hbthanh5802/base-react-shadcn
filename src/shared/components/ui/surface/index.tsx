import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export const surfaceVariants = cva(
  'transition-all duration-150',
  {
    variants: {
      level: {
        base: 'bg-background text-foreground',
        card: 'bg-card text-card-foreground',
        subtle: 'bg-muted/40 text-foreground',
        inset: 'bg-muted/70 text-foreground',
        elevated: 'bg-popover text-popover-foreground shadow-md',
        primary: 'bg-primary-50 text-primary-900 dark:bg-primary-950/40 dark:text-primary-100',
        destructive: 'bg-destructive/10 text-destructive',
        transparent: 'bg-transparent text-foreground',
      },
      border: {
        none: 'border-0',
        default: 'border border-border',
        subtle: 'border border-border/50',
        dashed: 'border border-dashed border-border',
        primary: 'border border-primary/40',
        destructive: 'border border-destructive/30',
      },
      shadow: {
        none: 'shadow-none',
        '2xs': 'shadow-2xs',
        xs: 'shadow-xs',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full',
      },
      padding: {
        none: 'p-0',
        xs: 'p-2',
        sm: 'p-3.5',
        md: 'p-5',
        lg: 'p-6',
        xl: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 select-none',
        false: '',
      },
      selected: {
        true: 'border-primary ring-2 ring-primary/20 bg-primary/5',
        false: '',
      },
    },
    defaultVariants: {
      level: 'card',
      border: 'default',
      shadow: 'none',
      radius: 'xl',
      padding: 'md',
      interactive: false,
      selected: false,
    },
  },
);

export type SurfaceLevel = NonNullable<VariantProps<typeof surfaceVariants>['level']>;
export type SurfaceBorder = NonNullable<VariantProps<typeof surfaceVariants>['border']>;
export type SurfaceShadow = NonNullable<VariantProps<typeof surfaceVariants>['shadow']>;
export type SurfaceRadius = NonNullable<VariantProps<typeof surfaceVariants>['radius']>;
export type SurfacePadding = NonNullable<VariantProps<typeof surfaceVariants>['padding']>;

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof surfaceVariants> {
  /**
   * Thẻ HTML tùy biến (Polymorphic: div, section, article, aside, main, header, footer, etc.)
   * Mặc định: 'div'
   */
  as?: React.ElementType;
}

export const Surface = React.forwardRef<HTMLElement, SurfaceProps>(
  (
    {
      as: Component = 'div',
      className,
      level,
      border,
      shadow,
      radius,
      padding,
      interactive,
      selected,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          surfaceVariants({
            level,
            border,
            shadow,
            radius,
            padding,
            interactive,
            selected,
            className,
          }),
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Surface.displayName = 'Surface';

export { Surface as Panel, Surface as Box };
export default Surface;
