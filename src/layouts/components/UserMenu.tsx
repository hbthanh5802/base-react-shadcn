import { Logout, User as UserIcon } from 'iconsax-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { selectUser, useAuthStore } from '@/shared/stores/auth.store';

export const UserMenu: React.FC = () => {
  const user = useAuthStore(selectUser);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    return parts[parts.length - 1]?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-full p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary-100 text-caption-1-sb text-primary-700">
              {getInitials(user?.fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left md:block">
            <p className="text-caption-1-sb text-foreground">
              {user?.fullName || 'Người dùng'}
            </p>
            <p className="text-caption-2-rg text-muted-foreground">
              {user?.position || user?.roles?.[0] || 'User'}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-caption-1-sb text-foreground">
              {user?.fullName}
            </p>
            <p className="text-caption-2-rg text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2">
          <UserIcon size={16} />
          <span>Thông tin tài khoản</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <Logout size={16} />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
