import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { Switch } from '@/shared/components/ui/switch';

const rowLabelClass = 'text-body-1-sb text-foreground flex items-center';
const cellClass = 'flex min-h-14 items-center justify-center rounded-lg bg-muted/40 p-2 border border-border/40';

export const SwitchDevPage = () => {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Switch" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Switch</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Công tắc chuyển đổi trạng thái Bật / Tắt (Active / Inactive) hỗ trợ icon tích hợp.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Ma trận trạng thái (Design States)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Trạng thái Default, Hover, Focus, Pressed và Disabled.</p>
        </div>
        <div className="w-full overflow-x-auto pt-2">
          <div className="grid min-w-[680px] grid-cols-[160px_repeat(5,1fr)] gap-3 text-center">
            <div />
            <div className="text-caption-1-sb text-muted-foreground">Default</div>
            <div className="text-caption-1-sb text-muted-foreground">Hover</div>
            <div className="text-caption-1-sb text-muted-foreground">Focus</div>
            <div className="text-caption-1-sb text-muted-foreground">Pressed</div>
            <div className="text-caption-1-sb text-muted-foreground">Disable</div>

            <div className={rowLabelClass}>Bật (Active)</div>
            <div className={cellClass}><Switch checked /></div>
            <div className={cellClass}><Switch checked data-ui-hover="true" /></div>
            <div className={cellClass}><Switch checked data-ui-focus="true" /></div>
            <div className={cellClass}><Switch checked data-ui-pressed="true" /></div>
            <div className={cellClass}><Switch checked disabled /></div>

            <div className={rowLabelClass}>Bật (Kèm icon)</div>
            <div className={cellClass}><Switch checked iconMode="active" /></div>
            <div className={cellClass}><Switch checked iconMode="active" data-ui-hover="true" /></div>
            <div className={cellClass}><Switch checked iconMode="active" data-ui-focus="true" /></div>
            <div className={cellClass}><Switch checked iconMode="active" data-ui-pressed="true" /></div>
            <div className={cellClass}><Switch checked iconMode="active" disabled /></div>

            <div className={rowLabelClass}>Tắt (Inactive)</div>
            <div className={cellClass}><Switch /></div>
            <div className={cellClass}><Switch data-ui-hover="true" /></div>
            <div className={cellClass}><Switch data-ui-focus="true" /></div>
            <div className={cellClass}><Switch data-ui-pressed="true" /></div>
            <div className={cellClass}><Switch disabled /></div>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Thử nghiệm tương tác (Interactive)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Bật / tắt switch và chuyển đổi trạng thái vô hiệu hóa.</p>
        </div>
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/20 border border-border max-w-md">
            <Switch
              checked={checked}
              disabled={disabled}
              iconMode="all"
              onCheckedChange={setChecked}
            />
            <p className="text-body-2-sb text-foreground">
              Trạng thái: <span className="font-mono text-primary">{checked ? 'Bật (ON)' : 'Tắt (OFF)'}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button size="small" variant="outline" onClick={() => setChecked(false)}>
              Đặt: Tắt (OFF)
            </Button>
            <Button size="small" variant="outline" onClick={() => setChecked(true)}>
              Đặt: Bật (ON)
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
      </section>
    </div>
  );
};

export default SwitchDevPage;
