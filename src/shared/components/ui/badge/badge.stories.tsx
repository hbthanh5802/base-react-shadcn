import { Badge } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
    variant: 'light',
    tone: 'brand',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

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

export const DesignGallery: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      {(['filled', 'light', 'outline', 'dot'] as const).map((variant) => (
        <div key={variant} className="space-y-2">
          <p className="text-body-2-sb capitalize text-neutral-700">{variant}</p>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-neutral-200 p-3">
            {tones.map((tone) => (
              <Badge key={tone} variant={variant} tone={tone}>
                {tone}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Badge size="sm" tone="brand">
        Small
      </Badge>
      <Badge size="md" tone="brand">
        Medium
      </Badge>
      <Badge size="lg" tone="brand">
        Large
      </Badge>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 p-4">
      {tones.slice(0, 5).map((tone) => (
        <Badge key={tone} variant="light" tone={tone} onDismiss={() => {}}>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};
