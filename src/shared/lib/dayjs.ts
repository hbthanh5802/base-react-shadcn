import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

export const formatDate = (date: string | Date | null | undefined, fmt = 'DD/MM/YYYY'): string => {
  if (!date) return '';
  return dayjs(date).format(fmt);
};

export const formatDateTime = (date: string | Date | null | undefined): string => {
  return formatDate(date, 'DD/MM/YYYY HH:mm');
};

export const fromNow = (date: string | Date): string => dayjs(date).fromNow();

export const parseDateString = (dateStr?: string): Date => {
  if (!dateStr) return new Date();
  const parsedFmt = dayjs(dateStr, 'DD/MM/YYYY', true);
  if (parsedFmt.isValid()) return parsedFmt.toDate();
  const parsedIso = dayjs(dateStr);
  return parsedIso.isValid() ? parsedIso.toDate() : new Date();
};

export const parseDateStringNullable = (dateStr?: string | null): Date | null => {
  if (!dateStr) return null;
  const parsedFmt = dayjs(dateStr, 'DD/MM/YYYY', true);
  if (parsedFmt.isValid()) return parsedFmt.toDate();
  const parsedIso = dayjs(dateStr);
  return parsedIso.isValid() ? parsedIso.toDate() : null;
};

export interface DateRangeValue {
  from: Date | null;
  to: Date | null;
}

export const parseDateRangeString = (rangeStr?: string | null): DateRangeValue => {
  const result: DateRangeValue = { from: null, to: null };
  if (!rangeStr || rangeStr === '---') return result;
  const parts = rangeStr.split(' - ');
  if (parts.length === 2) {
    result.from = parseDateStringNullable(parts[0]);
    result.to = parseDateStringNullable(parts[1]);
  } else {
    result.from = parseDateStringNullable(rangeStr);
  }
  return result;
};

export const formatDateRangeToString = (range: DateRangeValue): string => {
  if (!range.from && !range.to) return '';
  if (range.from && !range.to) return formatDate(range.from);
  if (!range.from && range.to) return formatDate(range.to);
  return `${formatDate(range.from!)} - ${formatDate(range.to!)}`;
};

export { dayjs };

/**
 * Chuyển đổi các kiểu dữ liệu thời gian thành chuỗi định dạng LocalDateTime (YYYY-MM-DDTHH:mm:ss)
 * Giữ nguyên múi giờ và giờ giấc gốc của máy khách, loại bỏ chữ 'Z' và mili giây để khớp với Java LocalDateTime.
 * * @param dateInput - Có thể là Date, chuỗi ISO, chuỗi ngày hoặc timestamp
 */
export const formatToLocalDateTime = (
  dateInput: Date | string | number | null | undefined,
): string => {
  if (!dateInput) return '';

  const d = new Date(dateInput);

  if (isNaN(d.getTime())) {
    console.error('Định dạng ngày tháng không hợp lệ:', dateInput);
    return '';
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export type QuickDateRangeType = 'today' | 'week' | 'month' | 'year' | null;
export const getQuickDateRange = (
  value: QuickDateRangeType,
): { startDate: string; endDate: string } => {
  const now = dayjs();

  switch (value) {
    case 'today':
      return {
        startDate: now.format('YYYY-MM-DD') + ' 00:00:00',
        endDate: now.format('YYYY-MM-DD') + ' 23:59:59',
      };

    case 'week':
      return {
        startDate: now.startOf('week').format('YYYY-MM-DD') + ' 00:00:00',
        endDate: now.endOf('week').format('YYYY-MM-DD') + ' 23:59:59',
      };

    case 'month':
      return {
        startDate: now.startOf('month').format('YYYY-MM-DD') + ' 00:00:00',
        endDate: now.endOf('month').format('YYYY-MM-DD') + ' 23:59:59',
      };

    case 'year':
      return {
        startDate: now.startOf('year').format('YYYY-MM-DD') + ' 00:00:00',
        endDate: now.endOf('year').format('YYYY-MM-DD') + ' 23:59:59',
      };

    default:
      return {
        startDate: '',
        endDate: '',
      };
  }
};
