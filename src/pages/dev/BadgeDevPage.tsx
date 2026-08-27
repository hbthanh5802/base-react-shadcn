import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Badge } from '@/shared/components/ui/badge';
import { CodePreview } from '@/shared/components/ui/code-block';

const tones = [
  'brand',
  'gray',
  'error',
  'warning',
  'success',
  'blue',
  'purple',
  'pink',
  'orange',
  'teal',
] as const;
const variants = ['filled', 'light', 'outline', 'dot'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

const badgeUsageCode = `import { Badge } from '@/shared/components/ui/badge';

// 1. Các biến thể kiểu dáng
<Badge variant="filled" tone="brand">Đã hoàn thành</Badge>
<Badge variant="light" tone="success">Thành công</Badge>
<Badge variant="outline" tone="warning">Cảnh báo</Badge>
<Badge variant="dot" tone="error">Lỗi xử lý</Badge>

// 2. Kích thước (Size)
<Badge size="sm" tone="blue">Small</Badge>
<Badge size="md" tone="blue">Medium</Badge>
<Badge size="lg" tone="blue">Large</Badge>

// 3. Có nút đóng (Dismissible)
<Badge tone="purple" onDismiss={() => console.log('Dismissed')}>
  React 19
</Badge>`;

export const BadgeDevPage = () => (
  <div className="min-h-screen w-full space-y-8 bg-background p-6">
    <DevBreadcrumb label="Badge" />
    <div className="space-y-1">
      <h1 className="text-heading-3 font-bold text-foreground">Badge</h1>
      <p className="text-body-1-rg text-muted-foreground">
        Huy hiệu hiển thị nhãn trạng thái với 4 kiểu dáng và 10 sắc thái màu sắc.
      </p>
    </div>

    {/* ── 1. Variant × Tone ── */}
    <CodePreview
      title="1. Biến thể & Tông màu (Variant × Tone)"
      description="Filled, light, outline và dot dạng chấm tròn."
      code={badgeUsageCode}
    >
      <div className="space-y-4">
        {variants.map((variant) => (
          <div key={variant} className="space-y-2">
            <p className="text-caption-1-sb capitalize text-muted-foreground">{variant}</p>
            <div className="flex flex-wrap items-center gap-2.5">
              {tones.map((tone) => (
                <Badge key={tone} variant={variant} tone={tone}>
                  {tone}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CodePreview>

    {/* ── 2. Size ── */}
    <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="border-b border-border pb-3">
        <h2 className="text-title-1 font-semibold text-foreground">2. Kích thước (Size)</h2>
        <p className="text-body-2-rg text-muted-foreground mt-0.5">Nhỏ (sm), vừa (md) và lớn (lg).</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        {sizes.map((size) => (
          <Badge key={size} variant="light" tone="brand" size={size}>
            Size: {size}
          </Badge>
        ))}
      </div>
    </section>

    {/* ── 3. Dismissible ── */}
    <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="border-b border-border pb-3">
        <h2 className="text-title-1 font-semibold text-foreground">3. Có nút đóng (Dismissible)</h2>
        <p className="text-body-2-rg text-muted-foreground mt-0.5">Cho phép người dùng xóa hoặc ẩn badge.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {tones.slice(0, 6).map((tone) => (
          <Badge key={tone} variant="light" tone={tone} onDismiss={() => {}}>
            {tone}
          </Badge>
        ))}
      </div>
    </section>
  </div>
);

export default BadgeDevPage;
