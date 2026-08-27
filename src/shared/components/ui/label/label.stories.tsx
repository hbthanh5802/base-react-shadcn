import { Checkbox } from '@/shared/components/ui/checkbox';

import { Label } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-2 p-4">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};
