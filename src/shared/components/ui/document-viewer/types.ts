export type FileType = 'pdf' | 'xlsx' | 'csv' | 'docx' | 'doc' | 'pptx' | 'unsupported';

export type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'loaded'; data: ArrayBuffer }
  | { status: 'error'; error: Error };

export interface ViewerProps {
  src?: string;
  file?: File;
  zoom: number;
  page: number;
  onTotalPagesChange: (total: number) => void;
}

export interface SharedViewerProps extends ViewerProps {
  onDownload: () => void;
}

export interface DocumentViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src?: string;
  file?: File;
  fileName?: string;
  title?: string;
}
