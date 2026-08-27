import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M12.5 5L7.5 10L12.5 15"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M7.5 5L12.5 10L7.5 15"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  showPageSize?: boolean;
  showGotoPage?: boolean;
  showItemRange?: boolean;
  className?: string;
}

const DOTS = '...' as const;

// ─── usePaginationRange ───────────────────────────────────────────────────────

const usePaginationRange = (page: number, totalPages: number, siblingCount: number) =>
  useMemo<(number | typeof DOTS)[]>(() => {
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const leftIdx = Math.max(page - siblingCount, 1);
    const rightIdx = Math.min(page + siblingCount, totalPages);
    const showLeftDots = leftIdx > 2;
    const showRightDots = rightIdx < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }
    if (showLeftDots && !showRightDots) {
      const count = 3 + 2 * siblingCount;
      const rightRange = Array.from({ length: count }, (_, i) => totalPages - count + i + 1);
      return [1, DOTS, ...rightRange];
    }
    const mid = Array.from({ length: rightIdx - leftIdx + 1 }, (_, i) => leftIdx + i);
    return [1, DOTS, ...mid, DOTS, totalPages];
  }, [page, siblingCount, totalPages]);

// ─── Styles ───────────────────────────────────────────────────────────────────

const iconBtnClass = [
  'inline-flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center',
  'rounded-lg border border-border bg-background p-2 text-muted-foreground',
  'transition-colors hover:bg-muted',
  'disabled:cursor-not-allowed disabled:opacity-40',
].join(' ');

const numBtnBase = [
  'inline-flex h-9 w-9 shrink-0 items-center justify-center',
  'rounded-lg border text-body-2-sb tabular-nums transition-colors',
].join(' ');

// ─── Component ────────────────────────────────────────────────────────────────

export const Pagination = ({
  page,
  totalPages,
  totalItems,
  onPageChange,
  siblingCount = 1,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  showPageSize = false,
  showGotoPage = false,
  showItemRange = true,
  className,
}: PaginationProps) => {
  const { t } = useTranslation('components');
  const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const [gotoValue, setGotoValue] = useState('');
  const range = usePaginationRange(safePage, totalPages, siblingCount);

  const canPrev = safePage > 1;
  const canNext = safePage < totalPages;

  const applyGoto = () => {
    const n = parseInt(gotoValue, 10);
    if (!isNaN(n)) onPageChange(Math.min(Math.max(n, 1), totalPages));
    setGotoValue('');
  };

  const itemRange = useMemo(() => {
    if (!showItemRange || totalItems == null || totalItems === 0) return null;
    const from = (safePage - 1) * pageSize + 1;
    const to = Math.min(safePage * pageSize, totalItems);
    return { from, to };
  }, [safePage, pageSize, totalItems]);

  const hasLeft = showPageSize || showGotoPage || showItemRange;

  return (
    <div
      className={cn(
        'flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center',
        hasLeft ? 'sm:justify-between' : 'sm:justify-end',
        className,
      )}
    >
      {/* ── Left: page-size selector + goto-page ── */}
      {hasLeft && (
        <div className="flex flex-wrap items-center gap-3">
          {itemRange && (
            <span className="-ml-4 text-body-2-rg tabular-nums text-muted-foreground">
              {itemRange.from}-{itemRange.to}/{totalItems}{' '}
              {t('pagination.records', { defaultValue: 'bản ghi' })}
            </span>
          )}

          {/* Separator giữa "bản ghi" và "Số hàng mỗi trang" */}
          {itemRange && showPageSize && (
            <div className="hidden h-5 w-px shrink-0 bg-border sm:block" />
          )}

          {showPageSize && (
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-body-2-rg text-muted-foreground">
                {t('pagination.showRecordsPerPage')}
              </span>
              <Select value={String(pageSize)} onValueChange={(v) => onPageSizeChange?.(Number(v))}>
                <SelectTrigger className="h-9 w-[85px] border-border text-body-2-sb text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent displayPosition="auto">
                  {pageSizeOptions.map((opt) => (
                    <SelectItem key={opt} value={String(opt)}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Separator — desktop only */}
          {showPageSize && showGotoPage && (
            <div className="hidden h-5 w-px shrink-0 bg-border sm:block" />
          )}

          {/* Goto page — hidden on mobile to prevent overflow */}
          {showGotoPage && (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="whitespace-nowrap text-body-2-rg text-muted-foreground">
                {t('pagination.goToPage')}
              </span>
              <div className="flex h-9 overflow-hidden rounded-lg border border-border bg-background transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label={t('pagination.goToPageAriaLabel')}
                  placeholder={t('pagination.pageNumberPlaceholder')}
                  value={gotoValue}
                  className="w-[60px] bg-transparent px-3 text-center text-body-2-sb text-foreground outline-none placeholder:text-muted-foreground"
                  onChange={(e) => setGotoValue(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => e.key === 'Enter' && applyGoto()}
                />
                <button
                  type="button"
                  aria-label={t('pagination.goToPageAriaLabel')}
                  onClick={applyGoto}
                  className="flex h-full w-8 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
                >
                  <IconArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Right: count + navigation ── */}
      <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
        {/* Total count */}
        {totalItems != null && (
          <span className="whitespace-nowrap text-body-2-sb text-foreground">
            {t('pagination.totalItems', { count: totalItems })}
          </span>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Prev — always visible */}
          <button
            type="button"
            aria-label={t('pagination.prevPage')}
            className={iconBtnClass}
            disabled={!canPrev}
            onClick={() => canPrev && onPageChange(safePage - 1)}
          >
            <IconChevronLeft />
          </button>

          {/* Mobile: compact "X / Y" indicator */}
          <span className="min-w-[3.5rem] text-center text-body-2-sb tabular-nums text-muted-foreground sm:hidden">
            {safePage} / {totalPages}
          </span>

          {/* Desktop: full page numbers */}
          <div className="hidden items-center gap-1 sm:flex">
            {range.map((item, idx) =>
              item === DOTS ? (
                <span
                  key={`dots-${idx}`}
                  className={cn(
                    numBtnBase,
                    'select-none border-transparent bg-transparent text-muted-foreground',
                  )}
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  aria-label={t('pagination.page', { page: item })}
                  aria-current={item === safePage ? 'page' : undefined}
                  className={cn(
                    numBtnBase,
                    item === safePage
                      ? 'border-primary bg-primary text-primary-foreground font-semibold shadow-xs'
                      : 'border-transparent bg-transparent text-muted-foreground hover:bg-muted',
                  )}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </button>
              ),
            )}
          </div>

          {/* Next — always visible */}
          <button
            type="button"
            aria-label={t('pagination.nextPage')}
            className={iconBtnClass}
            disabled={!canNext}
            onClick={() => canNext && onPageChange(safePage + 1)}
          >
            <IconChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export type { PaginationProps };
