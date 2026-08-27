import React, { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { CodePreview } from '@/shared/components/ui/code-block';
import { Label } from '@/shared/components/ui/label';
import { RadioButton, RadioGroup } from '@/shared/components/ui/radio-button';

const rowLabelClass = 'text-body-1-sb text-foreground flex items-center';
const cellClass = 'flex min-h-14 items-center justify-center rounded-lg bg-muted/40 p-2 border border-border/40';

const radioGroupCode = `import { useState } from 'react';
import { RadioGroup, RadioButton } from '@/shared/components/ui/radio-button';
import { Label } from '@/shared/components/ui/label';

export function RadioGroupExample() {
  const [value, setValue] = useState('standard');

  return (
    <RadioGroup value={value} onValueChange={setValue} className="space-y-3">
      <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
        <RadioButton value="standard" id="opt-1" />
        <Label htmlFor="opt-1" className="cursor-pointer">
          Gói tiêu chuẩn (Cá nhân)
        </Label>
      </div>

      <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
        <RadioButton value="pro" id="opt-2" />
        <Label htmlFor="opt-2" className="cursor-pointer">
          Gói chuyên nghiệp (Doanh nghiệp)
        </Label>
      </div>
    </RadioGroup>
  );
}`;

const MatrixRadio = ({
  checked = false,
  disabled = false,
  className,
  ...props
}: Omit<React.ComponentProps<typeof RadioButton>, 'value'> & { checked?: boolean }) => (
  <RadioGroup value={checked ? 'on' : undefined}>
    <RadioButton value="on" disabled={disabled} className={className} {...props} />
  </RadioGroup>
);

export const RadioButtonDevPage = () => {
  const [value, setValue] = useState('standard');

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Radio Button" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Radio Button</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Nút chọn một giá trị duy nhất trong danh sách các lựa chọn loại trừ lẫn nhau.
        </p>
      </div>

      {/* ── 1. Interactive Group ── */}
      <CodePreview
        title="1. Nhóm tùy chọn tương tác (Interactive Group)"
        description="Liên kết nhãn và bắt sự kiện thay đổi giá trị."
        code={radioGroupCode}
      >
        <div className="space-y-4 max-w-md">
          <RadioGroup value={value} onValueChange={setValue} className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background border border-border">
              <RadioButton value="standard" id="radio-opt-1" />
              <Label htmlFor="radio-opt-1" className="cursor-pointer">
                Gói tiêu chuẩn (Cá nhân)
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background border border-border">
              <RadioButton value="pro" id="radio-opt-2" />
              <Label htmlFor="radio-opt-2" className="cursor-pointer">
                Gói chuyên nghiệp (Doanh nghiệp)
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background border border-border">
              <RadioButton value="enterprise" id="radio-opt-3" />
              <Label htmlFor="radio-opt-3" className="cursor-pointer">
                Gói giải pháp tổ chức (Enterprise)
              </Label>
            </div>
          </RadioGroup>
          <p className="text-body-2-sb text-foreground">
            Lựa chọn hiện tại: <span className="font-mono text-primary">{value}</span>
          </p>
        </div>
      </CodePreview>

      {/* ── 2. Design States ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Ma trận trạng thái (Design States)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Trạng thái Default, Hover, Pressed, Focus và Disabled.</p>
        </div>
        <div className="w-full overflow-x-auto pt-2">
          <div className="grid min-w-[640px] grid-cols-[140px_repeat(5,1fr)] gap-3 text-center">
            <div />
            <div className="text-caption-1-sb text-muted-foreground">Default</div>
            <div className="text-caption-1-sb text-muted-foreground">Hover</div>
            <div className="text-caption-1-sb text-muted-foreground">Pressed</div>
            <div className="text-caption-1-sb text-muted-foreground">Focus</div>
            <div className="text-caption-1-sb text-muted-foreground">Disable</div>

            <div className={rowLabelClass}>Checked</div>
            <div className={cellClass}><MatrixRadio checked /></div>
            <div className={cellClass}><MatrixRadio checked data-ui-hover="true" /></div>
            <div className={cellClass}><MatrixRadio checked data-ui-pressed="true" /></div>
            <div className={cellClass}><MatrixRadio checked data-ui-focus="true" /></div>
            <div className={cellClass}><MatrixRadio checked disabled /></div>

            <div className={rowLabelClass}>Unchecked</div>
            <div className={cellClass}><MatrixRadio /></div>
            <div className={cellClass}><MatrixRadio data-ui-hover="true" /></div>
            <div className={cellClass}><MatrixRadio data-ui-pressed="true" /></div>
            <div className={cellClass}><MatrixRadio data-ui-focus="true" /></div>
            <div className={cellClass}><MatrixRadio disabled /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RadioButtonDevPage;
