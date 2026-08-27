import { DocumentText, Edit2, Eye, SearchNormal1, Trash } from 'iconsax-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { EmptyState } from '@/shared/components/ui/empty-state';
import { Icon } from '@/shared/components/ui/icon';
import { Pagination } from '@/shared/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
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

import type { ColumnDef } from '@tanstack/react-table';
import type { ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'Đang xử lý' | 'Chờ phê duyệt' | 'Hoàn thành' | 'Từ chối' | 'Mới';
type Priority = 'Cao' | 'Trung bình' | 'Thấp';

interface CaseRow {
  id: string;
  code: string;
  name: string;
  unit: string;
  department: string;
  status: Status;
  deadline: string;
  assignee: string;
  priority: Priority;
}

interface ColDef {
  key: keyof CaseRow;
  title: string;
  sortable?: boolean;
  /** Fixed pixel width for table-fixed layout */
  width: number;
  /** Renders two skeleton bars instead of one */
  multiLine?: boolean;
  renderCell?: (row: CaseRow) => ReactNode;
}

interface SortState {
  key: keyof CaseRow;
  dir: 'asc' | 'desc';
}

interface FilterState {
  search: string;
  status: Status | '';
  priority: Priority | '';
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const NAMES = [
  'Nguyễn Văn An',
  'Trần Thị Bình',
  'Lê Minh Châu',
  'Phạm Đức Dũng',
  'Hoàng Thị Em',
  'Vũ Văn Phong',
  'Đặng Thị Giang',
  'Bùi Văn Hùng',
  'Lý Thị Lan',
  'Ngô Văn Mạnh',
  'Đinh Thị Nga',
  'Tô Văn Oanh',
  'Dương Thị Phúc',
  'Mai Văn Quân',
  'Hồ Thị Rin',
];
const UNITS = [
  'Cục Kỹ thuật',
  'Viện NCKH',
  'Cục Hậu cần',
  'Phòng Kế hoạch',
  'Bộ Tư lệnh',
  'Cục Trang bị',
  'Văn phòng BQP',
  'TCCNQP',
  'HVKTQS',
  'Cục Quân lực',
];
const DEPTS = [
  'Phòng KTCL',
  'Phòng Nghiên cứu',
  'Phòng Hậu cần',
  'Ban Kế hoạch',
  'Văn phòng',
  'Phòng Kỹ thuật',
  'Ban Trang bị',
  'Phòng Quản lý',
  'Ban Tài chính',
  'Phòng Đào tạo',
];
const PREFIXES = [
  'Kiểm định',
  'Thẩm định',
  'Kiểm tra CL',
  'Cấp phép sản xuất',
  'Đánh giá hiệu năng',
  'Phê duyệt tài liệu',
  'Giám sát CL',
  'Nghiên cứu ứng dụng',
  'Đề xuất nâng cấp',
  'Kiểm nghiệm vật tư',
];
const OBJECTS = [
  'VKTB lô',
  'sản phẩm A-',
  'nhiên liệu tên lửa',
  'trang bị bộ binh lô',
  'thiết bị thông tin',
  'hệ thống ĐK hỏa lực',
  'đạn pháo 105mm lô',
  'xe bọc thép M-',
  'linh kiện radar AN/TPS-',
  'thiết bị quang học lô',
];
const STATUSES: Status[] = ['Đang xử lý', 'Chờ phê duyệt', 'Hoàn thành', 'Từ chối', 'Mới'];
const PRIORITIES: Priority[] = ['Cao', 'Trung bình', 'Thấp'];

const FILTER_ALL = '__all__' as const;

function pad(n: number) {
  return String(n).padStart(3, '0');
}
function fmtDate(d: Date) {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}
function addDays(base: Date, n: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

const BASE_DATE = new Date(2024, 0, 15);

const MOCK_CASES: CaseRow[] = Array.from({ length: 50 }, (_, i) => {
  const n = i + 1;
  return {
    id: String(n),
    code: `HS-2024-${pad(n)}`,
    name: `${PREFIXES[i % PREFIXES.length]} ${OBJECTS[i % OBJECTS.length]} ${n}`,
    unit: UNITS[i % UNITS.length],
    department: DEPTS[i % DEPTS.length],
    status: STATUSES[i % STATUSES.length],
    deadline: fmtDate(addDays(BASE_DATE, i * 5)),
    assignee: NAMES[i % NAMES.length],
    priority: PRIORITIES[i % PRIORITIES.length],
  };
});

type TBKTStatus = 'Đã chọn' | 'Chờ xác nhận';

interface TBKTMember {
  id: string;
  loai: string;
  ten: string;
  vaiTro: string;
  trangThai: TBKTStatus;
}

interface TBKTRow {
  id: string;
  stt: number;
  loai: string;
  ten: string;
  vaiTro: string;
  phamVi: string;
  trangThai: TBKTStatus;
  members: TBKTMember[];
}

const TBKT_DATA: TBKTRow[] = [
  {
    id: 'tbkt-01',
    stt: 1,
    loai: 'TBKT',
    ten: 'Ban kiểm tra kỹ thuật số 01',
    vaiTro: 'Chủ trì',
    phamVi: 'Kiểm tra hồ sơ kỹ thuật',
    trangThai: 'Đã chọn',
    members: [
      {
        id: 'tbkt-01-01',
        loai: 'Thành viên TBKT',
        ten: 'Nguyễn Văn An',
        vaiTro: 'Trưởng ban',
        trangThai: 'Đã chọn',
      },
      {
        id: 'tbkt-01-02',
        loai: 'Thành viên TBKT',
        ten: 'Trần Thị Bình',
        vaiTro: 'Thư ký',
        trangThai: 'Chờ xác nhận',
      },
    ],
  },
  {
    id: 'tbkt-02',
    stt: 2,
    loai: 'TBKT',
    ten: 'Ban kiểm tra kỹ thuật số 02',
    vaiTro: 'Phối hợp',
    phamVi: 'Kiểm tra chất lượng thiết bị',
    trangThai: 'Chờ xác nhận',
    members: [
      {
        id: 'tbkt-02-01',
        loai: 'Thành viên TBKT',
        ten: 'Lê Minh Châu',
        vaiTro: 'Thành viên',
        trangThai: 'Đã chọn',
      },
    ],
  },
];

function TBKTStatusBadge({ status }: { status: TBKTStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2 py-0.5 text-body-3-sb',
        status === 'Đã chọn'
          ? 'border-success-200 bg-success-50 text-success-700'
          : 'border-warning-200 bg-warning-50 text-warning-700',
      )}
    >
      {status}
    </span>
  );
}

const TBKT_COLUMNS: ColumnDef<TBKTRow, unknown>[] = [
  { id: 'stt', accessorKey: 'stt', header: 'STT', enableColumnFilter: false, size: 56 },
  { accessorKey: 'loai', header: 'Loại' },
  { accessorKey: 'ten', header: 'Tên' },
  { accessorKey: 'vaiTro', header: 'Vai trò' },
  { accessorKey: 'phamVi', header: 'Phạm vi' },
  {
    accessorKey: 'trangThai',
    header: 'Trạng thái',
    cell: ({ row }) => <TBKTStatusBadge status={row.original.trangThai} />,
  },
  {
    id: 'actions',
    header: 'Hành động',
    enableColumnFilter: false,
    cell: ({ row }) => (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Xem ${row.original.ten}`}
        className="h-8 w-8 text-muted-foreground"
      >
        <Icon icon={Eye} size={16} />
      </Button>
    ),
  },
];

// ─── Cell renderers (module-level — stable references) ────────────────────────

const STATUS_STYLES: Record<Status, string> = {
  'Đang xử lý': 'bg-primary-50  text-primary-700  border-primary-200',
  'Chờ phê duyệt': 'bg-warning-50  text-warning-700  border-warning-200',
  'Hoàn thành': 'bg-success-50  text-success-700  border-success-200',
  'Từ chối': 'bg-error-50    text-error-700    border-error-200',
  Mới: 'bg-blue-100    text-blue-900     border-blue-200',
};
const StatusBadge = ({ status }: { status: Status }) => (
  <span
    className={cn(
      'inline-flex items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-body-3-sb',
      STATUS_STYLES[status],
    )}
  >
    {status}
  </span>
);

const PRIORITY_DOT: Record<Priority, string> = {
  Cao: 'bg-error-500',
  'Trung bình': 'bg-warning-500',
  Thấp: 'bg-success-500',
};
const PriorityDot = ({ priority }: { priority: Priority }) => (
  <span className="flex items-center gap-1.5 text-body-2-rg text-muted-foreground">
    <span className={cn('h-2 w-2 shrink-0 rounded-full', PRIORITY_DOT[priority])} />
    {priority}
  </span>
);

// ─── Column definitions (stable — defined at module scope) ────────────────────

const COL_DEFS: ColDef[] = [
  {
    key: 'name',
    title: 'Tên hồ sơ',
    sortable: true,
    width: 260,
    multiLine: true,
    renderCell: (row) => (
      <div>
        <p className="truncate text-body-2-sb text-foreground">{row.name}</p>
        <p className="text-body-3-rg text-muted-foreground">{row.code}</p>
      </div>
    ),
  },
  {
    key: 'unit',
    title: 'Đơn vị',
    sortable: true,
    width: 170,
    multiLine: true,
    renderCell: (row) => (
      <div>
        <p className="truncate text-body-2-rg text-foreground">{row.unit}</p>
        <p className="text-body-3-rg text-muted-foreground">{row.department}</p>
      </div>
    ),
  },
  {
    key: 'status',
    title: 'Trạng thái',
    sortable: true,
    width: 140,
    renderCell: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'priority',
    title: 'Ưu tiên',
    sortable: true,
    width: 120,
    renderCell: (row) => <PriorityDot priority={row.priority} />,
  },
  { key: 'deadline', title: 'Hạn xử lý', sortable: true, width: 115 },
  { key: 'assignee', title: 'Người xử lý', sortable: true, width: 155 },
];

// Fixed column widths (px)
const W_CHECKBOX = 48;
const W_STT = 52;
const W_ACTIONS = 116;
const TOTAL_COLS = 2 + COL_DEFS.length + 1; // checkbox + STT + data + actions

// ─── Sub-components ───────────────────────────────────────────────────────────

const CircleCheckbox = ({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
}) => {
  function renderIcon() {
    if (indeterminate) return <span className="h-[2px] w-2.5 rounded-full bg-white" />;
    if (checked) {
      return (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
          <path
            d="M1 4L3.5 6.5L9 1"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    return null;
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      onClick={onChange}
      className={cn(
        'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors',
        checked || indeterminate
          ? 'border-primary-600 bg-primary-600'
          : 'border-border bg-background hover:border-primary-400',
      )}
    >
      {renderIcon()}
    </button>
  );
};

const ACTION_DEFS = [
  { icon: Edit2, label: 'Chỉnh sửa', hover: 'hover:bg-accent hover:text-foreground' },
  { icon: Eye, label: 'Xem chi tiết', hover: 'hover:bg-accent hover:text-foreground' },
  { icon: Trash, label: 'Xóa', hover: 'hover:bg-error-50 hover:text-error-600' },
] as const;

const ActionButtons = ({
  onEdit,
  onView,
  onDelete,
}: {
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}) => {
  const fns = [onEdit, onView, onDelete];
  return (
    <div className="flex items-center gap-0.5">
      {ACTION_DEFS.map(({ icon, label, hover }, i) => (
        <Button
          key={label}
          type="button"
          variant="ghost"
          size="icon"
          title={label}
          onClick={fns[i]}
          className={cn('h-8 w-8 text-muted-foreground', hover)}
        >
          <Icon icon={icon} size={20} />
        </Button>
      ))}
    </div>
  );
};

// Skeleton bar
const Sk = ({ w = '65%', h = 'h-3' }: { w?: string; h?: string }) => (
  <div className={cn('animate-pulse rounded-md bg-accent', h)} style={{ width: w }} />
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sortData(rows: CaseRow[], s: SortState | null): CaseRow[] {
  if (!s) return rows;
  return [...rows].sort((a, b) => {
    const av = a[s.key] as string;
    const bv = b[s.key] as string;
    return s.dir === 'asc' ? av.localeCompare(bv, 'vi') : bv.localeCompare(av, 'vi');
  });
}

function renderSkeletonCell(col: ColDef) {
  if (col.multiLine) {
    return (
      <div className="space-y-1.5">
        <Sk w="72%" />
        <Sk w="40%" h="h-2.5" />
      </div>
    );
  }
  return <Sk w="60%" />;
}

function renderDataCell(col: ColDef, row: CaseRow) {
  if (col.renderCell) return col.renderCell(row);
  return <span className="truncate text-body-2-rg text-foreground">{String(row[col.key])}</span>;
}

// ─── Main component ───────────────────────────────────────────────────────────

export const TanstackTableDevPage = () => {
  // ── State ──
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortState | null>(null);
  const [filters, setFilters] = useState<FilterState>({ search: '', status: '', priority: '' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);

  const loadTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isFirstRender = useRef(true);

  // ── Derived data (memoized) ──
  const filteredRows = useMemo(
    () =>
      MOCK_CASES.filter(
        (r) =>
          (!filters.search ||
            r.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            r.code.toLowerCase().includes(filters.search.toLowerCase()) ||
            r.unit.toLowerCase().includes(filters.search.toLowerCase())) &&
          (!filters.status || r.status === filters.status) &&
          (!filters.priority || r.priority === filters.priority),
      ),
    [filters.search, filters.status, filters.priority],
  );

  const sortedRows = useMemo(() => sortData(filteredRows, sort), [filteredRows, sort]);

  const totalPages = Math.max(Math.ceil(sortedRows.length / pageSize), 1);
  const safePage = Math.min(page, totalPages);

  const pageRows = useMemo(
    () => sortedRows.slice((safePage - 1) * pageSize, safePage * pageSize),
    [sortedRows, safePage, pageSize],
  );

  // ── Simulated async loading (skeleton) ──
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsLoading(true);
    clearTimeout(loadTimer.current);
    loadTimer.current = setTimeout(() => setIsLoading(false), 380);
    return () => clearTimeout(loadTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, sort?.key, sort?.dir, filters.search, filters.status, filters.priority]);

  // ── Handlers (useCallback) ──
  const handleSort = useCallback((key: keyof CaseRow) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' };
      if (prev.dir === 'asc') return { key, dir: 'desc' };
      return null; // 3-state cycle: asc → desc → none
    });
    setPage(1);
  }, []);

  const getSorted = useCallback(
    (key: keyof CaseRow): 'asc' | 'desc' | false => (sort?.key === key ? sort.dir : false),
    [sort],
  );

  const handleSearch = useCallback((v: string) => {
    setFilters((f) => ({ ...f, search: v }));
    setPage(1);
  }, []);

  const handleStatusFilter = useCallback((v: Status | '') => {
    setFilters((f) => ({ ...f, status: v }));
    setPage(1);
  }, []);

  const handlePriorityFilter = useCallback((v: Priority | '') => {
    setFilters((f) => ({ ...f, priority: v }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ search: '', status: '', priority: '' });
    setPage(1);
  }, []);

  const resetTable = useCallback(() => {
    setFilters({ search: '', status: '', priority: '' });
    setSort(null);
    setPage(1);
    setSelected(new Set());
  }, []);

  const handlePageChange = useCallback(
    (p: number) => {
      if (!isLoading) setPage(p);
    },
    [isLoading],
  );

  const handlePageSizeChange = useCallback((s: number) => {
    setPageSize(s);
    setPage(1);
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((s) => {
      const next = new Set(s);
      const allSelected = pageRows.every((r) => next.has(r.id));
      if (allSelected) pageRows.forEach((r) => next.delete(r.id));
      else pageRows.forEach((r) => next.add(r.id));
      return next;
    });
  }, [pageRows]);

  const toggleRow = useCallback((id: string) => {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // ── Computed flags ──
  const allPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  const somePageSelected = pageRows.some((r) => selected.has(r.id)) && !allPageSelected;
  const hasActiveFilters = !!(filters.search || filters.status || filters.priority);
  const hasActiveState = hasActiveFilters || sort !== null;

  // ── Table body content ──
  function renderTableContent() {
    if (isLoading) {
      return Array.from({ length: pageSize }, (_, i) => (
        <TanstackTableRow key={`sk-${i}`} aria-hidden>
          <TanstackTableCell>
            <Sk w="18px" h="h-[18px]" />
          </TanstackTableCell>
          <TanstackTableCell>
            <Sk w="28px" />
          </TanstackTableCell>
          {COL_DEFS.map((col) => (
            <TanstackTableCell key={col.key}>{renderSkeletonCell(col)}</TanstackTableCell>
          ))}
          <TanstackTableCell>
            <div className="flex gap-0.5">
              {[0, 1, 2].map((j) => (
                <div key={j} className="h-8 w-8 animate-pulse rounded-md bg-accent" />
              ))}
            </div>
          </TanstackTableCell>
        </TanstackTableRow>
      ));
    }

    if (pageRows.length === 0) {
      return (
        <tr>
          <td colSpan={TOTAL_COLS}>
            <EmptyState
              variant="compact"
              icon={<Icon icon={DocumentText} size={20} />}
              title="Không có kết quả"
              description={
                hasActiveFilters
                  ? 'Không tìm thấy hồ sơ phù hợp với bộ lọc hiện tại.'
                  : 'Chưa có dữ liệu nào.'
              }
              primaryAction={
                hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-lg bg-primary-600 px-4 py-2 text-body-2-sb text-white hover:bg-primary-700"
                  >
                    Xóa bộ lọc
                  </button>
                ) : undefined
              }
            />
          </td>
        </tr>
      );
    }

    return pageRows.map((row, idx) => {
      const isSelected = selected.has(row.id);
      const globalIdx = (safePage - 1) * pageSize + idx + 1;
      return (
        <TanstackTableRow key={row.id} selected={isSelected}>
          <TanstackTableCell>
            <CircleCheckbox checked={isSelected} onChange={() => toggleRow(row.id)} />
          </TanstackTableCell>
          <TanstackTableCell className="text-body-2-rg text-muted-foreground">
            {globalIdx}
          </TanstackTableCell>
          {COL_DEFS.map((col) => (
            <TanstackTableCell key={col.key}>{renderDataCell(col, row)}</TanstackTableCell>
          ))}
          <TanstackTableCell>
            <ActionButtons
              onEdit={() => alert(`Edit: ${row.code}`)}
              onView={() => alert(`View: ${row.code}`)}
              onDelete={() => alert(`Delete: ${row.code}`)}
            />
          </TanstackTableCell>
        </TanstackTableRow>
      );
    });
  }

  // ── Render ──
  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="TanStack Table" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">TanStack Table</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Bảng dữ liệu hiệu năng cao hỗ trợ sắp xếp đa chiều, bộ lọc, chọn nhiều dòng, cố định cột (Sticky Pinning) và phân trang.
        </p>
      </div>

      <section className="space-y-3">
        {/* ── Toolbar ── */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: search + filters */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Icon
                icon={SearchNormal1}
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Tên hồ sơ, mã, đơn vị..."
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-body-2-rg text-foreground placeholder:text-muted-foreground focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-alpha-10"
              />
            </div>

            {/* Status filter */}
            <Select
              value={filters.status || FILTER_ALL}
              onValueChange={(v) => handleStatusFilter(v === FILTER_ALL ? '' : (v as Status))}
            >
              <SelectTrigger className="h-9 w-full rounded-lg border-border text-body-2-rg text-muted-foreground sm:w-44">
                <SelectValue placeholder="Tất cả trạng thái" />
              </SelectTrigger>
              <SelectContent displayPosition="auto">
                <SelectItem value={FILTER_ALL}>Tất cả trạng thái</SelectItem>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Priority filter */}
            <Select
              value={filters.priority || FILTER_ALL}
              onValueChange={(v) => handlePriorityFilter(v === FILTER_ALL ? '' : (v as Priority))}
            >
              <SelectTrigger className="h-9 w-full rounded-lg border-border text-body-2-rg text-muted-foreground sm:w-36">
                <SelectValue placeholder="Tất cả ưu tiên" />
              </SelectTrigger>
              <SelectContent displayPosition="auto">
                <SelectItem value={FILTER_ALL}>Tất cả ưu tiên</SelectItem>
                {PRIORITIES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Right: meta + actions */}
          <div className="flex items-center gap-2 text-body-3-rg">
            {selected.size > 0 && (
              <span className="rounded-full bg-primary-50 px-2.5 py-1 text-body-3-sb text-primary-700">
                {selected.size} đã chọn
              </span>
            )}
            {hasActiveState && (
              <button
                type="button"
                onClick={resetTable}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Reset bảng
              </button>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-body-3-rg text-muted-foreground">Đang lọc:</span>
            {filters.search && (
              <FilterChip label={`"${filters.search}"`} onClear={() => handleSearch('')} />
            )}
            {filters.status && (
              <FilterChip
                label={`Trạng thái: ${filters.status}`}
                onClear={() => handleStatusFilter('')}
              />
            )}
            {filters.priority && (
              <FilterChip
                label={`Ưu tiên: ${filters.priority}`}
                onClear={() => handlePriorityFilter('')}
              />
            )}
            <button
              type="button"
              onClick={clearFilters}
              className="text-body-3-rg text-error-600 hover:underline"
            >
              Xóa tất cả
            </button>
          </div>
        )}

        {/* Sort indicator */}
        {sort && (
          <div className="flex items-center gap-1.5 text-body-3-rg text-muted-foreground">
            <span>Đang sắp xếp:</span>
            <span className="font-medium text-foreground">
              {COL_DEFS.find((c) => c.key === sort.key)?.title} —{' '}
              {sort.dir === 'asc' ? 'Tăng dần' : 'Giảm dần'}
            </span>
            <button
              type="button"
              onClick={() => {
                setSort(null);
                setPage(1);
              }}
              className="ml-1 text-error-500 hover:underline"
            >
              Xóa sắp xếp
            </button>
          </div>
        )}

        {/* ── Table card ── */}
        <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm">
          {/* Scroll wrapper — only this area scrolls horizontally */}
          <div className="overflow-x-auto">
            {/*
              table-fixed + colgroup = stable column widths regardless of cell content.
              Column widths never shift between pages → eliminates flick UI.
            */}
            <table
              className="w-full table-fixed caption-bottom text-body-2-rg"
              style={{
                minWidth:
                  W_CHECKBOX + W_STT + COL_DEFS.reduce((s, c) => s + c.width, 0) + W_ACTIONS,
              }}
            >
              <colgroup>
                <col style={{ width: W_CHECKBOX }} />
                <col style={{ width: W_STT }} />
                {COL_DEFS.map((col) => (
                  <col key={col.key} style={{ width: col.width }} />
                ))}
                <col style={{ width: W_ACTIONS }} />
              </colgroup>

              <TanstackTableHeader>
                <TanstackTableRow>
                  <TanstackTableHead>
                    <CircleCheckbox
                      checked={allPageSelected}
                      indeterminate={somePageSelected}
                      onChange={toggleAll}
                    />
                  </TanstackTableHead>
                  <TanstackTableHead>STT</TanstackTableHead>
                  {COL_DEFS.map((col) => (
                    <TanstackTableHead
                      key={col.key}
                      sortable={col.sortable}
                      sorted={col.sortable ? getSorted(col.key) : false}
                      onSort={col.sortable ? () => handleSort(col.key) : undefined}
                    >
                      {col.title}
                    </TanstackTableHead>
                  ))}
                  <TanstackTableHead className="text-center">Thao tác</TanstackTableHead>
                </TanstackTableRow>
              </TanstackTableHeader>

              <TanstackTableBody>{renderTableContent()}</TanstackTableBody>
            </table>
          </div>

          {/* ── Pagination footer — outside scroll area, never shifts ── */}
          <div
            className={cn(
              'border-t border-border bg-muted transition-opacity',
              isLoading && 'pointer-events-none opacity-60',
            )}
          >
            <Pagination
              page={safePage}
              totalPages={totalPages}
              totalItems={sortedRows.length}
              onPageChange={handlePageChange}
              showPageSize
              showGotoPage
              pageSize={pageSize}
              pageSizeOptions={[10, 20, 50]}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </section>

      {/* ── Sticky pinning demo ── */}
      <StickyPinningDemo />

      {/* ── Row states reference ── */}
      <section className="space-y-3">
        <h2 className="text-title-3 text-foreground">Row states</h2>
        <TanstackTable>
          <TanstackTableHeader>
            <TanstackTableRow>
              <TanstackTableHead>State</TanstackTableHead>
              <TanstackTableHead>Mô tả</TanstackTableHead>
              <TanstackTableHead>Token</TanstackTableHead>
            </TanstackTableRow>
          </TanstackTableHeader>
          <TanstackTableBody>
            <TanstackTableRow>
              <TanstackTableCell>
                <span className="text-body-2-sb">Default</span>
              </TanstackTableCell>
              <TanstackTableCell className="text-muted-foreground">Bình thường</TanstackTableCell>
              <TanstackTableCell>
                <code className="rounded bg-accent px-1.5 py-0.5 text-body-3-rg">
                  bg-background
                </code>
              </TanstackTableCell>
            </TanstackTableRow>
            <TanstackTableRow className="!bg-primary-25">
              <TanstackTableCell>
                <span className="text-body-2-sb">Hover</span>
              </TanstackTableCell>
              <TanstackTableCell className="text-muted-foreground">
                Di chuột vào hàng
              </TanstackTableCell>
              <TanstackTableCell>
                <code className="rounded bg-accent px-1.5 py-0.5 text-body-3-rg">
                  bg-primary-25
                </code>
              </TanstackTableCell>
            </TanstackTableRow>
            <TanstackTableRow selected>
              <TanstackTableCell>
                <span className="text-body-2-sb">Selected</span>
              </TanstackTableCell>
              <TanstackTableCell className="text-muted-foreground">Hàng đã chọn</TanstackTableCell>
              <TanstackTableCell>
                <code className="rounded bg-accent px-1.5 py-0.5 text-body-3-rg">
                  bg-primary-50
                </code>
              </TanstackTableCell>
            </TanstackTableRow>
          </TanstackTableBody>
        </TanstackTable>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-title-3 text-foreground">Expandable Rows</h2>
          <p className="mt-1 text-body-2-rg text-muted-foreground">
            Click vào row hoặc nút chevron để mở/đóng sub-section bên dưới.
          </p>
        </div>
        <DataTable
          columns={TBKT_COLUMNS}
          data={TBKT_DATA}
          pageCount={1}
          total={TBKT_DATA.length}
          manualPagination={false}
          manualSorting={false}
          manualFiltering={false}
          enableHeaderFilters
          renderSubRow={(row) => (
            <div className="px-4 py-3">
              {row.members.length === 0 ? (
                <p className="text-body-2-rg text-muted-foreground">Chưa có thành viên.</p>
              ) : (
                <>
                  <p className="mb-2 text-body-2-sb text-foreground">Thành viên TBKT</p>
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
                            <TBKTStatusBadge status={member.trangThai} />
                          </TanstackTableCell>
                        </TanstackTableRow>
                      ))}
                    </TanstackTableBody>
                  </TanstackTable>
                </>
              )}
            </div>
          )}
        />
      </section>
    </div>
  );
};

// ─── Sticky pinning demo ──────────────────────────────────────────────────────

const STICKY_DEMO_COLS = [
  { key: 'code', title: 'Mã hồ sơ', width: 130 },
  { key: 'name', title: 'Tên hồ sơ', width: 240 },
  { key: 'unit', title: 'Đơn vị', width: 160 },
  { key: 'department', title: 'Phòng ban', width: 160 },
  { key: 'status', title: 'Trạng thái', width: 140 },
  { key: 'assignee', title: 'Người xử lý', width: 160 },
  { key: 'deadline', title: 'Hạn xử lý', width: 120 },
  { key: 'priority', title: 'Ưu tiên', width: 120 },
  { key: 'actions', title: 'Thao tác', width: 130 },
] as const;

const STICKY_DEMO_ROWS = MOCK_CASES.slice(0, 30);

const StickyPinningDemo = () => {
  const [stickyHeader, setStickyHeader] = useState(true);
  const [stickyFirst, setStickyFirst] = useState(true);
  const [stickyLast, setStickyLast] = useState(true);

  const last = STICKY_DEMO_COLS.length - 1;

  const headCls = (index: number) => {
    const isFirst = stickyFirst && index === 0;
    const isLast = stickyLast && index === last;
    const isCorner = stickyHeader && (isFirst || isLast);
    return cn(
      stickyHeader && 'sticky top-0 z-20 bg-muted',
      isFirst && 'sticky left-0 z-20 bg-muted',
      isLast && 'sticky right-0 z-20 bg-muted',
      isCorner && 'z-30',
    );
  };

  const cellCls = (index: number) =>
    cn(
      stickyFirst && index === 0 && 'sticky left-0 z-10 bg-inherit',
      stickyLast && index === last && 'sticky right-0 z-10 bg-inherit',
    );

  const pinRowBg = stickyFirst || stickyLast;

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-title-3 text-foreground">Sticky pinning</h2>
        <p className="mt-1 text-body-2-rg text-muted-foreground">
          Demo header, cột đầu, cột cuối sticky — kéo ngang/dọc để thấy hiệu ứng. Sử dụng cùng class
          pattern với{' '}
          <code className="rounded bg-accent px-1 py-0.5 text-body-3-rg">DataTable</code> props.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-muted/40 px-4 py-3">
        <StickyToggle label="Sticky header" checked={stickyHeader} onChange={setStickyHeader} />
        <StickyToggle label="Sticky cột đầu" checked={stickyFirst} onChange={setStickyFirst} />
        <StickyToggle label="Sticky cột cuối" checked={stickyLast} onChange={setStickyLast} />
      </div>

      <TanstackTable wrapperStyle={{ maxHeight: 360 }}>
        <TanstackTableHeader>
          <TanstackTableRow>
            {STICKY_DEMO_COLS.map((col, idx) => (
              <TanstackTableHead
                key={col.key}
                className={headCls(idx)}
                style={{ minWidth: col.width }}
              >
                {col.title}
              </TanstackTableHead>
            ))}
          </TanstackTableRow>
        </TanstackTableHeader>
        <TanstackTableBody>
          {STICKY_DEMO_ROWS.map((row) => (
            <TanstackTableRow key={row.id} className={cn(pinRowBg && 'bg-card')}>
              <TanstackTableCell className={cellCls(0)}>
                <span className="text-body-2-sb text-primary-600">{row.code}</span>
              </TanstackTableCell>
              <TanstackTableCell className={cellCls(1)}>{row.name}</TanstackTableCell>
              <TanstackTableCell className={cellCls(2)}>{row.unit}</TanstackTableCell>
              <TanstackTableCell className={cellCls(3)}>{row.department}</TanstackTableCell>
              <TanstackTableCell className={cellCls(4)}>
                <StatusBadge status={row.status} />
              </TanstackTableCell>
              <TanstackTableCell className={cellCls(5)}>{row.assignee}</TanstackTableCell>
              <TanstackTableCell className={cellCls(6)}>{row.deadline}</TanstackTableCell>
              <TanstackTableCell className={cellCls(7)}>
                <PriorityDot priority={row.priority} />
              </TanstackTableCell>
              <TanstackTableCell className={cellCls(8)}>
                <ActionButtons
                  onEdit={() => undefined}
                  onView={() => undefined}
                  onDelete={() => undefined}
                />
              </TanstackTableCell>
            </TanstackTableRow>
          ))}
        </TanstackTableBody>
      </TanstackTable>
    </section>
  );
};

const StickyToggle = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <label className="inline-flex cursor-pointer items-center gap-2 text-body-2-rg text-foreground">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 cursor-pointer accent-primary-600"
    />
    {label}
  </label>
);

// ─── Filter chip ──────────────────────────────────────────────────────────────

const FilterChip = ({ label, onClear }: { label: string; onClear: () => void }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-body-3-sb text-foreground">
    {label}
    <button
      type="button"
      onClick={onClear}
      className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-muted-foreground hover:bg-border hover:text-foreground"
      aria-label={`Remove filter ${label}`}
    >
      ×
    </button>
  </span>
);
