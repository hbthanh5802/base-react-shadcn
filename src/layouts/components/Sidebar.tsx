import { SearchNormal1 } from 'iconsax-react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Icon } from '@/shared/components/ui/icon';
import { IconButton } from '@/shared/components/ui/icon-button';
import { InputGlobal } from '@/shared/components/ui/input-global';
import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { NAV_GROUPS } from '@/shared/config/nav.config';
import { usePermission } from '@/shared/hooks/usePermission';
import { cn } from '@/shared/lib/utils';
import { useUIStore } from '@/shared/stores/ui.store';
import type {
  ChildNavItem,
  NavGroup,
  NavItemConfig,
  RouteAccess,
} from '@/shared/types/permission.types';

export function useVisibleGroups(groups: NavGroup[]): NavGroup[] {
  const { hasAll, hasAny, hasAnyRole, user } = usePermission();

  return useMemo(() => {
    // If no user (e.g. mock or public dev), show non-restricted items
    const canAccess = (access?: RouteAccess) => {
      if (!access) return true;
      if (!user) return false;
      if (access.permissions?.length && !hasAny(access.permissions)) return false;
      if (access.allPermissions?.length && !hasAll(access.allPermissions)) return false;
      return !(access.roles?.length && !hasAnyRole(access.roles));
    };

    return groups.flatMap((group): NavGroup[] => {
      if (!canAccess(group.access)) return [];

      const visibleItems = group.items.flatMap((item): NavItemConfig[] => {
        if (!canAccess(item.access)) return [];

        const visibleChildren = item.children?.filter((child) => canAccess(child.access));
        return [{ ...item, children: visibleChildren }];
      });

      if (!visibleItems.length) return [];
      return [{ ...group, items: visibleItems }];
    });
  }, [groups, hasAll, hasAny, hasAnyRole, user]);
}

export function isPathActive(to?: string, currentPath: string = ''): boolean {
  if (!to) return false;
  // Exact match required for root and hub routes
  if (to === '/' || to === '/dev' || to === '/dashboard' || to === '/home') {
    return currentPath === to;
  }
  return currentPath === to || currentPath.startsWith(to + '/');
}

