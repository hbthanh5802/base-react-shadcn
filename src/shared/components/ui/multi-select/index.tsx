import { ArrowDown2 } from 'iconsax-react';
import { Check, Search, X } from 'lucide-react';
import * as React from 'react';

import { Chip } from '@/shared/components/ui/chip';
import DebounceInput from '@/shared/components/ui/debounce-input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/lib/utils';

export interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options?: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxSelect?: number;
  searchable?: boolean;
  renderSelected?: (
    selected: MultiSelectOption[],
    onRemove: (e: React.MouseEvent, val: string) => void,
  ) => React.ReactNode;
  renderItem?: (option: MultiSelectOption, isSelected: boolean) => React.ReactNode;

  // Infinite scroll additions
  fetchData?: (params: { page: number; search: string }) => Promise<{
    options: MultiSelectOption[];
    hasMore: boolean;
  }>;
  defaultOptions?: MultiSelectOption[];
  debounceMs?: number;

  maxVisibleItems?: number;
  wrapSelectedItems?: boolean;
  size?: 'small' | 'medium';
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options = [],
      value = [],
      onChange,
      placeholder = 'Chọn...',
      disabled = false,
      className,
      maxSelect,
      searchable = false,
      renderSelected,
      renderItem,
      fetchData,
      defaultOptions,
      debounceMs = 600,
      maxVisibleItems,
      wrapSelectedItems,
      size = 'medium',
      ...props
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const [localOptions, setLocalOptions] = React.useState<MultiSelectOption[]>([]);
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoadingMore, setIsLoadingMore] = React.useState(false);
    const [debouncedSearch, setDebouncedSearch] = React.useState('');

    const sentinelRef = React.useRef<HTMLDivElement>(null);

    const handleOpenChange = React.useCallback((open: boolean) => {
      setIsOpen(open);
      if (!open) {
        setDebouncedSearch('');
      }
    }, []);

    // Load next page
    const loadNextPage = React.useCallback(async () => {
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
      } finally {
        setIsLoadingMore(false);
      }
    }, [page, debouncedSearch, fetchData, isLoading, isLoadingMore, hasMore]);

    // Search and initial load
    React.useEffect(() => {
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
    }, [debouncedSearch, fetchData, isOpen]);

    // Intersection observer for scroll sentinel
    React.useEffect(() => {
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

    // Combine options
    const renderedOptions = React.useMemo(() => {
      if (!fetchData) {
        return options;
      }
      const combined = [...localOptions, ...(defaultOptions || [])];

      // Deduplicate options by value
      const unique: MultiSelectOption[] = [];
      const seen = new Set<string>();
      for (const opt of combined) {
        if (!seen.has(opt.value)) {
          seen.add(opt.value);
          unique.push(opt);
        }
      }
      return unique;
    }, [options, defaultOptions, localOptions, fetchData]);

    // Filter options based on search query (for static selection only)
    const filteredOptions = React.useMemo(() => {
      if (fetchData) return renderedOptions;
      if (!searchQuery) return options;
      return options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [options, searchQuery, fetchData, renderedOptions]);

    // Toggle select/deselect
    const handleToggle = (val: string) => {
      const newValue = value.includes(val) ? value.filter((v) => v !== val) : [...value, val];
      onChange(newValue);
    };

    // Quick unselect
    const handleUnselect = (e: React.MouseEvent, val: string) => {
      e.stopPropagation();
      e.preventDefault();
      onChange(value.filter((v) => v !== val));
    };

    // Select all visible
    const handleSelectAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const visibleValues = filteredOptions.filter((opt) => !opt.disabled).map((opt) => opt.value);
      const combined = Array.from(new Set([...value, ...visibleValues]));
      onChange(combined);
    };

    // Clear all
    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (searchQuery && !fetchData) {
        const visibleValues = filteredOptions.map((opt) => opt.value);
        onChange(value.filter((v) => !visibleValues.includes(v)));
      } else {
        onChange([]);
      }
    };

    // Resolve labels for display
    const selectedOptions = React.useMemo(() => {
      return value.map((val) => {
        const found = renderedOptions.find((opt) => String(opt.value) === String(val));
        return (
          found || {
            value: String(val),
            label: String(val),
          }
        );
      });
    }, [renderedOptions, value]);
    const defaultRenderSelected = (
      selected: MultiSelectOption[],
      onRemove: (e: React.MouseEvent, val: string) => void,
    ) => {
      const isSmall = size === 'small';
      const maxVisible = maxVisibleItems ?? (isSmall ? 1 : 4);
      const shouldWrap = wrapSelectedItems ?? !isSmall;

      const visible = selected.slice(0, maxVisible);
      const remaining = selected.slice(maxVisible);

      return (
        <TooltipProvider delayDuration={200}>
          <div
            className={cn(
              'w-full items-center gap-1 overflow-hidden',
              shouldWrap ? 'flex flex-wrap gap-1.5' : 'flex max-w-[calc(100%-20px)] flex-nowrap',
            )}
          >
            {visible.map((opt) => (
              <Chip
                key={opt.value}
                tone="neutral"
                size="small"
                className={cn(
                  'flex shrink-0 items-center gap-1 border border-neutral-200 bg-neutral-100 text-neutral-800',
                  isSmall ? 'h-5 px-1.5 py-0' : 'px-2 py-0.5',
                )}
              >
                <span
                  className={cn(
                    'truncate',
                    isSmall
                      ? 'max-w-[70px] text-[11px] font-medium leading-none'
                      : 'max-w-[120px] text-body-2-rg',
                  )}
                >
                  {opt.label}
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(e, opt.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                      onRemove(e as unknown as React.MouseEvent, opt.value);
                    }
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="cursor-pointer rounded-full p-0.5 hover:bg-neutral-250"
                >
                  <X className={cn('text-neutral-600', isSmall ? 'h-2.5 w-2.5' : 'h-3 w-3')} />
                </span>
              </Chip>
            ))}

            {remaining.length > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={cn(
                      'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 font-semibold text-neutral-700 transition-colors hover:bg-neutral-200',
                      isSmall ? 'h-5 px-1.5 text-[11px]' : 'h-6 px-2 text-body-2-sb',
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    +{remaining.length}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="z-[9999]">
                  <TooltipBody
                    theme="light"
                    className="flex flex-col gap-1 border border-border bg-popover p-2 shadow-lg"
                  >
                    {remaining.map((opt) => (
                      <div
                        key={opt.value}
                        className={cn(
                          'whitespace-nowrap font-medium text-popover-foreground',
                          isSmall ? 'text-[11px]' : 'text-body-3-rg',
                        )}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </TooltipBody>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </TooltipProvider>
      );
    };

    return (
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            className={cn(
              'flex w-full items-center justify-between rounded-lg border border-input bg-background text-left text-foreground outline-none focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
              size === 'small'
                ? 'h-8 min-h-8 px-2.5 py-0 text-body-3-rg'
                : 'min-h-12 px-4 py-1.5 text-body-1-rg',
              value.length === 0 && 'text-muted-foreground',
              className,
            )}
            {...props}
          >
            <div className="flex min-w-0 flex-1 items-center">
              {selectedOptions.length === 0 ? (
                <span className="text-left text-muted-foreground">{placeholder}</span>
              ) : renderSelected ? (
                renderSelected(selectedOptions, handleUnselect)
              ) : (
                defaultRenderSelected(selectedOptions, handleUnselect)
              )}
            </div>
            <ArrowDown2
              className={cn(
                'ml-2 shrink-0 text-muted-foreground',
                size === 'small' ? 'h-4 w-4' : 'h-5 w-5',
              )}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="flex max-h-96 w-[var(--radix-dropdown-menu-trigger-width)] min-w-[240px] flex-col overflow-hidden p-1">
          {fetchData ? (
            <div
              className="mb-2 border-b border-border bg-card px-2 pb-2"
              onKeyDown={(e) => e.stopPropagation()}
            >
              <DebounceInput
                debounceTime={debounceMs}
                placeholder="Tìm kiếm..."
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
          ) : (
            searchable && (
              <div className="mb-1 flex items-center gap-2 border-b border-border px-3 py-2">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="w-full bg-transparent text-body-2-rg text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            )
          )}

          {/* Selection Stats and Buttons */}
          <div className="mb-1 flex items-center justify-between border-b border-border px-3 py-1.5 text-body-3-rg text-muted-foreground">
            <span>Đã chọn: {value.length}</span>
            <div className="flex gap-3">
              {maxSelect === undefined &&
                filteredOptions.some((opt) => !opt.disabled && !value.includes(opt.value)) && (
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="font-semibold transition-colors hover:text-primary"
                  >
                    Chọn tất cả
                  </button>
                )}
              {value.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="font-semibold transition-colors hover:text-primary"
                >
                  Xóa tất cả
                </button>
              )}
            </div>
          </div>

          <div className="max-h-64 flex-1 space-y-0.5 overflow-y-auto">
            {isLoading && !isLoadingMore && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Đang tải dữ liệu...
              </div>
            )}

            {filteredOptions.length === 0 && !isLoading ? (
              <div className="py-6 text-center text-body-2-rg text-muted-foreground">
                Không tìm thấy kết quả
              </div>
            ) : (
              (() => {
                const isMaxReached = maxSelect !== undefined && value.length >= maxSelect;
                return filteredOptions.map((opt) => {
                  const isSelected = value.includes(opt.value);
                  const isOptionDisabled = opt.disabled || (isMaxReached && !isSelected);
                  return (
                    <DropdownMenuItem
                      key={opt.value}
                      disabled={isOptionDisabled}
                      onSelect={(e) => {
                        e.preventDefault();
                        handleToggle(opt.value);
                      }}
                      className={cn(
                        'relative flex cursor-default select-none items-center gap-2.5 rounded-xl px-3 py-2 text-body-1-sb text-popover-foreground outline-none transition-colors focus:bg-primary/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                        isSelected && 'bg-primary/10 text-primary focus:bg-primary/15',
                      )}
                    >
                      {renderItem ? (
                        renderItem(opt, isSelected)
                      ) : (
                        <div className="flex w-full min-w-0 items-center justify-between">
                          <span
                            className={cn(
                              'truncate',
                              isSelected && 'font-bold text-primary',
                              isOptionDisabled && 'text-muted-foreground opacity-50',
                            )}
                          >
                            {opt.label}
                          </span>
                          {isSelected && (
                            <Check className="ml-2 h-4 w-4 shrink-0 text-primary" />
                          )}
                        </div>
                      )}
                    </DropdownMenuItem>
                  );
                });
              })()
            )}

            {isLoadingMore && (
              <div className="py-2 text-center text-xs text-muted-foreground">
                Đang tải dữ liệu...
              </div>
            )}
            <div ref={sentinelRef} className="h-1 w-full" />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

MultiSelect.displayName = 'MultiSelect';
