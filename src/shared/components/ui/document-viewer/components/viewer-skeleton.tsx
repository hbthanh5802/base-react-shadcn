export function ViewerSkeleton() {
  return (
    <div className="flex h-full flex-col items-center gap-4 p-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-full space-y-2">
          <div
            className="h-4 animate-pulse rounded bg-neutral-200"
            style={{ width: `${70 + (i % 3) * 10}%` }}
          />
          <div
            className="h-4 animate-pulse rounded bg-neutral-200"
            style={{ width: `${50 + (i % 5) * 8}%` }}
          />
        </div>
      ))}
    </div>
  );
}
