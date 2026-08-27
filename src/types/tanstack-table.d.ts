import type { SelectFieldFetchDataFn, SelectOption } from '@/shared/components/ui/select';
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    rowClassName?: string;
    filterType?: 'dateTime' | 'dateInput' | 'select' | 'searchInput' | 'dateRange' | 'multiSelect';
    filterOptions?: SelectOption[];
    filterFetchData?: SelectFieldFetchDataFn;
    filterPlaceholder?: string;
    filterDisabled?: boolean;
  }
}
