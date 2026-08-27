import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

import { datePickerDualPanelClass, DatePickerNav, datePickerPanelClass } from './primitives';
import {
  buildMonthGrid,
  buildYearGrid,
  dayjs,
  isRangeEnd,
  isRangeMiddle,
  isRangeStart,
  isSameDay,
  type DatePickerMode,
  type DateRangeValue,
} from './utils';

export interface DatePickerPanelProps {
  mode?: DatePickerMode;
  value?: Date | null;
  rangeValue?: DateRangeValue;
  onSelect?: (date: Date | null) => void;
  onRangeValueChange?: (range: DateRangeValue) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  clearable?: boolean;
  needConfirm?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
}

const dayCellBaseClass =
  'relative flex h-9 w-9 items-center justify-center rounded-lg text-body-2-rg transition-colors';

const DayGrid = ({
  viewDate,
  selected,
  range,
  today,
  onDayClick,
  minDate,
  maxDate,
}: {
  viewDate: ReturnType<typeof dayjs>;
  selected?: Date | null;
  range?: DateRangeValue;
  today: ReturnType<typeof dayjs>;
  onDayClick: (date: ReturnType<typeof dayjs>) => void;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const { t } = useTranslation('components');
  const weekdays = t('datePicker.weekdays', { returnObjects: true }) as string[];
  const cells = buildMonthGrid(viewDate);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-y-1">
        {weekdays.map((label) => (
          <div
            key={label}
            className="flex h-8 items-center justify-center text-body-3-sb text-muted-foreground"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map(({ date, currentMonth }) => {
          const selectedDay = isSameDay(selected ?? null, date);
          const todayDay = date.isSame(today, 'day');
          const rangeStart = isRangeStart(date, range);
          const rangeEnd = isRangeEnd(date, range);
          const rangeMiddle = isRangeMiddle(date, range);

          const isBeforeMin = minDate ? date.isBefore(dayjs(minDate), 'day') : false;
          const isAfterMax = maxDate ? date.isAfter(dayjs(maxDate), 'day') : false;
          const isDisabled = isBeforeMin || isAfterMax;

          return (
            <div key={date.toISOString()} className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => onDayClick(date)}
                disabled={isDisabled}
                className={cn(
                  dayCellBaseClass,
                  !currentMonth && 'text-muted-foreground',
                  currentMonth && 'text-foreground',
                  todayDay && !selectedDay && !rangeStart && !rangeEnd && 'border border-primary text-primary',
                  (selectedDay || rangeStart || rangeEnd) &&
                    'bg-primary text-primary-foreground font-semibold',
                  rangeMiddle && 'w-full rounded-none bg-primary/15 text-foreground dark:bg-primary/20',
                  (rangeStart || rangeEnd) && range?.from && range?.to && 'z-[1]',
                  isDisabled && 'pointer-events-none cursor-not-allowed bg-muted/40 opacity-30',
                )}
              >
                {date.date()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MonthGrid = ({
  year,
  selected,
  today,
  onSelect,
}: {
  year: number;
  selected?: Date | null;
  today: ReturnType<typeof dayjs>;
  onSelect: (monthIndex: number) => void;
}) => {
  const { t } = useTranslation('components');
  const months = t('datePicker.months', { returnObjects: true }) as string[];

  return (
    <div className="grid grid-cols-3 gap-2">
      {months.map((label, index) => {
        const isSelected = selected
          ? dayjs(selected).year() === year && dayjs(selected).month() === index
          : false;
        const isToday = today.year() === year && today.month() === index;

        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              'h-10 rounded-lg text-body-2-rg text-foreground transition-colors hover:bg-accent',
              isToday && !isSelected && 'border border-primary text-primary',
              isSelected && 'bg-primary text-primary-foreground font-semibold hover:bg-primary',
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

const QuarterGrid = ({
  year,
  selected,
  onSelect,
}: {
  year: number;
  selected?: Date | null;
  onSelect: (quarterIndex: number) => void;
}) => {
  const { t } = useTranslation('components');
  const quarters = t('datePicker.quarters', { returnObjects: true }) as string[];

  return (
    <div className="grid grid-cols-2 gap-2">
      {quarters.map((label, index) => {
        const selectedQuarter = selected ? Math.floor(dayjs(selected).month() / 3) : null;
        const isSelected = selected
          ? dayjs(selected).year() === year && selectedQuarter === index
          : false;

        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              'h-12 rounded-lg text-body-2-rg text-foreground transition-colors hover:bg-accent',
              isSelected && 'bg-primary text-primary-foreground font-semibold hover:bg-primary',
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

const YearGrid = ({
  anchorYear,
  selected,
  today,
  onSelect,
}: {
  anchorYear: number;
  selected?: Date | null;
  today: ReturnType<typeof dayjs>;
  onSelect: (year: number) => void;
}) => (
  <div className="grid grid-cols-3 gap-2">
    {buildYearGrid(anchorYear).map((year) => {
      const isSelected = selected ? dayjs(selected).year() === year : false;
      const isToday = today.year() === year;

      return (
        <button
          key={year}
          type="button"
          onClick={() => onSelect(year)}
          className={cn(
            'h-10 rounded-lg text-body-2-rg text-foreground transition-colors hover:bg-accent',
            isToday && !isSelected && 'border border-primary text-primary',
            isSelected && 'bg-primary text-primary-foreground font-semibold hover:bg-primary',
          )}
        >
          {year}
        </button>
      );
    })}
  </div>
);

const SELECT_MONTHS = Array.from({ length: 12 }, (_, i) => i);
const SELECT_YEARS = Array.from({ length: 201 }, (_, i) => 1900 + i); // 1900 to 2100

const MonthPanel = ({
  viewDate,
  onViewDateChange,
  selected,
  range,
  today,
  rangeEnabled,
  onDayClick,
  showYearNav = true,
  navPlacement = 'left',
  minDate,
  maxDate,
}: {
  viewDate: ReturnType<typeof dayjs>;
  onViewDateChange: (next: ReturnType<typeof dayjs>) => void;
  selected?: Date | null;
  range?: DateRangeValue;
  today: ReturnType<typeof dayjs>;
  rangeEnabled?: boolean;
  onDayClick: (date: ReturnType<typeof dayjs>) => void;
  showYearNav?: boolean;
  navPlacement?: 'left' | 'right' | 'both';
  minDate?: Date;
  maxDate?: Date;
}) => {
  const leftNav = (
    <DatePickerNav
      showYearNav={showYearNav}
      onPrevYear={() => onViewDateChange(viewDate.subtract(1, 'year'))}
      onPrev={() => onViewDateChange(viewDate.subtract(1, 'month'))}
    />
  );

  const rightNav = (
    <DatePickerNav
      showYearNav={showYearNav}
      onNext={() => onViewDateChange(viewDate.add(1, 'month'))}
      onNextYear={() => onViewDateChange(viewDate.add(1, 'year'))}
    />
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        {navPlacement !== 'right' ? leftNav : <div className="w-[72px]" />}
        <div className="flex items-center gap-1">
          <select
            value={viewDate.month()}
            onChange={(e) => onViewDateChange(viewDate.month(parseInt(e.target.value)))}
            className="cursor-pointer bg-transparent text-body-2-sb font-semibold text-foreground transition-colors hover:text-primary focus:outline-none"
          >
            {SELECT_MONTHS.map((m) => (
              <option key={m} value={m} className="bg-popover text-foreground">
                Tháng {m + 1}
              </option>
            ))}
          </select>
          <span className="text-body-2-sb text-muted-foreground">-</span>
          <select
            value={viewDate.year()}
            onChange={(e) => onViewDateChange(viewDate.year(parseInt(e.target.value)))}
            className="cursor-pointer bg-transparent text-body-2-sb font-semibold text-foreground transition-colors hover:text-primary focus:outline-none"
          >
            {SELECT_YEARS.map((y) => (
              <option key={y} value={y} className="bg-popover text-foreground">
                {y}
              </option>
            ))}
          </select>
        </div>
        {navPlacement !== 'left' ? rightNav : <div className="w-[72px]" />}
      </div>

      <DayGrid
        viewDate={viewDate}
        selected={rangeEnabled ? null : selected}
        range={rangeEnabled ? range : undefined}
        today={today}
        onDayClick={onDayClick}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export const DatePickerPanel = ({
  mode = 'day',
  value = null,
  rangeValue = { from: null, to: null },
  onSelect,
  onRangeValueChange,
  className,
  minDate,
  maxDate,
  clearable = false,
  needConfirm = false,
  onConfirm,
  confirmText = 'Xác nhận',
}: DatePickerPanelProps) => {
  const today = dayjs();
  const [viewDate, setViewDate] = React.useState(dayjs(value ?? rangeValue.from ?? today));
  const [yearAnchor, setYearAnchor] = React.useState((value ?? today.toDate()).getFullYear());
  const [prevValue, setPrevValue] = React.useState(value);
  const { t } = useTranslation('components');

  if (value !== prevValue) {
    setPrevValue(value);
    if (value) {
      setViewDate(dayjs(value));
      setYearAnchor(dayjs(value).year());
    }
  }

  const handleDaySelect = (date: ReturnType<typeof dayjs>, panel?: 'first' | 'second') => {
    if (mode === 'dayRange' || mode === 'dayRangeDual') {
      const clicked = date.toDate();
      const current = rangeValue;

      // Sequential/default selection if either from or to is missing
      if (!current.from || !current.to) {
        if (!current.from) {
          onRangeValueChange?.({ from: clicked, to: null });
        } else {
          if (dayjs(clicked).isBefore(dayjs(current.from))) {
            onRangeValueChange?.({ from: clicked, to: null });
          } else {
            onRangeValueChange?.({ from: current.from, to: clicked });
          }
        }
        return;
      }

      // If both are already set, we allow editing specific start/end date based on panel clicked
      if (mode === 'dayRangeDual' && panel) {
        if (panel === 'first') {
          if (dayjs(clicked).isSameOrBefore(dayjs(current.to))) {
            onRangeValueChange?.({ from: clicked, to: current.to });
          } else {
            onRangeValueChange?.({ from: clicked, to: null });
          }
        } else {
          if (dayjs(clicked).isSameOrAfter(dayjs(current.from))) {
            onRangeValueChange?.({ from: current.from, to: clicked });
          } else {
            onRangeValueChange?.({ from: clicked, to: null });
          }
        }
        return;
      }

      // Fallback for single panel mode when both are set (resets selection)
      onRangeValueChange?.({ from: clicked, to: null });
      return;
    }

    onSelect?.(date.toDate());
  };

  const renderFooter = () => {
    if (!clearable && !needConfirm) return null;

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (mode === 'dayRange' || mode === 'dayRangeDual') {
        onRangeValueChange?.({ from: null, to: null });
      } else {
        onSelect?.(null);
      }
    };

    const handleConfirmClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onConfirm?.();
    };

    return (
      <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/60 pt-2">
        <div>
          {clearable && (
            <Button size="sm" variant="text" className="text-sm" onClick={handleClear}>
              {t('datePicker.clear') || 'Xóa'}
            </Button>
          )}
        </div>
        <div>
          {needConfirm && (
            <Button
              size="sm"
              variant="default"
              className="text-sm"
              onClick={handleConfirmClick}
            >
              {confirmText || t('datePicker.confirm') || 'Xác nhận'}
            </Button>
          )}
        </div>
      </div>
    );
  };

  if (mode === 'month') {
    return (
      <div className={cn(datePickerPanelClass, className)}>
        <div className="mb-3 flex items-center justify-between">
          <DatePickerNav
            showYearNav={false}
            onPrev={() => setYearAnchor((current) => current - 1)}
            onNext={() => setYearAnchor((current) => current + 1)}
          />
          <select
            value={yearAnchor}
            onChange={(e) => setYearAnchor(parseInt(e.target.value))}
            className="cursor-pointer bg-transparent text-body-2-sb font-semibold text-foreground transition-colors hover:text-primary focus:outline-none"
          >
            {SELECT_YEARS.map((y) => (
              <option key={y} value={y} className="bg-popover text-foreground">
                {y}
              </option>
            ))}
          </select>
          <div className="w-8" />
        </div>
        <MonthGrid
          year={yearAnchor}
          selected={value}
          today={today}
          onSelect={(monthIndex) =>
            onSelect?.(dayjs().year(yearAnchor).month(monthIndex).date(1).toDate())
          }
        />
        {renderFooter()}
      </div>
    );
  }

  if (mode === 'quarter') {
    return (
      <div className={cn(datePickerPanelClass, className)}>
        <div className="mb-3 flex items-center justify-between">
          <DatePickerNav
            showYearNav={false}
            onPrev={() => setYearAnchor((current) => current - 1)}
            onNext={() => setYearAnchor((current) => current + 1)}
          />
          <select
            value={yearAnchor}
            onChange={(e) => setYearAnchor(parseInt(e.target.value))}
            className="cursor-pointer bg-transparent text-body-2-sb font-semibold text-foreground transition-colors hover:text-primary focus:outline-none"
          >
            {SELECT_YEARS.map((y) => (
              <option key={y} value={y} className="bg-popover text-foreground">
                {y}
              </option>
            ))}
          </select>
          <div className="w-8" />
        </div>
        <QuarterGrid
          year={yearAnchor}
          selected={value}
          onSelect={(quarterIndex) =>
            onSelect?.(
              dayjs()
                .year(yearAnchor)
                .month(quarterIndex * 3)
                .date(1)
                .toDate(),
            )
          }
        />
        {renderFooter()}
      </div>
    );
  }

  if (mode === 'year') {
    return (
      <div className={cn(datePickerPanelClass, className)}>
        <div className="mb-3 flex items-center justify-between">
          <DatePickerNav
            showYearNav={false}
            onPrev={() => setYearAnchor((current) => current - 12)}
            onNext={() => setYearAnchor((current) => current + 12)}
          />
          <p className="text-body-2-sb text-foreground">{yearAnchor}</p>
          <div className="w-8" />
        </div>
        <YearGrid
          anchorYear={yearAnchor}
          selected={value}
          today={today}
          onSelect={(year) => {
            setYearAnchor(year);
            onSelect?.(dayjs().year(year).month(0).date(1).toDate());
          }}
        />
        {renderFooter()}
      </div>
    );
  }

  if (mode === 'dayRangeDual') {
    const secondMonth = viewDate.add(1, 'month');

    return (
      <div className={cn(datePickerDualPanelClass, className)}>
        <div className="flex gap-6">
          <div className="w-fit">
            <MonthPanel
              viewDate={viewDate}
              onViewDateChange={setViewDate}
              range={rangeValue}
              today={today}
              rangeEnabled
              onDayClick={(date) => handleDaySelect(date, 'first')}
              navPlacement="left"
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
          <div className="w-fit">
            <MonthPanel
              viewDate={secondMonth}
              onViewDateChange={(next) => setViewDate(next.subtract(1, 'month'))}
              range={rangeValue}
              today={today}
              rangeEnabled
              onDayClick={(date) => handleDaySelect(date, 'second')}
              showYearNav={false}
              navPlacement="right"
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        </div>
        {renderFooter()}
      </div>
    );
  }

  return (
    <div className={cn(datePickerPanelClass, className)}>
      <MonthPanel
        viewDate={viewDate}
        onViewDateChange={setViewDate}
        selected={mode === 'day' ? value : null}
        range={mode === 'dayRange' ? rangeValue : undefined}
        today={today}
        rangeEnabled={mode === 'dayRange'}
        onDayClick={handleDaySelect}
        navPlacement="both"
        minDate={minDate}
        maxDate={maxDate}
      />
      {renderFooter()}
    </div>
  );
};
