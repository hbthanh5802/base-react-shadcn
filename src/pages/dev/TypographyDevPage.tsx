import React from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { CodePreview } from '@/shared/components/ui/code-block';
import { Surface } from '@/shared/components/ui/surface';
import { Typography } from '@/shared/components/ui/typography';

const headingsCode = `import { Typography } from '@/shared/components/ui/typography';

// Cấp bậc Heading 1 - 3 (48px, 36px, 28px)
<Typography variant="heading-1">Heading 1 (48px Bold)</Typography>
<Typography variant="heading-2">Heading 2 (36px Bold)</Typography>
<Typography variant="heading-3">Heading 3 (28px Bold)</Typography>

// Cấp bậc Title 1 - 3 (24px, 20px, 18px)
<Typography variant="title-1">Title 1 (24px Bold)</Typography>
<Typography variant="title-1-sb">Title 1 Semibold (24px)</Typography>
<Typography variant="title-2">Title 2 (20px Bold)</Typography>
<Typography variant="title-2-sb">Title 2 Semibold (20px)</Typography>
<Typography variant="title-3">Title 3 (18px Bold)</Typography>
<Typography variant="title-3-sb">Title 3 Semibold (18px)</Typography>`;

const subcomponentsCode = `import { Typography } from '@/shared/components/ui/typography';

// Sử dụng qua Sub-components thân thiện
<Typography.Heading level={1}>Tiêu đề chính H1</Typography.Heading>
<Typography.Heading level={2}>Tiêu đề phân mục H2</Typography.Heading>

<Typography.Title level={1}>Tiêu đề Card Lớn</Typography.Title>
<Typography.Title level={2} weight="semibold">Tiêu đề Section Vừa</Typography.Title>

<Typography.Paragraph>
  Đoạn văn bản có khoảng đệm dòng và khoảng cách đáy chuẩn.
</Typography.Paragraph>

<Typography.Lead>Đoạn mở đầu thu hút sự chú ý 18px.</Typography.Lead>
<Typography.Caption>Ghi chú nhỏ xám 12px.</Typography.Caption>`;

const bodyTextCode = `import { Typography } from '@/shared/components/ui/typography';

// Body 1 (16px) - Dành cho nội dung lớn, bài viết
<Typography variant="body-1-rg">Body 1 Regular (16px / 24px)</Typography>
<Typography variant="body-1-sb">Body 1 Semibold (16px / 24px)</Typography>
<Typography variant="body-1">Body 1 Bold (16px / 24px)</Typography>

// Body 2 (14px) - Mặc định hệ thống UI
<Typography variant="body-2-rg">Body 2 Regular (14px / 20px)</Typography>
<Typography variant="body-2-sb">Body 2 Semibold (14px / 20px)</Typography>
<Typography variant="body-2">Body 2 Bold (14px / 20px)</Typography>

// Body 3 (12px) - Dành cho nhãn, tag, caption
<Typography variant="body-3-rg">Body 3 Regular (12px / 18px)</Typography>
<Typography variant="body-3-sb">Body 3 Semibold (12px / 18px)</Typography>
<Typography variant="body-3">Body 3 Bold (12px / 18px)</Typography>`;

const colorsCode = `import { Typography } from '@/shared/components/ui/typography';

<Typography color="default">Default Foreground</Typography>
<Typography color="muted">Muted Foreground</Typography>
<Typography color="primary">Primary Brand Color</Typography>
<Typography color="success">Success Emerald Color</Typography>
<Typography color="warning">Warning Amber Color</Typography>
<Typography color="destructive">Destructive Error Color</Typography>`;

const specialElementsCode = `import { Typography } from '@/shared/components/ui/typography';

// 1. Phím tắt bàn phím
Nhấn <Typography.Kbd>⌘ + K</Typography.Kbd> hoặc <Typography.Kbd>Ctrl + P</Typography.Kbd> để mở tìm kiếm.

// 2. Inline Code
Chạy lệnh <Typography.Code>npm run build</Typography.Code> để kiểm tra.

// 3. Trích dẫn Blockquote
<Typography.Blockquote>
  "Thiết kế tốt không chỉ là nhìn như thế nào, mà là nó hoạt động như thế nào."
</Typography.Blockquote>

// 4. Liên kết Link
<Typography.Link href="#">Xem tài liệu hướng dẫn →</Typography.Link>`;

