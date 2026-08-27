import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { TableQueryParams } from '@/shared/types/table.types';

interface UseTableQueryOptions {
  syncWithUrl?: boolean;
  defaultPageSize?: number;
  defaultSort?: { sortBy: string; sortOrder: 'asc' | 'desc' };
}

interface UseTableQueryReturn {
  params: TableQueryParams;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSort: (sortBy: string | undefined, sortOrder?: 'asc' | 'desc') => void;
  setSearch: (search: string) => void;
  setFilter: (key: string, value: string | number | boolean | null) => void;
  setFilters: (filters: Record<string, string | number | boolean | null>) => void;
  resetFilters: () => void;
  reset: () => void;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

interface InternalTableQueryParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters: Record<string, string | number | boolean | null>;
}

export const useTableQuery = ({
  syncWithUrl = false,
  defaultPageSize = DEFAULT_LIMIT,
  defaultSort,
}: UseTableQueryOptions = {}): UseTableQueryReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initial = useMemo<InternalTableQueryParams>(() => {
    if (syncWithUrl) {
      return {
        page: Number(searchParams.get('page')) || DEFAULT_PAGE,
        limit: Number(searchParams.get('limit')) || defaultPageSize,
        sortBy: searchParams.get('sortBy') ?? defaultSort?.sortBy,
        sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') ?? defaultSort?.sortOrder,
        search: searchParams.get('search') ?? undefined,
        filters: {},
      };
    }
    return {
      page: DEFAULT_PAGE,
      limit: defaultPageSize,
      sortBy: defaultSort?.sortBy,
      sortOrder: defaultSort?.sortOrder,
      filters: {},
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [internal, setInternal] = useState<InternalTableQueryParams>(initial);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!syncWithUrl) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const next = new URLSearchParams();
    if (internal.page !== DEFAULT_PAGE) next.set('page', String(internal.page));
    if (internal.limit !== defaultPageSize) next.set('limit', String(internal.limit));
    if (internal.sortBy) next.set('sortBy', internal.sortBy);
    if (internal.sortOrder) next.set('sortOrder', internal.sortOrder);
    if (internal.search) next.set('search', internal.search);
    Object.entries(internal.filters ?? {}).forEach(([k, v]) => {
      if (v !== null && v !== undefined && v !== '') next.set(k, String(v));
    });
    setSearchParams(next, { replace: true });
  }, [internal, syncWithUrl, defaultPageSize, setSearchParams]);

  const setPage = useCallback((page: number) => setInternal((s) => ({ ...s, page })), []);
  const setLimit = useCallback(
    (limit: number) => setInternal((s) => ({ ...s, limit, page: 1 })),
    [],
  );
  const setSort = useCallback(
    (sortBy: string | undefined, sortOrder?: 'asc' | 'desc') =>
      setInternal((s) => ({ ...s, sortBy, sortOrder, page: 1 })),
    [],
  );
  const setSearch = useCallback(
    (search: string) => setInternal((s) => ({ ...s, search: search || undefined, page: 1 })),
    [],
  );
  const setFilter = useCallback(
    (key: string, value: string | number | boolean | null) =>
      setInternal((s) => ({ ...s, filters: { ...s.filters, [key]: value }, page: 1 })),
    [],
  );
  const setFilters = useCallback(
    (filters: Record<string, string | number | boolean | null>) =>
      setInternal((s) => ({ ...s, filters, page: 1 })),
    [],
  );
  const resetFilters = useCallback(
    () => setInternal((s) => ({ ...s, filters: {}, search: undefined, page: 1 })),
    [],
  );
  const reset = useCallback(
    () =>
      setInternal({
        page: DEFAULT_PAGE,
        limit: defaultPageSize,
        sortBy: defaultSort?.sortBy,
        sortOrder: defaultSort?.sortOrder,
        filters: {},
      }),
    [defaultPageSize, defaultSort],
  );

  return {
    params: internal as TableQueryParams,
    setPage,
    setLimit,
    setSort,
    setSearch,
    setFilter,
    setFilters,
    resetFilters,
    reset,
  };
};
