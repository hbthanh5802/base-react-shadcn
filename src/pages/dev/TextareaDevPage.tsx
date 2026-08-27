import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Textarea } from '@/shared/components/ui/textarea';

export const TextareaDevPage = () => {
  const [value, setValue] = useState('');

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Textarea" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Textarea</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Vùng nhập văn bản nhiều dòng phục vụ nhập ghi chú, nội dung chi tiết và mô tả dài.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Nhập văn bản có đếm ký tự</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Tự động bắt sự kiện gõ phím và tính toán độ dài văn bản.</p>
        </div>
        <div className="space-y-3 pt-2 max-w-xl">
          <Textarea
            aria-label="textarea-playground"
            rows={4}
            value={value}
            placeholder="Nhập nội dung ghi chú hoặc ý kiến đóng góp..."
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex justify-between items-center text-caption-1-rg text-muted-foreground">
            <span>Tối đa: 500 ký tự</span>
            <span className="font-mono font-medium text-foreground">Số ký tự: {value.length}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextareaDevPage;
