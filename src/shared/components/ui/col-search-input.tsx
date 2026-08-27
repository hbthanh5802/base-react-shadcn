import { SearchNormal1 } from 'iconsax-react';

import DebounceInput from '@/shared/components/ui/debounce-input';
import { Icon } from '@/shared/components/ui/icon';
import { cn } from '@/shared/lib/utils';

interface ColSearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const ColSearchInput = ({
  value,
  onChange,
  placeholder = 'Tìm kiếm',
  className,
  disabled,
}: ColSearchInputProps) => {
  return (
    <div className={cn('relative', className)}>
      <Icon
        icon={SearchNormal1}
        size={14}
        className="absolute left-2.5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
      />
      <DebounceInput
        type="text"
        value={value}
        onChange={(value) => onChange(value)}
        placeholder={placeholder}
        className="h-8 w-full rounded-lg border border-border bg-background pl-8 pr-2 text-body-3-rg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-offset-0"
        debounceTime={600}
        disabled={disabled}
      />
    </div>
  );
};
