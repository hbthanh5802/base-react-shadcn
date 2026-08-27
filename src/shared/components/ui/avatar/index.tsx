import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-body-3-sb',
        sm: 'h-8 w-8 text-body-2-sb',
        md: 'h-10 w-10 text-body-1-sb',
        lg: 'h-12 w-12 text-title-3-sb',
        xl: 'h-14 w-14 text-title-2-sb',
        '2xl': 'h-16 w-16 text-title-1-sb',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const statusColorMap = {
  online: 'bg-success-500',
  away: 'bg-warning-400',
  busy: 'bg-primary-600',
  offline: 'bg-gray-400',
} as const;

const statusSizeMap: Record<string, string> = {
  xs: 'h-1.5 w-1.5 border',
  sm: 'h-2 w-2 border',
  md: 'h-2.5 w-2.5 border-[1.5px]',
  lg: 'h-3 w-3 border-2',
  xl: 'h-3.5 w-3.5 border-2',
  '2xl': 'h-4 w-4 border-2',
};

export interface AvatarProps
  extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  status?: keyof typeof statusColorMap;
  fallbackColor?: string;
}

const Avatar = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size = 'md', status, fallbackColor = 'bg-accent', ...props }, ref) => (
    <span className="relative inline-flex">
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size }), fallbackColor, className)}
        {...props}
      />
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-background',
            statusColorMap[status],
            statusSizeMap[size ?? 'md'],
          )}
        />
      )}
    </span>
  ),
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center text-muted-foreground',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const avatarGroupVariants = cva('flex items-center', {
  variants: {
    size: {
      xs: '-space-x-1.5',
      sm: '-space-x-2',
      md: '-space-x-2.5',
      lg: '-space-x-3',
      xl: '-space-x-3.5',
      '2xl': '-space-x-4',
    },
  },
  defaultVariants: { size: 'md' },
});

interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarGroupVariants> {
  max?: number;
  children: React.ReactNode;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, size = 'md', max, children, ...props }, ref) => {
    const items = React.Children.toArray(children);
    const visible = max ? items.slice(0, max) : items;
    const overflow = max ? items.length - max : 0;

    return (
      <div ref={ref} className={cn(avatarGroupVariants({ size }), className)} {...props}>
        {visible.map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                key: i,
                size,
                className: cn(
                  'ring-2 ring-background',
                  (child as React.ReactElement<AvatarProps>).props.className,
                ),
              })
            : child,
        )}
        {overflow > 0 && (
          <span
            className={cn(
              avatarVariants({ size }),
              'bg-accent text-muted-foreground ring-2 ring-background',
            )}
          >
            +{overflow}
          </span>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarFallback, AvatarGroup, AvatarImage, avatarVariants };
