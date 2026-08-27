import { DocumentText, SearchNormal1 } from 'iconsax-react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { EmptyState } from '@/shared/components/ui/empty-state';

export const EmptyStateDevPage = () => (
  <div className="min-h-screen w-full space-y-8 bg-background p-6">
    <DevBreadcrumb label="Empty State" />
    <div className="space-y-1">
      <h1 className="text-heading-3 font-bold text-foreground">Empty State</h1>
      <p className="text-body-1-rg text-muted-foreground">
        Giao diện trạng thái trống khi không có dữ liệu, kèm icon và các nút hành động điều hướng.
      </p>
    </div>

    <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="border-b border-border pb-3">
        <h2 className="text-title-1 font-semibold text-foreground">1. Kích thước tiêu chuẩn (Default)</h2>
        <p className="text-body-2-rg text-muted-foreground mt-0.5">Dành cho các trang chính, danh sách bảng trống hoặc kết quả tìm kiếm.</p>
      </div>
      <div className="grid gap-6 pt-2 md:grid-cols-2">
        <div className="rounded-xl border border-dashed border-border bg-muted/10">
          <EmptyState
            icon={<SearchNormal1 size={24} variant="Linear" />}
            title="Không tìm thấy kết quả"
            description="Thử thay đổi từ khoá hoặc bộ lọc để tìm kết quả phù hợp hơn."
            primaryAction={<Button size="small">Xoá bộ lọc</Button>}
          />
        </div>
        <div className="rounded-xl border border-dashed border-border bg-muted/10">
          <EmptyState
            icon={<DocumentText size={24} variant="Linear" />}
            title="Chưa có dữ liệu"
            description="Bắt đầu bằng cách tạo hồ sơ đầu tiên của bạn trong hệ thống."
            primaryAction={<Button size="small">Tạo mới hồ sơ</Button>}
            secondaryAction={<Button size="small" variant="outline">Nhập từ file</Button>}
          />
        </div>
      </div>
    </section>

    <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="border-b border-border pb-3">
        <h2 className="text-title-1 font-semibold text-foreground">2. Kích thước nhỏ gọn (Compact)</h2>
        <p className="text-body-2-rg text-muted-foreground mt-0.5">Dành cho các dropdown, widget con hoặc tab nhỏ.</p>
      </div>
      <div className="grid gap-4 pt-2 md:grid-cols-3">
        <div className="rounded-lg border border-dashed border-border bg-muted/10">
          <EmptyState
            variant="compact"
            icon={<SearchNormal1 size={18} variant="Linear" />}
            title="Không có kết quả"
            description="Thử thay đổi bộ lọc."
          />
        </div>
        <div className="rounded-lg border border-dashed border-border bg-muted/10">
          <EmptyState
            variant="compact"
            title="Danh sách trống"
            description="Thêm mới để bắt đầu."
            primaryAction={<Button size="small">Thêm mới</Button>}
          />
        </div>
        <div className="rounded-lg border border-dashed border-border bg-muted/10">
          <EmptyState
            variant="compact"
            icon={<DocumentText size={18} variant="Linear" />}
            title="Không có tài liệu đính kèm"
          />
        </div>
      </div>
    </section>
  </div>
);

export default EmptyStateDevPage;
