import { Add, ArrowRight, CloseCircle, Edit2, SearchNormal1, Trash } from 'iconsax-react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { ButtonGlobal } from '@/shared/components/ui/button-global';
import { IconButton } from '@/shared/components/ui/icon-button';

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

      {/* IconButton Component Demo Section */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-3">
          <div>
            <h2 className="text-title-1 font-semibold text-foreground">IconButton Component</h2>
            <p className="text-body-2-rg text-muted-foreground mt-0.5">
              Nút bấm chuyên dụng cho Icon, hỗ trợ hình dạng vuông/tròn và các tone màu.
            </p>
          </div>
        </div>

        {/* 1. IconButton Shapes & Variants */}
        <div className="space-y-3">
          <h3 className="text-title-2 text-foreground">1. Variants & Shapes (Square vs Circle)</h3>
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

        {/* 2. IconButton Tone Colors */}
        <div className="space-y-3 border-t border-border/60 pt-3">
          <h3 className="text-title-2 text-foreground">
            2. Tone Colors (<code className="font-mono text-primary-600">tone</code> prop)
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

        {/* 3. IconButton Sizes & Loading State */}
        <div className="space-y-3 border-t border-border/60 pt-3">
          <h3 className="text-title-2 text-foreground">3. Sizes & Loading State</h3>
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
      </section>

      {/* ButtonGlobal Component Demo Section */}
      <section className="space-y-4 rounded-xl border border-border p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-title-1 font-semibold text-foreground">ButtonGlobal Component</h2>
            <p className="text-body-2-rg text-muted-foreground">
              Hỗ trợ leftIcon, rightIcon, tùy chỉnh tone màu và tự động xử lý trạng thái loading với
              Spinner.
            </p>
          </div>
        </div>

        {/* 1. Left & Right Icons */}
        <div className="space-y-3">
          <h3 className="text-title-2 text-foreground">1. Left & Right Icons</h3>
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

        {/* 2. Custom Tone Color Prop Demo */}
        <div className="space-y-3 border-t border-border/60 pt-2">
          <h3 className="text-title-2 text-foreground">
            2. Custom Tone Colors (<code className="font-mono text-primary-600">tone</code> prop)
          </h3>
          <p className="text-body-2-rg text-muted-foreground">
            Hỗ trợ truyền các tone màu: <code className="font-mono">primary</code>,{' '}
            <code className="font-mono">blue</code>, <code className="font-mono">green</code>,{' '}
            <code className="font-mono">yellow</code>, <code className="font-mono">orange</code>,{' '}
            <code className="font-mono">purple</code>, <code className="font-mono">gray</code>.
          </p>

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

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-body-2-md w-24 text-muted-foreground">Outline:</span>
              <ButtonGlobal variant="outlinePrimary" tone="primary">
                Primary Outline
              </ButtonGlobal>
              <ButtonGlobal variant="outlinePrimary" tone="blue">
                Blue Outline
              </ButtonGlobal>
              <ButtonGlobal variant="outlinePrimary" tone="green">
                Green Outline
              </ButtonGlobal>
              <ButtonGlobal variant="outlinePrimary" tone="yellow">
                Yellow Outline
              </ButtonGlobal>
              <ButtonGlobal variant="outlinePrimary" tone="purple">
                Purple Outline
              </ButtonGlobal>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-body-2-md w-24 text-muted-foreground">Text Only:</span>
              <ButtonGlobal variant="text" tone="primary">
                Primary Text
              </ButtonGlobal>
              <ButtonGlobal variant="text" tone="blue">
                Blue Text
              </ButtonGlobal>
              <ButtonGlobal variant="text" tone="green">
                Green Text
              </ButtonGlobal>
              <ButtonGlobal variant="text" tone="yellow">
                Yellow Text
              </ButtonGlobal>
              <ButtonGlobal variant="text" tone="purple">
                Purple Text
              </ButtonGlobal>
              <ButtonGlobal variant="text" tone="gray">
                Gray Text
              </ButtonGlobal>
            </div>
          </div>
        </div>

        {/* 3. Loading State */}
        <div className="space-y-3 border-t border-border/60 pt-2">
          <h3 className="text-title-2 text-foreground">3. Loading State Demo</h3>
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
            <ButtonGlobal variant="destructive" loading={isLoading}>
              {isLoading ? 'Đang xoá...' : 'Xoá vĩnh viễn'}
            </ButtonGlobal>
          </div>
        </div>

        {/* 4. Sizes & Variants */}
        <div className="space-y-3 border-t border-border/60 pt-2">
          <h3 className="text-title-2 text-foreground">4. Sizes Matrix (Small, Medium, Large)</h3>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonGlobal size="small" leftIcon={<Edit2 size={14} />} loading={isLoading}>
              Small (h-8)
            </ButtonGlobal>
            <ButtonGlobal size="medium" leftIcon={<Edit2 size={16} />} loading={isLoading}>
              Medium (h-9)
            </ButtonGlobal>
            <ButtonGlobal size="large" leftIcon={<Edit2 size={18} />} loading={isLoading}>
              Large (h-10)
            </ButtonGlobal>
          </div>
        </div>
      </section>

      {/* Standard Button Design Sections */}
      <section className="space-y-4">
        <h2 className="text-title-1 text-foreground">Design - Primary Red</h2>
        <div className="flex flex-wrap gap-3 rounded-lg border border-border p-4">
          <Button>Button</Button>
          <Button iconLayout="left">
            <CloseCircle size={16} />
            Button
          </Button>
          <Button iconLayout="right">
            Button
            <CloseCircle size={16} />
          </Button>
          <Button size="icon" aria-label="icon only">
            <CloseCircle size={16} />
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-title-1 text-foreground">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-4">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
          <Button size="icon" aria-label="Add item">
            <Add size={18} />
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-title-1 text-foreground">Design Matrix</h2>
        {states.map((state) => (
          <div key={state.label} className="space-y-3 rounded-lg border border-border p-4">
            <p className="text-title-3 text-foreground">{state.label}</p>
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

                  <div className="inline-flex overflow-hidden rounded-lg border border-primary-600">
                    <Button
                      size={row.size}
                      className="rounded-none border-0"
                      iconLayout="left"
                      {...state.attrs}
                    >
                      <CloseCircle size={row.iconSize} variant="Bold" />
                      Button
                    </Button>
                    <Button
                      size={row.size}
                      className="!gap-0 rounded-none border-0 border-l border-primary-700 px-2"
                      {...state.attrs}
                    >
                      <Add size={row.iconSize} variant="Bold" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
