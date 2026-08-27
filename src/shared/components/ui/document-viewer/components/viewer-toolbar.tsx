import { Add, ArrowLeft2, ArrowRight2, Minus } from 'iconsax-react';
import { Download } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import type { FileType } from '@/shared/components/ui/document-viewer/types';
import { Icon } from '@/shared/components/ui/icon';

interface ViewerToolbarProps {
  fileType: FileType;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  page: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onDownload: () => void;
}

const FALLBACK_TYPES: FileType[] = ['pptx'];

export function ViewerToolbar({
  fileType,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  page,
  totalPages,
  onPrevPage,
  onNextPage,
  onDownload,
}: ViewerToolbarProps) {
  const showPagination = fileType === 'pdf' && totalPages > 0;
  const showZoom = !FALLBACK_TYPES.includes(fileType);

  return (
    <div className="flex shrink-0 items-center justify-between border-b bg-neutral-50 px-3 py-1.5">
      {/* Page navigation (PDF only) */}
      <div className="flex min-w-[120px] items-center gap-1">
        {showPagination ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onPrevPage}
              disabled={page <= 1}
            >
              <Icon icon={ArrowLeft2} size={14} />
            </Button>
            <span className="min-w-[72px] text-center text-xs text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onNextPage}
              disabled={page >= totalPages}
            >
              <Icon icon={ArrowRight2} size={14} />
            </Button>
          </>
        ) : (
          <span className="text-xs uppercase tracking-wide text-muted-foreground">{fileType}</span>
        )}
      </div>

      {/* Zoom controls */}
      {showZoom && (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onZoomOut}
            disabled={zoom <= 0.5}
          >
            <Icon icon={Minus} size={14} />
          </Button>
          <button
            onClick={onZoomReset}
            className="min-w-[48px] rounded px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-neutral-100"
          >
            {Math.round(zoom * 100)}%
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onZoomIn}
            disabled={zoom >= 3}
          >
            <Icon icon={Add} size={14} />
          </Button>
        </div>
      )}

      {/* Download */}
      <Button variant="outline" size="sm" iconLayout="left" onClick={onDownload}>
        <Icon icon={Download} size={14} />
        Tải về
      </Button>
    </div>
  );
}
