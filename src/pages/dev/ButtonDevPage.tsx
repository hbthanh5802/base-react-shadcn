import { Add, ArrowRight, CloseCircle, Edit2, SearchNormal1, Trash } from 'iconsax-react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { ButtonGlobal } from '@/shared/components/ui/button-global';
import { CodePreview } from '@/shared/components/ui/code-block';
import { IconButton } from '@/shared/components/ui/icon-button';

const iconButtonUsageCode = `import { IconButton } from '@/shared/components/ui/icon-button';
import { Plus, Edit2, Trash } from 'lucide-react';

// 1. Hình vuông (Square - Mặc định)
<IconButton icon={<Plus size={18} />} aria-label="Thêm" />
<IconButton variant="secondPrimary" icon={<Edit2 size={18} />} aria-label="Sửa" />
<IconButton variant="text" icon={<Trash size={18} />} aria-label="Xóa" />

// 2. Hình tròn (Circle)
<IconButton shape="circle" icon={<Plus size={18} />} aria-label="Thêm" />
<IconButton shape="circle" variant="secondPrimary" tone="blue" icon={<Edit2 size={18} />} />

// 3. Kích thước (Sizes) & Loading
<IconButton size="small" icon={<Plus size={14} />} aria-label="Nhỏ" />
<IconButton size="medium" icon={<Plus size={16} />} aria-label="Vừa" />
<IconButton size="large" loading icon={<Plus size={18} />} aria-label="Lớn" />`;

const buttonGlobalUsageCode = `import { ButtonGlobal } from '@/shared/components/ui/button-global';
import { Plus, ArrowRight, Trash } from 'lucide-react';

// 1. Left & Right Icons
<ButtonGlobal leftIcon={<Plus size={20} />}>Thêm mới</ButtonGlobal>
<ButtonGlobal variant="outlinePrimary" rightIcon={<ArrowRight size={18} />}>Tiếp tục</ButtonGlobal>
<ButtonGlobal variant="destructive" leftIcon={<Trash size={18} />}>Xóa bản ghi</ButtonGlobal>

// 2. Tone Colors (Solid, Soft, Outline, Text)
<ButtonGlobal tone="primary">Primary Solid</ButtonGlobal>
<ButtonGlobal variant="secondPrimary" tone="blue">Blue Soft</ButtonGlobal>
<ButtonGlobal variant="outlinePrimary" tone="green">Green Outline</ButtonGlobal>
<ButtonGlobal variant="text" tone="purple">Purple Text</ButtonGlobal>

// 3. Trạng thái Loading
<ButtonGlobal loading>Đang xử lý...</ButtonGlobal>
<ButtonGlobal variant="outlinePrimary" loading loadingText="Đang lưu...">Lưu</ButtonGlobal>`;

const standardButtonUsageCode = `import { Button } from '@/shared/components/ui/button';
import { Mail, Plus } from 'lucide-react';

// 1. Các biến thể cơ bản (Variants)
<Button variant="default">Primary Emerald</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>

// 2. Bố cục Icon (Left / Right / Icon only)
<Button iconLayout="left">
  <Plus className="h-4 w-4" />
  Thêm mới
</Button>
<Button iconLayout="right">
  Gửi
  <Mail className="h-4 w-4" />
</Button>
<Button size="icon" aria-label="Thêm">
  <Plus className="h-4 w-4" />
</Button>

// 3. Kích thước (Sizes)
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`;

