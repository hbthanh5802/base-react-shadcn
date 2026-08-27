import { DatePickerPanel } from './date-picker-panel';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DatePickerPanel> = {
  title: 'UI/DatePicker',
  component: DatePickerPanel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePickerPanel>;

export const Day: Story = {
  args: {
    mode: 'day',
    value: new Date(2024, 6, 14),
  },
};

export const DayRange: Story = {
  args: {
    mode: 'dayRange',
    rangeValue: {
      from: new Date(2024, 6, 14),
      to: new Date(2024, 6, 20),
    },
  },
};

export const Month: Story = {
  args: {
    mode: 'month',
    value: new Date(2024, 7, 1),
  },
};

export const Quarter: Story = {
  args: {
    mode: 'quarter',
    value: new Date(2024, 0, 1),
  },
};

export const Year: Story = {
  args: {
    mode: 'year',
    value: new Date(2023, 0, 1),
  },
};

export const DayRangeDual: Story = {
  args: {
    mode: 'dayRangeDual',
    rangeValue: {
      from: new Date(2024, 6, 14),
      to: new Date(2024, 7, 5),
    },
  },
};
