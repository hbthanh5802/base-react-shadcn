import { Moon, Sun1 } from 'iconsax-react';
import React from 'react';

import { useTheme } from '@/shared/components/theme-provider';
import { IconButton } from '@/shared/components/ui/icon-button';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton
      variant="ghost"
      size="medium"
      className="text-muted-foreground hover:text-foreground"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      title="Đổi giao diện Sáng / Tối"
      aria-label="Đổi giao diện Sáng / Tối"
      icon={theme === 'dark' ? <Sun1 size={20} /> : <Moon size={20} />}
    />
  );
};
