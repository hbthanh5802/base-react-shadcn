import * as DialogPrimitive from '@radix-ui/react-dialog';
import { CloseCircle, DocumentText } from 'iconsax-react';

import type { ModalDialogProps } from '@/shared/components/ui/custom/modal-dialog';
import ModalDialog from '@/shared/components/ui/custom/modal-dialog';
import { DocumentViewer } from '@/shared/components/ui/document-viewer/document-viewer';
import type { DocumentViewerDialogProps } from '@/shared/components/ui/document-viewer/types';
import { Icon } from '@/shared/components/ui/icon';
import { cn } from '@/shared/lib/utils';

export type DocumentViewerModalDialogProps = DocumentViewerDialogProps &
  ModalDialogProps & {
    newDesign?: boolean;
  };

export function DocumentViewerDialog({
  open,
  onOpenChange,
  src,
  file,
  fileName,
  title,
  newDesign = false,
  ...rest
}: DocumentViewerModalDialogProps) {
  const resolvedName = title ?? fileName ?? file?.name ?? src?.split('/').pop() ?? 'Tài liệu';

  if (newDesign) {
    return (
      <ModalDialog open={open} onOpenChange={onOpenChange} title={title} {...rest}>
        <div className="h-[70vh]">
          <DocumentViewer src={src} file={file} fileName={fileName} />
        </div>
      </ModalDialog>
    );
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            'fixed left-[50%] top-[50%] z-50 flex h-[90vh] w-[90vw] max-w-6xl translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-lg border border-border bg-background shadow-xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          )}
        >
          {/* Header */}
          <DialogPrimitive.Title className="flex shrink-0 items-center gap-2 border-b px-4 py-3">
            <Icon icon={DocumentText} size={18} className="shrink-0 text-muted-foreground" />
            <span className="flex-1 truncate text-sm font-medium" title={resolvedName}>
              {resolvedName}
            </span>
            <DialogPrimitive.Close className="rounded-sm text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600">
              <Icon icon={CloseCircle} size={20} />
              <span className="sr-only">Đóng</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Title>

          {/* Viewer */}
          <div className="min-h-0 flex-1 overflow-hidden">
            <DocumentViewer src={src} file={file} fileName={fileName} />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
