import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/vi';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale('vi');

export { dayjs };

export const WEEKDAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'] as const;

export const MONTH_LABELS = Array.from({ length: 12 }, (_, index) => `Tháng ${index + 1}`);

export const QUARTER_LABELS = ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'] as const;

export type DatePickerMode = 'day' | 'dayRange' | 'month' | 'quarter' | 'year' | 'dayRangeDual';

export interface DateRangeValue {
  from: Date | null;
  to: Date | null;
}

export interface CalendarDayCell {
  date: Dayjs;
  currentMonth: boolean;
}

export const formatPanelTitle = (date: Dayjs) => `Tháng ${date.month() + 1} - ${date.year()}`;

export const toDate = (value: Dayjs) => value.toDate();

export const isSameDay = (a?: Date | null, b?: Dayjs | null) =>
  Boolean(a && b && dayjs(a).isSame(b, 'day'));

export const buildMonthGrid = (viewDate: Dayjs): CalendarDayCell[] => {
  const startOfMonth = viewDate.startOf('month');
  const offset = (startOfMonth.day() + 6) % 7;
  const gridStart = startOfMonth.subtract(offset, 'day');
  const cells: CalendarDayCell[] = [];

  for (let index = 0; index < 42; index += 1) {
    const date = gridStart.add(index, 'day');
    cells.push({
      date,
      currentMonth: date.month() === viewDate.month(),
    });
  }

  return cells;
};

export const buildYearGrid = (anchorYear: number) =>
  Array.from({ length: 12 }, (_, index) => anchorYear - 1 + index);

export const normalizeRange = (from: Date, to: Date): DateRangeValue => {
  let startDate = from;
  let endDate = to;

  if (dayjs(startDate).isAfter(dayjs(endDate))) {
    startDate = to;
    endDate = from;
  }

  return {
    from: dayjs(startDate).startOf('day').toDate(),
    to: dayjs(endDate).endOf('day').toDate(),
  };
};

export const isInRange = (date: Dayjs, range?: DateRangeValue | null) => {
  if (!range?.from || !range.to) {
    return false;
  }

  return date.isBetween(dayjs(range.from), dayjs(range.to), 'day', '[]');
};

export const isRangeStart = (date: Dayjs, range?: DateRangeValue | null) =>
  Boolean(range?.from && dayjs(range.from).isSame(date, 'day'));

export const isRangeEnd = (date: Dayjs, range?: DateRangeValue | null) =>
  Boolean(range?.to && dayjs(range.to).isSame(date, 'day'));

export const isRangeMiddle = (date: Dayjs, range?: DateRangeValue | null) =>
  isInRange(date, range) && !isRangeStart(date, range) && !isRangeEnd(date, range);
