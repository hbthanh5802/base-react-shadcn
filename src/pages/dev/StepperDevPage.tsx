import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { Stepper } from '@/shared/components/ui/stepper';

const steps = [
  { label: 'Nhập thông tin', description: 'Điền thông tin hồ sơ' },
  { label: 'Kiểm tra & Xác nhận', description: 'Rà soát tài liệu đính kèm' },
  { label: 'Hoàn thành quy trình', description: 'Phê duyệt và lưu trữ' },
];

export const StepperDevPage = () => {
  const [current, setCurrent] = useState(1);

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Stepper" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Stepper</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Thanh chỉ báo các bước thực hiện tuần tự trong quy trình nghiệp vụ theo hướng ngang hoặc dọc.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Thử nghiệm tương tác (Interactive Stepper)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Bấm nút để di chuyển qua lại giữa các bước.</p>
        </div>
        <div className="space-y-6 pt-2">
          <Stepper steps={steps} currentStep={current} />
          <div className="flex gap-3 pt-2 border-t border-border">
            <Button
              variant="outline"
              size="small"
              disabled={current <= 0}
              onClick={() => setCurrent((c) => c - 1)}
            >
              ← Quay lại
            </Button>
            <Button
              size="small"
              disabled={current >= steps.length}
              onClick={() => setCurrent((c) => c + 1)}
            >
              Tiếp theo →
            </Button>
            <Button variant="ghost" size="small" onClick={() => setCurrent(0)}>
              Reset về bước 1
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Hướng dọc (Vertical Orientation)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Thích hợp cho thanh timeline hoặc sidebar theo dõi tiến độ.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-caption-1-sb text-muted-foreground">Bước 1 (Đang thực hiện):</p>
            <Stepper steps={steps} currentStep={0} orientation="vertical" />
          </div>
          <div className="space-y-2">
            <p className="text-caption-1-sb text-muted-foreground">Bước 2:</p>
            <Stepper steps={steps} currentStep={1} orientation="vertical" />
          </div>
          <div className="space-y-2">
            <p className="text-caption-1-sb text-muted-foreground">Đã hoàn thành tất cả:</p>
            <Stepper steps={steps} currentStep={3} orientation="vertical" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StepperDevPage;
