import { Add, Edit2, Trash } from 'iconsax-react';

import { Icon } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Icon> = {
  title: 'UI/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    icon: Add,
    size: 20,
    variant: 'Linear',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Basic: Story = {};

export const Gallery: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <Icon icon={Add} />
      <Icon icon={Edit2} />
      <Icon icon={Trash} />
    </div>
  ),
};
