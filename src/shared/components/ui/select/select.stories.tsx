import { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const SelectDemo = () => {
  const [value, setValue] = useState('draft');
  return (
    <div className="w-72 p-4">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger aria-label="status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="review">In review</SelectItem>
          <SelectItem value="published">Published</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const Basic: Story = {
  render: () => <SelectDemo />,
};
