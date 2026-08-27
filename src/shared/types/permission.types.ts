import type { IconProps as IconsaxIconProps } from 'iconsax-react';
import type { ComponentType } from 'react';

export interface RouteAccess {
  permissions?: string[]; // Any of these (OR)
  allPermissions?: string[]; // All of these (AND)
  roles?: string[]; // Any of these roles (OR)
}

export interface PagePermissions {
  add?: boolean;
  edit?: boolean;
  view?: boolean;
  delete?: boolean;
}

export interface NavGroup {
  key: string;
  label: string;
  items: NavItemConfig[];
  access?: RouteAccess;
  /** If true, this group is rendered as a collapsible accordion section */
  collapsible?: boolean;
  /** Whether the accordion section is open by default (only relevant when collapsible=true) */
  defaultOpen?: boolean;
}

export interface NavItemConfig {
  key: string;
  code?: string;
  /** Omit for expandable parent items that don't navigate directly */
  to?: string;
  label: string;
  icon?: ComponentType<IconsaxIconProps>;
  access?: RouteAccess;
  pagePermissions?: PagePermissions;
  children?: ChildNavItem[];
}

export interface ChildNavItem {
  key: string;
  code?: string;
  to: string;
  label: string;
  access?: RouteAccess;
  pagePermissions?: PagePermissions;
}

export type SidebarViewMode = 'admin' | 'system';
