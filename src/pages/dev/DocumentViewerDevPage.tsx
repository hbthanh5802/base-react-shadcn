import { useRef, useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { DocumentViewerDialog } from '@/shared/components/ui/document-viewer';

const DEMO_ITEMS: { label: string; fileName: string; description: string }[] = [
  {
    label: 'PDF',
    fileName: 'sample.pdf',
    description: 'Xem trực tiếp tài liệu PDF kèm điều hướng trang và thu phóng.',
  },
  {
    label: 'Excel (XLSX)',
    fileName: 'sample.xlsx',
    description: 'Bảng tính nhiều sheet: Nhân sự, Kế hoạch, Tài chính.',
  },
  { label: 'CSV', fileName: 'sample.csv', description: 'Dữ liệu phân tách dấu phẩy dạng bảng tính nhanh.' },
  {
    label: 'Word (DOCX)',
    fileName: 'sample.docx',
    description: 'Văn bản định dạng Word với tiêu đề và đoạn văn.',
  },
  {
    label: 'Word (DOC)',
    fileName: 'sample.doc',
    description: 'Định dạng Word 97-2003 cũ hỗ trợ fallback tải xuống.',
  },
];

export const DocumentViewerDevPage = () => {
  const [open, setOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState('');
  const [activeFileName, setActiveFileName] = useState('');
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDemo = (fileName: string) => {
    setActiveFile(null);
    setActiveSrc(`/demo/${fileName}`);
    setActiveFileName(fileName);
    setOpen(true);
  };

  const openLocalFile = (file: File) => {
    setActiveSrc('');
    setActiveFileName(file.name);
    setActiveFile(file);
    setOpen(true);
  };

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Document Viewer" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Document Viewer</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Trình xem trước tài liệu văn phòng trực tiếp trong ứng dụng (PDF, Excel, Word, CSV, PPTX).
        </p>
      </div>

      {/* Demo files */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Danh sách tệp tin mẫu</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Click vào từng định dạng bên dưới để mở cửa sổ xem trước.</p>
        </div>
        <div className="grid gap-3.5 pt-2 sm:grid-cols-2 lg:grid-cols-5">
          {DEMO_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => openDemo(item.fileName)}
              className="flex flex-col gap-1.5 rounded-xl border border-border bg-muted/20 p-4 text-left transition-all hover:border-primary-400 hover:bg-muted/40 hover:-translate-y-0.5 shadow-2xs"
            >
              <span className="text-title-2 font-semibold text-foreground">{item.label}</span>
              <span className="text-caption-1-rg text-muted-foreground">{item.description}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Upload from machine */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Tải tệp từ máy tính cá nhân</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            Hỗ trợ các định dạng: .pdf, .xlsx, .xls, .csv, .docx, .doc, .pptx
          </p>
        </div>
        <div className="pt-2">
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.xlsx,.xls,.csv,.docx,.doc,.pptx"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) openLocalFile(f);
              if (inputRef.current) inputRef.current.value = '';
            }}
          />
          <Button variant="outline" onClick={() => inputRef.current?.click()}>
            Chọn file từ máy tính
          </Button>
        </div>
      </section>

      <DocumentViewerDialog
        open={open}
        onOpenChange={setOpen}
        src={activeSrc || undefined}
        file={activeFile ?? undefined}
        fileName={activeFileName}
      />
    </div>
  );
};

export default DocumentViewerDevPage;
