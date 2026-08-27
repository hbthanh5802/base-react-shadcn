import { Eye } from 'iconsax-react';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import {
  DataTable,
  TanstackTable,
  TanstackTableBody,
  TanstackTableCell,
  TanstackTableHead,
  TanstackTableHeader,
  TanstackTableRow,
} from '@/shared/components/ui/tanstack-table';
import { cn } from '@/shared/lib/utils';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef } from '@tanstack/react-table';

interface SimpleRow {
  id: string;
  code: string;
  name: string;
  unit: string;
  note: string;
}

interface TBKTMember {
  id: string;
  loai: string;
  ten: string;
  vaiTro: string;
  trangThai: 'Đã chọn' | 'Chờ xác nhận';
}

interface TBKTParent {
  id: string;
  loai: string;
  ten: string;
  vaiTro: string;
  phamVi: string;
  trangThai: 'Đã chọn' | 'Chờ xác nhận';
  members: TBKTMember[];
}

const SIMPLE_DATA: SimpleRow[] = [
  {
    id: '1',
    code: 'HS-001',
    name: 'Nguyễn Văn An',
    unit: 'Phòng Quản lý chất lượng',
    note: 'Phụ trách thẩm định hồ sơ kỹ thuật.',
  },
  {
    id: '2',
    code: 'HS-002',
    name: 'Trần Thị Bình',
    unit: 'Cục Kỹ thuật',
    note: 'Theo dõi tiến độ và phối hợp các đơn vị.',
  },
];

const SIMPLE_COLUMNS: ColumnDef<SimpleRow, unknown>[] = [
  { accessorKey: 'code', header: 'Mã' },
  { accessorKey: 'name', header: 'Họ tên' },
  { accessorKey: 'unit', header: 'Đơn vị' },
];

const PARENT_DATA: TBKTParent[] = [
  {
    id: '1',
    loai: 'TBKT',
    ten: 'TBKT đánh giá radar XYZ',
    vaiTro: 'TBKT của hồ sơ',
    phamVi: 'Giai đoạn Hội đồng/TBKT',
    trangThai: 'Đã chọn',
    members: [
      {
        id: '1-1',
        loai: 'Thành viên TBKT',
        ten: 'Nguyễn Văn A',
        vaiTro: 'Chủ tịch - Kết luận chuyên gia',
        trangThai: 'Đã chọn',
      },
      {
        id: '1-2',
        loai: 'Thành viên TBKT',
        ten: 'Trần Thị Bình',
        vaiTro: 'Thư ký - Tổng hợp ý kiến và biên bản',
        trangThai: 'Chờ xác nhận',
      },
    ],
  },
  {
    id: '2',
    loai: 'TBKT',
    ten: 'Phòng QLCL',
    vaiTro: 'TBKT của hồ sơ',
    phamVi: 'Giai đoạn Hội đồng/TBKT',
    trangThai: 'Chờ xác nhận',
    members: [],
  },
];

const PARENT_COLUMNS: ColumnDef<TBKTParent, unknown>[] = [
  { accessorKey: 'loai', header: 'Loại' },
  { accessorKey: 'ten', header: 'Tên' },
  { accessorKey: 'vaiTro', header: 'Vai trò' },
  { accessorKey: 'phamVi', header: 'Phạm vi' },
  { accessorKey: 'trangThai', header: 'Trạng thái' },
];

function MemberStatus({ status }: { status: TBKTMember['trangThai'] }) {
  return (
    <span
      className={
        status === 'Đã chọn'
          ? 'rounded-full bg-success-50 px-2 py-0.5 text-success-700'
          : 'rounded-full bg-warning-50 px-2 py-0.5 text-warning-700'
      }
    >
      {status}
    </span>
  );
}

