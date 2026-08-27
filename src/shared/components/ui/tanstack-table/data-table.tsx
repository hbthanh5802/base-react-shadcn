import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Header,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button } from '@/shared/components/ui/button';
import { ColSearchInput } from '@/shared/components/ui/col-search-input';
import {
  DatePicker,
  DateRangePicker,
  type DateRangeValue,
} from '@/shared/components/ui/date-picker';
import { DateTimePicker } from '@/shared/components/ui/date-time-picker';
import { MultiSelect } from '@/shared/components/ui/multi-select';
import { Pagination } from '@/shared/components/ui/pagination';
import { SelectCommon } from '@/shared/components/ui/select';
import {
  TanstackTable,
  TanstackTableBody,
  TanstackTableCell,
  TanstackTableExpandedContent,
  TanstackTableHead,
  TanstackTableHeader,
  TanstackTableRow,
} from '@/shared/components/ui/tanstack-table/primitives';
import { showApiResponseErrorMessage } from '@/shared/lib/toast';
import { cn } from '@/shared/lib/utils';
import type { DataTableProps, TableQueryParams } from '@/shared/types/table.types';

import type { Row } from '@tanstack/react-table';

export interface DataTableRef {
  setColumnFilterValue: (columnId: string, value: unknown) => void;
  setColumnFilters: (filters: ColumnFiltersState) => void;
  resetColumnFilters: () => void;
  setColumnSearchVisible: (columnId: string, visible: boolean) => void;
  getColumnFilters: () => ColumnFiltersState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getColumnFilterValue: (columnId: string) => any;
}

interface FilterInputProps<TData, TValue> {
  header: Header<TData, TValue>;
}

function FilterInput<TData, TValue>({ header }: FilterInputProps<TData, TValue>) {
  const filterType = header.column.columnDef.meta?.filterType;
  const selectOptions = header.column.columnDef.meta?.filterOptions ?? [];
  const placeholder = header.column.columnDef.meta?.filterPlaceholder;
  const currentValue = header.column.getFilterValue();
  const isDisabled = header.column.columnDef.meta?.filterDisabled;

  switch (filterType) {
    case 'multiSelect':
      return (
        <MultiSelect
          size="small"
          maxVisibleItems={2}
          value={(currentValue as string[]) ?? []}
          onChange={(v) => header.column.setFilterValue(v.length > 0 ? v : undefined)}
          placeholder={placeholder ?? 'Tất cả'}
          options={selectOptions}
          fetchData={header.column.columnDef.meta?.filterFetchData}
          disabled={isDisabled}
          className="border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
      );
    case 'select':
      return (
        <SelectCommon
          value={(currentValue as string) ?? ''}
          onChange={(v) => header.column.setFilterValue(v || undefined)}
          placeholder={placeholder ?? 'Tất cả'}
          options={selectOptions}
          fetchData={header.column.columnDef.meta?.filterFetchData}
          removable
          className="h-8 rounded-lg border-border bg-background px-2.5 text-body-3-rg focus:outline-none focus:ring-1 focus:ring-primary/30 [&>span:last-child>svg]:h-4 [&>span:last-child>svg]:w-4 [&>span:last-child]:h-4 [&>span:last-child]:w-4"
          disabled={isDisabled}
          onFetchDataError={(error) => showApiResponseErrorMessage(error)}
        />
      );
    case 'dateInput': {
      const dateValue = currentValue ? new Date(currentValue as string | Date) : null;
      const validDateValue = dateValue && !isNaN(dateValue.getTime()) ? dateValue : null;
      return (
        <DatePicker
          value={validDateValue}
          onValueChange={(v) => header.column.setFilterValue(v ? v.toISOString() : undefined)}
          placeholder={placeholder ?? 'Chọn ngày'}
          size="small"
          className="text-sm font-medium"
          clearable
          needConfirm
          showTooltip
          disabled={isDisabled}
        />
      );
    }
    case 'dateRange': {
      const rangeValue = (currentValue as DateRangeValue) || { from: null, to: null };
      const fromDate = rangeValue.from ? new Date(rangeValue.from) : null;
      const toDate = rangeValue.to ? new Date(rangeValue.to) : null;
      const parsedRange = {
        from: fromDate && !isNaN(fromDate.getTime()) ? fromDate : null,
        to: toDate && !isNaN(toDate.getTime()) ? toDate : null,
      };
      return (
        <DateRangePicker
          value={parsedRange}
          onValueChange={(val) => {
            header.column.setFilterValue(val.from || val.to ? val : undefined);
          }}
          size="small"
          disabled={isDisabled}
          startPlaceholder={placeholder ?? 'Từ ngày'}
          endPlaceholder={placeholder ?? 'Đến ngày'}
          containerClassName="w-full text-sm font-medium"
          clearable
          // layout="vertical"
          needConfirm
          showTooltip
        />
      );
    }
    case 'dateTime': {
      const dateValue = currentValue ? new Date(currentValue as string | Date) : null;
      const validDateValue = dateValue && !isNaN(dateValue.getTime()) ? dateValue : null;
      return (
        <DateTimePicker
          value={validDateValue}
          onValueChange={(v) => header.column.setFilterValue(v ? v.toISOString() : undefined)}
          placeholder={placeholder ?? 'Chọn thời gian'}
          size="small"
          className="text-sm"
          disabled={isDisabled}
          clearable
          needConfirm
          showTooltip
        />
      );
    }
    case 'searchInput':
    default:
      return (
        <ColSearchInput
          value={(currentValue as string) ?? ''}
          onChange={(v) => header.column.setFilterValue(v || undefined)}
          placeholder={placeholder ?? 'Tìm kiếm'}
          disabled={isDisabled}
        />
      );
  }
}

