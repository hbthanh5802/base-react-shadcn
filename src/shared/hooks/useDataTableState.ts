import { useCallback, useState } from 'react';

import { DEFAULT_PAGINATION } from '@/shared/constants/pagination';
import type { QuickDateRangeType } from '@/shared/lib/dayjs';
import { getQuickDateRange } from '@/shared/lib/dayjs';
import type { DateRangeFilterState, TableQueryParams } from '@/shared/types/table.types';

export const DEFAULT_DATA_TABLE_STATE: TableQueryParams = {
  page: DEFAULT_PAGINATION.page,
  limit: DEFAULT_PAGINATION.limit,
  search: '',
  filters: [],
};

type UseDataTableStateOptions = {
  defaultQuickDate: QuickDateRangeType;
};

export function useDataTableState(
  defaultState: Partial<TableQueryParams> = DEFAULT_DATA_TABLE_STATE,
  options: UseDataTableStateOptions = { defaultQuickDate: 'week' },
) {
  const [tableState, setTableState] = useState({ ...DEFAULT_DATA_TABLE_STATE, ...defaultState });
  const [quickDateFilter, setQuickDateFilter] = useState({
    ...getQuickDateRange(options.defaultQuickDate),
    quickDate: options.defaultQuickDate,
  });

  const setState = useCallback(
    <K extends keyof TableQueryParams>(key: K, value: TableQueryParams[K]) => {
      setTableState((prev: TableQueryParams) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const applyState = useCallback((partOfState: Partial<TableQueryParams> = {}) => {
    setTableState((prev: TableQueryParams) => ({ ...prev, ...partOfState }));
  }, []);

  const resetState = useCallback(
    (newState?: Partial<TableQueryParams>) => {
      setTableState({ ...DEFAULT_DATA_TABLE_STATE, ...defaultState, ...newState });
    },
    [defaultState],
  );

  const toFilterObject = useCallback((filters?: TableQueryParams['filters']) => {
    if (!filters || !Array.isArray(filters)) return {};
    return filters.reduce(
      (acc, curr) => {
        acc[curr.id] = curr.value;
        return acc;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as Record<string, any>,
    );
  }, []);

  const applyQuickDateFilter = useCallback(
    (key: keyof DateRangeFilterState, value: DateRangeFilterState[keyof DateRangeFilterState]) => {
      setQuickDateFilter((prev) => ({ ...prev, [key]: value }));
    },
    [setQuickDateFilter],
  );

  return {
    tableState,
    quickDateFilter,
    applyQuickDateFilter,
    setState,
    applyState,
    resetState,
    filterObject: toFilterObject(tableState.filters),
    toFilterObject,
  };
}
