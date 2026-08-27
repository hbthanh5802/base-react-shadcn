import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export type StepStatus = 'completed' | 'active' | 'pending';

export interface Step {
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StepIndicator = ({ status, index }: { status: StepStatus; index: number }) => {
  if (status === 'completed') {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-neutral-0">
        <CheckIcon />
      </span>
    );
  }
  if (status === 'active') {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary-600 bg-background text-body-2-sb text-primary-600 shadow-focus-ring">
        {index + 1}
      </span>
    );
  }
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background text-body-2-sb text-muted-foreground">
      {index + 1}
    </span>
  );
};

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, steps, currentStep, orientation = 'horizontal', ...props }, ref) => {
    const getStatus = (index: number): StepStatus => {
      if (index < currentStep) return 'completed';
      if (index === currentStep) return 'active';
      return 'pending';
    };

    if (orientation === 'vertical') {
      return (
        <div ref={ref} className={cn('flex flex-col', className)} {...props}>
          {steps.map((step, i) => {
            const status = getStatus(i);
            const isLast = i === steps.length - 1;
            return (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <StepIndicator status={status} index={i} />
                  {!isLast && (
                    <div
                      className={cn(
                        'mt-1 min-h-[24px] w-0.5 flex-1',
                        status === 'completed' ? 'bg-primary-600' : 'bg-border',
                      )}
                    />
                  )}
                </div>
                <div className={cn('pb-6 pt-1', isLast && 'pb-0')}>
                  <p
                    className={cn(
                      'text-body-2-sb',
                      status === 'pending' ? 'text-muted-foreground' : 'text-foreground',
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="mt-0.5 text-body-3-rg text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('overflow-x-auto', className)} {...props}>
        <div className="flex min-w-max items-start">
          {steps.map((step, i) => {
            const status = getStatus(i);
            const isLast = i === steps.length - 1;
            return (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-2">
                  <StepIndicator status={status} index={i} />
                  <p
                    className={cn(
                      'text-center text-body-3-sb',
                      status === 'pending' ? 'text-muted-foreground' : 'text-foreground',
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-center text-body-3-rg text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      'mx-2 mt-4 h-0.5 flex-1',
                      status === 'completed' ? 'bg-primary-600' : 'bg-border',
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  },
);
Stepper.displayName = 'Stepper';

export { Stepper };
