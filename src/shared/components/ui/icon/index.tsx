import { type ComponentType, memo } from 'react';

import { cn } from '@/shared/lib/utils';

interface IconProps {
  icon: ComponentType<any>;
  size?: number | string;
  variant?: string;
  className?: string;
  [key: string]: any;
}

export const Icon = memo<IconProps>(
  ({ icon: IconComponent, size = 20, variant = 'Linear', className, ...rest }) => {
    const finalSize = size === 16 ? 18 : size;
    return (
      <span className={cn('inline-flex items-center justify-center', className)}>
        <IconComponent size={finalSize} variant={variant} {...rest} />
      </span>
    );
  },
);
Icon.displayName = 'Icon';

export type { IconProps };
