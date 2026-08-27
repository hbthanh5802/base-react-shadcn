import { Textarea } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Write your message...',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Textarea disabled',
  },
};
