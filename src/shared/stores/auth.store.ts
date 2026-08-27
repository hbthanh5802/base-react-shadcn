import { create } from 'zustand';
import { devtools, persist, type PersistStorage, type StorageValue } from 'zustand/middleware';

import { storage } from '@/shared/lib/storage';
import type { AuthUser, LoginPayload } from '@/shared/types/auth.types';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (payload: { user: AuthUser; accessToken: string; refreshToken?: string }) => void;
  setUser: (user: AuthUser) => void;
  loginMock: (payload?: Partial<LoginPayload>) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

const DEFAULT_MOCK_USER: AuthUser = {
  id: 'user-001',
  username: 'admin',
  email: 'admin@system.local',
  fullName: 'Quản trị viên',
  position: 'Chuyên viên kỹ thuật',
  department: 'Trung tâm CNTT',
  roles: ['SYSTEM_ADMIN', 'ADMIN'],
  permissions: ['*'],
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

type PersistedAuthState = Pick<
  AuthState,
  'user' | 'accessToken' | 'refreshToken' | 'isAuthenticated'
>;

const encryptedStorage: PersistStorage<PersistedAuthState> = {
  getItem: (name) => storage.get<StorageValue<PersistedAuthState>>(name),
  setItem: (name, value) => storage.set(name, value),
  removeItem: (name) => storage.remove(name),
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setAuth: ({ user, accessToken, refreshToken = 'mock-refresh-token' }) =>
          set({ user, accessToken, refreshToken, isAuthenticated: true }, false, 'setAuth'),
        setUser: (user) => set({ user }, false, 'setUser'),
        loginMock: (payload) => {
          const username = payload?.username?.trim() || 'admin';
          const role = payload?.role || (username === 'admin' ? 'SYSTEM_ADMIN' : 'USER');
          const mockUser: AuthUser = {
            ...DEFAULT_MOCK_USER,
            id: `user-${Date.now()}`,
            username,
            fullName: username === 'admin' ? 'Quản trị viên hệ thống' : `Người dùng (${username})`,
            email: `${username}@example.com`,
            roles: [role],
            permissions: role === 'SYSTEM_ADMIN' ? ['*'] : ['VIEW_DASHBOARD'],
          };
          set(
            {
              user: mockUser,
              accessToken: `mock-token-${Date.now()}`,
              refreshToken: `mock-refresh-token-${Date.now()}`,
              isAuthenticated: true,
            },
            false,
            'loginMock',
          );
        },
        logout: () => set({ ...initialState }, false, 'logout'),
      }),
      {
        name: 'auth-storage',
        storage: encryptedStorage,
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    { name: 'AuthStore' },
  ),
);

export const selectUser = (s: AuthStore): AuthUser | null => s.user;
export const selectIsAuthenticated = (s: AuthStore): boolean => s.isAuthenticated;
export const selectAccessToken = (s: AuthStore): string | null => s.accessToken;
