import { Download, Eye, Trash2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { getFiletypeByFilename, type FileGroupType } from '@/shared/lib/file';

export interface DisplayAttachProps {
  fileName: string;
  fileSizeDisplay: string;
  fileType?: FileGroupType | string;
  enableDownload?: boolean;
  enableDelete?: boolean;
  enableView?: boolean;
  onDownloadClick?: () => void;
  onDeleteClick?: () => void;
  onViewClick?: () => void;
}

// Bảng ánh xạ icon tương ứng với từng loại fileType
const FILE_ICON_MAP: Record<string, string> = {
  excel: '/misc-icons/xlsx-default.svg',
  xlsx: '/misc-icons/xlsx-default.svg',
  xls: '/misc-icons/xlsx-default.svg',
  csv: '/misc-icons/xlsx-default.svg',

  pdf: '/misc-icons/pdf-default.svg',

  word: '/misc-icons/docx-default.svg',
  docx: '/misc-icons/docx-default.svg',
  doc: '/misc-icons/docx-default.svg',

  powerpoint: '/misc-icons/pptx-default.svg',
  pptx: '/misc-icons/pptx-default.svg',
  ppt: '/misc-icons/pptx-default.svg',

  image: '/misc-icons/image-default.svg',
  png: '/misc-icons/image-default.svg',
  jpg: '/misc-icons/image-default.svg',
  jpeg: '/misc-icons/image-default.svg',

  zip: '/misc-icons/zip-default.svg',
  rar: '/misc-icons/zip-default.svg',
  archive: '/misc-icons/zip-default.svg',

  text: '/misc-icons/txt-default.svg',
  txt: '/misc-icons/txt-default.svg',

  video: '/misc-icons/video-default.svg',
  audio: '/misc-icons/audio-default.svg',
};

// Icon mặc định dùng làm fallback nếu không khớp case nào
const DEFAULT_FILE_ICON = '/misc-icons/file-default.svg';

export function DisplayAttach(props: DisplayAttachProps) {
  const {
    fileName,
    fileType,
    fileSizeDisplay,
    enableDelete,
    enableDownload,
    enableView,
    onDownloadClick,
    onDeleteClick,
    onViewClick,
  } = props;

  const iconSrc = fileType
    ? FILE_ICON_MAP[fileType?.toLowerCase()]
    : fileName
      ? FILE_ICON_MAP[getFiletypeByFilename(fileName)]
      : DEFAULT_FILE_ICON;

  return (
    <div className="DisplayAttach flex items-center justify-between rounded-xl border border-neutral-150 px-4 py-5">
      <div className="inline-flex items-center gap-1.5">
        <img src={iconSrc} alt={fileName} className="h-10 w-10 object-contain" />

        <div className="flex flex-col gap-0.5">
          <p className="text-body-1 text-neutral-1000">{fileName}</p>
          {!!fileSizeDisplay && (
            <p className="text-body-2-rg text-neutral-450">{fileSizeDisplay}</p>
          )}
        </div>
      </div>

      <div className="inline-flex items-center gap-4">
        {enableView && (
          <Button size="icon" variant="link" onClick={onViewClick}>
            <Icon icon={Eye} />
          </Button>
        )}

        {/* Download button */}
        {enableDownload && (
          <Button size="icon" variant="link" onClick={onDownloadClick}>
            <Icon icon={Download} />
          </Button>
        )}

        {/* Delete button */}
        {enableDelete && (
          <Button size="icon" variant="link" onClick={onDeleteClick}>
            <Icon icon={Trash2} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default DisplayAttach;
