import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export const SelectDevPage = () => {
  const [value, setValue] = useState('review');

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Select" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Select</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Trình đơn lựa chọn giá trị đơn lẻ với hiệu ứng trượt êm ái xây dựng trên nền tảng Radix UI.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Lựa chọn trạng thái hồ sơ</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Chọn một giá trị trong danh mục định sẵn.</p>
        </div>
        <div className="space-y-4 pt-2 max-w-sm">
          <div className="space-y-2">
            <label className="text-body-2-sb text-foreground">Trạng thái phê duyệt</label>
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger aria-label="status">
                <SelectValue placeholder="Chọn trạng thái..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Bản nháp (Draft)</SelectItem>
                <SelectItem value="review">Đang thẩm định (In Review)</SelectItem>
                <SelectItem value="approved">Đã phê duyệt (Approved)</SelectItem>
                <SelectItem value="rejected">Từ chối (Rejected)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-body-2-sb text-foreground">
            Giá trị đã chọn: <span className="font-mono text-primary">{value}</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SelectDevPage;
