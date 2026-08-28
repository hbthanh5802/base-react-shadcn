import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';

export type ModalDialogSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

const sizeMap: Record<ModalDialogSize, string> = {
  sm: 'sm:max-w-md', // 448px - Alert, Confirm
  md: 'sm:max-w-lg', // 512px - Simple Form (default)
  lg: 'sm:max-w-2xl', // 672px - Medium Form
  xl: 'sm:max-w-4xl', // 896px - Large Form, Table, Multi-step
  '2xl': 'sm:max-w-6xl', // 1152px - Complex Dashboard preview
  full: 'sm:max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]',
};

export interface ModalDialogFooterProps {
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export interface ModalDialogHeaderProps {
  onClose: () => void;
}

export interface ModalDialogProps {
  /**
   * Điều khiển trạng thái mở/đóng Modal
   */
  open?: boolean;
  /**
   * Callback khi trạng thái mở/đóng thay đổi
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Callback gọi khi người dùng đóng modal (bấm X, bấm Cancel, hoặc click overlay)
   */
  onClose?: () => void;

  // ── Header Props ──
  /**
   * Tiêu đề chính của Modal
   */
  title?: React.ReactNode;
  /**
   * Mô tả hoặc phụ đề dưới tiêu đề
   */
  description?: React.ReactNode;
  /**
   * Icon trạng thái hiển thị bên cạnh tiêu đề (VD: Warning, Trash, InfoCircle)
   */
  icon?: React.ReactNode;
  /**
   * Ẩn toàn bộ Header
   */
  hideHeader?: boolean;
  /**
   * Hiển thị nút X đóng modal ở góc phải trên (Mặc định: true, tự động ẩn nếu dùng renderHeader)
   */
  showCloseButton?: boolean;
  /**
   * Class tùy biến cho vùng Header
   */
  headerClassName?: string;
  /**
   * Tùy biến hoàn toàn phần Header
   */
  renderHeader?: React.ReactNode | ((props: ModalDialogHeaderProps) => React.ReactNode);

  // ── Body Props ──
  /**
   * Nội dung thân Modal
   */
  children?: React.ReactNode;
  /**
   * Class tùy biến cho vùng chứa nội dung body
   */
  contentClassName?: string;
  /**
   * Tự động bật thanh cuộn dọc khi nội dung vượt quá chiều cao màn hình (Mặc định: true)
   */
  scrollable?: boolean;

  // ── Footer Props ──
  /**
   * Ẩn toàn bộ Footer
   */
  hideFooter?: boolean;
  /**
   * Class tùy biến cho vùng Footer
   */
  footerClassName?: string;
  /**
   * Text hiển thị trên nút Hủy (Mặc định: "Hủy" hoặc i18n)
   */
  cancelText?: React.ReactNode;
  /**
   * Text hiển thị trên nút Xác nhận (Mặc định: "Xác nhận")
   */
  confirmText?: React.ReactNode;
  /**
   * Callback khi bấm nút Hủy
   */
  onCancel?: () => void;
  /**
   * Callback khi bấm nút Xác nhận. Nếu trả về một Promise, modal sẽ tự động hiển thị trạng thái loading cho đến khi Promise hoàn thành.
   */
  onConfirm?: () => void | Promise<void>;
  /**
   * Trạng thái hiển thị spinner loading ở nút Xác nhận
   */
  confirmLoading?: boolean;
  /**
   * Vô hiệu hóa nút Xác nhận
   */
  confirmDisabled?: boolean;
  /**
   * Vô hiệu hóa nút Hủy
   */
  cancelDisabled?: boolean;
  /**
   * Biến thể phong cách nút Xác nhận (default: Emerald, destructive: Đỏ, outline, secondPrimary, v.v.)
   */
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'secondPrimary';
  /**
   * Biến thể phong cách nút Hủy
   */
  cancelVariant?: 'outline' | 'ghost' | 'secondary' | 'default';
  /**
   * Tùy biến hoàn toàn phần Footer
   */
  renderFooter?: React.ReactNode | ((props: ModalDialogFooterProps) => React.ReactNode);

  // ── Layout & Behavior Props ──
  /**
   * Kích thước Modal (sm: 448px, md: 512px, lg: 672px, xl: 896px, 2xl: 1152px, full: 95vw)
   */
  size?: ModalDialogSize;
  /**
   * Class tùy biến cho hộp chứa Modal (DialogContent)
   */
  className?: string;
  /**
   * Ngăn modal đóng khi người dùng click ra ngoài vùng mờ overlay (Rất hữu ích cho Form quan trọng)
   */
  preventCloseOnOverlayClick?: boolean;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  onOpenChange,
  onClose,

