import { useCallback, useMemo, useState } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  total?: number;
}

interface UsePaginationReturn {
  page: number;
  limit: number;
  totalPages: number;
  canNext: boolean;
  canPrev: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
}

export function usePagination({
  initialPage = 1,
  initialLimit = 10,
  total = 0,
}: UsePaginationOptions = {}): UsePaginationReturn {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);
  const canNext = page < totalPages;
  const canPrev = page > 1;

  const next = useCallback(() => setPage((p) => Math.min(p + 1, totalPages)), [totalPages]);
  const prev = useCallback(() => setPage((p) => Math.max(p - 1, 1)), []);
  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  return { page, limit, totalPages, canNext, canPrev, setPage, setLimit, next, prev, reset };
}
