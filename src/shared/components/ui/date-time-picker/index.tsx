import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DatePickerPanel } from '@/shared/components/ui/date-picker/date-picker-panel';
import { dayjs } from '@/shared/components/ui/date-picker/utils';
import { TextField, type TextFieldProps } from '@/shared/components/ui/text-field';
import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/lib/utils';

export interface DateTimePickerProps extends Omit<
  TextFieldProps,
  'showCalendarIcon' | 'trailingIcon' | 'readOnly' | 'value' | 'onChange'
> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
  panelClassName?: string;
  placeholder?: string;
  displayFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  clearable?: boolean;
  needConfirm?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  showTooltip?: boolean;
}

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

export const DateTimePicker = ({
  open,
  defaultOpen = false,
  onOpenChange,
  value,
  defaultValue = null,
  onValueChange,
  panelClassName,
  placeholder,
  disabled,
  className,
  containerClassName,
  displayFormat = 'HH:mm - DD/MM/YYYY',
  minDate,
  maxDate,
  clearable = false,
  needConfirm = false,
  onConfirm,
  confirmText,
  showTooltip = false,
  ...textFieldProps
}: DateTimePickerProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);
  const [draftValue, setDraftValue] = useState<Date | null>(value ?? defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isOpen = open ?? internalOpen;
  const committedValue = value ?? internalValue;
  const activeValue = needConfirm && isOpen ? draftValue : committedValue;

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraftValue(committedValue);
    }
  }, [isOpen, committedValue]);

  const displayValue = useMemo(() => {
    return activeValue ? dayjs(activeValue).format(displayFormat) : '';
  }, [activeValue, displayFormat]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  const handleConfirm = useCallback(() => {
    if (value === undefined) setInternalValue(draftValue);
    onValueChange?.(draftValue);
    onConfirm?.();
    setOpen(false);
  }, [value, draftValue, onValueChange, onConfirm, setOpen]);

  const handleDateSelect = useCallback(
    (date: Date | null) => {
      if (!date) {
        if (needConfirm) {
          setDraftValue(null);
        } else {
          if (value === undefined) setInternalValue(null);
          onValueChange?.(null);
          setOpen(false);
        }
        return;
      }
      const current = activeValue ? dayjs(activeValue) : dayjs();
      let updated = dayjs(date)
        .hour(current.hour())
        .minute(current.minute())
        .second(0)
        .millisecond(0);

      if (minDate && updated.isBefore(dayjs(minDate))) {
        updated = dayjs(minDate);
      }
      if (maxDate && updated.isAfter(dayjs(maxDate))) {
        updated = dayjs(maxDate);
      }

      const updatedDate = updated.toDate();
      if (needConfirm) {
        setDraftValue(updatedDate);
      } else {
        if (value === undefined) setInternalValue(updatedDate);
        onValueChange?.(updatedDate);
      }
    },
    [value, activeValue, needConfirm, onValueChange, minDate, maxDate, setOpen],
  );

  const handleTimeChange = useCallback(
    (type: 'hour' | 'minute', val: number) => {
      const current = activeValue ? dayjs(activeValue) : dayjs().second(0).millisecond(0);
      let updated = current[type](val);

      if (minDate && updated.isBefore(dayjs(minDate))) {
        updated = dayjs(minDate);
      }
      if (maxDate && updated.isAfter(dayjs(maxDate))) {
        updated = dayjs(maxDate);
      }

      const updatedDate = updated.toDate();
      if (needConfirm) {
        setDraftValue(updatedDate);
      } else {
        if (value === undefined) setInternalValue(updatedDate);
        onValueChange?.(updatedDate);
      }
    },
    [value, activeValue, needConfirm, onValueChange, minDate, maxDate],
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

  // Close dropdown on clicking outside
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

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, setOpen]);

  const currentHour = activeValue ? dayjs(activeValue).hour() : 0;
  const currentMinute = activeValue ? dayjs(activeValue).minute() : 0;

  const renderTrigger = () => (
    <TextField
      {...textFieldProps}
      disabled={disabled}
      placeholder={placeholder ?? 'Chọn thời gian'}
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
              'pointer-events-auto flex max-w-[calc(100vw-1rem)] flex-col gap-4 rounded-xl border border-border bg-popover text-popover-foreground p-4 shadow-md sm:flex-row',
              panelClassName,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Calendar Selection Panel */}
            <DatePickerPanel
              mode="day"
              value={activeValue}
              onSelect={handleDateSelect}
              className="border-none bg-transparent p-0 shadow-none"
              minDate={minDate}
              maxDate={maxDate}
              clearable={clearable && !disabled}
              needConfirm={needConfirm}
              onConfirm={handleConfirm}
              confirmText={confirmText}
            />

            {/* Time Selection Columns */}
            <div className="flex divide-x divide-neutral-150 border-t border-neutral-150 pt-3 sm:border-t-0 sm:pl-3 sm:pt-0">
              {/* Hours Column */}
              <div className="flex flex-col items-center gap-1 pr-3">
                <p className="mb-1 pr-3 text-center text-body-2-sb text-muted-foreground">Giờ</p>
                <div className="scrollbar-thin scrollbar-thumb-neutral-200 flex max-h-[280px] w-14 flex-col gap-1 overflow-y-auto">
                  {hours.map((hour) => {
                    const isActive = currentHour === hour;
                    const hourDate = (activeValue ? dayjs(activeValue) : dayjs()).hour(hour);
                    const isHourDisabled =
                      (minDate && hourDate.isBefore(dayjs(minDate), 'hour')) ||
                      (maxDate && hourDate.isAfter(dayjs(maxDate), 'hour'));

                    return (
                      <button
                        key={hour}
                        type="button"
                        onClick={() => handleTimeChange('hour', hour)}
                        disabled={isHourDisabled}
                        className={cn(
                          'flex h-10 w-full items-center justify-center rounded-xl py-0.5 text-body-2-rg transition-colors',
                          isActive
                            ? 'bg-primary font-semibold text-primary-foreground'
                            : 'text-foreground hover:bg-accent',
                          isHourDisabled &&
                            'pointer-events-none cursor-not-allowed bg-muted/40 opacity-30',
                        )}
                      >
                        {hour.toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minutes Column */}
              <div className="flex flex-col gap-1 pl-3">
                <p className="mb-1 pr-3 text-center text-body-2-sb text-muted-foreground">Phút</p>
                <div className="scrollbar-thin scrollbar-thumb-neutral-200 flex max-h-[280px] w-14 flex-col gap-1 overflow-y-auto">
                  {minutes.map((minute) => {
                    const isActive = currentMinute === minute;
                    const minuteDate = (activeValue ? dayjs(activeValue) : dayjs()).minute(minute);
                    const isMinuteDisabled =
                      (minDate && minuteDate.isBefore(dayjs(minDate), 'minute')) ||
                      (maxDate && minuteDate.isAfter(dayjs(maxDate), 'minute'));

                    return (
                      <button
                        key={minute}
                        type="button"
                        onClick={() => handleTimeChange('minute', minute)}
                        disabled={isMinuteDisabled}
                        className={cn(
                          'flex h-10 w-full items-center justify-center rounded-xl py-0.5 text-body-2-rg transition-colors',
                          isActive
                            ? 'bg-primary font-semibold text-primary-foreground'
                            : 'text-foreground hover:bg-accent',
                          isMinuteDisabled &&
                            'pointer-events-none cursor-not-allowed bg-muted/40 opacity-30',
                        )}
                      >
                        {minute.toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
