import { useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { ViewerError } from '@/shared/components/ui/document-viewer/components/viewer-error';
import { ViewerSkeleton } from '@/shared/components/ui/document-viewer/components/viewer-skeleton';
import type { SharedViewerProps } from '@/shared/components/ui/document-viewer/types';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export function PdfViewer({
  src,
  file,
  zoom,
  page,
  onTotalPagesChange,
  onDownload,
}: SharedViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPageRef = useRef(page);

  useEffect(() => {
    if (prevPageRef.current !== page) {
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
    prevPageRef.current = page;
  }, [page]);

  const fileSource = file ?? src;
  if (!fileSource) return <ViewerError onDownload={onDownload} />;

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-col items-center overflow-auto bg-neutral-200 p-4"
    >
      <Document
        file={fileSource}
        onLoadSuccess={({ numPages }) => onTotalPagesChange(numPages)}
        loading={<ViewerSkeleton />}
        error={<ViewerError message="Không thể tải file PDF." onDownload={onDownload} />}
        className="flex flex-col items-center gap-4"
      >
        <Page
          pageNumber={page}
          scale={zoom}
          loading={<div className="h-[842px] w-[595px] animate-pulse rounded bg-neutral-300" />}
          renderTextLayer
          renderAnnotationLayer
          className="shadow-md"
        />
      </Document>
    </div>
  );
}
