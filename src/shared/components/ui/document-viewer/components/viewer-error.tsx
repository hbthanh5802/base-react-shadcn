import { Warning2 } from 'iconsax-react';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';

interface ViewerErrorProps {
  message?: string;
  onDownload?: () => void;
}

export function ViewerError({ message, onDownload }: ViewerErrorProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <Icon icon={Warning2} size={48} className="text-destructive opacity-60" />
      <p className="text-sm text-muted-foreground">
        {message ?? 'Không thể hiển thị tài liệu này.'}
      </p>
      {onDownload && (
        <Button variant="outline" size="sm" onClick={onDownload}>
          Tải về để xem
        </Button>
      )}
    </div>
  );
}
