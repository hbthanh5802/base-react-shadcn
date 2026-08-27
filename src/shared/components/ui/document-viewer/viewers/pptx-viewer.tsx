import { PresentionChart } from 'iconsax-react';

import { FormatFallbackViewer } from '@/shared/components/ui/document-viewer/components/format-fallback-viewer';

interface PptxViewerProps {
  fileName: string;
  onDownload: () => void;
}

export function PptxViewer({ fileName, onDownload }: PptxViewerProps) {
  return (
    <FormatFallbackViewer
      icon={PresentionChart}
      iconBgClassName="bg-orange-50"
      iconClassName="text-orange-500"
      fileName={fileName}
      reason="Định dạng PPTX chưa hỗ trợ xem trực tiếp trên trình duyệt."
      hint="Vui lòng tải về và mở bằng Microsoft PowerPoint hoặc LibreOffice Impress."
      onDownload={onDownload}
    />
  );
}
