import { ArrowRight, Lock1, User as UserIcon } from 'iconsax-react';
import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { selectIsAuthenticated, useAuthStore } from '@/shared/stores/auth.store';

export const LoginPage: React.FC = () => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const loginMock = useAuthStore((s) => s.loginMock);
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMock({ username });
    navigate(from, { replace: true });
  };

  const handleQuickLogin = (role: 'SYSTEM_ADMIN' | 'USER', name: string) => {
    loginMock({ username: name, role });
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-background to-background p-4">
      <Card className="w-full max-w-md border-border/60 p-8 shadow-lg backdrop-blur">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 shadow-inner">
            <UserIcon size={32} variant="Bold" />
          </div>
          <h1 className="text-title-2-sb text-foreground">Base Frontend Starter</h1>
          <p className="text-body-2-rg text-muted-foreground">
            Đăng nhập thử nghiệm (Mock Authentication)
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-caption-1-sb text-foreground">
              <UserIcon size={16} /> Tài khoản
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-caption-1-sb text-foreground">
              <Lock1 size={16} /> Mật khẩu
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <Button type="submit" variant="default" className="w-full mt-2 gap-2">
            <span>Đăng nhập</span>
            <ArrowRight size={18} />
          </Button>
        </form>

        <div className="mt-6 border-t border-border pt-6">
          <p className="mb-3 text-center text-caption-1-rg text-muted-foreground">
            Hoặc chọn nhanh tài khoản mẫu:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outlinePrimary"
              size="small"
              onClick={() => handleQuickLogin('SYSTEM_ADMIN', 'admin')}
            >
              👑 Quản trị viên
            </Button>
            <Button
              type="button"
              variant="outline"
              size="small"
              onClick={() => handleQuickLogin('USER', 'chuyenvien')}
            >
              👤 Người dùng
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
