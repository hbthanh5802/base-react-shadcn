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
        'text-[13px] font-medium leading-snug',
        theme === 'dark' ? 'text-neutral-50' : 'text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
TooltipBody.displayName = 'TooltipBody';

function TooltipProvider({
  delayDuration = 100,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

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
      className={cn(
        'z-50 max-w-xs select-none overflow-hidden rounded-lg bg-neutral-900 px-3.5 py-1.5 text-[13px] font-medium leading-snug text-neutral-50 shadow-md duration-150',
        'border border-neutral-800/80 dark:bg-neutral-800 dark:border-neutral-700/80 dark:text-neutral-100',
        'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-1.5 data-[side=top]:slide-in-from-bottom-1.5 data-[side=left]:slide-in-from-right-1.5 data-[side=right]:slide-in-from-left-1.5',
        className,
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-neutral-900 dark:fill-neutral-800" width={10} height={5} />
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

const TooltipBubbleContent = React.forwardRef<HTMLDivElement, TooltipBubbleContentProps>(
  ({ className, label, items, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'w-[150px] p-0.5 text-neutral-50',
        className,
      )}
      {...props}
    >
      <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-1.5">
        <span className="h-2.5 w-2.5 rounded-[2px] bg-primary" />
        <span className="text-[13px] font-semibold">{label}</span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-center justify-between gap-1.5 text-[12px] text-neutral-200">
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-white/70" />
              <span>{item}</span>
            </div>
            <CloseCircle size={13} variant="Bold" className="opacity-60 hover:opacity-100 cursor-pointer" />
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
