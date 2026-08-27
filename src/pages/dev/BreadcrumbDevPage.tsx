import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Breadcrumb } from '@/shared/components/ui/breadcrumb';
import { Button } from '@/shared/components/ui/button';

export const BreadcrumbDevPage = () => {
  const [stack, setStack] = useState(['Trang chủ', 'Danh mục', 'Sản phẩm']);
  const pageOptions = ['Trang chủ', 'Danh mục', 'Sản phẩm', 'Chi tiết', 'Cấu hình'];
  const canAppend = stack.length < pageOptions.length;

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Breadcrumb" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Breadcrumb</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Thanh điều hướng phân cấp theo cây thư mục hoặc tiến trình điều hướng của người dùng.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Các cấp độ hiển thị mẫu</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Tự động chèn dấu phân cách giữa các cấp độ trang.</p>
        </div>
        <div className="space-y-3 pt-2">
          <Breadcrumb items={[{ label: 'Trang chủ' }]} />
          <Breadcrumb items={[{ label: 'Trang chủ' }, { label: 'Báo cáo tổng hợp' }]} />
          <Breadcrumb items={[{ label: 'Trang chủ' }, { label: 'Quản lý' }, { label: 'Danh sách nhân sự' }]} />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Điều hướng tương tác (Interactive)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Click vào từng mục trong chuỗi đường dẫn để quay lại cấp trước.</p>
        </div>
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <Breadcrumb
              items={stack.map((label) => ({ label, href: '#' }))}
              onNavigate={(index, _item, event) => {
                event.preventDefault();
                setStack((prev) => prev.slice(0, index + 1));
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="small"
              variant="default"
              disabled={!canAppend}
              onClick={() => {
                if (!canAppend) return;
                setStack((prev) => [...prev, pageOptions[prev.length]]);
              }}
            >
              + Thêm cấp trang ({pageOptions[stack.length] || 'Đã tối đa'})
            </Button>
            <Button
              size="small"
              variant="outline"
              onClick={() => setStack(['Trang chủ'])}
            >
              Reset về trang chủ
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BreadcrumbDevPage;
