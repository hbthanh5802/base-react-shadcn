import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, type RouteObject } from 'react-router-dom';

import { HeaderOnlyLayout } from '@/layouts/HeaderOnlyLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { LoginPage } from '@/pages/auth/LoginPage';
import { BasicHomePage } from '@/pages/dashboard/BasicHomePage';
import { HomePage } from '@/pages/dashboard/HomePage';
import { ErrorPage } from '@/pages/error/ErrorPage';
import { ForbiddenPage } from '@/pages/error/ForbiddenPage';
import { NotFoundPage } from '@/pages/error/NotFoundPage';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import { SHOW_DEV_ROUTES } from '@/shared/config/env';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lazyNamed<T extends object>(importer: () => Promise<T>, name: keyof T & string) {
  return lazy(() => importer().then((m) => ({ default: m[name] as React.ComponentType })));
}

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="flex min-h-[400px] items-center justify-center text-body-2-rg text-muted-foreground">
        Đang tải trang...
      </div>
    }
  >
    {children}
  </Suspense>
);

// ─── Dev UI Showcase Routes ───────────────────────────────────────────────────

let devRoutes: RouteObject[] = [];

if (SHOW_DEV_ROUTES) {
  const DevComponentsPage = lazyNamed(
    () => import('@/pages/dev/DevComponentsPage'),
    'DevComponentsPage',
  );
  const AvatarDevPage = lazyNamed(() => import('@/pages/dev/AvatarDevPage'), 'AvatarDevPage');
  const BadgeDevPage = lazyNamed(() => import('@/pages/dev/BadgeDevPage'), 'BadgeDevPage');
  const BreadcrumbDevPage = lazyNamed(
    () => import('@/pages/dev/BreadcrumbDevPage'),
    'BreadcrumbDevPage',
  );
  const ButtonDevPage = lazyNamed(() => import('@/pages/dev/ButtonDevPage'), 'ButtonDevPage');
  const CardDevPage = lazyNamed(() => import('@/pages/dev/CardDevPage'), 'CardDevPage');
  const ChartDevPage = lazyNamed(() => import('@/pages/dev/ChartDevPage'), 'ChartDevPage');
  const CheckboxDevPage = lazyNamed(() => import('@/pages/dev/CheckboxDevPage'), 'CheckboxDevPage');
  const ChipDevPage = lazyNamed(() => import('@/pages/dev/ChipDevPage'), 'ChipDevPage');
  const CodeBlockDevPage = lazyNamed(() => import('@/pages/dev/CodeBlockDevPage'), 'CodeBlockDevPage');
  const DatePickerDevPage = lazyNamed(
    () => import('@/pages/dev/DatePickerDevPage'),
    'DatePickerDevPage',
  );
  const DialogDevPage = lazyNamed(() => import('@/pages/dev/DialogDevPage'), 'DialogDevPage');
  const DrawerDevPage = lazyNamed(() => import('@/pages/dev/DrawerDevPage'), 'DrawerDevPage');
  const DocumentViewerDevPage = lazyNamed(
    () => import('@/pages/dev/DocumentViewerDevPage'),
    'DocumentViewerDevPage',
  );
  const DropdownMenuDevPage = lazyNamed(
    () => import('@/pages/dev/DropdownMenuDevPage'),
    'DropdownMenuDevPage',
  );
  const EmptyStateDevPage = lazyNamed(
    () => import('@/pages/dev/EmptyStateDevPage'),
    'EmptyStateDevPage',
  );
  const FormDevPage = lazyNamed(() => import('@/pages/dev/FormDevPage'), 'FormDevPage');
  const IconDevPage = lazyNamed(() => import('@/pages/dev/IconDevPage'), 'IconDevPage');
  const ImageDevPage = lazyNamed(() => import('@/pages/dev/ImageDevPage'), 'ImageDevPage');
  const InputDevPage = lazyNamed(() => import('@/pages/dev/InputDevPage'), 'InputDevPage');
  const LabelDevPage = lazyNamed(() => import('@/pages/dev/LabelDevPage'), 'LabelDevPage');
  const NotificationDevPage = lazyNamed(
    () => import('@/pages/dev/NotificationDevPage'),
    'NotificationDevPage',
  );
  const PaginationDevPage = lazyNamed(
    () => import('@/pages/dev/PaginationDevPage'),
    'PaginationDevPage',
  );
  const RadioButtonDevPage = lazyNamed(
    () => import('@/pages/dev/RadioButtonDevPage'),
    'RadioButtonDevPage',
  );
  const SelectDevPage = lazyNamed(() => import('@/pages/dev/SelectDevPage'), 'SelectDevPage');
  const StepperDevPage = lazyNamed(() => import('@/pages/dev/StepperDevPage'), 'StepperDevPage');
  const SidebarDevPage = lazyNamed(() => import('@/pages/dev/SidebarDevPage'), 'SidebarDevPage');
  const SwitchDevPage = lazyNamed(() => import('@/pages/dev/SwitchDevPage'), 'SwitchDevPage');
  const TabsDevPage = lazyNamed(() => import('@/pages/dev/TabsDevPage'), 'TabsDevPage');
  const TanstackTableDevPage = lazyNamed(
    () => import('@/pages/dev/TanstackTableDevPage'),
    'TanstackTableDevPage',
  );
  const TextareaDevPage = lazyNamed(() => import('@/pages/dev/TextareaDevPage'), 'TextareaDevPage');
  const TextFieldDevPage = lazyNamed(
    () => import('@/pages/dev/TextFieldDevPage'),
    'TextFieldDevPage',
  );
  const TooltipDevPage = lazyNamed(() => import('@/pages/dev/TooltipDevPage'), 'TooltipDevPage');
  const InfiniteScrollDevPage = lazyNamed(
    () => import('@/pages/dev/InfiniteScrollDevPage'),
    'InfiniteScrollDevPage',
  );
  const ModalDialogDevPage = lazyNamed(
    () => import('@/pages/dev/ModalDialogDevPage'),
    'ModalDialogDevPage',
  );
  devRoutes = [
    { path: 'dev', element: <Lazy><DevComponentsPage /></Lazy> },
    { path: 'dev/avatar', element: <Lazy><AvatarDevPage /></Lazy> },
    { path: 'dev/badge', element: <Lazy><BadgeDevPage /></Lazy> },
    { path: 'dev/breadcrumb', element: <Lazy><BreadcrumbDevPage /></Lazy> },
    { path: 'dev/button', element: <Lazy><ButtonDevPage /></Lazy> },
    { path: 'dev/card', element: <Lazy><CardDevPage /></Lazy> },
    { path: 'dev/chart', element: <Lazy><ChartDevPage /></Lazy> },
    { path: 'dev/checkbox', element: <Lazy><CheckboxDevPage /></Lazy> },
    { path: 'dev/chip', element: <Lazy><ChipDevPage /></Lazy> },
    { path: 'dev/code-block', element: <Lazy><CodeBlockDevPage /></Lazy> },
    { path: 'dev/date-picker', element: <Lazy><DatePickerDevPage /></Lazy> },
    { path: 'dev/dialog', element: <Lazy><DialogDevPage /></Lazy> },
    { path: 'dev/modal-dialog', element: <Lazy><ModalDialogDevPage /></Lazy> },
    { path: 'dev/drawer', element: <Lazy><DrawerDevPage /></Lazy> },
    { path: 'dev/document-viewer', element: <Lazy><DocumentViewerDevPage /></Lazy> },
    { path: 'dev/dropdown-menu', element: <Lazy><DropdownMenuDevPage /></Lazy> },
    { path: 'dev/empty-state', element: <Lazy><EmptyStateDevPage /></Lazy> },
    { path: 'dev/form', element: <Lazy><FormDevPage /></Lazy> },
    { path: 'dev/icon', element: <Lazy><IconDevPage /></Lazy> },
    { path: 'dev/image', element: <Lazy><ImageDevPage /></Lazy> },
    { path: 'dev/input', element: <Lazy><InputDevPage /></Lazy> },
    { path: 'dev/label', element: <Lazy><LabelDevPage /></Lazy> },
    { path: 'dev/notification', element: <Lazy><NotificationDevPage /></Lazy> },
    { path: 'dev/pagination', element: <Lazy><PaginationDevPage /></Lazy> },
    { path: 'dev/radio-button', element: <Lazy><RadioButtonDevPage /></Lazy> },
    { path: 'dev/select', element: <Lazy><SelectDevPage /></Lazy> },
    { path: 'dev/sidebar', element: <Lazy><SidebarDevPage /></Lazy> },
    { path: 'dev/stepper', element: <Lazy><StepperDevPage /></Lazy> },
    { path: 'dev/switch', element: <Lazy><SwitchDevPage /></Lazy> },
    { path: 'dev/tabs', element: <Lazy><TabsDevPage /></Lazy> },
    { path: 'dev/tanstack-table', element: <Lazy><TanstackTableDevPage /></Lazy> },
    { path: 'dev/textarea', element: <Lazy><TextareaDevPage /></Lazy> },
    { path: 'dev/text-field', element: <Lazy><TextFieldDevPage /></Lazy> },
    { path: 'dev/tooltip', element: <Lazy><TooltipDevPage /></Lazy> },
    { path: 'dev/infinite-scroll', element: <Lazy><InfiniteScrollDevPage /></Lazy> },
  ];
}

// ─── Main Router ──────────────────────────────────────────────────────────────

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: '403', element: <ForbiddenPage /> },
      { path: '404', element: <NotFoundPage /> },
      // 1. Header-Only Layout for Portal and Basic HomePage (No Sidebar)
      {
        element: (
          <ProtectedRoute>
            <HeaderOnlyLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <HomePage /> },
          { path: 'home', element: <BasicHomePage /> },
        ],
      },
      // 2. Main Layout with Sidebar for Dev Hub & Components
      {
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [...devRoutes],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
