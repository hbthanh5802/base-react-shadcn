import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { InfiniteScroll } from '@/shared/components/ui/custom/infinite-scroll';

// Mock API function to simulate paginated data loading
const fetchMockItemsPage = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const pageSize = 5;
  const start = page * pageSize;
  const items = Array.from({ length: pageSize }, (_, i) => `Mục dữ liệu (Query) #${start + i + 1}`);
  return {
    items,
    currentPage: page,
    totalPages: 6, // maximum 6 pages (30 items total)
  };
};

export const InfiniteScrollDevPage = () => {
  // --- Example 1: Local State Simulation ---
  const [items, setItems] = useState<string[]>(
    Array.from({ length: 12 }, (_, i) => `Hồ sơ nghiệp vụ #${i + 1}`),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreItems = () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    setTimeout(() => {
      setItems((prev) => {
        const nextStart = prev.length + 1;
        const newBatch = Array.from({ length: 6 }, (_, i) => `Hồ sơ nghiệp vụ #${nextStart + i}`);
        const result = [...prev, ...newBatch];

        if (result.length >= 36) {
          setHasMore(false);
        }
        return result;
      });
      setIsLoading(false);
    }, 1200);
  };

  // --- Example 2: TanStack Query useInfiniteQuery Integration ---
  const {
    data: queryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isQueryLoading,
  } = useInfiniteQuery({
    queryKey: ['infiniteScrollDemoQuery'],
    queryFn: ({ pageParam = 0 }) => fetchMockItemsPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage + 1 < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });

  const queryItems = queryData?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Infinite Scroll" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Infinite Scroll</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Cuộn vô hạn dựa trên Intersection Observer hỗ trợ cuộn theo vùng chứa (Container) hoặc theo cửa sổ (Window).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Ví dụ 1: Container Scroll */}
        <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="border-b border-border pb-3">
            <h2 className="text-title-1 font-semibold text-foreground">1. Cuộn trong vùng chứa (Container Scroll)</h2>
            <p className="text-body-2-rg text-muted-foreground mt-0.5">
              Chiều cao cố định 360px, tự động tải thêm khi cuộn tới cuối danh sách.
            </p>
          </div>

          <InfiniteScroll
            onLoadMore={loadMoreItems}
            hasMore={hasMore}
            isLoading={isLoading}
            useWindowScroll={false}
            className="max-h-[360px] space-y-2.5 overflow-y-auto rounded-lg border border-border bg-muted/10 p-3"
            loadingNode={
              <div className="w-full space-y-2 py-3">
                <div className="h-10 animate-pulse rounded-lg bg-accent" />
                <div className="h-10 animate-pulse rounded-lg bg-accent" />
              </div>
            }
          >
            {items.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="rounded-lg border border-border bg-card p-3.5 text-body-2-md text-foreground shadow-2xs"
              >
                {item}
              </div>
            ))}
          </InfiniteScroll>
        </section>

        {/* Ví dụ 2: Tích hợp TanStack useInfiniteQuery */}
        <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="border-b border-border pb-3">
            <h2 className="text-title-1 font-semibold text-foreground">2. Tích hợp TanStack Query (useInfiniteQuery)</h2>
            <p className="text-body-2-rg text-muted-foreground mt-0.5">
              Tải dữ liệu phân trang bất đồng bộ từ API thực tế với cơ chế caching tự động.
            </p>
          </div>

          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasMore={!!hasNextPage}
            isLoading={isFetchingNextPage || isQueryLoading}
            useWindowScroll={false}
            className="max-h-[360px] space-y-2.5 overflow-y-auto rounded-lg border border-border bg-muted/10 p-3"
            loadingNode={
              <div className="w-full space-y-2 py-3">
                <div className="h-10 animate-pulse rounded-lg bg-accent" />
                <div className="h-10 animate-pulse rounded-lg bg-accent" />
              </div>
            }
          >
            {queryItems.map((item, index) => (
              <div
                key={`query-${item}-${index}`}
                className="rounded-lg border border-border bg-card p-3.5 text-body-2-md text-foreground shadow-2xs"
              >
                {item}
              </div>
            ))}
          </InfiniteScroll>
        </section>
      </div>
    </div>
  );
};

export default InfiniteScrollDevPage;
