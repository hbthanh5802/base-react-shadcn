import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  Row,
  RowSelectionState,
  VisibilityState,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DateRangeFilterState {
  from?: string;
  to?: string;
  quickDate?: string;
}

export type TableQueryParams = PaginationParams &
  SortParams & {
    search?: string;
    filters?: ColumnFiltersState | Record<string, string | number | boolean | null>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
  };

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  total: number;
  isLoading?: boolean;
  isFetching?: boolean;
  emptyText?: string;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  syncWithUrl?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onStateChange?: (state: TableQueryParams) => void;
  rowSelection?: RowSelectionState;
  columnVisibility?: VisibilityState;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  enableHeaderFilters?: boolean;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  globalFilterFn?: FilterFn<TData>;
  renderSubRow?: (row: TData) => ReactNode;
  onRowClick?: (row: TData) => void;
  className?: string;
  enablePagination?: boolean;
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  stickyLastColumn?: boolean;
  maxHeight?: string | number;
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
}
