import { useCallback, useMemo } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

export function useUrlInfo() {
  const location = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });
    return paramsObj;
  }, [searchParams]);

  const setQueryParam = useCallback(
    (key: string, value: string | null | undefined, options?: { replace?: boolean }) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value === null || value === undefined || value === '') {
          next.delete(key);
        } else {
          next.set(key, value);
        }
        return next;
      }, options);
    },
    [setSearchParams],
  );

  const setQueryParams = useCallback(
    (newParams: Record<string, string | null | undefined>, options?: { replace?: boolean }) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(newParams).forEach(([key, value]) => {
          if (value === null || value === undefined || value === '') {
            next.delete(key);
          } else {
            next.set(key, value);
          }
        });
        return next;
      }, options);
    },
    [setSearchParams],
  );

  const removeQueryParam = useCallback(
    (key: string, options?: { replace?: boolean }) => {
      setQueryParam(key, null, options);
    },
    [setQueryParam],
  );

  const clearQueryParams = useCallback(
    (options?: { replace?: boolean }) => {
      setSearchParams(new URLSearchParams(), options);
    },
    [setSearchParams],
  );

  return {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    state: location.state,
    params,
    searchParams,
    queryParams,
    setSearchParams,
    setQueryParam,
    setQueryParams,
    removeQueryParam,
    clearQueryParams,
  };
}
