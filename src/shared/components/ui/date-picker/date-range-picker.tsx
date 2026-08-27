import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { TextField } from '@/shared/components/ui/text-field';
import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/lib/utils';

import { DatePickerPanel } from './date-picker-panel';
import { normalizeRange, type DateRangeValue } from './utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DateRangePickerProps {
  value?: DateRangeValue;
  defaultValue?: DateRangeValue;
  onValueChange?: (range: DateRangeValue) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  label?: string;
  required?: boolean;
  supportingText?: string;
  errorText?: string;
  error?: boolean | string;
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  startPlaceholder?: string;
  endPlaceholder?: string;
  containerClassName?: string;
  panelClassName?: string;
  clearable?: boolean;
  layout?: 'horizontal' | 'vertical';
  needConfirm?: boolean;
  onConfirm?: (range: DateRangeValue) => void;
  confirmText?: string;
  showTooltip?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtDate = (d: Date | null | undefined) => (d ? d.toLocaleDateString('vi-VN') : '');

// ─── Component ────────────────────────────────────────────────────────────────

export const DateRangePicker = ({
  value,
  defaultValue = { from: null, to: null },
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  label,
  required,
  supportingText,
  errorText,
  size,
  disabled,
  startPlaceholder,
  endPlaceholder,
  containerClassName,
  panelClassName,
  clearable = false,
  layout = 'horizontal',
  needConfirm = false,
  onConfirm,
  confirmText,
  showTooltip = false,
}: DateRangePickerProps) => {
  const { t } = useTranslation('components');
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalRange, setInternalRange] = useState<DateRangeValue>(defaultValue);
  const [draftRange, setDraftRange] = useState<DateRangeValue>(value ?? defaultValue);

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isOpen = open ?? internalOpen;
  const committedRange = value ?? internalRange;
  const activeRange = needConfirm && isOpen ? draftRange : committedRange;

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraftRange(committedRange);
    }
  }, [isOpen, committedRange]);

  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const handleRangeChange = (range: DateRangeValue) => {
    const normalized = range.from && range.to ? normalizeRange(range.from, range.to) : range;

    if (needConfirm) {
      setDraftRange(normalized);
    } else {
      if (value === undefined) setInternalRange(normalized);
      onValueChange?.(normalized);

      if ((normalized.from && normalized.to) || (!normalized.from && !normalized.to))
        setOpen(false);
    }
  };

  const handleConfirmClick = () => {
    if (value === undefined) setInternalRange(draftRange);
    onValueChange?.(draftRange);
    onConfirm?.(draftRange);
    setOpen(false);
  };

  const handleTriggerClick = () => {
    if (!disabled) setOpen(!isOpen);
  };

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

  // Close on outside click
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        !panelRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const tooltipValue = [fmtDate(activeRange.from), fmtDate(activeRange.to)]
    .filter(Boolean)
    .join(' - ');

  const renderTrigger = () => (
    <TextField
      variant="dateRange"
      label={label}
      required={required}
      supportingText={supportingText}
      errorText={errorText}
      size={size}
      disabled={disabled}
      showCalendarIcon
      readOnly
      startValue={fmtDate(activeRange.from)}
      endValue={fmtDate(activeRange.to)}
      startPlaceholder={startPlaceholder ?? t('datePicker.startDate')}
      endPlaceholder={endPlaceholder ?? t('datePicker.endDate')}
      containerClassName={cn(
        'cursor-pointer',
        isOpen && 'border-primary shadow-[0_0_0_3px_rgb(5_150_105_/_0.14)]',
      )}
      layout={layout}
    />
  );

  return (
    <div ref={containerRef} className={cn('relative w-full', containerClassName)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={cn('w-full', disabled && 'pointer-events-none')}
        onClick={handleTriggerClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleTriggerClick();
        }}
      >
        {showTooltip && tooltipValue ? (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full">{renderTrigger()}</div>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="z-[9999]">
                <TooltipBody>{tooltipValue}</TooltipBody>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          renderTrigger()
        )}
      </div>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={panelRef}
            role="dialog"
            aria-label={label ?? t('datePicker.startDate')}
            style={{ position: 'fixed', visibility: 'hidden', zIndex: 9999 }}
            className={cn(
              'pointer-events-auto max-w-[calc(100vw-1rem)] overflow-x-auto sm:overflow-visible',
              panelClassName,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <DatePickerPanel
              mode="dayRangeDual"
              rangeValue={activeRange}
              onRangeValueChange={handleRangeChange}
              clearable={clearable && !disabled}
              needConfirm={needConfirm}
              onConfirm={handleConfirmClick}
              confirmText={confirmText}
            />
          </div>,
          document.body,
        )}
    </div>
  );
};
