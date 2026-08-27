import { DocumentText } from 'iconsax-react';
import { useRef } from 'react';

import { FormatFallbackViewer } from '@/shared/components/ui/document-viewer/components/format-fallback-viewer';
import { ViewerError } from '@/shared/components/ui/document-viewer/components/viewer-error';
import { ViewerSkeleton } from '@/shared/components/ui/document-viewer/components/viewer-skeleton';
import { useDocumentLoader } from '@/shared/components/ui/document-viewer/hooks/use-document-loader';
import { useDocxRender } from '@/shared/components/ui/document-viewer/hooks/use-docx-render';
import type { SharedViewerProps } from '@/shared/components/ui/document-viewer/types';

export function DocViewer({ src, file, zoom, onDownload }: SharedViewerProps) {
  const loadState = useDocumentLoader(src, file);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderStatus = useDocxRender(loadState, containerRef);

  if (loadState.status === 'loading' || loadState.status === 'idle') return <ViewerSkeleton />;

  if (loadState.status === 'error') {
    return <ViewerError message="Không thể tải file." onDownload={onDownload} />;
  }

  if (renderStatus === 'format-error') {
    return (
      <FormatFallbackViewer
        icon={DocumentText}
        iconBgClassName="bg-blue-50"
        iconClassName="text-blue-500"
        fileName={file?.name ?? src?.split('/').pop() ?? 'document.doc'}
        reason="Định dạng .doc nhị phân (Word 97-2003) không hỗ trợ xem trực tiếp trên trình duyệt."
        hint="Vui lòng tải về và mở bằng Microsoft Word hoặc LibreOffice. Để xem trực tiếp, hãy chuyển đổi sang .docx."
        onDownload={onDownload}
      />
    );
  }

  if (renderStatus === 'error') {
    return <ViewerError message="Không thể hiển thị file." onDownload={onDownload} />;
  }

  return (
    <div className="relative h-full overflow-auto bg-neutral-100 p-6">
      {renderStatus === 'pending' && <ViewerSkeleton />}
      <div
        ref={containerRef}
        style={{ zoom }}
        className="docx-preview-wrapper mx-auto max-w-4xl rounded bg-white shadow-sm"
      />
    </div>
  );
}
