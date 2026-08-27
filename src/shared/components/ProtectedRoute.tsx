import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuthenticated, selectUser, useAuthStore } from '@/shared/stores/auth.store';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const user = useAuthStore(selectUser);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = user?.roles?.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return <Navigate to="/403" replace />;
    }
  }

  return <>{children}</>;
};
