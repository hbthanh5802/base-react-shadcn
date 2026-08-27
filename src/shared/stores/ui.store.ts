import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { SidebarViewMode } from '@/shared/types/permission.types';

type Theme = 'light' | 'dark' | 'system';

interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  sidebarViewMode: SidebarViewMode;
  theme: Theme;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleSidebarCollapsed: () => void;
  setSidebarViewMode: (mode: SidebarViewMode) => void;
  setTheme: (theme: Theme) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      sidebarCollapsed: false,
      sidebarViewMode: 'system',
      theme: 'light',
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      toggleSidebarCollapsed: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarViewMode: (sidebarViewMode) => set({ sidebarViewMode }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'ui-storage' },
  ),
);
