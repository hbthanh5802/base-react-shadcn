import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4 p-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-1">
          <Avatar size={size}>
            <AvatarFallback>TQ</AvatarFallback>
          </Avatar>
          <span className="text-body-3-rg text-neutral-600">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6 p-4">
      {(['online', 'away', 'busy', 'offline'] as const).map((status) => (
        <div key={status} className="flex flex-col items-center gap-1">
          <Avatar size="md" status={status}>
            <AvatarFallback>TQ</AvatarFallback>
          </Avatar>
          <span className="text-body-3-rg text-neutral-600">{status}</span>
        </div>
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/64" alt="User" />
        <AvatarFallback>TQ</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="/broken.jpg" alt="Broken" />
        <AvatarFallback>TQ</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-8 text-body-3-rg text-neutral-600">{size}</span>
          <AvatarGroup size={size} max={4}>
            {['A', 'B', 'C', 'D', 'E', 'F'].map((l) => (
              <Avatar key={l}>
                <AvatarFallback>{l}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </div>
      ))}
    </div>
  ),
};
