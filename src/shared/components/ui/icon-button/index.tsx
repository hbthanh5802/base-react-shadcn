import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { buttonVariants } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

export interface IconButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    Omit<VariantProps<typeof buttonVariants>, 'iconLayout'> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  shape?: 'square' | 'circle';
  loading?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
  'aria-label'?: string;
}

const iconSizes: Record<string, string> = {
  small: 'h-3.5 w-3.5',
  sm: 'h-3.5 w-3.5',
  medium: 'h-4 w-4',
  default: 'h-4.5 w-4.5',
  large: 'h-5 w-5',
  lg: 'h-5 w-5',
  icon: 'h-4 w-4',
};

const shapeClasses = {
  square: '',
  circle: '!rounded-full',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'default',
      tone = 'primary',
      size = 'medium',
      shape = 'square',
      icon,
      children,
      loading,
      isLoading,
      disabled,
      type = 'button',
      asChild = false,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isButtonLoading = Boolean(loading || isLoading);
    const content = icon ?? children;
    const spinnerSizeClass = iconSizes[size ?? 'medium'] || 'h-4 w-4';

    return (
      <Comp
        ref={ref}
        type={type}
        aria-label={ariaLabel || (typeof children === 'string' ? children : 'Icon button')}
        disabled={disabled || isButtonLoading}
        className={cn(
          'IconButton',
          buttonVariants({
            variant,
            tone,
            size: size === 'small' || size === 'sm' ? 'sm' : size === 'medium' ? 'medium' : 'large',
          }),
          'flex aspect-square shrink-0 items-center justify-center !p-0',
          shapeClasses[shape],
          isButtonLoading && 'cursor-not-allowed opacity-80',
          className,
        )}
        {...props}
      >
        {isButtonLoading ? (
          <Loader2 className={cn('shrink-0 animate-spin', spinnerSizeClass)} />
        ) : (
          <span className="inline-flex shrink-0 items-center justify-center">{content}</span>
        )}
      </Comp>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
