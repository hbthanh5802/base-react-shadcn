/* eslint-disable react-hooks/refs */
import { useEffect, useRef, useState } from 'react';

import { downloadFile } from '@/shared/lib/file';

export interface ServerFilePlaceholder {
  fileName: string;
  fileSize: number;
  fileSource: string;
  isServerFile: true;
}

export type CustomUploadFile = File | ServerFilePlaceholder;

export const isServerFile = (file: CustomUploadFile): file is ServerFilePlaceholder => {
  return !!file && 'isServerFile' in file;
};

interface HeadlessFileUploadRenderProps {
  files: CustomUploadFile[];
  error: string | null;
  isDragging: boolean;
  onPick: () => void;
  onClearAll: () => void;
  onRemoveFile: (index: number) => void;
  onDownloadFile: (index: number) => void;
  disabled?: boolean;
  dragProps: {
    onDragOver: (e: React.DragEvent<HTMLElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLElement>) => void;
    onDrop: (e: React.DragEvent<HTMLElement>) => void;
  };
}

interface HeadlessFileUploadProps {
  placeholderFiles?: { fileName: string; fileSize: number; fileSource: string }[];
  accept?: string | string[];
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  onChange?: (files: CustomUploadFile[] | CustomUploadFile | null) => void;
  onError?: (error: string) => void;
  children: (props: HeadlessFileUploadRenderProps) => React.ReactNode;
}

export function HeadlessFileUpload({
  placeholderFiles = [],
  accept,
  maxSize = 5,
  maxFiles,
  multiple = false,
  disabled,
  onChange,
  onError,
  children,
}: HeadlessFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Chỉ cần map placeholderFiles từ server sang cấu trúc chuẩn của component
  const mapServerFiles = (): CustomUploadFile[] => {
    const serverFilesMapped: ServerFilePlaceholder[] = placeholderFiles.map((f) => ({
      ...f,
      isServerFile: true,
    }));
    return multiple ? serverFilesMapped : serverFilesMapped.slice(0, 1);
  };

  const [files, setFiles] = useState<CustomUploadFile[]>(() => mapServerFiles());
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFiles(mapServerFiles());
  }, [placeholderFiles]);

  const acceptArray = accept
    ? Array.isArray(accept)
      ? accept.flatMap((item) => item.split(',')).map((ext) => ext.trim().toLowerCase())
      : accept.split(',').map((ext) => ext.trim().toLowerCase())
    : null;
  const htmlAccept = acceptArray?.join(',');

  const onPick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleSetError = (msg: string) => {
    setError(msg);
    onError?.(msg);
  };

  const processFiles = (incomingFiles: File[]) => {
    if (incomingFiles.length === 0) return;

    let filteredFiles = incomingFiles;
    if (acceptArray && acceptArray.length > 0) {
      filteredFiles = incomingFiles.filter((file) => {
        return acceptArray.some((ext) => {
          if (ext.startsWith('.')) {
            return file.name.toLowerCase().endsWith(ext);
          }
          if (ext.endsWith('/*')) {
            return file.type.startsWith(ext.replace('/*', ''));
          }
          return file.type === ext;
        });
      });

      if (filteredFiles.length === 0) {
        handleSetError('Định dạng file không được hỗ trợ');
        return;
      }
    }

    if (!multiple) {
      const file = filteredFiles[0];
      if (file.size > maxSize * 1024 * 1024) {
        handleSetError(`File vượt quá dung lượng ${maxSize}MB`);
        return;
      }
      setError(null);
      setFiles([file]);
      onChange?.(file);
      return;
    }

    const updatedFiles = [...files, ...filteredFiles];

    if (maxFiles && updatedFiles.length > maxFiles) {
      handleSetError(`Chỉ được phép tải lên tối đa ${maxFiles} file (bao gồm cả file hiện có)`);
      return;
    }

    const hasLargeFile = filteredFiles.some((f) => f.size > maxSize * 1024 * 1024);
    if (hasLargeFile) {
      handleSetError(`Có file vượt quá dung lượng ${maxSize}MB`);
      return;
    }

    setError(null);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incomingFiles = e.target.files ? Array.from(e.target.files) : [];
    processFiles(incomingFiles);
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const droppedFiles = e.dataTransfer.files ? Array.from(e.dataTransfer.files) : [];
    processFiles(droppedFiles);
  };

  const onRemoveFile = (indexToRemove: number) => {
    if (disabled) return;

    const updatedFiles = files.filter((_, idx) => idx !== indexToRemove);
    setFiles(updatedFiles);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';

    if (updatedFiles.length === 0) {
      onChange?.(null);
    } else {
      onChange?.(multiple ? updatedFiles : updatedFiles[0]);
    }
  };

  const onDownloadFile = (index: number) => {
    const targetFile = files[index];
    if (!targetFile) return;

    if (isServerFile(targetFile)) {
      window.open(targetFile.fileSource, '_blank');
    } else {
      downloadFile(targetFile);
    }
  };

  const onClearAll = () => {
    if (disabled) return;
    setFiles([]);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
    onChange?.(null);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={htmlAccept}
        multiple={multiple}
        className="hidden"
        onChange={onChangeFile}
        disabled={disabled}
      />
      {children({
        files,
        error,
        isDragging,
        onPick,
        onClearAll,
        onRemoveFile,
        onDownloadFile,
        disabled,
        dragProps: { onDragOver, onDragLeave, onDrop },
      })}
    </>
  );
}
