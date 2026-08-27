import { useState } from 'react';
import { toast } from 'sonner';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { CodeBlock, CodePreview } from '@/shared/components/ui/code-block';
import {
  DatePicker,
  DatePickerPanel,
  DateRangePicker,
  type DateRangeValue,
} from '@/shared/components/ui/date-picker';

const demoRange: DateRangeValue = {
  from: new Date(2024, 6, 14),
  to: new Date(2024, 6, 20),
};

const demoDualRange: DateRangeValue = {
  from: new Date(2024, 6, 14),
  to: new Date(2024, 7, 5),
};

const singleDateCode = `import { useState } from 'react';
import { DatePicker } from '@/shared/components/ui/date-picker';

export function SingleDateExample() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <DatePicker
      label="Ngày áp dụng"
      required
      supportingText="Định dạng: dd/mm/yyyy"
      placeholder="dd/mm/yyyy"
      value={value}
      onValueChange={setValue}
    />
  );
}`;

const dateRangeCode = `import { useState } from 'react';
import { DateRangePicker, type DateRangeValue } from '@/shared/components/ui/date-picker';
import { toast } from 'sonner';

export function DateRangeExample() {
  const [range, setRange] = useState<DateRangeValue>({ from: null, to: null });

  return (
    <DateRangePicker
      label="Khoảng thời gian hiệu lực"
      required
      needConfirm // Yêu cầu bấm nút Xác nhận
      clearable
      supportingText="Chọn khoảng ngày rồi nhấn Xác nhận"
      value={range}
      onValueChange={setRange}
      onConfirm={(r) => {
        toast.success('Đã xác nhận khoảng ngày');
      }}
    />
  );
}`;

export const DatePickerDevPage = () => {
  const [value, setValue] = useState<Date | null>(new Date(2024, 6, 14));
  const [range, setRange] = useState<DateRangeValue>({ from: null, to: null });
  const [confirmRange, setConfirmRange] = useState<DateRangeValue>({ from: null, to: null });

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Date Picker" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Date Picker</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Bộ chọn ngày đơn, khoảng thời gian (Date Range) và các khung xem theo ngày, tháng, quý, năm.
        </p>
      </div>

      {/* ── 1. Single date ── */}
      <CodePreview
        title="1. Chọn ngày đơn (Single Date)"
        description="Chọn một mốc thời gian cụ thể."
        code={singleDateCode}
      >
        <div className="max-w-md space-y-3">
          <DatePicker
            label="Ngày áp dụng"
            required
            supportingText="Định dạng: dd/mm/yyyy"
            placeholder="dd/mm/yyyy"
            value={value}
            onValueChange={setValue}
          />
          {value && (
            <p className="text-body-2-sb text-foreground">
              Đã chọn: <span className="font-mono text-primary">{value.toLocaleDateString('vi-VN')}</span>
            </p>
          )}
        </div>
      </CodePreview>

      {/* ── 2. Date range with needConfirm ── */}
      <CodePreview
        title="2. Chọn khoảng ngày có nút Xác nhận (needConfirm)"
        description="Cho phép chọn khoảng ngày và chỉ áp dụng khi người dùng nhấn nút Xác nhận."
        code={dateRangeCode}
      >
        <div className="max-w-xl space-y-3">
          <DateRangePicker
            label="Khoảng thời gian hiệu lực"
            required
            needConfirm
            clearable
            supportingText="Chọn khoảng ngày rồi nhấn Xác nhận"
            value={confirmRange}
            onValueChange={setConfirmRange}
            onConfirm={(r) => {
              const fromStr = r.from ? r.from.toLocaleDateString('vi-VN') : 'Trống';
              const toStr = r.to ? r.to.toLocaleDateString('vi-VN') : 'Trống';
              toast.success(`Đã chọn: ${fromStr} → ${toStr}`);
            }}
          />
          {(confirmRange.from || confirmRange.to) && (
            <p className="text-body-2-sb text-foreground">
              {confirmRange.from && <span>Từ: <span className="font-mono text-primary">{confirmRange.from.toLocaleDateString('vi-VN')}</span></span>}
              {confirmRange.from && confirmRange.to && <span className="mx-2 text-muted-foreground">→</span>}
              {confirmRange.to && <span>Đến: <span className="font-mono text-primary">{confirmRange.to.toLocaleDateString('vi-VN')}</span></span>}
            </p>
          )}
        </div>
      </CodePreview>

      {/* ── 3. Date range standard ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">3. Chọn khoảng ngày tự động đóng (Standard Range)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Tự động chốt và đóng bảng chọn khi chọn xong ngày kết thúc.</p>
        </div>
        <div className="max-w-xl pt-2">
          <DateRangePicker
            label="Khoảng thời gian thực hiện"
            required
            supportingText="Chọn ngày bắt đầu và ngày kết thúc"
            value={range}
            onValueChange={setRange}
          />
        </div>
        {(range.from || range.to) && (
          <p className="text-body-2-sb text-foreground">
            {range.from && <span>Từ: <span className="font-mono text-primary">{range.from.toLocaleDateString('vi-VN')}</span></span>}
            {range.from && range.to && <span className="mx-2 text-muted-foreground">→</span>}
            {range.to && <span>Đến: <span className="font-mono text-primary">{range.to.toLocaleDateString('vi-VN')}</span></span>}
          </p>
        )}
      </section>

      {/* ── 4. States ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">4. Các trạng thái (States)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Mặc định, có dữ liệu, lỗi và vô hiệu hóa.</p>
        </div>
        <div className="grid max-w-3xl grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
          <DateRangePicker label="Trạng thái mặc định" />
          <DateRangePicker label="Đã có giá trị" value={demoDualRange} />
          <DateRangePicker
            label="Báo lỗi (Error)"
            error="Khoảng thời gian không hợp lệ"
            value={{ from: new Date(2024, 6, 20), to: new Date(2024, 6, 14) }}
          />
          <DateRangePicker label="Vô hiệu hóa (Disabled)" disabled value={demoRange} />
        </div>
      </section>

      {/* ── 5. Panel gallery ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">5. Thư viện Panel hiển thị</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Các khung lịch theo ngày, 2 tháng liên tiếp, tháng, quý và năm.</p>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border bg-muted/20 p-6">
          <div className="flex min-w-[1700px] gap-6">
            <DatePickerPanel mode="day" value={new Date(2024, 6, 14)} />
            <DatePickerPanel mode="dayRangeDual" rangeValue={demoDualRange} clearable needConfirm />
            <DatePickerPanel mode="month" value={new Date(2024, 7, 1)} />
            <DatePickerPanel mode="quarter" value={new Date(2024, 0, 1)} />
            <DatePickerPanel mode="year" value={new Date(2023, 0, 1)} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DatePickerDevPage;
