import { Input } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Type here...',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Basic: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};
