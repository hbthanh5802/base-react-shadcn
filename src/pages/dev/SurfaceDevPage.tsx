import { DocumentCopy, ShieldSecurity, TickCircle } from 'iconsax-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { CodePreview } from '@/shared/components/ui/code-block';
import {
  Surface,
  type SurfaceBorder,
  type SurfaceLevel,
  type SurfaceRadius,
  type SurfaceShadow,
} from '@/shared/components/ui/surface';

const levelsUsageCode = `import { Surface } from '@/shared/components/ui/surface';

// 1. Nền Card chính (Trắng / Dark Card)
<Surface level="card" padding="md" radius="xl">
  Nền Card chính (Level 1)
</Surface>

// 2. Nền Section con bên trong (Subtle)
<Surface level="subtle" padding="md" radius="lg">
  Nền Phân vùng con bên trong (Level 2)
</Surface>

// 3. Nền lõm (Inset - Dùng cho Code, Preview)
<Surface level="inset" padding="md" radius="md">
  Nền Lõm Sunken Area (Level 3)
</Surface>

// 4. Nền nổi có bóng (Elevated)
<Surface level="elevated" shadow="md" padding="md" radius="xl">
  Nền Nổi Floating Popover
</Surface>

// 5. Nền nhấn thương hiệu (Brand Tint)
<Surface level="primary" border="primary" padding="md" radius="xl">
  Nền Nhấn Thương hiệu
</Surface>`;

const nestedLayersCode = `import { Surface } from '@/shared/components/ui/surface';
import { Button } from '@/shared/components/ui/button';

// Dashboard Card với các tầng lồng nhau tự động tương thích Dark/Light Mode
<Surface level="card" border="default" shadow="xs" padding="lg" radius="2xl" className="space-y-4">
  <div className="flex items-center justify-between">
    <h3 className="text-title-2 font-bold text-foreground">Tổng quan Dự án</h3>
    <Button size="small">Xuất báo cáo</Button>
  </div>

  {/* Tầng con 1: Subtle Section */}
  <Surface level="subtle" border="subtle" padding="md" radius="xl" className="space-y-3">
    <p className="text-body-2-sb text-foreground">Trạng thái triển khai</p>

    {/* Tầng con 2: Inset Area cho thông số kỹ thuật */}
    <Surface level="inset" border="dashed" padding="sm" radius="lg">
      <code className="text-caption-1-rg font-mono text-muted-foreground">
        DEPLOY_URL: https://api.production.example.com
      </code>
    </Surface>
  </Surface>
</Surface>`;

const interactiveUsageCode = `import { useState } from 'react';
import { Surface } from '@/shared/components/ui/surface';

export const SelectablePlanExample = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Surface
        interactive
        level="card"
        selected={selectedPlan === 'free'}
        onClick={() => setSelectedPlan('free')}
        padding="md"
        radius="xl"
      >
        <h4 className="font-bold">Gói Miễn phí</h4>
        <p className="text-muted-foreground text-sm">Dành cho cá nhân</p>
      </Surface>

      <Surface
        interactive
        level="card"
        selected={selectedPlan === 'pro'}
        onClick={() => setSelectedPlan('pro')}
        padding="md"
        radius="xl"
      >
        <h4 className="font-bold">Gói Chuyên nghiệp</h4>
        <p className="text-muted-foreground text-sm">Dành cho nhóm phát triển</p>
      </Surface>
    </div>
  );
};`;

const polymorphicUsageCode = `import { Surface } from '@/shared/components/ui/surface';

// Render dưới dạng thẻ <section>
<Surface as="section" level="card" padding="lg">
  Semantic HTML Section
</Surface>

// Render dưới dạng thẻ <aside>
<Surface as="aside" level="subtle" padding="md">
  Sidebar Aside Panel
</Surface>

// Render dưới dạng thẻ <article>
<Surface as="article" level="card" interactive padding="md">
  Clickable Article Card
</Surface>`;