export function ChildItem({ item }: { item: ChildNavItem }) {
  const location = useLocation();
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  const isActive = isPathActive(item.to, location.pathname);

  if (!item.to) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex h-8 items-center py-1 pl-3">
            <span
              className={cn(
                'flex min-w-0 flex-1 truncate rounded-lg px-3 py-1.5 text-sm font-medium leading-normal transition-colors',
                'cursor-default select-none text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {item.label}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={12}>
          <TooltipBody size="sm" className="max-w-xs break-words text-xs">
            {item.label}
          </TooltipBody>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={item.to}
          onClick={() => setSidebarOpen(false)}
          className="flex h-8 items-center py-1 pl-3"
        >
          <span
            className={cn(
              'flex min-w-0 flex-1 truncate rounded-lg px-3 py-1.5 text-sm font-medium leading-normal transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground font-semibold shadow-2xs'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {item.label}
          </span>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={12}>
        <TooltipBody size="sm" className="max-w-xs break-words text-xs">
          {item.label}
        </TooltipBody>
      </TooltipContent>
    </Tooltip>
  );
}

export interface NavItemProps {
  item: NavItemConfig;
  defaultOpenForce?: boolean;
}

const ROW_BASE =
  'flex h-9 w-full items-center gap-2 rounded-[10px] px-3 py-1.5 text-sm font-medium leading-normal transition-colors';
const ROW_ACTIVE = 'bg-primary text-primary-foreground font-semibold shadow-2xs';
const ROW_OPEN = 'bg-muted text-foreground';
const ROW_INACTIVE = 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground';

export function NavItem({ item, defaultOpenForce }: NavItemProps) {
  const location = useLocation();
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const hasChildren = !!item.children?.length;

  const isParentActive =
    !!item.to &&
    isPathActive(item.to, location.pathname) &&
    !item.children?.some((child) => isPathActive(child.to, location.pathname));

  const isChildActive =
    item.children?.some((child) => isPathActive(child.to, location.pathname)) ?? false;

  const isActive = isParentActive || isChildActive;
  const [open, setOpen] = useState(isActive || defaultOpenForce);
  const [prevActive, setPrevActive] = useState(isActive);

  if (isActive !== prevActive) {
    setPrevActive(isActive);
    if (isActive) {
      setOpen(true);
    }
  }

  // If search forces open
  React.useEffect(() => {
    if (defaultOpenForce) {
      setOpen(true);
    }
  }, [defaultOpenForce]);

  const childList = hasChildren && (
    <div
      className={cn(
        'overflow-hidden transition-all duration-200 ease-in-out',
        open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0',
      )}
    >
      <div className="mt-1 pl-7">
        <div className="border-l border-border">
          {item.children!.map((child) => (
            <ChildItem key={child.key} item={child} />
          ))}
        </div>
      </div>
    </div>
  );

  // Item with children and direct link
  if (hasChildren && item.to) {
    const rowStyle = isParentActive ? ROW_ACTIVE : open ? ROW_OPEN : ROW_INACTIVE;
    return (
      <div>
        <div className={cn(ROW_BASE, rowStyle)}>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className="flex min-w-0 flex-1 items-center truncate"
              >
                <span className="truncate">{item.label}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={12}>
              <TooltipBody size="sm" className="max-w-xs break-words text-xs">
                {item.label}
              </TooltipBody>
            </TooltipContent>
          </Tooltip>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex shrink-0 items-center p-0.5 opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Toggle submenu"
          >
            <Icon icon={open ? ChevronDown : ChevronRight} size={16} />
          </button>
        </div>
        {childList}
      </div>
    );
  }

  // Item with children but without direct link
  if (hasChildren && !item.to) {
    const accordionStyle = open ? ROW_OPEN : ROW_INACTIVE;
    return (
      <div>
        <div className={cn(ROW_BASE, accordionStyle)}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="flex min-w-0 flex-1 items-center truncate text-left"
              >
                <span className="truncate">{item.label}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={12}>
              <TooltipBody size="sm" className="max-w-xs break-words text-xs">
                {item.label}
              </TooltipBody>
            </TooltipContent>
          </Tooltip>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex shrink-0 items-center p-0.5 opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Toggle submenu"
          >
            <Icon icon={open ? ChevronDown : ChevronRight} size={16} />
          </button>
        </div>
        {childList}
      </div>
    );
  }

  // Item without children but with direct link
  if (!hasChildren && item.to) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={cn(ROW_BASE, isParentActive ? ROW_ACTIVE : ROW_INACTIVE)}
          >
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={12}>
          <TooltipBody size="sm" className="max-w-xs break-words text-xs">
            {item.label}
          </TooltipBody>
        </TooltipContent>
      </Tooltip>
    );
  }

  // Item without children and without direct link
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn(ROW_BASE, ROW_INACTIVE, 'cursor-default select-none')}>
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={12}>
        <TooltipBody size="sm" className="max-w-xs break-words text-xs">
          {item.label}
        </TooltipBody>
      </TooltipContent>
    </Tooltip>
  );
}

