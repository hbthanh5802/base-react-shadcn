import { Add, CloseCircle } from 'iconsax-react';

import { Button } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'default',
    size: 'large',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="icon" aria-label="Add item">
        <Add size={18} />
      </Button>
    </div>
  ),
};

export const IconLayouts: Story = {
  render: () => (
    <div className="space-y-3 p-4">
      <div className="flex flex-wrap gap-3">
        <Button size="large" iconLayout="left">
          <CloseCircle size={16} />
          Button
        </Button>
        <Button size="large" iconLayout="right">
          Button
          <CloseCircle size={16} />
        </Button>
        <Button size="large">Button</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button size="medium" iconLayout="left">
          <CloseCircle size={16} />
          Button
        </Button>
        <Button size="medium" iconLayout="right">
          Button
          <CloseCircle size={16} />
        </Button>
        <Button size="medium">Button</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button size="small" iconLayout="left">
          <CloseCircle size={14} />
          Button
        </Button>
        <Button size="small" iconLayout="right">
          Button
          <CloseCircle size={14} />
        </Button>
        <Button size="small">Button</Button>
      </div>
    </div>
  ),
};

const sizeOptions = [
  { label: 'Large', value: 'large' as const, iconSize: 16 },
  { label: 'Medium', value: 'medium' as const, iconSize: 16 },
  { label: 'Small', value: 'small' as const, iconSize: 14 },
];

const stateOptions: { label: string; attrs: Record<string, string | boolean> }[] = [
  { label: 'Default', attrs: {} },
  { label: 'Hover', attrs: { 'data-ui-hover': 'true' } },
  { label: 'Pressed', attrs: { 'data-ui-pressed': 'true' } },
  { label: 'Focus', attrs: { 'data-ui-focus': 'true' } },
  { label: 'Disable', attrs: { disabled: true } },
];

const renderCell = ({
  size,
  iconSize,
  attrs,
  layout,
}: {
  size: 'large' | 'medium' | 'small';
  iconSize: number;
  attrs: Record<string, string | boolean>;
  layout: 'left' | 'right' | 'none' | 'icon-only' | 'split';
}) => {
  if (layout === 'icon-only') {
    return (
      <Button size="icon" aria-label="icon only" {...attrs}>
        <CloseCircle size={16} variant="Bold" />
      </Button>
    );
  }

  if (layout === 'split') {
    return (
      <div className="inline-flex overflow-hidden rounded-lg border border-primary-600">
        <Button size={size} className="rounded-none border-0" iconLayout="left" {...attrs}>
          <CloseCircle size={iconSize} variant="Bold" />
          Button
        </Button>
        <Button
          size={size}
          className="!gap-0 rounded-none border-0 border-l border-primary-700 px-2"
          {...attrs}
        >
          <Add size={iconSize} variant="Bold" />
        </Button>
      </div>
    );
  }

  if (layout === 'left') {
    return (
      <Button size={size} iconLayout="left" {...attrs}>
        <CloseCircle size={iconSize} variant="Bold" />
        Button
      </Button>
    );
  }

  if (layout === 'right') {
    return (
      <Button size={size} iconLayout="right" {...attrs}>
        Button
        <CloseCircle size={iconSize} variant="Bold" />
      </Button>
    );
  }

  return (
    <Button size={size} {...attrs}>
      Button
    </Button>
  );
};

export const DesignMatrix: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <h3 className="text-title-2 text-neutral-1000">Button design matrix</h3>
      {stateOptions.map((state) => (
        <div key={state.label} className="space-y-3">
          <p className="text-body-1-sb text-neutral-900">{state.label}</p>
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-5">
            {['left', 'right', 'none', 'icon-only', 'split'].map((layout) => (
              <div key={layout} className="space-y-2 rounded-lg border border-neutral-200 p-3">
                <p className="text-body-2-md text-neutral-700">
                  {layout === 'left'
                    ? 'Button + icon left'
                    : layout === 'right'
                      ? 'Button + icon right'
                      : layout === 'none'
                        ? 'No icon'
                        : layout === 'icon-only'
                          ? 'Icon only'
                          : 'Split button'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <div key={size.label} className="flex flex-col gap-1">
                      <span className="text-[11px] text-neutral-600">{size.label}</span>
                      {renderCell({
                        size: size.value,
                        iconSize: size.iconSize,
                        attrs: state.attrs,
                        layout: layout as 'left' | 'right' | 'none' | 'icon-only' | 'split',
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