export const SurfaceDevPage = () => {
  const [selectedCard, setSelectedCard] = useState<string>('pro');

  const levels: { name: SurfaceLevel; desc: string; sample: string }[] = [
    {
      name: 'base',
      desc: 'Canvas Background (Nền trang web)',
      sample: 'bg-background',
    },
    {
      name: 'card',
      desc: 'Primary Surface (Nền Card chính, Mặc định)',
      sample: 'bg-card',
    },
    {
      name: 'subtle',
      desc: 'Nested Section (Nền phân vùng con bên trong)',
      sample: 'bg-muted/40',
    },
    {
      name: 'inset',
      desc: 'Sunken / Inset (Nền lõm cho Code, Terminal)',
      sample: 'bg-muted/70',
    },
    {
      name: 'elevated',
      desc: 'Floating Popover (Nền nổi có đổ bóng)',
      sample: 'bg-popover',
    },
    {
      name: 'primary',
      desc: 'Brand Tint (Nền nhấn màu thương hiệu Emerald)',
      sample: 'bg-primary-50',
    },
    {
      name: 'destructive',
      desc: 'Destructive Tint (Nền cảnh báo/nguy hiểm)',
      sample: 'bg-destructive/10',
    },
    {
      name: 'transparent',
      desc: 'Transparent (Trong suốt, giữ khung layout)',
      sample: 'bg-transparent',
    },
  ];

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Surface (Elevated Div)" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">
          Surface (Div Nâng cao & Phân tầng nền)
        </h1>
        <p className="text-body-1-rg text-muted-foreground">
          Component khung chứa nền tảng thay thế thẻ <code>&lt;div&gt;</code>,
          tự động phân cấp chiều sâu (Level Hierarchy), tương thích tuyệt đối
          Light/Dark Mode và hỗ trợ đầy đủ Border, Shadow, Radius.
        </p>
      </div>

      {/* ── 1. Layer Levels Showcase ── */}
      <CodePreview
        title="1. Các tầng phân cấp màu nền (Layer Levels)"
        description="Quản lý màu sắc nền tự động theo cấp bậc giao diện mà không cần viết class màu thủ công."
        code={levelsUsageCode}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((item) => (
            <Surface
              key={item.name}
              level={item.name}
              border="default"
              padding="md"
              radius="xl"
              className="flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-title-3 font-bold uppercase">
                    {item.name}
                  </span>
                  <span className="text-caption-2-rg text-muted-foreground font-mono">
                    {item.sample}
                  </span>
                </div>
                <p className="text-body-2-rg text-muted-foreground mt-1.5">
                  {item.desc}
                </p>
              </div>
              <div className="text-caption-1-sb opacity-70">
                level="{item.name}"
              </div>
            </Surface>
          ))}
        </div>
      </CodePreview>

      {/* ── 2. Nested Layers in Action ── */}
      <CodePreview
        title="2. Ứng dụng thực tế: Lồng ghép đa tầng (Nested Layers Dashboard Card)"
        description="Kết hợp các tầng Card -> Subtle Section -> Inset Area để tạo chiều sâu thị giác tự nhiên."
        code={nestedLayersCode}
      >
        <Surface
          level="card"
          border="default"
          shadow="xs"
          padding="lg"
          radius="2xl"
          className="max-w-2xl space-y-4"
        >
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldSecurity size={20} variant="Bold" />
              </div>
              <div>
                <h3 className="text-title-2 font-bold text-foreground">
                  Hồ sơ bảo mật API
                </h3>
                <p className="text-caption-1-rg text-muted-foreground">
                  Cấp quyền truy cập hệ thống đám mây
                </p>
              </div>
            </div>
            <Button size="small">Làm mới Key</Button>
          </div>

          {/* Level 2: Subtle Section */}
          <Surface
            level="subtle"
            border="subtle"
            padding="md"
            radius="xl"
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-body-2-sb text-foreground font-semibold">
                Khóa bí mật (Secret Token)
              </span>
              <span className="inline-flex items-center gap-1 text-caption-1-sb text-emerald-600 dark:text-emerald-400">
                <TickCircle size={14} variant="Bold" /> Đang hoạt động
              </span>
            </div>

            {/* Level 3: Inset Area */}
            <Surface
              level="inset"
              border="dashed"
              padding="sm"
              radius="lg"
              className="flex items-center justify-between"
            >
              <code className="text-caption-1-rg font-mono text-foreground select-all">
                exampleKey@thanh.hb
              </code>
              <button
                type="button"
                onClick={() => toast.success('Đã sao chép khóa API!')}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                aria-label="Sao chép"
              >
                <DocumentCopy size={16} />
              </button>
            </Surface>
          </Surface>
        </Surface>
      </CodePreview>

      {/* ── 3. Interactive & Selectable Cards ── */}
      <CodePreview
        title="3. Thẻ tương tác & Trạng thái đang chọn (Interactive & Selected)"
        description="Khi bật interactive={true}, component tự động thêm hiệu ứng hover nâng bề mặt và đổi viền. Khi selected={true}, viền đổi sang màu primary."
        code={interactiveUsageCode}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Surface
            interactive
            level="card"
            selected={selectedCard === 'starter'}
            onClick={() => setSelectedCard('starter')}
            padding="lg"
            radius="2xl"
            className="flex flex-col justify-between space-y-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-title-2 font-bold text-foreground">
                  Starter
                </span>
                {selectedCard === 'starter' && (
                  <TickCircle
                    size={18}
                    variant="Bold"
                    className="text-primary"
                  />
                )}
              </div>
              <p className="text-body-2-rg text-muted-foreground">
                Dành cho dự án cá nhân và thử nghiệm tính năng.
              </p>
            </div>
            <div className="text-title-1 font-bold text-foreground">
              0 ₫{' '}
              <span className="text-caption-1-rg text-muted-foreground font-normal">
                /tháng
              </span>
            </div>
          </Surface>

          <Surface
            interactive
            level="card"
            selected={selectedCard === 'pro'}
            onClick={() => setSelectedCard('pro')}
            padding="lg"
            radius="2xl"
            className="flex flex-col justify-between space-y-4 relative"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-title-2 font-bold text-foreground">
                  Professional
                </span>
                {selectedCard === 'pro' && (
                  <TickCircle
                    size={18}
                    variant="Bold"
                    className="text-primary"
                  />
                )}
              </div>
              <p className="text-body-2-rg text-muted-foreground">
                Dành cho đội ngũ phát triển và doanh nghiệp vừa.
              </p>
            </div>
            <div className="text-title-1 font-bold text-primary">
              299.000 ₫{' '}
              <span className="text-caption-1-rg text-muted-foreground font-normal">
                /tháng
              </span>
            </div>
          </Surface>

          <Surface
            interactive
            level="card"
            selected={selectedCard === 'enterprise'}
            onClick={() => setSelectedCard('enterprise')}
            padding="lg"
            radius="2xl"
            className="flex flex-col justify-between space-y-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-title-2 font-bold text-foreground">
                  Enterprise
                </span>
                {selectedCard === 'enterprise' && (
                  <TickCircle
                    size={18}
                    variant="Bold"
                    className="text-primary"
                  />
                )}
              </div>
              <p className="text-body-2-rg text-muted-foreground">
                Tùy biến bảo mật và hỗ trợ kỹ thuật 24/7.
              </p>
            </div>
            <div className="text-title-1 font-bold text-foreground">
              Liên hệ
            </div>
          </Surface>
        </div>
      </CodePreview>

      {/* ── 4. Borders, Shadows & Radius Matrix ── */}
      <CodePreview
        title="4. Tùy biến Viền (Borders), Đổ bóng (Shadows) & Bo góc (Radius)"
        description="Ma trận các tùy chọn cấu hình linh hoạt cho mọi yêu cầu thiết kế."
        code={`<Surface border="default" shadow="sm" radius="xl" padding="md">
  Surface with custom border, shadow, and radius
</Surface>`}
      >
        <div className="space-y-6">
          {/* Border types */}
          <div className="space-y-2">
            <h4 className="text-body-1-sb text-foreground">
              Kiểu viền (border)
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {(
                [
                  'none',
                  'default',
                  'subtle',
                  'dashed',
                  'primary',
                  'destructive',
                ] as SurfaceBorder[]
              ).map((b) => (
                <Surface
                  key={b}
                  border={b}
                  padding="sm"
                  radius="lg"
                  className="text-center"
                >
                  <span className="text-caption-1-sb font-mono">{b}</span>
                </Surface>
              ))}
            </div>
          </div>

          {/* Shadows */}
          <div className="space-y-2">
            <h4 className="text-body-1-sb text-foreground">
              Độ đổ bóng (shadow)
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {(['none', '2xs', 'xs', 'sm', 'md', 'lg'] as SurfaceShadow[]).map(
                (s) => (
                  <Surface
                    key={s}
                    shadow={s}
                    border="default"
                    padding="sm"
                    radius="lg"
                    className="text-center"
                  >
                    <span className="text-caption-1-sb font-mono">{s}</span>
                  </Surface>
                ),
              )}
            </div>
          </div>

          {/* Radius */}
          <div className="space-y-2">
            <h4 className="text-body-1-sb text-foreground">Bo góc (radius)</h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {(['none', 'sm', 'md', 'lg', 'xl', '2xl'] as SurfaceRadius[]).map(
                (r) => (
                  <Surface
                    key={r}
                    radius={r}
                    border="default"
                    padding="sm"
                    className="text-center"
                  >
                    <span className="text-caption-1-sb font-mono">{r}</span>
                  </Surface>
                ),
              )}
            </div>
          </div>
        </div>
      </CodePreview>

      {/* ── 5. Polymorphic Tags ── */}
      <CodePreview
        title="5. Thẻ HTML ngữ nghĩa linh hoạt (Polymorphic 'as' Prop)"
        description="Render ra bất kỳ thẻ HTML ngữ nghĩa nào (section, article, aside, main, header, footer) mà vẫn giữ nguyên tính năng Surface."
        code={polymorphicUsageCode}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Surface
            as="section"
            level="card"
            border="default"
            padding="md"
            radius="xl"
          >
            <span className="text-caption-1-sb font-mono text-primary">
              &lt;section&gt;
            </span>
            <p className="text-body-2-rg text-muted-foreground mt-1">
              Dùng cho các khối nội dung phân mục chính của trang web.
            </p>
          </Surface>

          <Surface
            as="article"
            level="subtle"
            border="subtle"
            padding="md"
            radius="xl"
          >
            <span className="text-caption-1-sb font-mono text-primary">
              &lt;article&gt;
            </span>
            <p className="text-body-2-rg text-muted-foreground mt-1">
              Dùng cho bài viết, tin tức hoặc thẻ độc lập có thể phân phối.
            </p>
          </Surface>

          <Surface
            as="aside"
            level="card"
            border="dashed"
            padding="md"
            radius="xl"
          >
            <span className="text-caption-1-sb font-mono text-primary">
              &lt;aside&gt;
            </span>
            <p className="text-body-2-rg text-muted-foreground mt-1">
              Dùng cho khung thông tin phụ, mẹo vặt hoặc thanh bên lề.
            </p>
          </Surface>
        </div>
      </CodePreview>
    </div>
  );
};

export default SurfaceDevPage;
