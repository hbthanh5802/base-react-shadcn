import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';

import type { ReactNode } from 'react';

export interface ModalDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  renderHeader?: () => ReactNode;
  children?: ReactNode;
  renderFooter?: () => ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  confirmLoading?: boolean;

  modalContainerClassName?: string;
  modalHeaderClassName?: string;
  modalFooterClassName?: string;
  modalContentClassName?: string;
  onPointerDownOutside?: (event: any) => void;
  onInteractOutside?: (event: any) => void;
}

function ModalDialog(props: ModalDialogProps) {
  const {
    open,
    onOpenChange,
    title,
    renderHeader,
    children,
    renderFooter,
    onCancel,
    onConfirm,
    cancelText = 'Hủy',
    confirmText = 'Xác nhận',
    confirmLoading = false,
    modalContainerClassName,
    modalHeaderClassName,
    modalFooterClassName,
    modalContentClassName,
    onPointerDownOutside,
    onInteractOutside,
  } = props;

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Modal container */}
      <DialogContent
        className={cn('ModalDialog max-h-[95vh] max-w-[90dvw] gap-0 p-0', modalContainerClassName)}
        onPointerDownOutside={onPointerDownOutside}
        onInteractOutside={onInteractOutside}
        aria-describedby={undefined}
      >
        {renderHeader ? (
          renderHeader()
        ) : (
          <DialogHeader className={cn('ModalDialogHeader', 'p-6 pb-0', modalHeaderClassName)}>
            <DialogTitle className="mr-6 pb-6 text-xl font-semibold">{title}</DialogTitle>
          </DialogHeader>
        )}

        {/* Modal content */}
        <div
          className={cn(
            'no-scrollbar max-h-[70vh] overflow-y-auto overflow-x-hidden px-6',
            modalContentClassName,
          )}
        >
          {children}
        </div>

        {/* Modal footer */}
        {renderFooter ? (
          renderFooter()
        ) : (
          <DialogFooter
            className={cn(
              'mt-4 flex gap-3 border-t border-neutral-100 p-6 sm:items-center sm:justify-center',
              modalFooterClassName,
            )}
          >
            <Button type="button" variant="outlinePrimary" onClick={handleCancel}>
              {cancelText}
            </Button>
            {confirmText && onConfirm && (
              <Button type="button" onClick={onConfirm} disabled={confirmLoading}>
                {confirmText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

const CustomFooterContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'CustomFooterContainer sticky bottom-0 -mx-6 mt-6 flex items-center justify-center gap-3 rounded-b-lg border-t border-border bg-background p-6',
        className,
      )}
    >
      {children}
    </div>
  );
};

ModalDialog.CustomFooterContainer = CustomFooterContainer;

export default ModalDialog;
