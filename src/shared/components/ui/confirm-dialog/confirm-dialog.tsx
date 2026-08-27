import { InfoCircle, Trash } from 'iconsax-react';
import * as React from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';

export type ConfirmTone = 'danger' | 'default';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  tone?: ConfirmTone;
  loading?: boolean;
  /** Override the leading icon. Defaults to a trash icon for `danger`, info icon otherwise. */
  icon?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const toneStyles: Record<ConfirmTone, { iconWrap: string; defaultIcon: React.ReactNode }> = {
  danger: {
    iconWrap: 'bg-[#DA3633]/10 text-[#DA3633]',
    defaultIcon: <Trash size={24} variant="Bold" />,
  },
  default: {
    iconWrap: 'bg-primary-50 text-primary-600 dark:bg-primary-950/40',
    defaultIcon: <InfoCircle size={24} variant="Bold" />,
  },
};

/**
 * Presentational, controlled confirmation dialog. For app-wide usage prefer the
 * imperative `useConfirm()` hook which renders this for you.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title = 'Xác nhận',
  description,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  tone = 'danger',
  loading = false,
  icon,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const tones = toneStyles[tone];

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? onOpenChange?.(true) : handleCancel())}>
      <DialogContent className="max-w-[440px] gap-0 p-0" onClick={(e) => e.stopPropagation()}>
        <DialogHeader className="flex flex-col items-center gap-4 px-6 pb-2 pt-8 text-center sm:text-center">
          <div
            className={cn(
              'flex h-14 w-14 shrink-0 items-center justify-center rounded-full',
              tones.iconWrap,
            )}
          >
            {icon ?? tones.defaultIcon}
          </div>
          <DialogTitle className="text-title-3-sb text-foreground">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-body-1-rg text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="flex gap-3 p-6 sm:items-center sm:justify-center">
          <Button
            type="button"
            variant="outline"
            size="large"
            iconLayout="none"
            className="min-w-[120px]"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={tone === 'danger' ? 'destructive' : 'default'}
            size="large"
            iconLayout="none"
            className={cn('min-w-[120px]')}
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
