import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all duration-150 ease-out active:scale-[0.98] [&_svg]:shrink-0 [&_svg]:text-current [&_svg]:[stroke-width:2.2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border border-transparent bg-primary text-primary-foreground shadow-xs hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary data-[ui-hover=true]:bg-primary-700 data-[ui-pressed=true]:bg-primary-800 data-[ui-pressed=true]:scale-[0.98] data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-primary data-[ui-focus=true]:ring-offset-2 disabled:bg-muted disabled:!text-muted-foreground disabled:opacity-50',
        destructive:
          'border border-transparent bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive data-[ui-hover=true]:bg-destructive/90 data-[ui-pressed=true]:bg-destructive/80 data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-destructive data-[ui-focus=true]:ring-offset-2 disabled:bg-muted disabled:!text-muted-foreground disabled:opacity-50',
        outline:
          'rounded-lg border border-border bg-background text-foreground hover:bg-muted focus-visible:ring-primary data-[ui-hover=true]:bg-muted data-[ui-pressed=true]:bg-muted/80 data-[ui-pressed=true]:scale-[0.98] data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-primary data-[ui-focus=true]:ring-offset-2 disabled:border-border disabled:bg-muted/50 disabled:!text-muted-foreground disabled:opacity-50',
        outlinePrimary:
          'rounded-lg border-[2px] border-primary bg-background text-primary hover:bg-primary-50 focus-visible:ring-primary data-[ui-hover=true]:bg-primary-50 data-[ui-pressed=true]:bg-primary-100 data-[ui-pressed=true]:scale-[0.98] data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-primary data-[ui-focus=true]:ring-offset-2 disabled:border-muted disabled:bg-muted/50 disabled:!text-muted-foreground disabled:opacity-50 dark:hover:bg-primary-950/50 dark:data-[ui-hover=true]:bg-primary-950/50 dark:data-[ui-pressed=true]:bg-primary-900',
        secondary:
          'rounded-lg border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-primary data-[ui-hover=true]:bg-secondary/80 data-[ui-pressed=true]:bg-secondary/70 data-[ui-pressed=true]:scale-[0.98] data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-primary data-[ui-focus=true]:ring-offset-2 disabled:bg-muted disabled:!text-muted-foreground disabled:opacity-50',
        secondPrimary:
          'rounded-lg border border-transparent bg-primary-50 text-primary hover:bg-primary-100 active:bg-primary-150 focus-visible:ring-primary data-[ui-hover=true]:bg-primary-100 data-[ui-pressed=true]:bg-primary-150 data-[ui-pressed=true]:scale-[0.98] data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-primary data-[ui-focus=true]:ring-offset-2 disabled:bg-muted disabled:!text-muted-foreground disabled:opacity-50 dark:bg-primary-950/50 dark:text-primary-400 dark:hover:bg-primary-900 dark:disabled:bg-muted',
        ghost:
          'rounded-lg border border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary data-[ui-hover=true]:bg-accent data-[ui-pressed=true]:bg-accent/80 data-[ui-pressed=true]:scale-[0.98] data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-primary data-[ui-focus=true]:ring-offset-2 disabled:!text-muted-foreground disabled:opacity-50',
        text: 'rounded-lg border border-transparent bg-transparent text-primary hover:bg-primary-50 active:bg-primary-100 data-[ui-hover=true]:bg-primary-50 data-[ui-pressed=true]:bg-primary-100 data-[ui-pressed=true]:scale-[0.98] focus-visible:ring-primary data-[ui-focus=true]:ring-2 data-[ui-focus=true]:ring-primary data-[ui-focus=true]:ring-offset-2 disabled:!text-muted-foreground disabled:opacity-50 dark:hover:bg-primary-950/40',
        link: 'text-primary underline-offset-4 hover:underline focus-visible:ring-primary',
      },
      tone: {
        primary: '',
        blue: '',
        green: '',
        yellow: '',
        orange: '',
        purple: '',
        gray: '',
      },
      size: {
        large: 'h-10 rounded-lg text-body-1-sb',
        medium: 'h-9 rounded-lg text-body-1-sb',
        small: 'h-8 rounded-md text-body-1-sb',
        default: 'h-10 rounded-lg text-body-1-sb',
        sm: 'h-8 rounded-md text-body-1-sb',
        lg: 'h-10 rounded-lg text-body-1-sb',
        icon: 'h-10 w-10 rounded-lg',
      },
      iconLayout: {
        none: '',
        left: '',
        right: '',
      },
    },
    compoundVariants: [
      // Size & Icon layout padding
      { size: ['large', 'default', 'lg'], iconLayout: 'left', className: 'gap-2 pl-4 pr-5' },
      { size: ['large', 'default', 'lg'], iconLayout: 'right', className: 'gap-2 pl-5 pr-4' },
      { size: ['large', 'default', 'lg'], iconLayout: 'none', className: 'px-5' },
      { size: 'medium', iconLayout: 'left', className: 'gap-2 pl-4 pr-5' },
      { size: 'medium', iconLayout: 'right', className: 'gap-2 pl-4 pr-3' },
      { size: 'medium', iconLayout: 'none', className: 'px-4' },
      { size: ['small', 'sm'], iconLayout: 'left', className: 'gap-1.5 pl-2 pr-3' },
      { size: ['small', 'sm'], iconLayout: 'right', className: 'gap-1.5 pl-3 pr-2' },
      { size: ['small', 'sm'], iconLayout: 'none', className: 'px-3' },

      // Primary tone (explicit for text)
      {
        variant: 'text',
        tone: 'primary',
        className:
          '!text-primary hover:bg-primary-50 active:bg-primary-100 data-[ui-hover=true]:bg-primary-50 data-[ui-pressed=true]:bg-primary-100 dark:hover:bg-primary-950/40',
      },

      // Blue tone
      {
        variant: 'default',
        tone: 'blue',
        className:
          'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-600 !text-white',
      },
      {
        variant: 'secondPrimary',
        tone: 'blue',
        className:
          'bg-blue-50 !text-blue-600 hover:bg-blue-100 active:bg-blue-150 focus-visible:ring-blue-600 dark:bg-blue-950/50 dark:!text-blue-400',
      },
      {
        variant: 'outlinePrimary',
        tone: 'blue',
        className: 'border-blue-600 !text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600 dark:hover:bg-blue-950/50',
      },
      {
        variant: 'ghost',
        tone: 'blue',
        className: '!text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600 dark:hover:bg-blue-950/50',
      },
      {
        variant: 'text',
        tone: 'blue',
        className:
          '!text-blue-600 hover:bg-blue-50 active:bg-blue-100 data-[ui-hover=true]:bg-blue-50 data-[ui-pressed=true]:bg-blue-100 dark:hover:bg-blue-950/50',
      },
      { variant: 'link', tone: 'blue', className: '!text-blue-600 focus-visible:ring-blue-600' },

      // Green tone
      {
        variant: 'default',
        tone: 'green',
        className:
          'bg-green-600 hover:bg-green-700 active:bg-green-800 focus-visible:ring-green-600 !text-white',
      },
      {
        variant: 'secondPrimary',
        tone: 'green',
        className:
          'bg-green-50 !text-green-600 hover:bg-green-100 active:bg-green-150 focus-visible:ring-green-600 dark:bg-green-950/50 dark:!text-green-400',
      },
      {
        variant: 'outlinePrimary',
        tone: 'green',
        className:
          'border-green-600 !text-green-600 hover:bg-green-50 focus-visible:ring-green-600 dark:hover:bg-green-950/50',
      },
      {
        variant: 'ghost',
        tone: 'green',
        className: '!text-green-600 hover:bg-green-50 focus-visible:ring-green-600 dark:hover:bg-green-950/50',
      },
      {
        variant: 'text',
        tone: 'green',
        className:
          '!text-green-600 hover:bg-green-50 active:bg-green-100 data-[ui-hover=true]:bg-green-50 data-[ui-pressed=true]:bg-green-100 dark:hover:bg-green-950/50',
      },
      { variant: 'link', tone: 'green', className: '!text-green-600 focus-visible:ring-green-600' },

      // Yellow / Warning tone
      {
        variant: 'default',
        tone: 'yellow',
        className:
          'bg-warning-600 hover:bg-warning-700 active:bg-warning-800 focus-visible:ring-warning-600 !text-white',
      },
      {
        variant: 'secondPrimary',
        tone: 'yellow',
        className:
          'bg-warning-100 !text-warning-700 hover:bg-warning-200 active:bg-warning-250 focus-visible:ring-warning-600 dark:bg-warning-950/50 dark:!text-warning-400',
      },
      {
        variant: 'outlinePrimary',
        tone: 'yellow',
        className:
          'border-warning-600 !text-warning-600 hover:bg-warning-100 focus-visible:ring-warning-600 dark:hover:bg-warning-950/50',
      },
      {
        variant: 'ghost',
        tone: 'yellow',
        className: '!text-warning-600 hover:bg-warning-100 focus-visible:ring-warning-600 dark:hover:bg-warning-950/50',
      },
      {
        variant: 'text',
        tone: 'yellow',
        className:
          '!text-warning-600 hover:bg-warning-100 active:bg-warning-150 data-[ui-hover=true]:bg-warning-100 data-[ui-pressed=true]:bg-warning-150 dark:hover:bg-warning-950/50',
      },
      {
        variant: 'link',
        tone: 'yellow',
        className: '!text-warning-600 focus-visible:ring-warning-600',
      },

      // Orange tone
      {
        variant: 'default',
        tone: 'orange',
        className:
          'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 focus-visible:ring-orange-600 !text-white',
      },
      {
        variant: 'secondPrimary',
        tone: 'orange',
        className:
          'bg-orange-100 !text-orange-600 hover:bg-orange-200 active:bg-orange-250 focus-visible:ring-orange-600 dark:bg-orange-950/50 dark:!text-orange-400',
      },
      {
        variant: 'outlinePrimary',
        tone: 'orange',
        className:
          'border-orange-600 !text-orange-600 hover:bg-orange-100 focus-visible:ring-orange-600 dark:hover:bg-orange-950/50',
      },
      {
        variant: 'ghost',
        tone: 'orange',
        className: '!text-orange-600 hover:bg-orange-100 focus-visible:ring-orange-600 dark:hover:bg-orange-950/50',
      },
      {
        variant: 'text',
        tone: 'orange',
        className:
          '!text-orange-600 hover:bg-orange-100 active:bg-orange-150 data-[ui-hover=true]:bg-orange-100 data-[ui-pressed=true]:bg-orange-150 dark:hover:bg-orange-950/50',
      },
      {
        variant: 'link',
        tone: 'orange',
        className: '!text-orange-600 focus-visible:ring-orange-600',
      },

      // Purple tone
      {
        variant: 'default',
        tone: 'purple',
        className:
          'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 focus-visible:ring-purple-600 !text-white',
      },
      {
        variant: 'secondPrimary',
        tone: 'purple',
        className:
          'bg-purple-50 !text-purple-600 hover:bg-purple-100 active:bg-purple-150 focus-visible:ring-purple-600 dark:bg-purple-950/50 dark:!text-purple-400',
      },
      {
        variant: 'outlinePrimary',
        tone: 'purple',
        className:
          'border-purple-600 !text-purple-600 hover:bg-purple-50 focus-visible:ring-purple-600 dark:hover:bg-purple-950/50',
      },
      {
        variant: 'ghost',
        tone: 'purple',
        className: '!text-purple-600 hover:bg-purple-50 focus-visible:ring-purple-600 dark:hover:bg-purple-950/50',
      },
      {
        variant: 'text',
        tone: 'purple',
        className:
          '!text-purple-600 hover:bg-purple-50 active:bg-purple-100 data-[ui-hover=true]:bg-purple-50 data-[ui-pressed=true]:bg-purple-100 dark:hover:bg-purple-950/50',
      },
      {
        variant: 'link',
        tone: 'purple',
        className: '!text-purple-600 focus-visible:ring-purple-600',
      },

      // Gray / Neutral tone
      {
        variant: 'default',
        tone: 'gray',
        className:
          'bg-neutral-800 hover:bg-neutral-900 active:bg-neutral-950 focus-visible:ring-neutral-800 !text-white dark:bg-neutral-200 dark:hover:bg-neutral-100 dark:!text-neutral-900',
      },
      {
        variant: 'secondPrimary',
        tone: 'gray',
        className:
          'bg-muted text-foreground hover:bg-muted/80 active:bg-muted/70 focus-visible:ring-neutral-800',
      },
      {
        variant: 'outlinePrimary',
        tone: 'gray',
        className:
          'border-border text-foreground hover:bg-muted focus-visible:ring-neutral-800',
      },
      {
        variant: 'ghost',
        tone: 'gray',
        className: 'text-foreground hover:bg-muted focus-visible:ring-neutral-800',
      },
      {
        variant: 'text',
        tone: 'gray',
        className:
          'text-foreground hover:bg-muted active:bg-muted/80 data-[ui-hover=true]:bg-muted data-[ui-pressed=true]:bg-muted/80',
      },
      {
        variant: 'link',
        tone: 'gray',
        className: 'text-foreground focus-visible:ring-neutral-800',
      },
    ],
    defaultVariants: {
      variant: 'default',
      tone: 'primary',
      size: 'large',
      iconLayout: 'none',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, tone, size, iconLayout, asChild = false, type = 'button', ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, tone, size, iconLayout, className }))}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export { ButtonGlobal } from '../button-global';
