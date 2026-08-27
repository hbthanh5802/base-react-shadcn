import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

export const LabelDevPage = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Label" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Label</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Nhãn văn bản liên kết với các trường nhập liệu trong biểu mẫu (Form Controls).
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Liên kết với Checkbox & Input</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Click vào nhãn văn bản để tự động focus hoặc đổi trạng thái.</p>
        </div>
        <div className="space-y-6 pt-2 max-w-md">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border">
            <Checkbox
              id="label-checkbox"
              checked={checked}
              onCheckedChange={(v) => setChecked(Boolean(v))}
            />
            <Label htmlFor="label-checkbox" className="cursor-pointer select-none">
              Tôi đồng ý với các điều khoản sử dụng
            </Label>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fullname-input">
              Họ và tên người dùng <span className="text-destructive">*</span>
            </Label>
            <Input id="fullname-input" placeholder="Nguyễn Văn A" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabelDevPage;
