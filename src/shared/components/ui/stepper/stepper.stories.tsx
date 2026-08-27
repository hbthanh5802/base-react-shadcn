import { Stepper } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Stepper> = {
  title: 'UI/Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
  { label: 'Nhập thông tin', description: 'Điền form hồ sơ' },
  { label: 'Xác nhận', description: 'Kiểm tra dữ liệu' },
  { label: 'Hoàn thành', description: 'Lưu và gửi' },
];

export const HorizontalStates: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      {[0, 1, 2, 3].map((step) => (
        <div key={step} className="space-y-1">
          <p className="text-body-3-sb text-neutral-600">currentStep = {step}</p>
          <Stepper steps={steps} currentStep={step} />
        </div>
      ))}
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex gap-12 p-4">
      <Stepper steps={steps} currentStep={0} orientation="vertical" />
      <Stepper steps={steps} currentStep={1} orientation="vertical" />
      <Stepper steps={steps} currentStep={3} orientation="vertical" />
    </div>
  ),
};
