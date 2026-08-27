import { useMemo } from 'react';

import { useAuthStore } from '@/shared/stores/auth.store';
import type { AuthUser } from '@/shared/types/auth.types';

/**
 * Hook for checking access rights.
 *
 * RBAC:       hasRole / hasAnyRole — check the user's roles.
 * Permission: has / hasAny / hasAll — check resolved permission codes from the backend.
 * ABAC:       check(fn) — custom predicate based on user attributes (orgId, etc.)
 *             The server still enforces these; this is for showing/hiding UI only.
 */
export const usePermission = () => {
  const user = useAuthStore((s) => s.user);

  return useMemo(
    () => ({
      // ── RBAC ──────────────────────────────────────────────────────────────
      hasRole: (role: string): boolean => user?.roles?.includes(role) ?? false,
      hasAnyRole: (roles: string[]): boolean =>
        roles.some((r) => user?.roles?.includes(r)) ?? false,

      // ── Permissions (resolved from role defaults + per-user overrides) ─────
      has: (permission: string): boolean => user?.permissions?.includes(permission) ?? false,
      hasAny: (perms: string[]): boolean =>
        perms.some((p) => user?.permissions?.includes(p)) ?? false,
      hasAll: (perms: string[]): boolean =>
        perms.every((p) => user?.permissions?.includes(p)) ?? false,

      // ── ABAC — custom predicate against user attributes ────────────────────
      check: (fn: (user: AuthUser) => boolean): boolean => (user ? fn(user) : false),

      // ── Convenience ───────────────────────────────────────────────────────
      isAdmin:
        user?.roles?.some((r) => ['SYSTEM_ADMIN', 'ORG_ADMIN', 'MODULE_ADMIN'].includes(r)) ??
        false,
      user,
    }),
    [user],
  );
};
