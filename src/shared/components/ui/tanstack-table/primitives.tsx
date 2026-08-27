import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import * as React from 'react';

import { Icon } from '@/shared/components/ui/icon';
import { cn } from '@/shared/lib/utils';

// ─── Table wrapper ────────────────────────────────────────────────────────────

interface TanstackTableProps extends React.HTMLAttributes<HTMLTableElement> {
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

const TanstackTable = React.forwardRef<HTMLTableElement, TanstackTableProps>(
  ({ className, wrapperClassName, wrapperStyle, ...props }, ref) => (
    <div
      className={cn(
        'relative w-full overflow-auto rounded-lg border-b border-border shadow-sm',
        wrapperClassName,
      )}
      style={wrapperStyle}
    >
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-body-2-rg', className)}
        {...props}
      />
    </div>
  ),
);
TanstackTable.displayName = 'TanstackTable';

// ─── thead ────────────────────────────────────────────────────────────────────

const TanstackTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('bg-muted/50 [&_tr]:border-b [&_tr]:border-border', className)}
    {...props}
  />
));
TanstackTableHeader.displayName = 'TanstackTableHeader';

// ─── tbody ────────────────────────────────────────────────────────────────────

const TanstackTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('divide-y divide-border [&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TanstackTableBody.displayName = 'TanstackTableBody';

// ─── tfoot ────────────────────────────────────────────────────────────────────

const TanstackTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t border-border bg-muted font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TanstackTableFooter.displayName = 'TanstackTableFooter';

// ─── tr ───────────────────────────────────────────────────────────────────────

interface TanstackTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

const TanstackTableRow = React.forwardRef<HTMLTableRowElement, TanstackTableRowProps>(
  ({ className, selected, ...props }, ref) => (
    <tr
      ref={ref}
      data-state={selected ? 'selected' : undefined}
      className={cn(
        'h-12 transition-colors hover:bg-muted/50 data-[state=selected]:bg-primary/10',
        className,
      )}
      {...props}
    />
  ),
);
TanstackTableRow.displayName = 'TanstackTableRow';

interface TanstackTableExpandedContentProps extends React.HTMLAttributes<HTMLTableRowElement> {
  colSpan: number;
}

const TanstackTableExpandedContent = React.forwardRef<
  HTMLTableRowElement,
  TanstackTableExpandedContentProps
>(({ colSpan, children, className, ...props }, ref) => (
  <tr ref={ref} className={cn('bg-background hover:bg-transparent', className)} {...props}>
    <td colSpan={colSpan} className="p-0">
      <div className="border-l-[3px] border-primary bg-background">{children}</div>
    </td>
  </tr>
));
TanstackTableExpandedContent.displayName = 'TanstackTableExpandedContent';

// ─── th ───────────────────────────────────────────────────────────────────────

interface TanstackTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | false;
  onSort?: () => void;
}

const SortUnsortedIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path
      d="M4 4.5L6 2.5L8 4.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 7.5L6 9.5L8 7.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TanstackTableHead = React.forwardRef<HTMLTableCellElement, TanstackTableHeadProps>(
  ({ className, sortable, sorted, onSort, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-11 whitespace-nowrap px-3 text-left align-middle text-body-3-sb text-foreground',
        sortable && 'cursor-pointer select-none hover:text-foreground',
        className,
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <div className="flex items-center gap-1">
        <span className="flex-1">{children}</span>
        {sortable && (
          <span
            className={cn(
              'transition-colors',
              sorted ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            {sorted === 'asc' ? (
              <Icon icon={ArrowUp2} size={12} />
            ) : sorted === 'desc' ? (
              <Icon icon={ArrowDown2} size={12} />
            ) : (
              <SortUnsortedIcon />
            )}
          </span>
        )}
      </div>
    </th>
  ),
);
TanstackTableHead.displayName = 'TanstackTableHead';

// ─── td ───────────────────────────────────────────────────────────────────────

const TanstackTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn('px-3 py-2 align-middle', className)} {...props} />
));
TanstackTableCell.displayName = 'TanstackTableCell';

// ─── caption ─────────────────────────────────────────────────────────────────

const TanstackTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-body-3-rg text-muted-foreground', className)}
    {...props}
  />
));
TanstackTableCaption.displayName = 'TanstackTableCaption';

export {
  TanstackTable,
  TanstackTableBody,
  TanstackTableCaption,
  TanstackTableCell,
  TanstackTableExpandedContent,
  TanstackTableFooter,
  TanstackTableHead,
  TanstackTableHeader,
  TanstackTableRow,
};
