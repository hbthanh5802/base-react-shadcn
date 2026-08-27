import { Switch } from '@/shared/components/ui/switch';

import { TextField } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TextField> = {
  title: 'UI/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    required: true,
    supportingText: 'Supporting text',
    placeholder: 'Select date',
    showCalendarIcon: true,
    size: 'large',
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
    errorText: 'Error text',
    supportingText: 'Supporting text',
    defaultValue: 'Select date',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Select date',
  },
};

export const WithTags: Story = {
  args: {
    size: 'medium',
    tags: [
      { id: '1', label: 'Tag 1', tone: 'blue' },
      { id: '2', label: 'Tag 2', tone: 'green' },
      { id: '3', label: 'Tag 3', tone: 'rose' },
    ],
    defaultValue: 'Select date',
  },
};

export const WithSwitch: Story = {
  args: {
    labelSwitch: <Switch aria-label="toggle field" defaultChecked />,
    switchPosition: 'right',
  },
};

export const DateRange: Story = {
  args: {
    variant: 'dateRange',
    startPlaceholder: 'Start date',
    endPlaceholder: 'End date',
  },
};

export const Note: Story = {
  args: {
    size: 'note',
    placeholder: 'Select date',
  },
};

export const ViewMode: Story = {
  args: {
    mode: 'view',
    size: 'medium',
    tags: [
      { id: '1', label: 'Tag 1', tone: 'blue' },
      { id: '2', label: 'Tag 2', tone: 'green' },
      { id: '3', label: 'Tag 3', tone: 'rose' },
    ],
  },
};
