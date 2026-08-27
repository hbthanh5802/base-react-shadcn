import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { CodeBlock, CodePreview } from '@/shared/components/ui/code-block';

const sampleTsxCode = `import { Button } from '@/shared/components/ui/button';
import { Mail } from 'lucide-react';

export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Primary Emerald</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button iconLayout="left">
        <Mail className="h-4 w-4" />
        Gửi Email
      </Button>
    </div>
  );
}`;

const sampleDrawerCode = `import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from '@/shared/components/ui/drawer';
import { Button } from '@/shared/components/ui/button';

export function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Mở Drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="right" size="md">
        <DrawerHeader>
          <DrawerTitle>Tiêu đề Drawer</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p>Nội dung hiển thị bên trong Drawer</p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Đóng</Button>
          </DrawerClose>
          <Button>Xác nhận</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`;

const sampleBashCode = `# Cài đặt các gói phụ thuộc
npm install

# Khởi chạy máy chủ phát triển
npm run dev

# Biên dịch dự án sản xuất
npm run build`;

export const CodeBlockDevPage = () => {
  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Code Block & Preview" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Code Block & Preview</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Thành phần hiển thị mã nguồn có highlight cú pháp, hỗ trợ 1-click sao chép vào clipboard và tích hợp live demo.
        </p>
      </div>

      {/* ── 1. CodePreview (Interactive Demo + Code) ── */}
      <CodePreview
        title="1. CodePreview (Component Demo kèm Mã nguồn)"
        description="Bao bọc component thực tế kèm nút 'Xem code' và 'Sao chép' tiện lợi."
        code={sampleTsxCode}
        defaultShowCode={true}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">Primary Emerald</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </CodePreview>

      {/* ── 2. Standalone CodeBlock ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. CodeBlock độc lập (Standalone)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            Dùng để hiển thị code snippet, hướng dẫn cài đặt hoặc đoạn mã bất kỳ kèm số dòng và nút sao chép.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div>
            <p className="text-body-2-sb mb-2 text-foreground">Ví dụ Drawer Component (TSX):</p>
            <CodeBlock code={sampleDrawerCode} language="tsx" title="DrawerExample.tsx" />
          </div>

          <div>
            <p className="text-body-2-sb mb-2 text-foreground">Ví dụ Lệnh Terminal (Bash):</p>
            <CodeBlock code={sampleBashCode} language="bash" title="Terminal" maxHeight="200px" />
          </div>
        </div>
      </section>

      {/* ── 3. Collapsible CodeBlock ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">3. CodeBlock có thể thu gọn (Collapsible)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            Cho phép người dùng bấm "Thu gọn / Mở rộng" để tiết kiệm không gian màn hình.
          </p>
        </div>

        <div className="pt-2">
          <CodeBlock
            code={sampleTsxCode}
            language="tsx"
            title="Collapsible Snippet"
            collapsible
            defaultExpanded={false}
          />
        </div>
      </section>
    </div>
  );
};

export default CodeBlockDevPage;
