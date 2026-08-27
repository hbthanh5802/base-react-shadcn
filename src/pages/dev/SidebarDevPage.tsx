import { SearchNormal1 } from 'iconsax-react';
import { Check, Copy, Layers, Code, Play, Shield, Sparkles } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import {
  NavGroups,
  useVisibleGroups,
} from '@/layouts/components/Sidebar';
import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { InputGlobal } from '@/shared/components/ui/input-global';
import { TooltipProvider } from '@/shared/components/ui/tooltip';
import { NAV_GROUPS } from '@/shared/config/nav.config';
import type { NavGroup } from '@/shared/types/permission.types';

// Custom Demo Arrays
const DEMO_PROJECT_GROUPS: NavGroup[] = [
  {
    key: 'workspace',
    label: 'KHÔNG GIAN LÀM VIỆC',
    items: [
      { key: 'home', to: '/dashboard', label: 'Bàn làm việc của tôi' },
      {
        key: 'tasks',
        label: 'Nhiệm vụ & Công việc',
        children: [
          { key: 'tasks-todo', to: '/dev/form', label: 'Cần thực hiện' },
          { key: 'tasks-in-progress', to: '/dev/tanstack-table', label: 'Đang triển khai' },
          { key: 'tasks-done', to: '/dev/dialog', label: 'Đã hoàn thành' },
        ],
      },
      {
        key: 'docs',
        label: 'Tài liệu',
        children: [
          { key: 'docs-draft', to: '/dev/document-viewer', label: 'Dự thảo văn bản' },
          { key: 'docs-official', to: '/dev/card', label: 'Văn bản ban hành' },
        ],
      },
    ],
  },
  {
    key: 'collapsible-reports',
    label: 'BÁO CÁO & PHÂN TÍCH',
    collapsible: true,
    defaultOpen: true,
    items: [
      { key: 'rep-overview', to: '/dev/chart', label: 'Báo cáo KPI' },
      { key: 'rep-sla', to: '/dev/pagination', label: 'Chỉ số SLA' },
      { key: 'rep-audit', to: '/dev/infinite-scroll', label: 'Truy vết hệ thống' },
    ],
  },
];

const DEMO_PERMISSION_GROUPS: NavGroup[] = [
  {
    key: 'public-section',
    label: 'CHỨC NĂNG CHUNG',
    items: [
      { key: 'pub-dash', to: '/dashboard', label: 'Bảng tin chung' },
      { key: 'pub-search', to: '/dev', label: 'Tra cứu nhanh' },
    ],
  },
  {
    key: 'officer-section',
    label: 'CHUYÊN VIÊN (Role: OFFICER)',
    access: { roles: ['OFFICER', 'ADMIN', 'SYSTEM_ADMIN'] },
    items: [
      {
        key: 'case-eval',
        label: 'Đánh giá hồ sơ',
        access: { permissions: ['CASE_VIEW'] },
        children: [
          { key: 'case-review', to: '/dev/tanstack-table', label: 'Hồ sơ sơ duyệt' },
          { key: 'case-approve', to: '/dev/dialog', label: 'Trình lãnh đạo' },
        ],
      },
    ],
  },
  {
    key: 'admin-section',
    label: 'QUẢN TRỊ VIÊN (Role: ADMIN)',
    access: { roles: ['ADMIN', 'SYSTEM_ADMIN'] },
    items: [
      {
        key: 'user-mgmt',
        label: 'Quản lý người dùng',
        access: { permissions: ['USER_MANAGE'] },
        children: [
          { key: 'u-list', to: '/dev/form', label: 'Danh sách nhân sự' },
          { key: 'u-roles', to: '/dev/switch', label: 'Ma trận phân quyền' },
        ],
      },
    ],
  },
];

