import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { Button, type ButtonProps } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

export interface ButtonGlobalProps extends ButtonProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  isLoading?: boolean;
  loadingText?: React.ReactNode;
}

const spinnerSizes: Record<string, string> = {
  small: 'h-3.5 w-3.5',
  sm: 'h-3.5 w-3.5',
  medium: 'h-4 w-4',
  default: 'h-4 w-4',
  large: 'h-5 w-5',
  lg: 'h-5 w-5',
  icon: 'h-4 w-4',
};

const ButtonGlobal = React.forwardRef<HTMLButtonElement, ButtonGlobalProps>(
  (
    {
      leftIcon,
      rightIcon,
      loading,
      isLoading,
      loadingText,
      disabled,
      children,
      iconLayout,
      size = 'large',
      className,
      ...props
    },
    ref,
  ) => {
    const isButtonLoading = Boolean(loading || isLoading);

    // Compute iconLayout automatically if not explicitly set
    let computedIconLayout = iconLayout;
    if (!computedIconLayout || computedIconLayout === 'none') {
      if (isButtonLoading || leftIcon) {
        computedIconLayout = 'left';
      } else if (rightIcon) {
        computedIconLayout = 'right';
      }
    }

    const spinnerSizeClass = spinnerSizes[size ?? 'large'] || 'h-4 w-4';

    return (
      <Button
        ref={ref}
        size={size}
        iconLayout={computedIconLayout}
        disabled={disabled || isButtonLoading}
        className={cn(
          'ButtonGlobal',
          isButtonLoading && 'cursor-not-allowed opacity-80',
          className,
        )}
        {...props}
      >
        {isButtonLoading ? (
          <>
            <Loader2 className={cn('shrink-0 animate-spin', spinnerSizeClass)} />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
          </>
        )}
      </Button>
    );
  },
);

ButtonGlobal.displayName = 'ButtonGlobal';

export { ButtonGlobal };
export default ButtonGlobal;
