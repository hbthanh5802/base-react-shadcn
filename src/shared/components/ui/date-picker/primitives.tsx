import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib/utils';

export const DATE_PICKER_ICON_COLOR = '#686E73';

interface DatePickerIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<{ size?: number; variant?: 'Linear' | 'Bold'; color?: string }>;
  iconSize?: number;
}

export const DatePickerIconButton = ({
  icon: IconComponent,
  iconSize = 16,
  className,
  ...props
}: DatePickerIconButtonProps) => (
  <button
    type="button"
    className={cn(
      'inline-flex size-7 items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <IconComponent size={iconSize} variant="Linear" color={DATE_PICKER_ICON_COLOR} />
  </button>
);

interface DatePickerNavProps {
  onPrevYear?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onNextYear?: () => void;
  showYearNav?: boolean;
}

export const DatePickerNav = ({
  onPrevYear,
  onPrev,
  onNext,
  onNextYear,
  showYearNav = true,
}: DatePickerNavProps) => {
  const { t } = useTranslation('components');
  return (
    <div className="flex items-center gap-0.5">
      {showYearNav && onPrevYear && (
        <DatePickerIconButton
          icon={ChevronsLeft}
          aria-label={t('datePicker.prevYear')}
          onClick={onPrevYear}
        />
      )}
      {onPrev && (
        <DatePickerIconButton
          icon={ChevronLeft}
          aria-label={t('datePicker.prev')}
          onClick={onPrev}
        />
      )}
      {onNext && (
        <DatePickerIconButton
          icon={ChevronRight}
          aria-label={t('datePicker.next')}
          onClick={onNext}
        />
      )}
      {showYearNav && onNextYear && (
        <DatePickerIconButton
          icon={ChevronsRight}
          aria-label={t('datePicker.nextYear')}
          onClick={onNextYear}
        />
      )}
    </div>
  );
};

export const datePickerPanelClass =
  'w-fit rounded-xl border border-border bg-background p-4 shadow-[0_4px_18px_0px_#0000001A]';

export const datePickerDualPanelClass =
  'rounded-xl border border-border bg-background p-4 shadow-[0_4px_18px_0px_#0000001A]';