const copyableCode = `import { Typography } from '@/shared/components/ui/typography';

// Bật nút copy 1-chạm kèm Toast
<Typography variant="body-2-sb" copyable>
  ORD-2026-9874291823
</Typography>

<Typography.Code copyable>
  npm install @shadcn/ui
</Typography.Code>

<Typography variant="body-2-rg" copyable={{ text: 'secret_key_12345' }}>
  Khóa bí mật: •••••••••••• (Bấm để copy)
</Typography>`;

const truncationCode = `import { Typography } from '@/shared/components/ui/typography';

// Cắt 1 dòng (ellipsis)
<Typography variant="body-2-rg" truncate>
  Văn bản rất dài trên một dòng duy nhất sẽ bị cắt bớt bằng dấu ba chấm...
</Typography>

// Cắt 2 dòng (line-clamp-2)
<Typography variant="body-2-rg" truncate={2}>
  Đoạn văn bản mô tả dự án dài nhiều dòng sẽ tự động được giới hạn hiển thị tối đa trong vòng 2 dòng trên màn hình và ẩn phần dư thừa bằng dấu 3 chấm.
</Typography>`;

export const TypographyDevPage = () => {
  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Typography" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Typography (Hệ thống Kiểu chữ)</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Chuẩn hóa 100% kích thước chữ, độ dày nét, khoảng cách dòng theo thang tỉ lệ 8pt Design Token, tự động thích ứng Light/Dark Mode.
        </p>
      </div>

      {/* ── 1. Headings & Titles Scale ── */}
      <CodePreview
        title="1. Thang phân cấp Tiêu đề (Headings & Titles)"
        description="Bao gồm 3 cấp Heading lớn (48px, 36px, 28px) và 3 cấp Title giao diện (24px, 20px, 18px)."
        code={headingsCode}
      >
        <Surface level="card" border="default" padding="lg" radius="xl" className="space-y-4">
          <div className="flex flex-col gap-1 border-b border-border/70 pb-3">
            <span className="text-caption-2-rg font-mono text-muted-foreground">heading-1 • 48px / 56px Bold</span>
            <Typography variant="heading-1">Heading 1: Trang chủ & Hero Banner</Typography>
          </div>

          <div className="flex flex-col gap-1 border-b border-border/70 pb-3">
            <span className="text-caption-2-rg font-mono text-muted-foreground">heading-2 • 36px / 44px Bold</span>
            <Typography variant="heading-2">Heading 2: Tiêu đề phân mục chính</Typography>
          </div>

          <div className="flex flex-col gap-1 border-b border-border/70 pb-3">
            <span className="text-caption-2-rg font-mono text-muted-foreground">heading-3 • 28px / 36px Bold</span>
            <Typography variant="heading-3">Heading 3: Tiêu đề trang Dashboard</Typography>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3">
            <div className="space-y-1">
              <span className="text-caption-2-rg font-mono text-muted-foreground">title-1 • 24px Bold / Semibold</span>
              <Typography variant="title-1">Title 1 Bold</Typography>
              <Typography variant="title-1-sb">Title 1 Semibold</Typography>
            </div>

            <div className="space-y-1">
              <span className="text-caption-2-rg font-mono text-muted-foreground">title-2 • 20px Bold / Semibold / Regular</span>
              <Typography variant="title-2">Title 2 Bold</Typography>
              <Typography variant="title-2-sb">Title 2 Semibold</Typography>
              <Typography variant="title-2-rg">Title 2 Regular</Typography>
            </div>

            <div className="space-y-1">
              <span className="text-caption-2-rg font-mono text-muted-foreground">title-3 • 18px Bold / Semibold / Regular</span>
              <Typography variant="title-3">Title 3 Bold</Typography>
              <Typography variant="title-3-sb">Title 3 Semibold</Typography>
              <Typography variant="title-3-rg">Title 3 Regular</Typography>
            </div>
          </div>
        </Surface>
      </CodePreview>

      {/* ── 2. Shortcut Sub-components ── */}
      <CodePreview
        title="2. Sử dụng qua Sub-components (Typography.Heading, Title, Paragraph, Lead)"
        description="Cung cấp các component rút gọn tiện lợi, tự động gắn thẻ HTML ngữ nghĩa chuẩn SEO."
        code={subcomponentsCode}
      >
        <Surface level="card" border="default" padding="lg" radius="xl" className="space-y-3">
          <Typography.Heading level={2}>Tiêu đề phân mục H2</Typography.Heading>
          <Typography.Lead>
            Đây là đoạn mở đầu (Lead Text 18px) giúp tóm lược nội dung quan trọng trước khi đi vào chi tiết bài viết.
          </Typography.Lead>
          <Typography.Paragraph>
            Đoạn văn bản thứ nhất được áp dụng Typography.Paragraph với khoảng cách dòng chuẩn xác và độ tương phản cao ở cả giao diện sáng và tối.
          </Typography.Paragraph>
          <Typography.Caption>
            Cập nhật lần cuối: 28/08/2026 bởi Hệ thống Quản trị
          </Typography.Caption>
        </Surface>
      </CodePreview>

      {/* ── 3. Body Text Hierarchy ── */}
      <CodePreview
        title="3. Thang phân cấp Nội dung (Body 1, Body 2, Body 3)"
        description="Body 1 (16px), Body 2 (14px - Mặc định hệ thống), Body 3 (12px)."
        code={bodyTextCode}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Surface level="card" border="default" padding="md" radius="xl" className="space-y-2">
            <span className="text-caption-1-sb font-mono text-primary">Body 1 (16px / 24px)</span>
            <Typography variant="body-1">Body 1 Bold - 16px</Typography>
            <Typography variant="body-1-sb">Body 1 Semibold - 16px</Typography>
            <Typography variant="body-1-rg">Body 1 Regular - 16px</Typography>
          </Surface>

          <Surface level="card" border="default" padding="md" radius="xl" className="space-y-2">
            <span className="text-caption-1-sb font-mono text-primary">Body 2 (14px / 20px - Mặc định)</span>
            <Typography variant="body-2">Body 2 Bold - 14px</Typography>
            <Typography variant="body-2-sb">Body 2 Semibold - 14px</Typography>
            <Typography variant="body-2-rg">Body 2 Regular - 14px</Typography>
          </Surface>

          <Surface level="card" border="default" padding="md" radius="xl" className="space-y-2">
            <span className="text-caption-1-sb font-mono text-primary">Body 3 (12px / 18px)</span>
            <Typography variant="body-3">Body 3 Bold - 12px</Typography>
            <Typography variant="body-3-sb">Body 3 Semibold - 12px</Typography>
            <Typography variant="body-3-rg">Body 3 Regular - 12px</Typography>
          </Surface>
        </div>
      </CodePreview>

      {/* ── 4. Semantic Colors ── */}
      <CodePreview
        title="4. Màu sắc Ngữ nghĩa (Semantic Colors)"
        description="Tự động tương thích với màu nền của cả Light Mode và Dark Mode."
        code={colorsCode}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Surface level="card" border="default" padding="sm" radius="lg" className="text-center">
            <Typography color="default" weight="semibold">Default</Typography>
          </Surface>
          <Surface level="card" border="default" padding="sm" radius="lg" className="text-center">
            <Typography color="muted" weight="semibold">Muted</Typography>
          </Surface>
          <Surface level="card" border="default" padding="sm" radius="lg" className="text-center">
            <Typography color="primary" weight="semibold">Primary</Typography>
          </Surface>
          <Surface level="card" border="default" padding="sm" radius="lg" className="text-center">
            <Typography color="success" weight="semibold">Success</Typography>
          </Surface>
          <Surface level="card" border="default" padding="sm" radius="lg" className="text-center">
            <Typography color="warning" weight="semibold">Warning</Typography>
          </Surface>
          <Surface level="card" border="default" padding="sm" radius="lg" className="text-center">
            <Typography color="destructive" weight="semibold">Destructive</Typography>
          </Surface>
        </div>
      </CodePreview>

      {/* ── 5. Special Elements: Code, Kbd, Blockquote, Link ── */}
      <CodePreview
        title="5. Các thành phần đặc biệt (Kbd, Code, Blockquote, Link)"
        description="Hỗ trợ phím tắt bàn phím, inline code, trích dẫn danh ngôn và siêu liên kết."
        code={specialElementsCode}
      >
        <Surface level="card" border="default" padding="lg" radius="xl" className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-body-2-rg text-foreground">Phím tắt thao tác nhanh:</span>
            <Typography.Kbd>⌘ + K</Typography.Kbd>
            <Typography.Kbd>Ctrl + Shift + F</Typography.Kbd>
            <Typography.Kbd>Esc</Typography.Kbd>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-body-2-rg text-foreground">Inline Code:</span>
            <span>Khởi động server bằng lệnh</span>
            <Typography.Code>npm run dev</Typography.Code>
            <span>hoặc</span>
            <Typography.Code>pnpm dev</Typography.Code>
          </div>

          <Typography.Blockquote>
            "Giao diện người dùng hoàn hảo là khi không còn gì để lược bỏ mà vẫn đáp ứng trọn vẹn trải nghiệm của người dùng."
          </Typography.Blockquote>

          <div className="pt-1">
            <Typography.Link href="#!">Khám phá thêm các thành phần khác tại DevHub →</Typography.Link>
          </div>
        </Surface>
      </CodePreview>

      {/* ── 6. Copyable Text ── */}
      <CodePreview
        title="6. Văn bản có thể Sao chép 1-chạm (Copyable Text)"
        description="Thêm prop copyable={true} để tự động hiển thị nút sao chép kèm thông báo Toast tiện lợi."
        code={copyableCode}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Surface level="card" border="default" padding="sm" radius="lg">
            <Typography variant="body-2-sb" copyable>
              ORD-2026-9874291823
            </Typography>
          </Surface>

          <Surface level="card" border="default" padding="sm" radius="lg">
            <Typography.Code copyable>
              npm install @shadcn/ui
            </Typography.Code>
          </Surface>

          <Surface level="card" border="default" padding="sm" radius="lg">
            <Typography variant="body-2-rg" copyable={{ text: 'sk_live_992138129381' }}>
              API Key: •••••••••••••••
            </Typography>
          </Surface>
        </div>
      </CodePreview>

      {/* ── 7. Text Truncation & Line Clamping ── */}
      <CodePreview
        title="7. Cắt bớt văn bản (Truncation & Line Clamping)"
        description="Hỗ trợ truncate 1 dòng (truncate) hoặc nhiều dòng (truncate={2 | 3 | 4 | 5})."
        code={truncationCode}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Surface level="card" border="default" padding="md" radius="xl" className="space-y-1.5">
            <span className="text-caption-1-sb font-mono text-primary">Cắt 1 dòng (truncate={true})</span>
            <Typography variant="body-2-rg" truncate className="max-w-sm">
              Đây là một dòng tiêu đề cực kỳ dài vượt quá chiều rộng của khung chứa sẽ bị cắt bớt bằng dấu ba chấm tự động.
            </Typography>
          </Surface>

          <Surface level="card" border="default" padding="md" radius="xl" className="space-y-1.5">
            <span className="text-caption-1-sb font-mono text-primary">Cắt 2 dòng (truncate={2})</span>
            <Typography variant="body-2-rg" truncate={2} className="max-w-sm">
              Đoạn văn bản mô tả tính năng sản phẩm dài nhiều dòng sẽ tự động được giới hạn hiển thị tối đa trong vòng 2 dòng trên màn hình và ẩn phần dư thừa phía sau bằng dấu 3 chấm.
            </Typography>
          </Surface>
        </div>
      </CodePreview>
    </div>
  );
};

export default TypographyDevPage;
