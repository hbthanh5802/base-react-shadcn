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

const tooltipPositionsCode = `import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/shared/components/ui/tooltip';
import { Button } from '@/shared/components/ui/button';

// Hỗ trợ 12 hướng & căn lề:
// side: 'top' | 'right' | 'bottom' | 'left'
// align: 'start' | 'center' | 'end'

<TooltipProvider delayDuration={50}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover xem tooltip</Button>
    </TooltipTrigger>
    <TooltipContent side="top" align="center">
      <span>Tooltip vị trí: <strong>top-center</strong></span>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`;

const tooltipBubbleCode = `import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipBubbleContent,
  TooltipProvider,
} from '@/shared/components/ui/tooltip';
import { Button } from '@/shared/components/ui/button';

<TooltipProvider delayDuration={50}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover xem chi tiết</Button>
    </TooltipTrigger>
    <TooltipContent side="top" align="center">
      <TooltipBubbleContent
        label="Danh sách tài liệu"
        items={['Hợp đồng dịch vụ', 'Bản scan CMND', 'Hồ sơ năng lực']}
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
        code={tooltipPositionsCode}
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
      <CodePreview
        title="2. Tooltip danh sách chi tiết (Rich Bubble Tooltip)"
        description="Hiển thị nội dung phân cấp kèm danh sách gạch đầu dòng tiện lợi."
        code={tooltipBubbleCode}
      >
        <TooltipProvider delayDuration={50}>
          <div className="flex flex-wrap items-center gap-4">
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
      </CodePreview>
    </div>
  );
};

export default TooltipDevPage;
