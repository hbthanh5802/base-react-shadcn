import { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

import { ViewerError } from '@/shared/components/ui/document-viewer/components/viewer-error';
import { ViewerSkeleton } from '@/shared/components/ui/document-viewer/components/viewer-skeleton';
import { useDocumentLoader } from '@/shared/components/ui/document-viewer/hooks/use-document-loader';
import type { SharedViewerProps } from '@/shared/components/ui/document-viewer/types';
import { cn } from '@/shared/lib/utils';

export function ExcelViewer({ src, file, zoom, onDownload }: SharedViewerProps) {
  const loadState = useDocumentLoader(src, file);
  const [activeSheet, setActiveSheet] = useState(0);

  const workbook = useMemo(() => {
    if (loadState.status !== 'loaded') return null;
    try {
      return XLSX.read(loadState.data, { type: 'array' });
    } catch {
      return null;
    }
  }, [loadState]);

  const html = useMemo(() => {
    if (!workbook) return '';
    const sheetName = workbook.SheetNames[activeSheet];
    if (!sheetName) return '';
    return XLSX.utils.sheet_to_html(workbook.Sheets[sheetName], { id: 'xlsx-table' });
  }, [workbook, activeSheet]);

  useEffect(() => {
    const resetSheets = () => {
      setActiveSheet(0);
    };
    resetSheets();
  }, [src, file]);

  if (loadState.status === 'loading' || loadState.status === 'idle') return <ViewerSkeleton />;
  if (loadState.status === 'error' || !workbook) {
    return <ViewerError message="Không thể đọc file Excel." onDownload={onDownload} />;
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-auto bg-white p-4">
        <div style={{ zoom }} dangerouslySetInnerHTML={{ __html: html }} className="xlsx-content" />
      </div>

      {workbook.SheetNames.length > 1 && (
        <div className="flex shrink-0 items-center gap-0.5 overflow-x-auto border-t bg-neutral-50 px-2 py-1.5">
          {workbook.SheetNames.map((name, i) => (
            <button
              key={name}
              onClick={() => setActiveSheet(i)}
              className={cn(
                'whitespace-nowrap rounded px-3 py-1 text-xs transition-colors',
                i === activeSheet
                  ? 'bg-primary-600 text-white'
                  : 'text-muted-foreground hover:bg-neutral-200',
              )}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