export const DataTable = forwardRef(function DataTableInner<TData, TValue>(
  {
    columns,
    data,
    pageCount,
    total,
    isLoading = false,
    isFetching = false,
    emptyText = 'No data available',
    enableRowSelection = false,
    defaultPageSize = 10,
    pageSizeOptions = [10, 20, 50, 100],
    onStateChange,
    manualPagination = true,
    manualSorting = true,
    manualFiltering = true,
    enableHeaderFilters = false,
    globalFilter,
    onGlobalFilterChange,
    globalFilterFn,
    renderSubRow,
    onRowClick,
    className,
    enablePagination = true,
    stickyHeader = false,
    stickyFirstColumn = false,
    stickyLastColumn = false,
    maxHeight,
    columnVisibility: defaultColumnVisibility = {},
    getRowId,
  }: DataTableProps<TData, TValue>,
  ref: React.Ref<DataTableRef>,
) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(defaultColumnVisibility);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: defaultPageSize });
  const lastEmittedState = useRef<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [visibleSearchCols, setVisibleSearchCols] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    columns.forEach((col) => {
      const id = col.id ?? ('accessorKey' in col ? String(col.accessorKey) : undefined);
      if (id && col.enableColumnFilter !== false && id !== 'stt' && id !== 'actions') {
        initial[id] = false;
      }
    });
    return initial;
  });

  const toggleExpand = useCallback((rowId: string) => {
    setExpandedRows((previous) => {
      const next = new Set(previous);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  }, []);

  const effectiveColumns = useMemo<ColumnDef<TData, TValue>[]>(() => {
    if (!renderSubRow) return columns;

    const expandColumn: ColumnDef<TData, TValue> = {
      id: '__expand__',
      size: 40,
      enableColumnFilter: false,
      enableSorting: false,
      header: () => null,
      cell: ({ row }) => {
        const isExpanded = expandedRows.has(row.id);

        return (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={isExpanded ? 'Thu gọn nội dung dòng' : 'Mở rộng nội dung dòng'}
            aria-expanded={isExpanded}
            onClick={(event) => {
              event.stopPropagation();
              toggleExpand(row.id);
            }}
            className="h-8 w-8 text-muted-foreground"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        );
      },
    };

    return [expandColumn, ...columns];
  }, [columns, expandedRows, renderSubRow, toggleExpand]);

  const table = useReactTable({
    data,
    columns: effectiveColumns,
    getRowId,
    pageCount,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      ...(enablePagination && { pagination }),
      columnFilters,
      globalFilter,
    },
    enableRowSelection,
    manualPagination,
    manualSorting,
    manualFiltering,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: enablePagination ? setPagination : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: !manualFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel:
      !manualPagination && enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: !manualSorting ? getSortedRowModel() : undefined,
  });

  useImperativeHandle(
    ref,
    () => ({
      setColumnFilterValue: (columnId: string, value: unknown) => {
        if (value !== undefined && value !== null && value !== '') {
          setVisibleSearchCols((prev) => ({ ...prev, [columnId]: true }));
        }
        table.getColumn(columnId)?.setFilterValue(value);
      },
      setColumnFilters: (filters: ColumnFiltersState) => {
        setVisibleSearchCols((prev) => {
          const next = { ...prev };
          filters.forEach((f) => {
            if (f.value !== undefined && f.value !== null && f.value !== '') {
              next[f.id] = true;
            }
          });
          return next;
        });
        setColumnFilters(filters);
      },
      resetColumnFilters: () => {
        setColumnFilters([]);
      },
      setColumnSearchVisible: (columnId: string, visible: boolean) => {
        setVisibleSearchCols((prev) => ({ ...prev, [columnId]: visible }));
        if (!visible) {
          table.getColumn(columnId)?.setFilterValue(undefined);
        }
      },
      getColumnFilters: () => columnFilters,
      getColumnFilterValue: (columnId: string) =>
        columnFilters.find((column) => column.id === columnId)?.value,
    }),
    [table, columnFilters],
  );

  useEffect(() => {
    if (manualPagination || manualSorting || manualFiltering) {
      const nextState: TableQueryParams = {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
        filters: columnFilters,
      };
      const stringified = JSON.stringify(nextState);
      if (lastEmittedState.current !== stringified) {
        lastEmittedState.current = stringified;
        onStateChange?.(nextState);
      }
    }
  }, [
    pagination,
    sorting,
    onStateChange,
    manualPagination,
    manualSorting,
    manualFiltering,
    columnFilters,
  ]);

  const hasAnySearchActive = enableHeaderFilters && Object.values(visibleSearchCols).some(Boolean);

  const getStt = (row: Row<TData>) => {
    if (manualPagination) {
      return (
        table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1
      );
    }
    return row.index + 1;
  };

  const pinnedRowBg = stickyFirstColumn || stickyLastColumn;

  const pinHeadClass = (index: number, last: number) => {
    const isFirst = stickyFirstColumn && index === 0;
    const isLast = stickyLastColumn && index === last;
    const isCorner = stickyHeader && (isFirst || isLast);
    return cn(
      stickyHeader && 'sticky top-0 z-20 bg-muted/90 backdrop-blur-xs',
      isFirst &&
        'sticky left-0 z-20 bg-muted/90 backdrop-blur-xs after:absolute after:top-0 after:bottom-0 after:right-0 after:translate-x-full after:w-2 after:pointer-events-none after:bg-gradient-to-r after:from-black/[0.12] after:to-transparent',
      isLast &&
        'sticky right-0 z-20 bg-muted/90 backdrop-blur-xs after:absolute after:top-0 after:bottom-0 after:left-0 after:-translate-x-full after:w-2 after:pointer-events-none after:bg-gradient-to-l after:from-black/[0.12] after:to-transparent',
      isCorner && 'z-30',
    );
  };

  const pinCellClass = (index: number, last: number) =>
    cn(
      stickyFirstColumn &&
        index === 0 &&
        'sticky left-0 z-10 bg-card group-hover:bg-muted/50 group-data-[state=selected]:bg-primary/10 after:absolute after:top-0 after:bottom-0 after:right-0 after:translate-x-full after:w-2 after:pointer-events-none after:bg-gradient-to-r after:from-black/[0.12] after:to-transparent',
      stickyLastColumn &&
        index === last &&
        'sticky right-0 z-10 bg-card group-hover:bg-muted/50 group-data-[state=selected]:bg-primary/10 after:absolute after:top-0 after:bottom-0 after:left-0 after:-translate-x-full after:w-2 after:pointer-events-none after:bg-gradient-to-l after:from-black/[0.12] after:to-transparent',
    );

  return (
    <div className="space-y-3">
      <div className="relative rounded-md bg-card">
        {isFetching && (
          <div className="absolute right-3 top-3 z-40">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          </div>
        )}
        <TanstackTable
          className={className}
          wrapperClassName="bg-card"
          wrapperStyle={maxHeight ? { maxHeight } : undefined}
        >
          <TanstackTableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              const lastHeaderIdx = headerGroup.headers.length - 1;
              return (
                <Fragment key={headerGroup.id}>
                  {/* Row 1: Columns */}
                  <TanstackTableRow className="h-auto border-b border-border hover:bg-transparent">
                    {headerGroup.headers.map((header, headerIdx) => {
                      const isSearchVisible = visibleSearchCols[header.column.id];
                      const isSpannedCol =
                        header.column.columnDef.enableColumnFilter === false ||
                        header.column.id === 'stt' ||
                        header.column.id === 'actions' ||
                        !isSearchVisible;
                      const canFilter =
                        enableHeaderFilters &&
                        header.column.columnDef.enableColumnFilter !== false &&
                        header.column.id !== 'stt' &&
                        header.column.id !== 'actions';

                      return (
                        <TanstackTableHead
                          key={header.id}
                          rowSpan={isSpannedCol && hasAnySearchActive ? 2 : 1}
                          style={{
                            width: header.column.columnDef.size,
                            minWidth: header.column.columnDef.minSize,
                            maxWidth: header.column.columnDef.maxSize,
                          }}
                          className={cn(
                            'h-auto select-none px-2 py-3',
                            isSpannedCol && hasAnySearchActive ? 'align-middle' : 'align-top',
                            header.column.id === 'actions' && 'text-center',
                            header.column.id !== 'actions' && 'border-r border-border',
                            canFilter &&
                              '[&>div>span]:flex [&>div>span]:w-full [&>div>span]:items-center [&>div]:w-full [&>div]:justify-between',
                            pinHeadClass(headerIdx, lastHeaderIdx),
                          )}
                        >
                          <div
                            className={cn(
                              'flex w-full items-center gap-1 text-foreground transition-colors',
                              canFilter
                                ? 'cursor-pointer justify-between hover:text-primary'
                                : 'cursor-default',
                              header.column.id === 'actions' && 'justify-center',
                            )}
                            onClick={() => {
                              if (canFilter) {
                                const willBeVisible = !visibleSearchCols[header.column.id];
                                setVisibleSearchCols((prev) => ({
                                  ...prev,
                                  [header.column.id]: willBeVisible,
                                }));
                                if (!willBeVisible) {
                                  header.column.setFilterValue(undefined);
                                }
                              }
                            }}
                          >
                            <span className="flex-1">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </span>
                            {canFilter &&
                              (isSearchVisible ? (
                                <ChevronUp size={14} className="text-muted-foreground" />
                              ) : (
                                <ChevronDown size={14} className="text-muted-foreground" />
                              ))}
                          </div>
                        </TanstackTableHead>
                      );
                    })}
                  </TanstackTableRow>

                  {/* Row 2: Filter inputs */}
                  {hasAnySearchActive && (
                    <TanstackTableRow className="h-auto border-b border-border bg-transparent hover:bg-transparent">
                      {headerGroup.headers
                        .filter((header) => {
                          const isSearchVisible = visibleSearchCols[header.column.id];
                          const isSpannedCol =
                            header.column.columnDef.enableColumnFilter === false ||
                            header.column.id === 'stt' ||
                            header.column.id === 'actions' ||
                            !isSearchVisible;
                          return !isSpannedCol;
                        })
                        .map((header) => {
                          return (
                            <TanstackTableHead
                              key={`filter-${header.id}`}
                              style={
                                header.column.columnDef.size
                                  ? { width: header.column.columnDef.size }
                                  : undefined
                              }
                              className="border-r border-border px-2 py-2.5 align-middle"
                            >
                              <div className="w-full">
                                <FilterInput header={header} />
                              </div>
                            </TanstackTableHead>
                          );
                        })}
                    </TanstackTableRow>
                  )}
                </Fragment>
              );
            })}
          </TanstackTableHeader>
          <TanstackTableBody>
            {isLoading ? (
              Array.from({ length: defaultPageSize }).map((_, i) => (
                <TanstackTableRow key={`skeleton-${i}`} className="hover:bg-transparent">
                  {table.getVisibleFlatColumns().map((col, colIdx) => (
                    <TanstackTableCell
                      key={`skeleton-cell-${colIdx}`}
                      className={cn(col.id === 'actions' && 'text-center')}
                    >
                      <div className="h-4 flex-1 animate-pulse rounded bg-neutral-200/60" />
                    </TanstackTableCell>
                  ))}
                </TanstackTableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const cells = row.getVisibleCells();
                const lastCellIdx = cells.length - 1;
                return (
                  <Fragment key={row.id}>
                    <TanstackTableRow
                      data-state={row.getIsSelected() && 'selected'}
                      onClick={
                        onRowClick
                          ? () => onRowClick(row.original)
                          : renderSubRow
                            ? () => toggleExpand(row.id)
                            : undefined
                      }
                      className={cn(
                        'group',
                        renderSubRow && 'cursor-pointer',
                        pinnedRowBg && 'bg-card',
                      )}
                    >
                      {cells.map((cell, cellIdx) => (
                        <TanstackTableCell
                          key={cell.id}
                          className={cn(
                            cell.column.id === 'actions' && 'text-center',
                            pinCellClass(cellIdx, lastCellIdx),
                            cell.column.columnDef.meta?.rowClassName,
                          )}
                          onClick={
                            renderSubRow && cell.column.id === 'actions'
                              ? (event) => event.stopPropagation()
                              : undefined
                          }
                        >
                          {cell.column.id === 'stt'
                            ? getStt(row)
                            : flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TanstackTableCell>
                      ))}
                    </TanstackTableRow>
                    {renderSubRow && expandedRows.has(row.id) && (
                      <TanstackTableExpandedContent colSpan={effectiveColumns.length}>
                        {renderSubRow(row.original)}
                      </TanstackTableExpandedContent>
                    )}
                  </Fragment>
                );
              })
            ) : (
              <TanstackTableRow>
                <TanstackTableCell
                  colSpan={effectiveColumns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  {emptyText}
                </TanstackTableCell>
              </TanstackTableRow>
            )}
          </TanstackTableBody>
        </TanstackTable>
      </div>

      {enablePagination && (
        <Pagination
          page={table.getState().pagination.pageIndex + 1}
          totalPages={pageCount ?? table.getPageCount()}
          totalItems={total}
          onPageChange={(p) => table.setPageIndex(p - 1)}
          pageSize={table.getState().pagination.pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageSizeChange={(size) => table.setPageSize(size)}
        />
      )}
    </div>
  );
}) as <TData, TValue>(
  props: DataTableProps<TData, TValue> & { ref?: React.Ref<DataTableRef> },
) => React.ReactElement;
