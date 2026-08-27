import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { ViewerSkeleton } from '@/shared/components/ui/document-viewer/components/viewer-skeleton';
import { ViewerToolbar } from '@/shared/components/ui/document-viewer/components/viewer-toolbar';
import type { FileType, SharedViewerProps } from '@/shared/components/ui/document-viewer/types';

const PdfViewer = lazy(() =>
  import('./viewers/pdf-viewer').then((m) => ({ default: m.PdfViewer })),
);
const ExcelViewer = lazy(() =>
  import('./viewers/excel-viewer').then((m) => ({ default: m.ExcelViewer })),
);
const CsvViewer = lazy(() =>
  import('./viewers/csv-viewer').then((m) => ({ default: m.CsvViewer })),
);
const WordViewer = lazy(() =>
  import('./viewers/word-viewer').then((m) => ({ default: m.WordViewer })),
);
const DocViewer = lazy(() =>
  import('./viewers/doc-viewer').then((m) => ({ default: m.DocViewer })),
);
const PptxViewer = lazy(() =>
  import('./viewers/pptx-viewer').then((m) => ({ default: m.PptxViewer })),
);

const EXT_MAP: Record<string, FileType> = {
  pdf: 'pdf',
  xlsx: 'xlsx',
  xls: 'xlsx',
  csv: 'csv',
  docx: 'docx',
  doc: 'doc',
  pptx: 'pptx',
};

function detectFileType(name: string): FileType {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return EXT_MAP[ext] ?? 'unsupported';
}

function triggerDownload(href: string, name: string) {
  const a = Object.assign(document.createElement('a'), {
    href,
    download: name,
    target: '_blank',
    rel: 'noopener noreferrer',
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

interface DocumentViewerProps {
  src?: string;
  file?: File;
  fileName?: string;
  isSrcObjectKey?: boolean;
}

interface ViewerContentProps {
  src?: string;
  file?: File;
  fileType: FileType;
  fileName: string;
  onDownload: () => void;
}

const FALLBACK_TYPES: FileType[] = ['pptx', 'unsupported'];

function ViewerContent({ src, file, fileType, fileName, onDownload }: ViewerContentProps) {
  const [zoom, setZoom] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = useCallback(() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2))), []);
  const handleZoomOut = useCallback(
    () => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2))),
    [],
  );
  const handleZoomReset = useCallback(() => setZoom(1), []);
  const handlePrevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const handleNextPage = useCallback(
    () => setPage((p) => Math.min(totalPages, p + 1)),
    [totalPages],
  );
  const handleTotalPages = useCallback((n: number) => setTotalPages(n), []);

  const supportsZoom = !FALLBACK_TYPES.includes(fileType);
  useEffect(() => {
    if (!supportsZoom) return;
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      if (e.deltaY < 0) handleZoomIn();
      else if (e.deltaY > 0) handleZoomOut();
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [supportsZoom, handleZoomIn, handleZoomOut]);

  const viewerProps: SharedViewerProps = {
    src,
    file,
    zoom,
    page,
    onTotalPagesChange: handleTotalPages,
    onDownload,
  };

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-col overflow-hidden rounded-lg border bg-background select-none"
    >
      <ViewerToolbar
        fileType={fileType}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        page={page}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onDownload={onDownload}
      />

      <div className="relative flex-1 overflow-auto bg-muted/30">
        <Suspense fallback={<ViewerSkeleton />}>
          {fileType === 'pdf' && <PdfViewer {...viewerProps} />}
          {fileType === 'xlsx' && <ExcelViewer {...viewerProps} />}
          {fileType === 'csv' && <CsvViewer {...viewerProps} />}
          {fileType === 'docx' && <WordViewer {...viewerProps} />}
          {fileType === 'doc' && <DocViewer {...viewerProps} />}
          {fileType === 'pptx' && <PptxViewer fileName={fileName} onDownload={onDownload} />}
          {fileType === 'unsupported' && (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Định dạng file không được hỗ trợ.
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}

export function DocumentViewer({ src, file, fileName }: DocumentViewerProps) {
  const resolvedName = fileName ?? file?.name ?? src?.split('/').pop() ?? 'document';
  const fileType = detectFileType(resolvedName);
  const targetSrc = src;

  const handleDownload = useCallback(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      triggerDownload(url, resolvedName);
      URL.revokeObjectURL(url);
    } else if (targetSrc) {
      triggerDownload(targetSrc, resolvedName);
    }
  }, [file, targetSrc, resolvedName]);

  return (
    <ViewerContent
      key={targetSrc ?? file?.name ?? ''}
      src={targetSrc}
      file={file}
      fileType={fileType}
      fileName={resolvedName}
      onDownload={handleDownload}
    />
  );
}
