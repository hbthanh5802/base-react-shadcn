interface DataTableSkeletonProps {
  columns: number;
  rows: number;
}

export const DataTableSkeleton = ({ columns, rows }: DataTableSkeletonProps) => (
  <div className="rounded-md border bg-card">
    <div className="border-b p-4">
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 flex-1 animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
    <div className="divide-y">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-4 p-4">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div key={colIdx} className="h-4 flex-1 animate-pulse rounded bg-muted/60" />
          ))}
        </div>
      ))}
    </div>
  </div>
);