export const SidebarDevPage: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [demoSearch, setDemoSearch] = useState('');

  // Simulated Permission State
  const [simulatedRole, setSimulatedRole] = useState<'USER' | 'OFFICER' | 'ADMIN'>('ADMIN');

  const copyCode = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Groups rendered through visibility filter
  const visibleDefaultGroups = useVisibleGroups(NAV_GROUPS);
  const visibleProjectGroups = useVisibleGroups(DEMO_PROJECT_GROUPS);

  // Live filter default groups with search
  const filteredDefaultGroups = useMemo(() => {
    if (!demoSearch.trim()) return visibleDefaultGroups;
    const q = demoSearch.toLowerCase().trim();

    return visibleDefaultGroups.flatMap((group) => {
      const matchingItems = group.items.flatMap((item) => {
        const itemMatches = item.label.toLowerCase().includes(q);
        const matchingChildren = item.children?.filter((child) =>
          child.label.toLowerCase().includes(q),
        );

        if (itemMatches || (matchingChildren && matchingChildren.length > 0)) {
          return [{ ...item, children: matchingChildren ?? item.children }];
        }
        return [];
      });

      if (!matchingItems.length) return [];
      return [{ ...group, items: matchingItems }];
    });
  }, [visibleDefaultGroups, demoSearch]);

  // Custom filter simulation for permission demo
  const visiblePermissionGroups = DEMO_PERMISSION_GROUPS.flatMap((group) => {
    if (group.access?.roles && !group.access.roles.includes(simulatedRole)) {
      return [];
    }
    const visibleItems = group.items.filter((item) => {
      if (item.access?.roles && !item.access.roles.includes(simulatedRole)) {
        return false;
      }
      return true;
    });
    if (!visibleItems.length) return [];
    return [{ ...group, items: visibleItems }];
  });

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Sidebar" />

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-heading-3 text-foreground">
          Sidebar
        </h1>
        <p className="text-body-1-rg text-muted-foreground">
          Thanh điều hướng phân cấp hỗ trợ tìm kiếm nhanh, submenu dạng accordion và lọc phân quyền (RBAC/PBAC).
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 space-y-1 border border-border">
          <div className="flex items-center gap-2 text-primary font-semibold text-body-1-sb">
            <Code size={18} />
            <span>Dễ sử dụng</span>
          </div>
          <p className="text-caption-1-rg text-muted-foreground">
            Chỉ cần truyền mảng <code>NavGroup[]</code> để render toàn bộ menu.
          </p>
        </Card>

        <Card className="p-4 space-y-1 border border-border">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-body-1-sb">
            <Layers size={18} />
            <span>Accordion Submenu</span>
          </div>
          <p className="text-caption-1-rg text-muted-foreground">
            Đóng / mở menu con mượt mà, tự động mở khi route con đang active.
          </p>
        </Card>

        <Card className="p-4 space-y-1 border border-border">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-body-1-sb">
            <Shield size={18} />
            <span>Lọc phân quyền</span>
          </div>
          <p className="text-caption-1-rg text-muted-foreground">
            Tự động ẩn hiện các mục menu theo vai trò và quyền hạn của người dùng.
          </p>
        </Card>

        <Card className="p-4 space-y-1 border border-border">
          <div className="flex items-center gap-2 text-amber-600 font-semibold text-body-1-sb">
            <Sparkles size={18} />
            <span>Tìm kiếm tức thì</span>
          </div>
          <p className="text-caption-1-rg text-muted-foreground">
            Tự động lọc menu và mở rộng danh mục khớp từ khóa tìm kiếm.
          </p>
        </Card>
      </div>

      {/* ─── DEMO 1: Production Nav Groups Live Preview ───────────────────────── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground flex items-center gap-2">
            <Play size={18} className="text-primary" />
            <span>1. Demo Sidebar kèm ô tìm kiếm</span>
          </h2>
          <p className="text-body-2-rg text-muted-foreground">
            Hiển thị danh mục lấy từ <code>src/shared/config/nav.config.ts</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Sidebar Preview Box */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs rounded-xl border border-border bg-card shadow-md flex flex-col h-[520px] overflow-hidden">
              <div className="p-3 border-b border-border bg-muted/20">
                <InputGlobal
                  size="small"
                  prefixIcon={<SearchNormal1 size={16} />}
                  placeholder="Tìm kiếm menu..."
                  value={demoSearch}
                  onChange={(e) => setDemoSearch(e.target.value)}
                  clearable
                  onClear={() => setDemoSearch('')}
                />
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                <TooltipProvider delayDuration={200}>
                  {filteredDefaultGroups.length === 0 ? (
                    <div className="py-8 text-center text-caption-1-rg text-muted-foreground">
                      Không tìm thấy menu phù hợp
                    </div>
                  ) : (
                    <NavGroups
                      groups={filteredDefaultGroups}
                      isSearching={Boolean(demoSearch.trim())}
                    />
                  )}
                </TooltipProvider>
              </div>
            </div>
          </div>

          {/* Code Usage */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-body-2-sb text-foreground">
                Cách sử dụng:
              </p>
              <Button
                variant="ghost"
                size="small"
                onClick={() =>
                  copyCode(
                    `import { Sidebar } from '@/layouts/components/Sidebar';\nimport { NAV_GROUPS } from '@/shared/config/nav.config';\n\n<Sidebar groups={NAV_GROUPS} />`,
                    'usage',
                  )
                }
              >
                {copiedKey === 'usage' ? <Check size={14} className="text-emerald-500 mr-1" /> : <Copy size={14} className="mr-1" />}
                <span>Copy</span>
              </Button>
            </div>

            <div className="rounded-lg bg-neutral-900 text-neutral-100 p-4 font-mono text-xs overflow-x-auto leading-relaxed">
              <pre>{`// 1. Định nghĩa mảng cấu hình (nav.config.ts)
export const NAV_GROUPS: NavGroup[] = [
  {
    key: 'overview',
    label: 'TỔNG QUAN',
    items: [
      { key: 'dashboard', to: '/dashboard', label: 'Trang chủ' },
      {
        key: 'forms',
        label: 'Form & Input',
        children: [
          { key: 'form-all', to: '/dev/form', label: 'Form Zod' },
          { key: 'form-input', to: '/dev/input', label: 'Input' },
        ],
      },
    ],
  },
];

// 2. Render trong Layout
<Sidebar groups={NAV_GROUPS} />`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DEMO 2: Collapsible Groups & Custom Arrays ──────────────────────── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">
            2. Nhóm có thể thu gọn (Collapsible Group)
          </h2>
          <p className="text-body-2-rg text-muted-foreground">
            Thêm <code>collapsible: true</code> để cho phép người dùng đóng / mở cả một nhóm menu.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs rounded-xl border border-border bg-card shadow-md flex flex-col h-[480px] overflow-hidden">
              <div className="p-3 border-b border-border bg-muted/30">
                <span className="font-semibold text-body-2-sb text-foreground">Dự án mẫu</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <TooltipProvider delayDuration={200}>
                  <NavGroups groups={visibleProjectGroups} />
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3">
            <p className="text-body-2-rg text-muted-foreground">
              Ví dụ cấu hình:
            </p>
            <div className="rounded-lg bg-neutral-900 text-neutral-100 p-4 font-mono text-xs overflow-x-auto">
              <pre>{`const PROJECT_GROUPS: NavGroup[] = [
  {
    key: 'reports',
    label: 'BÁO CÁO & PHÂN TÍCH',
    collapsible: true, // Cho phép thu gọn cả nhóm
    defaultOpen: true,
    items: [
      { key: 'rep-overview', to: '/dev/chart', label: 'Báo cáo KPI' },
      { key: 'rep-sla', to: '/dev/pagination', label: 'Chỉ số SLA' },
    ],
  },
];`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DEMO 3: Role & Permission Filter Simulation ──────────────────────── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-border pb-3">
          <div>
            <h2 className="text-title-1 font-semibold text-foreground flex items-center gap-2">
              <Shield size={18} className="text-emerald-600" />
              <span>3. Phân quyền truy cập (RBAC / PBAC)</span>
            </h2>
            <p className="text-body-2-rg text-muted-foreground">
              Chọn vai trò bên dưới để xem menu lọc tự động tương ứng.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-caption-1-sb text-muted-foreground">Vai trò:</span>
            <Button
              size="small"
              variant={simulatedRole === 'USER' ? 'default' : 'outline'}
              onClick={() => setSimulatedRole('USER')}
            >
              User
            </Button>
            <Button
              size="small"
              variant={simulatedRole === 'OFFICER' ? 'default' : 'outline'}
              onClick={() => setSimulatedRole('OFFICER')}
            >
              Officer
            </Button>
            <Button
              size="small"
              variant={simulatedRole === 'ADMIN' ? 'default' : 'outline'}
              onClick={() => setSimulatedRole('ADMIN')}
            >
              Admin
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs rounded-xl border border-border bg-card shadow-md flex flex-col h-[420px] overflow-hidden">
              <div className="p-3 border-b border-border bg-muted/30 flex items-center justify-between">
                <span className="font-semibold text-body-2-sb text-foreground">Menu theo quyền</span>
                <Badge
                  size="sm"
                  tone={simulatedRole === 'ADMIN' ? 'brand' : simulatedRole === 'OFFICER' ? 'blue' : 'gray'}
                >
                  {simulatedRole}
                </Badge>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <TooltipProvider delayDuration={200}>
                  <NavGroups groups={visiblePermissionGroups} />
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3">
            <p className="text-body-2-rg text-muted-foreground">
              Cấu hình <code>access</code> theo role hoặc permission:
            </p>
            <div className="rounded-lg bg-neutral-900 text-neutral-100 p-4 font-mono text-xs overflow-x-auto">
              <pre>{`{
  key: 'admin-section',
  label: 'QUẢN TRỊ VIÊN',
  access: { 
    roles: ['ADMIN', 'SYSTEM_ADMIN'], 
    permissions: ['USER_MANAGE'] 
  },
  items: [
    { key: 'u-list', to: '/dev/form', label: 'Quản lý người dùng' }
  ]
}`}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SidebarDevPage;