export const ButtonDevPage = () => {
  const [isLoading] = useState(false);

  const states = [
    { label: 'Default', attrs: {} },
    { label: 'Hover', attrs: { 'data-ui-hover': 'true' as const } },
    { label: 'Pressed', attrs: { 'data-ui-pressed': 'true' as const } },
    { label: 'Focus', attrs: { 'data-ui-focus': 'true' as const } },
    { label: 'Disable', attrs: { disabled: true } },
  ];

  const sizeRows = [
    { label: 'Large', size: 'large' as const, iconSize: 16 },
    { label: 'Medium', size: 'medium' as const, iconSize: 16 },
    { label: 'Small', size: 'small' as const, iconSize: 14 },
  ];

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Button" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Button & IconButton</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Nút bấm tiêu chuẩn và nút biểu tượng hỗ trợ nhiều biến thể, kích thước, tone màu và trạng thái loading.
        </p>
      </div>

      {/* ── 1. Standard Button ── */}
      <CodePreview
        title="1. Button Tiêu chuẩn (Standard Button)"
        description="Các biến thể màu chính, bố cục Icon trái/phải và kích thước."
        code={standardButtonUsageCode}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default">Primary Emerald</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button iconLayout="left">
              <CloseCircle size={16} />
              Icon Left
            </Button>
            <Button iconLayout="right">
              Icon Right
              <CloseCircle size={16} />
            </Button>
            <Button size="icon" aria-label="icon only">
              <CloseCircle size={16} />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-3">
            <span className="text-body-2-sb text-muted-foreground">Sizes:</span>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
            <Button size="icon" aria-label="Add item">
              <Add size={18} />
            </Button>
          </div>
        </div>
      </CodePreview>

      {/* ── 2. IconButton Component ── */}
      <CodePreview
        title="2. IconButton Component"
        description="Nút bấm chuyên dụng cho Icon, hỗ trợ hình dạng vuông/tròn và các tone màu."
        code={iconButtonUsageCode}
      >
        <div className="space-y-6">
          {/* Shapes */}
          <div className="space-y-3">
            <h3 className="text-title-2 text-foreground">Variants & Shapes (Square vs Circle)</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-body-2-md text-muted-foreground">Square:</span>
                <IconButton icon={<Plus size={18} />} aria-label="Plus" />
                <IconButton variant="secondPrimary" icon={<Edit2 size={18} />} aria-label="Edit" />
                <IconButton
                  variant="outlinePrimary"
                  icon={<SearchNormal1 size={18} />}
                  aria-label="Search"
                />
                <IconButton variant="secondary" icon={<CloseCircle size={18} />} aria-label="Close" />
                <IconButton variant="text" icon={<Trash size={18} />} aria-label="Delete" />
              </div>

              <div className="flex items-center gap-2 border-l border-border pl-4">
                <span className="text-body-2-md text-muted-foreground">Circle:</span>
                <IconButton shape="circle" icon={<Plus size={18} />} aria-label="Add" />
                <IconButton
                  shape="circle"
                  variant="secondPrimary"
                  icon={<Edit2 size={18} />}
                  aria-label="Edit"
                />
                <IconButton
                  shape="circle"
                  variant="outlinePrimary"
                  icon={<SearchNormal1 size={18} />}
                  aria-label="Search"
                />
                <IconButton
                  shape="circle"
                  variant="secondary"
                  icon={<CloseCircle size={18} />}
                  aria-label="Close"
                />
                <IconButton
                  shape="circle"
                  variant="text"
                  icon={<Trash size={18} />}
                  aria-label="Delete"
                />
              </div>
            </div>
          </div>

          {/* Tone Colors */}
          <div className="space-y-3 border-t border-border/60 pt-3">
            <h3 className="text-title-2 text-foreground">
              Tone Colors (<code className="font-mono text-primary">tone</code> prop)
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton tone="primary" icon={<Plus size={18} />} aria-label="Primary" />
              <IconButton tone="blue" icon={<Plus size={18} />} aria-label="Blue" />
              <IconButton tone="green" icon={<Plus size={18} />} aria-label="Green" />
              <IconButton tone="yellow" icon={<Plus size={18} />} aria-label="Yellow" />
              <IconButton tone="orange" icon={<Plus size={18} />} aria-label="Orange" />
              <IconButton tone="purple" icon={<Plus size={18} />} aria-label="Purple" />
              <IconButton tone="gray" icon={<Plus size={18} />} aria-label="Gray" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton
                variant="secondPrimary"
                tone="primary"
                icon={<Plus size={18} />}
                aria-label="Primary"
              />
              <IconButton
                variant="secondPrimary"
                tone="blue"
                icon={<Plus size={18} />}
                aria-label="Blue"
              />
              <IconButton
                variant="secondPrimary"
                tone="green"
                icon={<Plus size={18} />}
                aria-label="Green"
              />
              <IconButton
                variant="secondPrimary"
                tone="yellow"
                icon={<Plus size={18} />}
                aria-label="Yellow"
              />
              <IconButton
                variant="secondPrimary"
                tone="orange"
                icon={<Plus size={18} />}
                aria-label="Orange"
              />
              <IconButton
                variant="secondPrimary"
                tone="purple"
                icon={<Plus size={18} />}
                aria-label="Purple"
              />
            </div>
          </div>

          {/* Sizes & Loading */}
          <div className="space-y-3 border-t border-border/60 pt-3">
            <h3 className="text-title-2 text-foreground">Sizes & Loading State</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-body-2-md text-muted-foreground">Sizes:</span>
                <IconButton size="small" icon={<Plus size={14} />} aria-label="Small" />
                <IconButton size="medium" icon={<Plus size={16} />} aria-label="Medium" />
                <IconButton size="large" icon={<Plus size={18} />} aria-label="Large" />
              </div>

              <div className="flex items-center gap-2 border-l border-border pl-4">
                <span className="text-body-2-md text-muted-foreground">Loading:</span>
                <IconButton
                  loading={isLoading || true}
                  size="small"
                  icon={<Plus size={14} />}
                  aria-label="Loading small"
                />
                <IconButton
                  loading={isLoading || true}
                  size="medium"
                  variant="secondPrimary"
                  tone="blue"
                  icon={<Plus size={16} />}
                  aria-label="Loading medium"
                />
                <IconButton
                  loading={isLoading || true}
                  size="large"
                  variant="outlinePrimary"
                  icon={<Plus size={18} />}
                  aria-label="Loading large"
                />
              </div>
            </div>
          </div>
        </div>
      </CodePreview>

      {/* ── 3. ButtonGlobal Component ── */}
      <CodePreview
        title="3. ButtonGlobal Component"
        description="Hỗ trợ leftIcon, rightIcon, tùy chỉnh tone màu và tự động xử lý trạng thái loading."
        code={buttonGlobalUsageCode}
      >
        <div className="space-y-6">
          {/* Left & Right Icons */}
          <div className="space-y-3">
            <h3 className="text-title-2 text-foreground">Left & Right Icons</h3>
            <div className="flex flex-wrap gap-3">
              <ButtonGlobal leftIcon={<Plus size={20} />}>Thêm mới</ButtonGlobal>
              <ButtonGlobal variant="outlinePrimary" rightIcon={<ArrowRight size={18} />}>
                Tiếp tục
              </ButtonGlobal>
              <ButtonGlobal variant="secondPrimary" leftIcon={<Plus size={18} />}>
                Second Primary
              </ButtonGlobal>
              <ButtonGlobal
                variant="secondary"
                leftIcon={<SearchNormal1 size={18} />}
                rightIcon={<ArrowRight size={18} />}
              >
                Secondary Gray
              </ButtonGlobal>
              <ButtonGlobal variant="destructive" leftIcon={<Trash size={18} />}>
                Xoá bản ghi
              </ButtonGlobal>
            </div>
          </div>

          {/* Tone Colors */}
          <div className="space-y-3 border-t border-border/60 pt-3">
            <h3 className="text-title-2 text-foreground">
              Custom Tone Colors (<code className="font-mono text-primary">tone</code> prop)
            </h3>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-body-2-md w-24 text-muted-foreground">Solid:</span>
                <ButtonGlobal tone="primary">Primary (Default)</ButtonGlobal>
                <ButtonGlobal tone="blue">Blue Tone</ButtonGlobal>
                <ButtonGlobal tone="green">Green Tone</ButtonGlobal>
                <ButtonGlobal tone="yellow">Yellow Tone</ButtonGlobal>
                <ButtonGlobal tone="orange">Orange Tone</ButtonGlobal>
                <ButtonGlobal tone="purple">Purple Tone</ButtonGlobal>
                <ButtonGlobal tone="gray">Gray Tone</ButtonGlobal>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-body-2-md w-24 text-muted-foreground">Soft:</span>
                <ButtonGlobal variant="secondPrimary" tone="primary">
                  Primary Soft
                </ButtonGlobal>
                <ButtonGlobal variant="secondPrimary" tone="blue">
                  Blue Soft
                </ButtonGlobal>
                <ButtonGlobal variant="secondPrimary" tone="green">
                  Green Soft
                </ButtonGlobal>
                <ButtonGlobal variant="secondPrimary" tone="yellow">
                  Yellow Soft
                </ButtonGlobal>
                <ButtonGlobal variant="secondPrimary" tone="orange">
                  Orange Soft
                </ButtonGlobal>
                <ButtonGlobal variant="secondPrimary" tone="purple">
                  Purple Soft
                </ButtonGlobal>
              </div>
            </div>
          </div>

          {/* Loading */}
          <div className="space-y-3 border-t border-border/60 pt-3">
            <h3 className="text-title-2 text-foreground">Loading State</h3>
            <div className="flex flex-wrap gap-3">
              <ButtonGlobal loading={isLoading || true}>Đang xử lý...</ButtonGlobal>
              <ButtonGlobal
                variant="outlinePrimary"
                loading={isLoading || true}
                loadingText="Đang tải dữ liệu..."
              >
                Lưu thay đổi
              </ButtonGlobal>
              <ButtonGlobal variant="secondPrimary" tone="blue" loading={isLoading || true}>
                Đang tải file...
              </ButtonGlobal>
            </div>
          </div>
        </div>
      </CodePreview>

      {/* ── 4. Design States Matrix ── */}
      <section className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">4. Ma trận trạng thái (Design Matrix)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            Bảng ma trận trực quan kiểm tra đầy đủ 5 trạng thái (Default, Hover, Pressed, Focus, Disabled) cho tất cả các biến thể nút bấm.
          </p>
        </div>

        {/* Matrix by Variant & State */}
        <div className="space-y-3 overflow-x-auto">
          <div className="min-w-[840px] space-y-4">
            <div className="grid grid-cols-[160px_repeat(5,1fr)] gap-3 text-center">
              <div />
              <div className="text-caption-1-sb text-muted-foreground">Default</div>
              <div className="text-caption-1-sb text-muted-foreground">Hover</div>
              <div className="text-caption-1-sb text-muted-foreground">Pressed</div>
              <div className="text-caption-1-sb text-muted-foreground">Focus</div>
              <div className="text-caption-1-sb text-muted-foreground">Disabled</div>
            </div>

            {/* Solid Primary */}
            <div className="grid grid-cols-[160px_repeat(5,1fr)] items-center gap-3">
              <span className="text-body-2-sb text-foreground">Solid Primary</span>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="default">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="default" data-ui-hover="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="default" data-ui-pressed="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="default" data-ui-focus="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="default" disabled>Button</Button></div>
            </div>

            {/* Soft Primary */}
            <div className="grid grid-cols-[160px_repeat(5,1fr)] items-center gap-3">
              <span className="text-body-2-sb text-foreground">Soft Primary</span>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="secondPrimary">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="secondPrimary" data-ui-hover="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="secondPrimary" data-ui-pressed="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="secondPrimary" data-ui-focus="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="secondPrimary" disabled>Button</Button></div>
            </div>

            {/* Outline */}
            <div className="grid grid-cols-[160px_repeat(5,1fr)] items-center gap-3">
              <span className="text-body-2-sb text-foreground">Outline</span>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="outline">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="outline" data-ui-hover="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="outline" data-ui-pressed="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="outline" data-ui-focus="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="outline" disabled>Button</Button></div>
            </div>

            {/* Destructive */}
            <div className="grid grid-cols-[160px_repeat(5,1fr)] items-center gap-3">
              <span className="text-body-2-sb text-foreground">Destructive</span>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="destructive">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="destructive" data-ui-hover="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="destructive" data-ui-pressed="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="destructive" data-ui-focus="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="destructive" disabled>Button</Button></div>
            </div>

            {/* Secondary */}
            <div className="grid grid-cols-[160px_repeat(5,1fr)] items-center gap-3">
              <span className="text-body-2-sb text-foreground">Secondary Gray</span>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="secondary">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="secondary" data-ui-hover="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="secondary" data-ui-pressed="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="secondary" data-ui-focus="true">Button</Button></div>
              <div className="flex justify-center p-2 rounded-lg bg-muted/20 border border-border/40"><Button variant="secondary" disabled>Button</Button></div>
            </div>
          </div>
        </div>

        {/* States across sizes & layouts */}
        <div className="space-y-4 border-t border-border pt-4">
          <h3 className="text-title-2 text-foreground">Kích thước & Bố cục Icon theo từng trạng thái</h3>
          <div className="space-y-4">
            {states.map((state) => (
              <div key={state.label} className="space-y-3 rounded-lg border border-border bg-muted/10 p-4">
                <p className="text-title-3 font-medium text-foreground">{state.label}</p>
                <div className="space-y-3">
                  {sizeRows.map((row) => (
                    <div key={row.label} className="flex flex-wrap items-center gap-3">
                      <p className="text-body-2-md w-16 text-muted-foreground">{row.label}</p>

                      <Button size={row.size} iconLayout="left" {...state.attrs}>
                        <CloseCircle size={row.iconSize} variant="Bold" />
                        Button
                      </Button>

                      <Button size={row.size} iconLayout="right" {...state.attrs}>
                        Button
                        <CloseCircle size={row.iconSize} variant="Bold" />
                      </Button>

                      <Button size={row.size} {...state.attrs}>
                        Button
                      </Button>

                      <Button size="icon" aria-label={`${row.label} icon only`} {...state.attrs}>
                        <CloseCircle size={16} variant="Bold" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonDevPage;
