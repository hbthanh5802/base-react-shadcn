import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const statusPillVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg font-semibold transition-colors',
  {
    variants: {
      size: {
        large: 'h-9 px-[18px] text-body-2-sb',
        medium: 'h-7 px-4 text-body-2-sb',
        small: 'h-6 px-3 text-body-3-sb',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

/**
 * Converts hex color (#2196F3 or #FFF) to rgba format with specified opacity.
 * Fallbacks to original string for non-hex values.
 */
function hexToRgba(colorStr: string, alpha: number = 0.15): string {
  if (!colorStr) return '';
  const trimmed = colorStr.trim();
  if (trimmed.startsWith('#')) {
    let hex = trimmed.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
    }
  }
  return colorStr;
}

export interface StatusPillProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof statusPillVariants> {
  color?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  variant?: 'light' | 'filled' | 'outline' | 'dot';
  dot?: boolean;
  label?: React.ReactNode;
}

const StatusPill = React.forwardRef<HTMLSpanElement, StatusPillProps>(
  (
    {
      className,
      style,
      color,
      bgColor,
      textColor,
      borderColor,
      variant = 'light',
      size = 'medium',
      dot = false,
      label,
      children,
      ...props
    },
    ref,
  ) => {
    const hasCustomColor = Boolean(color || bgColor || textColor || borderColor);

    const computedStyle: React.CSSProperties = { ...style };

    if (color || bgColor || textColor || borderColor) {
      if (variant === 'filled') {
        computedStyle.backgroundColor = bgColor || color;
        computedStyle.color = textColor || '#ffffff';
      } else if (variant === 'outline') {
        computedStyle.backgroundColor = bgColor || 'transparent';
        computedStyle.color = textColor || color;
        computedStyle.borderColor = borderColor || color;
        computedStyle.borderStyle = 'solid';
        computedStyle.borderWidth = '1px';
      } else if (variant === 'dot') {
        computedStyle.backgroundColor = bgColor || 'transparent';
        computedStyle.color = textColor || color;
      } else {
        // default 'light' variant
        computedStyle.backgroundColor = bgColor || (color ? hexToRgba(color, 0.15) : undefined);
        computedStyle.color = textColor || color;
      }
    }

    const showDot = dot || variant === 'dot';

    return (
      <span
        ref={ref}
        className={cn(
          statusPillVariants({ size }),
          !hasCustomColor && 'bg-neutral-50 text-neutral-1000',
          className,
        )}
        style={computedStyle}
        {...props}
      >
        {showDot && (
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: color || textColor || 'currentColor' }}
          />
        )}
        {children ?? label}
      </span>
    );
  },
);

StatusPill.displayName = 'StatusPill';

export { StatusPill, statusPillVariants };
export default StatusPill;
