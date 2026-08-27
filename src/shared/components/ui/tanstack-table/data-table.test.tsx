import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { DataTable } from '@/shared/components/ui/tanstack-table';

import type { ColumnDef } from '@tanstack/react-table';

interface TestRow {
  id: string;
  name: string;
}

const DATA: TestRow[] = [{ id: '1', name: 'Nguyễn Văn An' }];
const COLUMNS: ColumnDef<TestRow, unknown>[] = [
  { accessorKey: 'name', header: 'Họ tên' },
  {
    id: 'actions',
    header: 'Hành động',
    cell: () => (
      <button type="button" aria-label="Xem hồ sơ">
        Xem
      </button>
    ),
  },
];

describe('DataTable expandable rows', () => {
  it('renders no expand control when renderSubRow is omitted', () => {
    render(
      <DataTable
        columns={COLUMNS}
        data={DATA}
        pageCount={1}
        total={DATA.length}
        manualPagination={false}
        manualSorting={false}
        manualFiltering={false}
      />,
    );

    expect(screen.queryByRole('button', { name: 'Mở rộng nội dung dòng' })).not.toBeInTheDocument();
    expect(screen.getByText('Nguyễn Văn An').closest('tr')).not.toHaveClass('cursor-pointer');
  });

  it('expands and collapses custom row content', async () => {
    const user = userEvent.setup();

    render(
      <DataTable
        columns={COLUMNS}
        data={DATA}
        pageCount={1}
        total={DATA.length}
        manualPagination={false}
        manualSorting={false}
        manualFiltering={false}
        renderSubRow={(row) => <div>Chi tiết {row.name}</div>}
      />,
    );

    expect(screen.queryByText('Chi tiết Nguyễn Văn An')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Mở rộng nội dung dòng' }));
    expect(screen.getByText('Chi tiết Nguyễn Văn An')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Thu gọn nội dung dòng' }));
    expect(screen.queryByText('Chi tiết Nguyễn Văn An')).not.toBeInTheDocument();
  });

  it('toggles custom content when clicking the row', async () => {
    const user = userEvent.setup();

    render(
      <DataTable
        columns={COLUMNS}
        data={DATA}
        pageCount={1}
        total={DATA.length}
        manualPagination={false}
        manualSorting={false}
        manualFiltering={false}
        renderSubRow={(row) => <div>Chi tiết {row.name}</div>}
      />,
    );

    const row = screen.getByText('Nguyễn Văn An').closest('tr');
    expect(row).toHaveClass('cursor-pointer');

    await user.click(screen.getByText('Nguyễn Văn An'));
    expect(screen.getByText('Chi tiết Nguyễn Văn An')).toBeInTheDocument();

    await user.click(screen.getByText('Nguyễn Văn An'));
    expect(screen.queryByText('Chi tiết Nguyễn Văn An')).not.toBeInTheDocument();
  });

  it('does not toggle the row when clicking an actions cell', async () => {
    const user = userEvent.setup();

    render(
      <DataTable
        columns={COLUMNS}
        data={DATA}
        pageCount={1}
        total={DATA.length}
        manualPagination={false}
        manualSorting={false}
        manualFiltering={false}
        renderSubRow={(row) => <div>Chi tiết {row.name}</div>}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Xem hồ sơ' }));
    expect(screen.queryByText('Chi tiết Nguyễn Văn An')).not.toBeInTheDocument();
  });
});