const meta: Meta<typeof TanstackTable> = {
  title: 'UI/Tanstack Table',
  component: TanstackTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TanstackTable>;

export const Basic: Story = {
  render: () => (
    <div className="p-4">
      <TanstackTable>
        <TanstackTableHeader>
          <TanstackTableRow>
            <TanstackTableHead>Name</TanstackTableHead>
            <TanstackTableHead>Email</TanstackTableHead>
          </TanstackTableRow>
        </TanstackTableHeader>
        <TanstackTableBody>
          <TanstackTableRow>
            <TanstackTableCell>Jane</TanstackTableCell>
            <TanstackTableCell>jane@example.com</TanstackTableCell>
          </TanstackTableRow>
          <TanstackTableRow>
            <TanstackTableCell>John</TanstackTableCell>
            <TanstackTableCell>john@example.com</TanstackTableCell>
          </TanstackTableRow>
        </TanstackTableBody>
      </TanstackTable>
    </div>
  ),
};

export const ExpandableRowSimple: Story = {
  name: 'Expandable Row (simple panel)',
  render: () => (
    <div className="p-4">
      <DataTable
        columns={SIMPLE_COLUMNS}
        data={SIMPLE_DATA}
        pageCount={1}
        total={SIMPLE_DATA.length}
        manualPagination={false}
        manualSorting={false}
        manualFiltering={false}
        renderSubRow={(row) => (
          <div className="grid grid-cols-3 gap-4 px-6 py-4 text-body-2-rg">
            <div>
              <span className="text-muted-foreground">Mã:</span> {row.code}
            </div>
            <div>
              <span className="text-muted-foreground">Đơn vị:</span> {row.unit}
            </div>
            <div>
              <span className="text-muted-foreground">Ghi chú:</span> {row.note}
            </div>
          </div>
        )}
      />
    </div>
  ),
};

interface StickyRow {
  id: string;
  code: string;
  name: string;
  unit: string;
  department: string;
  status: 'Đang xử lý' | 'Chờ phê duyệt' | 'Hoàn thành';
  assignee: string;
  deadline: string;
  priority: 'Cao' | 'Trung bình' | 'Thấp';
}

const STICKY_DATA: StickyRow[] = Array.from({ length: 30 }, (_, i) => {
  const n = i + 1;
  const statuses: StickyRow['status'][] = ['Đang xử lý', 'Chờ phê duyệt', 'Hoàn thành'];
  const priorities: StickyRow['priority'][] = ['Cao', 'Trung bình', 'Thấp'];
  return {
    id: String(n),
    code: `HS-2024-${String(n).padStart(3, '0')}`,
    name: `Thẩm định hồ sơ kỹ thuật số ${n}`,
    unit: ['Cục Kỹ thuật', 'Viện NCKH', 'Cục Hậu cần'][i % 3],
    department: ['Phòng KTCL', 'Phòng Nghiên cứu', 'Phòng Hậu cần'][i % 3],
    status: statuses[i % statuses.length],
    assignee: ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Minh Châu'][i % 3],
    deadline: `${String((i % 28) + 1).padStart(2, '0')}/06/2026`,
    priority: priorities[i % priorities.length],
  };
});

const STATUS_BADGE: Record<StickyRow['status'], string> = {
  'Đang xử lý': 'bg-primary-50 text-primary-700 border-primary-200',
  'Chờ phê duyệt': 'bg-warning-50 text-warning-700 border-warning-200',
  'Hoàn thành': 'bg-success-50 text-success-700 border-success-200',
};

const STICKY_COLUMNS: ColumnDef<StickyRow, unknown>[] = [
  { accessorKey: 'code', header: 'Mã hồ sơ', size: 130 },
  { accessorKey: 'name', header: 'Tên hồ sơ', size: 240 },
  { accessorKey: 'unit', header: 'Đơn vị', size: 160 },
  { accessorKey: 'department', header: 'Phòng ban', size: 160 },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 140,
    cell: ({ row }) => (
      <span
        className={cn(
          'inline-flex rounded-full border px-2 py-0.5 text-body-3-sb',
          STATUS_BADGE[row.original.status],
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  { accessorKey: 'assignee', header: 'Người xử lý', size: 160 },
  { accessorKey: 'deadline', header: 'Hạn xử lý', size: 120 },
  { accessorKey: 'priority', header: 'Ưu tiên', size: 120 },
  {
    id: 'actions',
    header: 'Thao tác',
    enableColumnFilter: false,
    size: 110,
    cell: ({ row }) => (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Xem ${row.original.code}`}
        className="h-8 w-8 text-muted-foreground"
      >
        <Icon icon={Eye} size={16} />
      </Button>
    ),
  },
];

export const StickyColumns: Story = {
  name: 'Sticky first & last columns',
  render: () => (
    <div className="p-4">
      <p className="mb-3 text-body-2-rg text-muted-foreground">
        Kéo ngang để thấy cột <strong>Mã hồ sơ</strong> ghim trái và cột <strong>Thao tác</strong>{' '}
        ghim phải. Header ghim trên cùng khi kéo dọc.
      </p>
      <DataTable
        columns={STICKY_COLUMNS}
        data={STICKY_DATA}
        pageCount={1}
        total={STICKY_DATA.length}
        manualPagination={false}
        manualSorting={false}
        manualFiltering={false}
        enablePagination={false}
        stickyHeader
        stickyFirstColumn
        stickyLastColumn
        maxHeight={360}
      />
    </div>
  ),
};

export const StickyFirstColumnOnly: Story = {
  name: 'Sticky first column only',
  render: () => (
    <div className="p-4">
      <DataTable
        columns={STICKY_COLUMNS}
        data={STICKY_DATA.slice(0, 10)}
        pageCount={1}
        total={10}
        manualPagination={false}
        manualSorting={false}
        manualFiltering={false}
        enablePagination={false}
        stickyFirstColumn
      />
    </div>
  ),
};

export const StickyLastColumnOnly: Story = {
  name: 'Sticky last column only',
  render: () => (
    <div className="p-4">
      <DataTable
        columns={STICKY_COLUMNS}
        data={STICKY_DATA.slice(0, 10)}
        pageCount={1}
        total={10}
        manualPagination={false}
        manualSorting={false}
        manualFiltering={false}
        enablePagination={false}
        stickyLastColumn
      />
    </div>
  ),
};

export const ExpandableRowWithSubTable: Story = {
  name: 'Expandable Row (nested table)',
  render: () => (
    <div className="p-4">
      <DataTable
        columns={PARENT_COLUMNS}
        data={PARENT_DATA}
        pageCount={1}
        total={PARENT_DATA.length}
        manualPagination={false}
        manualSorting={false}
        manualFiltering={false}
        renderSubRow={(row) => (
          <div className="px-4 py-3">
            {row.members.length === 0 ? (
              <p className="text-body-2-rg text-muted-foreground">Chưa có thành viên.</p>
            ) : (
              <TanstackTable>
                <TanstackTableHeader>
                  <TanstackTableRow>
                    <TanstackTableHead>STT</TanstackTableHead>
                    <TanstackTableHead>Loại</TanstackTableHead>
                    <TanstackTableHead>Tên</TanstackTableHead>
                    <TanstackTableHead>Vai trò</TanstackTableHead>
                    <TanstackTableHead>Trạng thái</TanstackTableHead>
                  </TanstackTableRow>
                </TanstackTableHeader>
                <TanstackTableBody>
                  {row.members.map((member, index) => (
                    <TanstackTableRow key={member.id}>
                      <TanstackTableCell>{index + 1}</TanstackTableCell>
                      <TanstackTableCell>{member.loai}</TanstackTableCell>
                      <TanstackTableCell>{member.ten}</TanstackTableCell>
                      <TanstackTableCell>{member.vaiTro}</TanstackTableCell>
                      <TanstackTableCell>
                        <MemberStatus status={member.trangThai} />
                      </TanstackTableCell>
                    </TanstackTableRow>
                  ))}
                </TanstackTableBody>
              </TanstackTable>
            )}
          </div>
        )}
      />
    </div>
  ),
};
