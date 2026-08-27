import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Pagination } from '@/shared/components/ui/pagination';

export const PaginationDevPage = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(3);
  const [page3, setPage3] = useState(5);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Pagination" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Pagination</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Thành phần điều hướng phân trang hỗ trợ chuyển trang, chọn số bản ghi mỗi trang và nhảy đến trang bất kỳ.
        </p>
      </div>

      {/* Full Pagination */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Đầy đủ tính năng (Full Pagination)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            Bao gồm tổng số bản ghi, chọn số dòng/trang và ô nhập nhảy đến trang.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-2">
          <Pagination
            page={page3}
            totalPages={10}
            totalItems={80}
            onPageChange={setPage3}
            showPageSize
            showGotoPage
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </div>
      </section>

      {/* Basic */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Phân trang cơ bản (Basic)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Chỉ hiển thị các nút số trang và nút điều hướng Trước/Sau.</p>
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-2">
          <Pagination page={page1} totalPages={8} onPageChange={setPage1} />
        </div>
      </section>

      {/* With total count */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">3. Kèm tổng số bản ghi (Total Count)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Hiển thị thông tin tổng số lượng bản ghi bên góc trái.</p>
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-2">
          <Pagination page={page2} totalPages={10} totalItems={100} onPageChange={setPage2} />
        </div>
      </section>
    </div>
  );
};

export default PaginationDevPage;