export function CollapsibleNavGroup({
  group,
  isSearching,
}: {
  group: NavGroup;
  isSearching?: boolean;
}) {
  const location = useLocation();
  const hasChildren = !!group.items?.length;
  const hasActiveChild = group.items.some(
    (item) =>
      (!!item.to &&
        (item.to === '/'
          ? location.pathname === '/'
          : location.pathname === item.to || location.pathname.startsWith(item.to + '/'))) ||
      item.children?.some(
        (child) =>
          !!child.to &&
          (child.to === '/'
            ? location.pathname === '/'
            : location.pathname === child.to || location.pathname.startsWith(child.to + '/')),
      ),
  );
  const initialOpen = hasActiveChild || !!group.defaultOpen || !!isSearching;
  const [open, setOpen] = useState(initialOpen);
  const [prevActive, setPrevActive] = useState(hasActiveChild);

  if (hasActiveChild !== prevActive) {
    setPrevActive(hasActiveChild);
    if (hasActiveChild) {
      setOpen(true);
    }
  }

  React.useEffect(() => {
    if (isSearching) {
      setOpen(true);
    }
  }, [isSearching]);

  if (!hasChildren) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(ROW_BASE, ROW_INACTIVE, 'cursor-default select-none')}>
            <span className="min-w-0 flex-1 truncate">{group.label}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={12}>
          <TooltipBody size="sm" className="max-w-xs break-words text-xs">
            {group.label}
          </TooltipBody>
        </TooltipContent>
      </Tooltip>
    );
  }

  const rowStyle = open ? ROW_OPEN : ROW_INACTIVE;

  return (
    <div>
      <div className={cn(ROW_BASE, rowStyle)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex min-w-0 flex-1 items-center truncate text-left"
            >
              <span className="truncate">{group.label}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12}>
            <TooltipBody size="sm" className="max-w-xs break-words text-xs">
              {group.label}
            </TooltipBody>
          </TooltipContent>
        </Tooltip>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex shrink-0 items-center p-0.5 opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Toggle submenu"
        >
          <Icon icon={open ? ChevronDown : ChevronRight} size={16} />
        </button>
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all duration-200 ease-in-out',
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="mt-1 pl-7">
          <div className="border-l border-border">
            {group.items.map((item) =>
              item.children?.length ? (
                <NavItem key={item.key} item={item} defaultOpenForce={isSearching} />
              ) : (
                <ChildItem
                  key={item.key}
                  item={{
                    key: item.key,
                    to: item.to || '',
                    label: item.label,
                    access: item.access,
                    pagePermissions: item.pagePermissions,
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavGroups({
  groups,
  isSearching,
}: {
  groups: NavGroup[];
  isSearching?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {groups.map((group) => {
        if (group.collapsible && group.label) {
          return (
            <CollapsibleNavGroup
              key={group.key}
              group={group}
              isSearching={isSearching}
            />
          );
        }
        return (
          <div key={group.key} className="flex flex-col gap-1">
            {group.label && (
              <p className="truncate px-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
                {group.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavItem key={item.key} item={item} defaultOpenForce={isSearching} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export interface SidebarProps {
  groups?: NavGroup[];
}

export const Sidebar: React.FC<SidebarProps> = ({ groups: customGroups }) => {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');

  const activeGroups = customGroups ?? NAV_GROUPS;
  const visibleGroups = useVisibleGroups(activeGroups);

  // Filter groups and items based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return visibleGroups;
    const q = searchQuery.toLowerCase().trim();

    return visibleGroups.flatMap((group) => {
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
  }, [visibleGroups, searchQuery]);

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          // Mobile: Full height drawer overlay
          'fixed inset-y-0 left-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-r border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out',
          // Desktop: Sticky sidebar
          'lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-64 lg:shrink-0 lg:self-start lg:z-30 lg:shadow-none',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Mobile Header (Brand + Close Button) */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4 lg:hidden shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-xs">
              B
            </div>
            <span className="font-semibold text-foreground text-body-1-sb">Dev Hub Menu</span>
          </div>
          <IconButton
            variant="ghost"
            size="small"
            aria-label="Đóng menu"
            onClick={() => setSidebarOpen(false)}
            icon={<X size={18} />}
          />
        </div>

        {/* Quick Search Header */}
        <div className="border-b border-border p-3 shrink-0">
          <InputGlobal
            size="small"
            prefixIcon={<SearchNormal1 size={16} />}
            placeholder="Tìm nhanh component..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            clearable
            onClear={() => setSearchQuery('')}
          />
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <TooltipProvider delayDuration={200}>
            {filteredGroups.length === 0 ? (
              <div className="py-8 text-center text-caption-1-rg text-muted-foreground">
                <p>Không tìm thấy mục nào phù hợp với &quot;{searchQuery}&quot;.</p>
              </div>
            ) : (
              <NavGroups
                groups={filteredGroups}
                isSearching={Boolean(searchQuery.trim())}
              />
            )}
          </TooltipProvider>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
