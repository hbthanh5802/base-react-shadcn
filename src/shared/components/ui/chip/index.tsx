import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const chipVariants = cva(
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-colors',
  {
    variants: {
      tone: {
        // light tones — dark text on light bg
        neutral: 'bg-neutral-50 text-neutral-1000',
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-chip-sur1 text-chip-text1',
        pink: 'bg-chip-sur2 text-chip-text2',
        purple: 'bg-chip-sur3 text-chip-text3',
        rose: 'bg-red-100 text-red-600',
        gray: 'bg-neutral-150 text-neutral-700',
        teal: 'bg-chip-sur4 text-chip-text4',
        orange: 'bg-chip-sur5 text-chip-text5',
        mint: 'bg-green-100 text-chip-text6',
        // dark/solid tones — light text on dark bg
        neutralDark: 'bg-neutral-950 text-neutral-0',
        redSolid: 'bg-primary-600 text-neutral-0',
        blueSolid: 'bg-blue-600 text-neutral-0',
        greenSolid: 'bg-green-600 text-neutral-0',
        yellowSolid: 'bg-warning-600 text-neutral-0',
        orangeSolid: 'bg-orange-600 text-neutral-0',
        tealSolid: 'bg-success-600 text-neutral-0',
        roseSolid: 'bg-red-700 text-neutral-0',
      },
      size: {
        large: 'h-9 px-[18px]  text-body-2-sb',
        medium: 'h-7 px-4 text-body-3-sb',
        small: 'h-6 px-3 text-body-3-sb',
      },
    },
    defaultVariants: {
      tone: 'neutral',
      size: 'medium',
    },
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof chipVariants> {}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, tone, size, ...props }, ref) => (
    <span ref={ref} className={cn(chipVariants({ tone, size, className }))} {...props} />
  ),
);
Chip.displayName = 'Chip';

export { Chip, chipVariants };
