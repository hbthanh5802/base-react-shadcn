import { CloseCircle } from 'iconsax-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type FieldValues, type Path, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DebounceInput from '@/shared/components/ui/debounce-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';

import { FormField } from '../form-field';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  original?: any;
}

export type SelectFieldFetchDataFnParams = { page: number; search: string };
export type SelectFieldFetchDataFn = (params: SelectFieldFetchDataFnParams) => Promise<{
  options: SelectOption[];
  hasMore: boolean;
}>;

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  displayValueClassName?: string;

  // Infinite scroll additions
  fetchData?: SelectFieldFetchDataFn;
  defaultOptions?: SelectOption[];
  debounceMs?: number;
  inputPlaceholder?: string;
  onValueChange?: (value: string, option?: SelectOption) => void;
  removable?: boolean;
  onFetchDataError?: (error: unknown) => void;
}

export function SelectField<T extends FieldValues>({
  name,
  options,
  placeholder = 'Chọn...',
  disabled,
  className,
  fetchData,
  defaultOptions,
  debounceMs = 600,
  inputPlaceholder = 'Tìm kiếm',
  onValueChange,
  removable,
  onFetchDataError,
  displayValueClassName,
  ...rest
}: SelectFieldProps<T>) {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [localOptions, setLocalOptions] = useState<SelectOption[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const watchedValue = useWatch({ name });
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown state
  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setDebouncedSearch('');
    }
  }, []);

  // Load more pages
  const loadNextPage = useCallback(async () => {
    if (!fetchData || isLoading || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    try {
      const res = await fetchData({ page: nextPage, search: debouncedSearch });
      setLocalOptions((prev) => [...prev, ...res.options]);
      setHasMore(res.hasMore);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
      setHasMore(false);
      onFetchDataError?.(err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, debouncedSearch, fetchData, isLoading, isLoadingMore, hasMore, onFetchDataError]);

  // Handle Search & Initial Load
  useEffect(() => {
    if (!fetchData || !isOpen) return;

    let isMounted = true;
    const fetchSearch = async () => {
      setIsLoading(true);
      try {
        const res = await fetchData({ page: 1, search: debouncedSearch });
        if (isMounted) {
          setLocalOptions(res.options);
          setHasMore(res.hasMore);
          setPage(1);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setHasMore(false);
          onFetchDataError?.(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSearch();
    return () => {
      isMounted = false;
    };
  }, [debouncedSearch, fetchData, isOpen, onFetchDataError]);

  // Intersection Observer for scroll triggers
  useEffect(() => {
    if (!fetchData || !hasMore || isLoading || isLoadingMore || !isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNextPage();
        }
      },
      {
        root: sentinelRef.current?.parentElement || null,
        threshold: 0.1,
      },
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [fetchData, hasMore, isLoading, isLoadingMore, isOpen, loadNextPage]);

  // Combine and deduplicate options
  const renderedOptions = useMemo(() => {
    if (!fetchData) return options || [];

    const combined = [...localOptions, ...(defaultOptions || [])];
    if (selectedOption) {
      combined.push(selectedOption);
    }

    const unique: SelectOption[] = [];
    const seen = new Set<string>();
    for (const opt of combined) {
      const valStr = String(opt.value);
      if (!seen.has(valStr)) {
        seen.add(valStr);
        unique.push(opt);
      }
    }
    return unique;
  }, [options, defaultOptions, localOptions, selectedOption]);

  // Sync selectedOption when watchedValue or renderedOptions change
  useEffect(() => {
    if (watchedValue) {
      const found = renderedOptions.find((opt) => opt.value === watchedValue);
      if (found) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedOption(found);
      }
    } else {
      setSelectedOption(null);
    }
  }, [watchedValue, renderedOptions]);

  const noResultsFound =
    !isLoading &&
    (fetchData
      ? localOptions.length === 0 && (!defaultOptions || defaultOptions.length === 0)
      : renderedOptions.length === 0);

  return (
    <FormField<T> {...rest} name={name}>
      {({ value, onChange, onBlur, invalid }) => (
        <Select
          value={value !== undefined && value !== null ? String(value) : ''}
          onValueChange={(val) => {
            onChange(val);
            onBlur();
            if (onValueChange) {
              const opt = renderedOptions.find((o) => String(o.value) === val);
              onValueChange(val, opt);
            }
          }}
          disabled={disabled}
          onOpenChange={handleOpenChange}
        >
          <SelectTrigger
            className={cn(
              'relative',
              invalid && 'border-error-600 focus-visible:border-error-600 focus-visible:ring-error-600/20',
              className,
            )}
            error={invalid}
            aria-invalid={invalid}
            onBlur={onBlur}
            displayValueClassName={displayValueClassName}
          >
            <SelectValue placeholder={placeholder} />
            {removable && !!value && (
              <button
                type="button"
                className="absolute right-8 top-1/2 z-10 -translate-y-1/2 rounded-full p-0.5 hover:bg-neutral-100 focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange('');
                  if (onValueChange) {
                    onValueChange('');
                  }
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <CloseCircle className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
              </button>
            )}
          </SelectTrigger>
          <SelectContent>
            {fetchData && (
              <div
                className="mb-2 border-b border-muted bg-card pb-2"
                onKeyDown={(e) => e.stopPropagation()}
              >
                <DebounceInput
                  debounceTime={debounceMs}
                  placeholder={inputPlaceholder || t('search')}
                  onChange={setDebouncedSearch}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                />
              </div>
            )}

            {isLoading && (
              <div className="py-2 text-center text-sm text-muted-foreground">
                {t('loadingData')}...
              </div>
            )}

            {noResultsFound && (
              <div className="py-6 text-center text-sm text-muted-foreground">{t('noData')}</div>
            )}

            {renderedOptions.map((opt) => (
              <SelectItem key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
                {opt.label}
              </SelectItem>
            ))}

            {isLoadingMore && (
              <div className="py-2 text-center text-xs text-muted-foreground">
                {t('loadingData')}...
              </div>
            )}
            <div ref={sentinelRef} className="h-1 w-full" />
          </SelectContent>
        </Select>
      )}
    </FormField>
  );
}
