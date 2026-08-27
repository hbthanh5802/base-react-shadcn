import { useState } from 'react';

import { Pagination } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    page: 1,
    totalPages: 10,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const Demo = ({ withPageSize = false, withGoto = false, withTotal = false }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="space-y-3 p-4">
      <div className="rounded-lg border border-neutral-100 bg-neutral-25">
        <Pagination
          page={page}
          totalPages={10}
          totalItems={withTotal ? 80 : undefined}
          onPageChange={setPage}
          showPageSize={withPageSize}
          showGotoPage={withGoto}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      </div>
      <p className="text-body-2-rg text-muted-foreground">
        Page: {page} {withPageSize ? `| Size: ${pageSize}` : ''}
      </p>
    </div>
  );
};

export const Basic: Story = {
  render: () => <Demo />,
};

export const WithTotalCount: Story = {
  name: 'With Total Count',
  render: () => <Demo withTotal />,
};

export const WithPageSize: Story = {
  name: 'With Page Size',
  render: () => <Demo withPageSize withTotal />,
};

export const Full: Story = {
  name: 'Full (Page size + Goto)',
  render: () => <Demo withPageSize withGoto withTotal />,
};
