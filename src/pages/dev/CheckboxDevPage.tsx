import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { CodePreview } from '@/shared/components/ui/code-block';

const rowLabelClass = 'text-body-1-sb text-foreground flex items-center';
const cellClass = 'flex min-h-14 items-center justify-center rounded-lg bg-muted/40 p-2 border border-border/40';

const checkboxInteractiveCode = `import { useState } from 'react';
import { Checkbox } from '@/shared/components/ui/checkbox';

export function CheckboxExample() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <label htmlFor="terms" className="text-sm font-medium cursor-pointer">
        Tôi đồng ý với các điều khoản và chính sách bảo mật
      </label>
    </div>
  );
}`;

export const CheckboxDevPage = () => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Checkbox" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Checkbox</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Hộp kiểm hỗ trợ 3 trạng thái: Đã chọn (Checked), Chưa chọn (Unchecked) và Không xác định (Indeterminate).
        </p>
      </div>

      {/* ── 1. Interactive ── */}
      <CodePreview
        title="1. Thử nghiệm tương tác (Interactive)"
        description="Kiểm tra thay đổi giá trị và kích hoạt trạng thái disable."
        code={checkboxInteractiveCode}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
            <Checkbox checked={checked} disabled={disabled} onCheckedChange={setChecked} />
            <p className="text-body-2-sb text-foreground">
              Giá trị hiện tại: <span className="font-mono text-primary">{String(checked)}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button size="small" variant="outline" onClick={() => setChecked(false)}>
              Đặt: Unchecked
            </Button>
            <Button size="small" variant="outline" onClick={() => setChecked('indeterminate')}>
              Đặt: Indeterminate
            </Button>
            <Button size="small" variant="outline" onClick={() => setChecked(true)}>
              Đặt: Checked
            </Button>
            <Button
              size="small"
              variant={disabled ? 'default' : 'outline'}
              onClick={() => setDisabled((prev) => !prev)}
            >
              Toggle Disabled ({String(disabled)})
            </Button>
          </div>
        </div>
      </CodePreview>

      {/* ── 2. Design States ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Ma trận trạng thái (Design States)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Trạng thái Default, Hover, Pressed, Focus và Disabled.</p>
        </div>
        <div className="w-full overflow-x-auto pt-2">
          <div className="grid min-w-[680px] grid-cols-[140px_repeat(5,1fr)] gap-3 text-center">
            <div />
            <div className="text-caption-1-sb text-muted-foreground">Default</div>
            <div className="text-caption-1-sb text-muted-foreground">Hover</div>
            <div className="text-caption-1-sb text-muted-foreground">Pressed</div>
            <div className="text-caption-1-sb text-muted-foreground">Focus</div>
            <div className="text-caption-1-sb text-muted-foreground">Disable</div>

            <div className={rowLabelClass}>Checked</div>
            <div className={cellClass}><Checkbox checked /></div>
            <div className={cellClass}><Checkbox checked data-ui-hover="true" /></div>
            <div className={cellClass}><Checkbox checked data-ui-pressed="true" /></div>
            <div className={cellClass}><Checkbox checked data-ui-focus="true" /></div>
            <div className={cellClass}><Checkbox checked disabled /></div>

            <div className={rowLabelClass}>Indeterminate</div>
            <div className={cellClass}><Checkbox checked="indeterminate" /></div>
            <div className={cellClass}><Checkbox checked="indeterminate" data-ui-hover="true" /></div>
            <div className={cellClass}><Checkbox checked="indeterminate" data-ui-pressed="true" /></div>
            <div className={cellClass}><Checkbox checked="indeterminate" data-ui-focus="true" /></div>
            <div className={cellClass}><Checkbox checked="indeterminate" disabled /></div>

            <div className={rowLabelClass}>Unchecked</div>
            <div className={cellClass}><Checkbox /></div>
            <div className={cellClass}><Checkbox data-ui-hover="true" /></div>
            <div className={cellClass}><Checkbox data-ui-pressed="true" /></div>
            <div className={cellClass}><Checkbox data-ui-focus="true" /></div>
            <div className={cellClass}><Checkbox disabled /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckboxDevPage;
