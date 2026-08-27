import { InfoCircle } from 'iconsax-react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import {
  Tooltip,
  TooltipBubbleContent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

const items = ['Mục 1', 'Mục 2', 'Mục 3', 'Mục 4'];

export const TooltipDevPage = () => {
  const positions = [
    ['bottom-start', 'bottom-center', 'bottom-end'],
    ['right-start', 'left-center', 'left-end'],
    ['right-center', 'right-end', 'left-start'],
    ['top-start', 'top-center', 'top-end'],
  ] as const;

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Tooltip" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Tooltip</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Bong bóng gợi ý thông tin xuất hiện khi rê chuột (hover) hoặc focus vào thành phần giao diện.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Tương tác rê chuột theo các vị trí (Hover Positions)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Hỗ trợ các hướng Top, Bottom, Left, Right kết hợp căn lề Start, Center, End.</p>
        </div>
        <TooltipProvider>
          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 md:grid-cols-3">
            {positions.flat().map((position, index) => {
              const [side, align] = position.split('-') as [
                'top' | 'right' | 'bottom' | 'left',
                'start' | 'center' | 'end',
              ];

              return (
                <div
                  key={`hover-${position}-${index}`}
                  className="space-y-2 rounded-lg border border-border bg-muted/20 p-3"
                >
                  <p className="text-caption-1-sb text-muted-foreground capitalize">
                    {side} - {align}
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background text-body-2-sb text-foreground hover:bg-muted transition-colors"
                      >
                        <InfoCircle size={16} variant="Bold" className="text-primary" />
                        Hover xem vị trí
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side={side} align={align}>
                      <TooltipBubbleContent side={side} align={align} label="Gợi ý chi tiết" items={items} />
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </TooltipProvider>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Mẫu bong bóng chi tiết (Bubble Matrix)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Cấu trúc hiển thị trực quan của bong bóng tooltip nhiều danh mục.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-3">
          {positions.flat().slice(0, 3).map((position, index) => {
            const [side, align] = position.split('-') as [
              'top' | 'right' | 'bottom' | 'left',
              'start' | 'center' | 'end',
            ];
            return (
              <TooltipBubbleContent
                key={`${position}-${index}`}
                side={side}
                align={align}
                label="Tiêu đề gợi ý"
                items={items}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TooltipDevPage;
