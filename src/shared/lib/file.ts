import type { ServerFile } from '@/shared/lib/zod';

export const MIME_TYPES = {
  pdf: ['application/pdf'],
  excel: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
  ],
  word: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  powerpoint: [
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ],
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  text: ['text/plain'],
  zip: ['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed'],
};

export const FILE_EXTENSIONS: Record<string, readonly string[]> = {
  pdf: ['pdf'],
  excel: ['xls', 'xlsx', 'csv'],
  word: ['doc', 'docx'],
  powerpoint: ['ppt', 'pptx'],
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  text: ['txt'],
  zip: ['zip', 'rar', '7z'],
};

export type FileGroupType = keyof typeof MIME_TYPES | 'unknown';

export interface FileAnalysisResult {
  name: string;
  sizeInMB: number;
  displaySize: string;
  extension: string;
  type: FileGroupType;
  origin: File;
}

export function serverfileToFile(dataFile: ServerFile) {
  return new File([''], dataFile.fileName);
}

export function analyzeFile(file: File): FileAnalysisResult {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const mimeType = file.type.toLowerCase();

  const sizeInMB = file.size / (1024 * 1024);
  const displaySize =
    sizeInMB < 0.1 ? `${(file.size / 1024).toFixed(2)} KB` : `${sizeInMB.toFixed(2)} MB`;

  let type: FileGroupType = 'unknown';

  if (MIME_TYPES.pdf.includes(mimeType) || FILE_EXTENSIONS.pdf.includes(extension)) {
    type = 'pdf';
  } else if (MIME_TYPES.excel.includes(mimeType) || FILE_EXTENSIONS.excel.includes(extension)) {
    type = 'excel';
  } else if (MIME_TYPES.word.includes(mimeType) || FILE_EXTENSIONS.word.includes(extension)) {
    type = 'word';
  } else if (
    MIME_TYPES.powerpoint.includes(mimeType) ||
    FILE_EXTENSIONS.powerpoint.includes(extension)
  ) {
    type = 'powerpoint';
  } else if (
    mimeType.startsWith('image/') ||
    MIME_TYPES.image.includes(mimeType) ||
    FILE_EXTENSIONS.image.includes(extension)
  ) {
    type = 'image';
  } else if (
    mimeType.startsWith('text/') ||
    MIME_TYPES.text.includes(mimeType) ||
    FILE_EXTENSIONS.text.includes(extension)
  ) {
    type = 'text';
  } else if (MIME_TYPES.zip.includes(mimeType) || FILE_EXTENSIONS.zip.includes(extension)) {
    type = 'zip';
  }

  return {
    name: file.name,
    sizeInMB,
    displaySize,
    extension,
    type,
    origin: file,
  };
}

export function downloadFile(target: File | string | null | undefined, customName?: string): void {
  if (!target) return;

  const isFileObject = target instanceof File;
  let downloadUrl = '';
  let fileName = '';

  if (isFileObject) {
    downloadUrl = URL.createObjectURL(target);
    fileName = target.name;
  } else {
    downloadUrl = target;
    fileName = customName || target.split('/').pop()?.split('?')[0] || 'downloaded-file';
  }

  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = fileName;

  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';

  document.body.appendChild(anchor);
  anchor.click();

  document.body.removeChild(anchor);
  if (isFileObject) {
    URL.revokeObjectURL(downloadUrl);
  }
}

export const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatToFileSize = (bytes: number) => {
  const sizeInMB = bytes / (1024 * 1024);
  return sizeInMB < 0.1 ? `${(bytes / 1024).toFixed(1)} KB` : `${sizeInMB.toFixed(1)} MB`;
};

export function getFiletypeByFilename(filename?: string): string {
  if (!filename) return '';
  const extension = filename.split('.').pop();
  return extension ? extension.toLowerCase() : '';
}
