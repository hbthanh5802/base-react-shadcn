import { SearchNormal1, DocumentText } from 'iconsax-react';

import { Button } from '@/shared/components/ui/button';

import { EmptyState } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof EmptyState> = {
  title: 'UI/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    title: 'Không tìm thấy kết quả',
    description: 'Thử thay đổi từ khoá hoặc bộ lọc để tìm kết quả phù hợp hơn.',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: () => (
    <div className="rounded-xl border border-dashed border-neutral-200 p-4">
      <EmptyState
        icon={<SearchNormal1 size={24} variant="Linear" />}
        title="Không tìm thấy kết quả"
        description="Thử thay đổi từ khoá hoặc bộ lọc để tìm kết quả phù hợp hơn."
        primaryAction={<Button size="small">Xoá bộ lọc</Button>}
      />
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="rounded-xl border border-dashed border-neutral-200 p-4">
      <EmptyState
        icon={<DocumentText size={24} variant="Linear" />}
        title="Chưa có dữ liệu"
        description="Bắt đầu bằng cách tạo hồ sơ đầu tiên của bạn."
        primaryAction={<Button size="small">Tạo mới</Button>}
        secondaryAction={
          <Button size="small" variant="outline">
            Nhập từ file
          </Button>
        }
      />
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="rounded-lg border border-dashed border-neutral-200 p-4">
      <EmptyState
        variant="compact"
        icon={<SearchNormal1 size={18} variant="Linear" />}
        title="Không có kết quả"
        description="Thử thay đổi bộ lọc."
        primaryAction={<Button size="small">Xoá bộ lọc</Button>}
      />
    </div>
  ),
};
