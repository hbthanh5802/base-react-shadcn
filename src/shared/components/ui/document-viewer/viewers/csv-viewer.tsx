import { useMemo } from 'react';
import * as XLSX from 'xlsx';

import { ViewerError } from '@/shared/components/ui/document-viewer/components/viewer-error';
import { ViewerSkeleton } from '@/shared/components/ui/document-viewer/components/viewer-skeleton';
import { useDocumentLoader } from '@/shared/components/ui/document-viewer/hooks/use-document-loader';
import type { SharedViewerProps } from '@/shared/components/ui/document-viewer/types';

export function CsvViewer({ src, file, zoom, onDownload }: SharedViewerProps) {
  const loadState = useDocumentLoader(src, file);

  const html = useMemo(() => {
    if (loadState.status !== 'loaded') return '';
    try {
      const text = new TextDecoder('utf-8').decode(loadState.data);
      const wb = XLSX.read(text, { type: 'string' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      return XLSX.utils.sheet_to_html(sheet, { id: 'csv-table' });
    } catch {
      return '';
    }
  }, [loadState]);

  if (loadState.status === 'loading' || loadState.status === 'idle') return <ViewerSkeleton />;
  if (loadState.status === 'error' || !html) {
    return <ViewerError message="Không thể đọc file CSV." onDownload={onDownload} />;
  }

  return (
    <div className="h-full overflow-auto bg-white p-4">
      <div style={{ zoom }} dangerouslySetInnerHTML={{ __html: html }} className="xlsx-content" />
    </div>
  );
}
