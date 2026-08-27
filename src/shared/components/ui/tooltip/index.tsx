import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { CloseCircle } from 'iconsax-react';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

type TooltipBubbleSide = 'top' | 'right' | 'bottom' | 'left';
type TooltipBubbleAlign = 'start' | 'center' | 'end';

interface TooltipBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md';
}

const TooltipBody = React.forwardRef<HTMLDivElement, TooltipBodyProps>(
  ({ className, theme = 'dark', size = 'md', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg text-body-2-rg font-medium shadow-md',
        size === 'sm' ? 'px-2.5 py-1.5' : 'px-4 py-2.5',
        theme === 'dark'
          ? 'bg-gray-900 text-neutral-0'
          : 'border border-border bg-background text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
TooltipBody.displayName = 'TooltipBody';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 8, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn('z-50 border-none bg-transparent p-0 shadow-none outline-none', className)}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-gray-900" width={10} height={5} />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipBubbleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: TooltipBubbleSide;
  align?: TooltipBubbleAlign;
  label: string;
  items: string[];
}

const sideArrowClass: Record<TooltipBubbleSide, string> = {
  top: 'before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:border-x-8 before:border-t-8 before:border-x-transparent before:border-t-gray-900',
  right:
    'before:-left-2 before:top-1/2 before:-translate-y-1/2 before:border-y-8 before:border-r-8 before:border-y-transparent before:border-r-gray-900',
  bottom:
    'before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-gray-900',
  left: 'before:-right-2 before:top-1/2 before:-translate-y-1/2 before:border-y-8 before:border-l-8 before:border-y-transparent before:border-l-gray-900',
};

const alignOffsetClass: Record<TooltipBubbleSide, Record<TooltipBubbleAlign, string>> = {
  top: {
    start: 'before:left-5 before:translate-x-0',
    center: '',
    end: 'before:left-auto before:right-5 before:translate-x-0',
  },
  right: {
    start: 'before:top-5 before:translate-y-0',
    center: '',
    end: 'before:top-auto before:bottom-5 before:translate-y-0',
  },
  bottom: {
    start: 'before:left-5 before:translate-x-0',
    center: '',
    end: 'before:left-auto before:right-5 before:translate-x-0',
  },
  left: {
    start: 'before:top-5 before:translate-y-0',
    center: '',
    end: 'before:top-auto before:bottom-5 before:translate-y-0',
  },
};

const TooltipBubbleContent = React.forwardRef<HTMLDivElement, TooltipBubbleContentProps>(
  ({ className, side = 'top', align = 'center', label, items, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative w-[124px] rounded-md bg-gray-900 px-4 py-3 text-neutral-0 shadow-md',
        'before:absolute before:h-0 before:w-0',
        sideArrowClass[side],
        alignOffsetClass[side][align],
        className,
      )}
      {...props}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="h-3 w-3 rounded-[2px] bg-primary-600" />
        <span className="text-title-3-sb">{label}</span>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-title-3-sb leading-none">
            <span className="h-1 w-1 rounded-full bg-neutral-0" />
            <span>{item}</span>
            <CloseCircle size={14} variant="Bold" />
          </li>
        ))}
      </ul>
    </div>
  ),
);
TooltipBubbleContent.displayName = 'TooltipBubbleContent';

export {
  Tooltip,
  TooltipBody,
  TooltipBubbleContent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};
