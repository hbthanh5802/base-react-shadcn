import { HambergerMenu } from 'iconsax-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { ThemeToggle } from '@/layouts/components/ThemeToggle';
import { UserMenu } from '@/layouts/components/UserMenu';
import { IconButton } from '@/shared/components/ui/icon-button';
import { useUIStore } from '@/shared/stores/ui.store';

export const Header: React.FC = () => {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card px-4 shadow-xs">
      <div className="flex items-center gap-3">
        <IconButton
          variant="ghost"
          size="medium"
          className="text-muted-foreground hover:text-foreground md:hidden"
          onClick={toggleSidebar}
          aria-label="Menu"
          icon={<HambergerMenu size={22} />}
        />
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <img
            src="/app-icon/apple-icon-180x180.png"
            alt="Base Starter"
            className="size-8 rounded-lg object-cover shadow-2xs"
          />
          <span className="font-semibold text-foreground text-body-1-sb">Base Starter</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="h-5 w-px bg-border" />
        <UserMenu />
      </div>
    </header>
  );
};
