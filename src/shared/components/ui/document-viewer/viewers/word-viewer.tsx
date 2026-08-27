import { useRef } from 'react';

import { ViewerError } from '@/shared/components/ui/document-viewer/components/viewer-error';
import { ViewerSkeleton } from '@/shared/components/ui/document-viewer/components/viewer-skeleton';
import { useDocumentLoader } from '@/shared/components/ui/document-viewer/hooks/use-document-loader';
import { useDocxRender } from '@/shared/components/ui/document-viewer/hooks/use-docx-render';
import type { SharedViewerProps } from '@/shared/components/ui/document-viewer/types';

export function WordViewer({ src, file, zoom, onDownload }: SharedViewerProps) {
  const loadState = useDocumentLoader(src, file);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderStatus = useDocxRender(loadState, containerRef);

  if (loadState.status === 'loading' || loadState.status === 'idle') return <ViewerSkeleton />;
  if (loadState.status === 'error' || renderStatus === 'error') {
    return <ViewerError message="Không thể hiển thị file Word." onDownload={onDownload} />;
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
