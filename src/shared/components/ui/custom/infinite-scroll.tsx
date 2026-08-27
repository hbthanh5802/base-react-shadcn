import { useEffect, useRef, type ReactNode } from 'react';

interface InfiniteScrollProps {
  children: ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  /** Khoảng cách đệm từ dưới lên để bắt đầu tải dữ liệu trước khi chạm hẳn đáy (mặc định '150px') */
  rootMargin?: string;
  className?: string;
  /** ReactNode tùy biến cho giao diện loading */
  loadingNode?: ReactNode;
  /** Nếu true (mặc định), cuộn theo window. Nếu false, cuộn theo chính container này (cần set max-height và overflow-y-auto) */
  useWindowScroll?: boolean;
}

export function InfiniteScroll({
  children,
  onLoadMore,
  hasMore,
  isLoading,
  rootMargin = '150px',
  className,
  loadingNode,
  useWindowScroll = true,
}: InfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry && firstEntry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: useWindowScroll ? null : containerRef.current,
        rootMargin,
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
  }, [onLoadMore, hasMore, isLoading, rootMargin, useWindowScroll]);

  return (
    <div ref={containerRef} className={className}>
      {children}

      {/* Điểm nhận diện giao thoa cuộn */}
      <div ref={sentinelRef} className="h-1 w-full" />

      {/* Hiệu ứng loading động khi đang tải thêm */}
      {isLoading && (
        <div className="flex w-full items-center justify-center p-4">
          {loadingNode ? (
            loadingNode
          ) : (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
          )}
        </div>
      )}
    </div>
  );
}