  title,
  description,
  icon,
  hideHeader = false,
  showCloseButton = true,
  headerClassName,
  renderHeader,

  children,
  contentClassName,
  scrollable = true,

  hideFooter = false,
  footerClassName,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmLoading = false,
  confirmDisabled = false,
  cancelDisabled = false,
  confirmVariant = 'default',
  cancelVariant = 'outline',
  renderFooter,

  size = 'md',
  className,
  preventCloseOnOverlayClick = false,
}) => {
  const { t } = useTranslation('components');
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = confirmLoading || internalLoading;

  const handleClose = () => {
    if (isLoading) return;
    onClose?.();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    if (isLoading) return;
    onCancel?.();
    handleClose();
  };

  const handleConfirm = async () => {
    if (isLoading || confirmDisabled) return;
    if (onConfirm) {
      try {
        const result = onConfirm();
        if (result instanceof Promise) {
          setInternalLoading(true);
          await result;
        }
      } finally {
        setInternalLoading(false);
      }
    }
  };

  const defaultCancelLabel = cancelText ?? t('dialog.cancel', { defaultValue: 'Hủy' });
  const defaultConfirmLabel = confirmText ?? t('dialog.confirm', { defaultValue: 'Xác nhận' });

  return (
    <Dialog open={open} onOpenChange={(val) => (val ? onOpenChange?.(true) : handleClose())}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-[50%] top-[50%] z-50 flex w-full max-w-[calc(100vw-2rem)] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl duration-200',
            'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            sizeMap[size],
            className,
          )}
          onPointerDownOutside={(e) => {
            if (preventCloseOnOverlayClick || isLoading) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (isLoading) {
              e.preventDefault();
            }
          }}
        >
          {/* ── Header ── */}
          {!hideHeader && (
            <>
              {renderHeader ? (
                <div className={cn('relative', headerClassName)}>
                  {typeof renderHeader === 'function'
                    ? renderHeader({ onClose: handleClose })
                    : renderHeader}
                </div>
              ) : (
                <div
                  className={cn(
                    'flex items-start justify-between gap-4 border-b border-border/80 px-6 py-4',
                    headerClassName,
                  )}
                >
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
                    <div className="min-w-0 flex-1 space-y-1">
                      {title && (
                        <DialogTitle className="text-title-2 font-bold text-foreground leading-snug">
                          {title}
                        </DialogTitle>
                      )}
                      {description && (
                        <DialogDescription className="text-body-2-rg text-muted-foreground leading-relaxed">
                          {description}
                        </DialogDescription>
                      )}
                    </div>
                  </div>

                  {showCloseButton && (
                    <DialogClose
                      onClick={handleClose}
                      disabled={isLoading}
                      className="shrink-0 -mr-1 rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">{t('dialog.close', { defaultValue: 'Đóng' })}</span>
                    </DialogClose>
                  )}
                </div>
              )}
            </>
          )}

          {/* ── Body Content ── */}
          <div
            className={cn(
              'px-6 py-5',
              scrollable && 'max-h-[min(65vh,540px)] overflow-y-auto overscroll-contain',
              contentClassName,
            )}
          >
            {children}
          </div>

          {/* ── Footer ── */}
          {!hideFooter && (
            <div
              className={cn(
                'border-t border-border/80 bg-muted/25 px-6 py-4',
                renderFooter ? 'w-full' : 'flex items-center justify-end gap-3',
                footerClassName,
              )}
            >
              {renderFooter ? (
                typeof renderFooter === 'function' ? (
                  renderFooter({
                    onCancel: handleCancel,
                    onConfirm: handleConfirm,
                    loading: isLoading,
                  })
                ) : (
                  renderFooter
                )
              ) : (
                <>
                  <Button
                    type="button"
                    variant={cancelVariant}
                    size="medium"
                    onClick={handleCancel}
                    disabled={cancelDisabled || isLoading}
                  >
                    {defaultCancelLabel}
                  </Button>
                  <Button
                    type="button"
                    variant={confirmVariant}
                    size="medium"
                    onClick={handleConfirm}
                    disabled={confirmDisabled || isLoading}
                    data-loading={isLoading ? 'true' : undefined}
                  >
                    {isLoading && (
                      <span className="mr-2 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    )}
                    {defaultConfirmLabel}
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

ModalDialog.displayName = 'ModalDialog';

export { ModalDialog as Modal };
export default ModalDialog;
