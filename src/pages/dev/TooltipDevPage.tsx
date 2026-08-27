import { InfoCircle } from 'iconsax-react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { CodePreview } from '@/shared/components/ui/code-block';
import {
  Tooltip,
  TooltipBubbleContent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

const items = ['Mục 1', 'Mục 2', 'Mục 3'];

const tooltipUsageCode = `import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/shared/components/ui/tooltip';
import { Button } from '@/shared/components/ui/button';

// Bọc TooltipProvider ở cấp cao hơn hoặc quanh component
<TooltipProvider delayDuration={100}>
  {/* Tooltip chữ đơn giản */}
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Rê chuột vào đây</Button>
    </TooltipTrigger>
    <TooltipContent side="top" align="center">
      Thông tin giải thích chức năng
    </TooltipContent>
  </Tooltip>

  {/* Tooltip danh sách chi tiết */}
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Xem danh sách</Button>
    </TooltipTrigger>
    <TooltipContent side="bottom" align="start">
      <TooltipBubbleContent
        label="Danh sách đính kèm"
        items={['Tài liệu 1', 'Tài liệu 2']}
      />
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`;

export const TooltipDevPage = () => {
  const positions = [
    ['top-start', 'top-center', 'top-end'],
    ['right-start', 'right-center', 'right-end'],
    ['bottom-start', 'bottom-center', 'bottom-end'],
    ['left-start', 'left-center', 'left-end'],
  ] as const;

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Tooltip" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Tooltip</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Bong bóng gợi ý thông tin xuất hiện tức thì khi rê chuột (hover) hoặc focus vào thành phần giao diện.
        </p>
      </div>

      {/* ── 1. Hover Positions ── */}
      <CodePreview
        title="1. Tương tác rê chuột theo các vị trí (12 Hướng & Căn lề)"
        description="Rê chuột vào từng ô bên dưới để kiểm tra vị trí xuất hiện của Tooltip."
        code={tooltipUsageCode}
      >
        <TooltipProvider delayDuration={50}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {positions.flat().map((position) => {
              const [side, align] = position.split('-') as [
                'top' | 'right' | 'bottom' | 'left',
                'start' | 'center' | 'end',
              ];

              return (
                <div
                  key={`hover-${position}`}
                  className="space-y-2 rounded-lg border border-border bg-background p-3"
                >
                  <p className="text-caption-1-sb text-muted-foreground uppercase font-mono text-[11px]">
                    {side} - {align}
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background text-body-2-sb text-foreground shadow-2xs hover:bg-muted active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <InfoCircle size={16} variant="Bold" className="text-primary" />
                        Hover xem tooltip
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side={side} align={align}>
                      <span>Tooltip vị trí: <strong>{position}</strong></span>
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </TooltipProvider>
      </CodePreview>

      {/* ── 2. Bubble Tooltip ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Tooltip danh sách chi tiết (Rich Bubble Tooltip)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Hiển thị nội dung phân cấp kèm danh sách gạch đầu dòng.</p>
        </div>
        <TooltipProvider delayDuration={50}>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-4 text-body-2-sb text-foreground shadow-2xs hover:bg-muted cursor-pointer transition-all"
                >
                  <InfoCircle size={16} variant="Bold" className="text-primary" />
                  Hover xem Bubble Top
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                <TooltipBubbleContent label="Tiêu đề gợi ý" items={items} />
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-4 text-body-2-sb text-foreground shadow-2xs hover:bg-muted cursor-pointer transition-all"
                >
                  <InfoCircle size={16} variant="Bold" className="text-primary" />
                  Hover xem Bubble Right
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <TooltipBubbleContent label="Hồ sơ liên quan" items={['Bản scan CMND', 'Hợp đồng lao động']} />
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-4 text-body-2-sb text-foreground shadow-2xs hover:bg-muted cursor-pointer transition-all"
                >
                  <InfoCircle size={16} variant="Bold" className="text-primary" />
                  Hover xem Bubble Bottom
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start">
                <TooltipBubbleContent label="Danh sách quyền" items={['Xem dữ liệu', 'Tạo báo cáo', 'Xuất file Excel']} />
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </section>
    </div>
  );
};

export default TooltipDevPage;
