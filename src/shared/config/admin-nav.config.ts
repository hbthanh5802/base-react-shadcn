import type { NavGroup } from '@/shared/types/permission.types';

export const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    key: 'admin-core',
    label: 'QUẢN TRỊ NỀN TẢNG',
    items: [
      {
        key: 'admin-dashboard',
        to: '/dev/demo-admin',
        label: 'Bàn làm việc Quản trị',
      },
      {
        key: 'admin-users',
        label: 'Tài khoản & Phân quyền',
        children: [
          { key: 'user-list', to: '/dev/form', label: 'Danh sách người dùng' },
          { key: 'role-list', to: '/dev/dialog', label: 'Vai trò & Quyền hạn' },
        ],
      },
      {
        key: 'admin-system',
        label: 'Cấu hình Hệ thống',
        children: [
          { key: 'sys-audit', to: '/dev/tanstack-table', label: 'Nhật ký hệ thống (Audit Log)' },
          { key: 'sys-settings', to: '/dev/switch', label: 'Bật/Tắt tính năng (Feature Flags)' },
        ],
      },
    ],
  },
];
