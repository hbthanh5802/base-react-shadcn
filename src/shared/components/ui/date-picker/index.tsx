import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { TextField, type TextFieldProps } from '@/shared/components/ui/text-field';
import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/lib/utils';

import { DatePickerPanel, type DatePickerPanelProps } from './date-picker-panel';
import { normalizeRange } from './utils';

export interface DatePickerProps extends Omit<
  TextFieldProps,
  'showCalendarIcon' | 'trailingIcon' | 'readOnly'
> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  pickerMode?: DatePickerPanelProps['mode'];
  value?: Date | null;
  rangeValue?: DatePickerPanelProps['rangeValue'];
  defaultValue?: Date | null;
  defaultRangeValue?: DatePickerPanelProps['rangeValue'];
  onValueChange?: (value: Date | null) => void;
  onRangeValueChange?: DatePickerPanelProps['onRangeValueChange'];
  panelClassName?: string;
  clearable?: boolean;
  needConfirm?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  minDate?: Date;
  maxDate?: Date;
  showTooltip?: boolean;
}

export const DatePicker = ({
  open,
  defaultOpen = false,
  onOpenChange,
  pickerMode = 'day',
  value,
  rangeValue,
  defaultValue = null,
  defaultRangeValue = { from: null, to: null },
  onValueChange,
  onRangeValueChange,
  panelClassName,
  placeholder,
  disabled,
  className,
  containerClassName,
  clearable = false,
  needConfirm = false,
  onConfirm,
  confirmText,
  minDate,
  maxDate,
  showTooltip = false,
  ...textFieldProps
}: DatePickerProps) => {
  const { t } = useTranslation('components');
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);
  const [internalRange, setInternalRange] = useState(defaultRangeValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isOpen = open ?? internalOpen;
  const selectedValue = value ?? internalValue;
  const selectedRange = rangeValue ?? internalRange;
  const isRangeMode = pickerMode === 'dayRange' || pickerMode === 'dayRangeDual';

  const displayValue = useMemo(() => {
    if (isRangeMode) {
      const { from, to } = selectedRange;
      if (from && to)
        return `${from.toLocaleDateString('vi-VN')} - ${to.toLocaleDateString('vi-VN')}`;
      if (from) return from.toLocaleDateString('vi-VN');
      return '';
    }
    if (!selectedValue) return '';
    if (pickerMode === 'year') {
      return String(selectedValue.getFullYear());
    }
    if (pickerMode === 'month') {
      const m = String(selectedValue.getMonth() + 1).padStart(2, '0');
      const y = selectedValue.getFullYear();
      return `${m}/${y}`;
    }
    return selectedValue.toLocaleDateString('vi-VN');
  }, [isRangeMode, pickerMode, selectedRange, selectedValue]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  const handleSelect = useCallback(
    (date: Date | null) => {
      if (value === undefined) setInternalValue(date);
      onValueChange?.(date);
      setOpen(false);
    },
    [value, onValueChange, setOpen],
  );

  const handleRangeChange = useCallback(
    (range: NonNullable<DatePickerPanelProps['rangeValue']>) => {
      const normalized = range.from && range.to ? normalizeRange(range.from, range.to) : range;
      if (rangeValue === undefined) setInternalRange(normalized);
      onRangeValueChange?.(normalized);
      if ((normalized.from && normalized.to) || (!normalized.from && !normalized.to))
        setOpen(false);
    },
    [rangeValue, onRangeValueChange, setOpen],
  );

  // Measure panel position relative to trigger container & viewport boundaries
  useLayoutEffect(() => {
    if (!isOpen || !containerRef.current || !panelRef.current) return;

    const triggerRect = containerRef.current.getBoundingClientRect();
    const panelHeight = panelRef.current.offsetHeight;
    const panelWidth = panelRef.current.offsetWidth;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - triggerRect.bottom - 8;
    const flipUp = spaceBelow < panelHeight && triggerRect.top >= panelHeight + 8;

    let left = triggerRect.left;
    if (left + panelWidth > viewportWidth - 16) {
      left = Math.max(16, viewportWidth - panelWidth - 16);
    }

    panelRef.current.style.top = `${flipUp ? triggerRect.top - panelHeight - 8 : triggerRect.bottom + 8}px`;
    panelRef.current.style.left = `${left}px`;
    panelRef.current.style.visibility = 'visible';
  }, [isOpen]);

  // Close on outside click or scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        !panelRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleScroll = () => setOpen(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, setOpen]);

  const renderTrigger = () => (
    <TextField
      {...textFieldProps}
      disabled={disabled}
      placeholder={placeholder ?? t('datePicker.selectDate')}
      showCalendarIcon
      readOnly
      value={displayValue}
      className={cn('cursor-pointer caret-transparent', className)}
      containerClassName={cn(
        isOpen && 'border-primary shadow-[0_0_0_3px_rgb(5_150_105_/_0.14)]',
        containerClassName,
      )}
    />
  );

  return (
    <div ref={containerRef} className="relative w-full" onClick={() => !disabled && setOpen(true)}>
      {showTooltip && displayValue ? (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">{renderTrigger()}</div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="z-[9999]">
              <TooltipBody>{displayValue}</TooltipBody>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        renderTrigger()
      )}

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={panelRef}
            style={{ position: 'fixed', visibility: 'hidden', zIndex: 9999 }}
            className={cn(
              'pointer-events-auto max-w-[calc(100vw-1rem)] overflow-x-auto sm:overflow-visible',
              panelClassName,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <DatePickerPanel
              mode={pickerMode}
              value={selectedValue}
              rangeValue={selectedRange}
              onSelect={handleSelect}
              onRangeValueChange={handleRangeChange}
              clearable={clearable && !disabled}
              needConfirm={needConfirm}
              onConfirm={onConfirm}
              confirmText={confirmText}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>,
          document.body,
        )}
    </div>
  );
};

export { DatePickerPanel, type DatePickerPanelProps } from './date-picker-panel';
export { DateRangePicker, type DateRangePickerProps } from './date-range-picker';
export type { DatePickerMode, DateRangeValue } from './utils';
