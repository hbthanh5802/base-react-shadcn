import type { NavGroup } from '@/shared/types/permission.types';

/**
 * Dev Hub Sidebar navigation groups.
 * Lists all existing UI components, forms, tables, and demo pages in the project.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    key: 'overview',
    label: 'TỔNG QUAN',
    items: [
      { key: 'dev-overview', to: '/dev', label: 'Tất cả UI Components' },
      { key: 'dev-sidebar', to: '/dev/sidebar', label: 'Sidebar' },
      { key: 'portal-back', to: '/dashboard', label: '← Về Trang chủ (Portal)' },
    ],
  },
  {
    key: 'buttons-forms',
    label: 'NÚT BẤM & FORM',
    items: [
      { key: 'dev-button', to: '/dev/button', label: 'Button & IconButton' },
      { key: 'dev-form', to: '/dev/form', label: 'Form (Hook Form + Zod)' },
      { key: 'dev-text-field', to: '/dev/text-field', label: 'Text Field' },
      { key: 'dev-input', to: '/dev/input', label: 'Input' },
      { key: 'dev-textarea', to: '/dev/textarea', label: 'Textarea' },
      { key: 'dev-label', to: '/dev/label', label: 'Label' },
    ],
  },
  {
    key: 'selection',
    label: 'LỰA CHỌN & CHUYỂN ĐỔI',
    items: [
      { key: 'dev-select', to: '/dev/select', label: 'Select Dropdown' },
      { key: 'dev-dropdown', to: '/dev/dropdown-menu', label: 'Dropdown Menu' },
      { key: 'dev-checkbox', to: '/dev/checkbox', label: 'Checkbox' },
      { key: 'dev-radio', to: '/dev/radio-button', label: 'Radio Button' },
      { key: 'dev-switch', to: '/dev/switch', label: 'Switch' },
      { key: 'dev-chip', to: '/dev/chip', label: 'Chip' },
      { key: 'dev-datepicker', to: '/dev/date-picker', label: 'Date & Time Picker' },
    ],
  },
  {
    key: 'tables-nav',
    label: 'BẢNG & ĐIỀU HƯỚNG',
    items: [
      { key: 'dev-table', to: '/dev/tanstack-table', label: 'TanStack Table' },
      { key: 'dev-pagination', to: '/dev/pagination', label: 'Pagination' },
      { key: 'dev-breadcrumb', to: '/dev/breadcrumb', label: 'Breadcrumb' },
      { key: 'dev-tabs', to: '/dev/tabs', label: 'Tabs' },
      { key: 'dev-stepper', to: '/dev/stepper', label: 'Stepper' },
      { key: 'dev-tree-view', to: '/dev/tree-view', label: 'Tree View (Cây phân cấp)' },
    ],
  },
  {
    key: 'data-feedback',
    label: 'HIỂN THỊ DỮ LIỆU & FEEDBACK',
    items: [
      { key: 'dev-dialog', to: '/dev/dialog', label: 'Dialog (Raw)' },
      { key: 'dev-modal-dialog', to: '/dev/modal-dialog', label: 'Modal Dialog' },
      { key: 'dev-drawer', to: '/dev/drawer', label: 'Drawer & Sheet' },
      { key: 'dev-card', to: '/dev/card', label: 'Card' },
      { key: 'dev-surface', to: '/dev/surface', label: 'Surface' },
      { key: 'dev-typography', to: '/dev/typography', label: 'Typography' },
      { key: 'dev-notification', to: '/dev/notification', label: 'Notification / Toast' },
      { key: 'dev-tooltip', to: '/dev/tooltip', label: 'Tooltip' },
      { key: 'dev-avatar', to: '/dev/avatar', label: 'Avatar' },
      { key: 'dev-badge', to: '/dev/badge', label: 'Badge' },
      { key: 'dev-chart', to: '/dev/chart', label: 'Chart - Recharts' },
      { key: 'dev-doc-viewer', to: '/dev/document-viewer', label: 'Document Viewer' },
      { key: 'dev-empty', to: '/dev/empty-state', label: 'Empty State' },
      { key: 'dev-image', to: '/dev/image', label: 'Image' },
      { key: 'dev-icon', to: '/dev/icon', label: 'Icons (Iconsax + Lucide)' },
      { key: 'dev-infinite', to: '/dev/infinite-scroll', label: 'Infinite Scroll' },
      { key: 'dev-code-block', to: '/dev/code-block', label: 'Code Block & Preview' },
    ],
  },
  {
    key: 'system-pages',
    label: 'TRANG HỆ THỐNG & ERROR',
    collapsible: true,
    defaultOpen: true,
    items: [
      { key: 'page-404', to: '/404', label: '404' },
      { key: 'page-403', to: '/403', label: '403' },
    ],
  },
];
