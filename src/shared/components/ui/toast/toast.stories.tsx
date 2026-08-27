import { Button } from '@/shared/components/ui/button';

import { Toast } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    title: 'Thông báo',
    description: 'Đây là nội dung thông báo.',
    variant: 'info',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3 p-4">
      <Toast variant="info" title="Thông tin" description="Dữ liệu đã được cập nhật thành công." />
      <Toast variant="success" title="Thành công" description="Thành công xác nhận hồ sơ." />
      <Toast
        variant="warning"
        title="Cảnh báo"
        description="Có thể có vấn đề với dữ liệu bạn nhập."
      />
      <Toast
        variant="error"
        title="Lỗi"
        description="Lỗi trong quá trình xử lý. Vui lòng thử lại."
      />
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3 p-4">
      <Toast
        variant="success"
        title="Lưu thành công"
        description="Hồ sơ đã được lưu vào hệ thống."
        action={
          <Button size="small" variant="outline">
            Xem chi tiết
          </Button>
        }
        onDismiss={() => {}}
      />
      <Toast
        variant="error"
        title="Tải thất bại"
        description="Không thể tải tệp. Kiểm tra kết nối và thử lại."
        action={
          <Button size="small" variant="outline">
            Thử lại
          </Button>
        }
        onDismiss={() => {}}
      />
    </div>
  ),
};
