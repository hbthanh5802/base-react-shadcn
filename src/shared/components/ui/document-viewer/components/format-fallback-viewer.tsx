import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { cn } from '@/shared/lib/utils';

import type { IconProps } from 'iconsax-react';
import type { ComponentType } from 'react';

interface FormatFallbackViewerProps {
  icon: ComponentType<IconProps>;
  iconClassName?: string;
  iconBgClassName?: string;
  fileName: string;
  reason: string;
  hint?: string;
  onDownload: () => void;
}

export function FormatFallbackViewer({
  icon,
  iconClassName,
  iconBgClassName,
  fileName,
  reason,
  hint,
  onDownload,
}: FormatFallbackViewerProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-8">
      <div
        className={cn(
          'flex h-20 w-20 items-center justify-center rounded-2xl',
          iconBgClassName ?? 'bg-neutral-100',
        )}
      >
        <Icon icon={icon} size={40} className={cn(iconClassName ?? 'text-neutral-400')} />
      </div>
      <div className="max-w-sm text-center">
        <p className="truncate text-sm font-medium text-neutral-900" title={fileName}>
          {fileName}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{reason}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground opacity-75">{hint}</p>}
      </div>
      <Button onClick={onDownload} iconLayout="left">
        <Icon icon={icon} size={16} />
        Tải về để xem
      </Button>
    </div>
  );
}
