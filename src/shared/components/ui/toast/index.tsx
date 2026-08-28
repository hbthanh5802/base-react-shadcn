import { cva, type VariantProps } from 'class-variance-authority';
import { CloseCircle, Danger, InfoCircle, TickCircle } from 'iconsax-react';
import { Loader2, X } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast as sonnerToast, type ExternalToast } from 'sonner';

import { ButtonGlobal, type ButtonGlobalProps } from '@/shared/components/ui/button-global';
import { cn } from '@/shared/lib/utils';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'loading';
export type ToastAppearance = 'colored' | 'plain' | 'solid';

export const toastVariants = cva(
  'pointer-events-auto flex w-full max-w-md min-h-12 h-auto items-start gap-3.5 rounded-xl border p-4 shadow-xl backdrop-blur-xs transition-all break-words select-none',
  {
    variants: {
      variant: {
        info: '',
        success: '',
        warning: '',
        error: '',
        loading: '',
      },
      appearance: {
        colored: '',
        plain: 'border-border bg-card text-card-foreground shadow-xl dark:bg-card dark:text-card-foreground',
        solid: 'text-white border-transparent shadow-xl',
      },
    },
    compoundVariants: [
      // ── Colored (Tinted) Variants ──
      {
        variant: 'info',
        appearance: 'colored',
        className:
          'border-blue-200/90 bg-blue-50/95 text-blue-950 dark:border-blue-800/80 dark:bg-blue-950/60 dark:text-blue-100',
      },
      {
        variant: 'success',
        appearance: 'colored',
        className:
          'border-emerald-200/90 bg-emerald-50/95 text-emerald-950 dark:border-emerald-800/80 dark:bg-emerald-950/60 dark:text-emerald-100',
      },
      {
        variant: 'warning',
        appearance: 'colored',
        className:
          'border-amber-200/90 bg-amber-50/95 text-amber-950 dark:border-amber-800/80 dark:bg-amber-950/60 dark:text-amber-100',
      },
      {
        variant: 'error',
        appearance: 'colored',
        className:
          'border-red-200/90 bg-red-50/95 text-red-950 dark:border-red-800/80 dark:bg-red-950/60 dark:text-red-100',
      },
      {
        variant: 'loading',
        appearance: 'colored',
        className:
          'border-primary-200/90 bg-primary-50/95 text-primary-950 dark:border-primary-800/80 dark:bg-primary-950/60 dark:text-primary-100',
      },

      // ── Solid (High Contrast) Variants ──
      {
        variant: 'info',
        appearance: 'solid',
        className: 'bg-blue-600 dark:bg-blue-700',
      },
      {
        variant: 'success',
        appearance: 'solid',
        className: 'bg-emerald-600 dark:bg-emerald-700',
      },
      {
        variant: 'warning',
        appearance: 'solid',
        className: 'bg-amber-600 dark:bg-amber-700',
      },
      {
        variant: 'error',
        appearance: 'solid',
        className: 'bg-red-600 dark:bg-red-700',
      },
      {
        variant: 'loading',
        appearance: 'solid',
        className: 'bg-primary-600 dark:bg-primary-700',
      },
    ],
    defaultVariants: {
      variant: 'info',
      appearance: 'colored',
    },
  },
);

const getIcon = (variant: ToastVariant, appearance: ToastAppearance = 'colored') => {
  const isSolid = appearance === 'solid';
  switch (variant) {
    case 'info':
      return (
        <InfoCircle
          size={22}
          variant="Bold"
          className={cn(isSolid ? 'text-white' : 'text-blue-600 dark:text-blue-400', 'shrink-0')}
        />
      );
    case 'success':
      return (
        <TickCircle
          size={22}
          variant="Bold"
          className={cn(isSolid ? 'text-white' : 'text-emerald-600 dark:text-emerald-400', 'shrink-0')}
        />
      );
    case 'warning':
      return (
        <Danger
          size={22}
          variant="Bold"
          className={cn(isSolid ? 'text-white' : 'text-amber-600 dark:text-amber-400', 'shrink-0')}
        />
      );
    case 'error':
      return (
        <CloseCircle
          size={22}
          variant="Bold"
          className={cn(isSolid ? 'text-white' : 'text-red-600 dark:text-red-400', 'shrink-0')}
        />
      );
    case 'loading':
      return (
        <Loader2
          size={20}
          className={cn('animate-spin', isSolid ? 'text-white' : 'text-primary', 'shrink-0')}
        />
      );
  }
};

export type ToastActionItem =
  | React.ReactNode
  | {
      label: string;
      onClick: () => void;
      variant?: ButtonGlobalProps['variant'];
      tone?: ButtonGlobalProps['tone'];
      leftIcon?: React.ReactNode;
      rightIcon?: React.ReactNode;
    };

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof toastVariants> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionItem;
  icon?: React.ReactNode;
  onDismiss?: () => void;
  appearance?: ToastAppearance;
}

const getActionDefaults = (variant: ToastVariant, appearance: ToastAppearance) => {
  if (appearance === 'plain') {
    switch (variant) {
      case 'info':
        return { variant: 'secondPrimary' as const, tone: 'blue' as const };
      case 'success':
        return { variant: 'secondPrimary' as const, tone: 'green' as const };
      case 'warning':
        return { variant: 'secondPrimary' as const, tone: 'yellow' as const };
      case 'error':
        return { variant: 'destructive' as const, tone: undefined };
      case 'loading':
        return { variant: 'secondPrimary' as const, tone: 'primary' as const };
    }
  }

  // Colored appearance:
  switch (variant) {
    case 'info':
      return { variant: 'default' as const, tone: 'blue' as const };
    case 'success':
      return { variant: 'default' as const, tone: 'green' as const };
    case 'warning':
      return { variant: 'default' as const, tone: 'yellow' as const };
    case 'error':
      return { variant: 'destructive' as const, tone: undefined };
    case 'loading':
      return { variant: 'default' as const, tone: 'primary' as const };
  }
};

const solidButtonColors: Record<ToastVariant, string> = {
  info: '!bg-white !text-blue-600 hover:!bg-white/95 active:scale-95 shadow-xs border-transparent',
  success: '!bg-white !text-emerald-700 hover:!bg-white/95 active:scale-95 shadow-xs border-transparent',
  warning: '!bg-white !text-amber-800 hover:!bg-white/95 active:scale-95 shadow-xs border-transparent',
  error: '!bg-white !text-red-600 hover:!bg-white/95 active:scale-95 shadow-xs border-transparent',
  loading: '!bg-white !text-primary hover:!bg-white/95 active:scale-95 shadow-xs border-transparent',
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = 'info',
      appearance = 'colored',
      title,
      description,
      action,
      icon: customIcon,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation('components');
    const displayIcon = customIcon ?? getIcon(variant ?? 'info', appearance ?? 'colored');

    const renderAction = () => {
      if (!action) return null;
      if (React.isValidElement(action)) return action;

      if (typeof action === 'object' && 'label' in action) {
        const item = action as {
          label: string;
          onClick: () => void;
          variant?: ButtonGlobalProps['variant'];
          tone?: ButtonGlobalProps['tone'];
          leftIcon?: React.ReactNode;
          rightIcon?: React.ReactNode;
        };

        if (appearance === 'solid') {
          return (
            <ButtonGlobal
              size="small"
              leftIcon={item.leftIcon}
              rightIcon={item.rightIcon}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                onDismiss?.();
              }}
              className={cn(
                'text-caption-1-sb font-semibold shadow-xs',
                solidButtonColors[variant ?? 'info'],
              )}
            >
              {item.label}
            </ButtonGlobal>
          );
        }

        const defaults = getActionDefaults(variant ?? 'info', appearance ?? 'colored');

        return (
          <ButtonGlobal
            size="small"
            variant={item.variant ?? defaults.variant}
            tone={item.tone ?? defaults.tone}
            leftIcon={item.leftIcon}
            rightIcon={item.rightIcon}
            onClick={(e) => {
              e.stopPropagation();
              item.onClick();
              onDismiss?.();
            }}
          >
            {item.label}
          </ButtonGlobal>
        );
      }
      return null;
    };

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant, appearance }), className)}
        role="alert"
        {...props}
      >
        <div className="mt-0.5 shrink-0 flex items-center justify-center">
          {displayIcon}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 break-words">
          <div className="whitespace-normal break-words text-body-2-sb font-semibold leading-snug">{title}</div>
          {description && (
            <div
              className={cn(
                'whitespace-normal break-words text-body-3-rg leading-relaxed mt-0.5',
                appearance === 'plain'
                  ? 'text-muted-foreground'
                  : appearance === 'solid'
                    ? 'text-white/90 font-normal'
                    : 'opacity-85',
              )}
            >
              {description}
            </div>
          )}
          {action && <div className="mt-2.5 flex items-center gap-2">{renderAction()}</div>}
        </div>
        {onDismiss && (
          <button
            type="button"
            aria-label={t('toast.dismiss', { defaultValue: 'Đóng' })}
            onClick={onDismiss}
            className={cn(
              'shrink-0 -mr-1 -mt-1 rounded-lg p-1 transition-opacity opacity-60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current cursor-pointer',
              appearance === 'solid'
                ? 'hover:bg-white/20 text-white'
                : 'hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground',
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);

Toast.displayName = 'Toast';

// ── Notify Helper ──

export interface NotifyOptions extends ExternalToast {
  appearance?: ToastAppearance;
  action?: ToastActionItem;
  icon?: React.ReactNode;
}

const triggerToast = (
  variant: ToastVariant,
  title: React.ReactNode,
  options?: NotifyOptions,
) => {
  const appearance = options?.appearance ?? 'colored';

  return sonnerToast.custom(
    (t) => (
      <Toast
        variant={variant}
        appearance={appearance}
        title={title}
        description={
          typeof options?.description === 'function'
            ? options.description()
            : options?.description
        }
        action={options?.action}
        icon={options?.icon}
        onDismiss={() => sonnerToast.dismiss(t)}
        className={options?.className}
      />
    ),
    {
      duration: options?.duration ?? (variant === 'loading' ? Infinity : 4000),
      id: options?.id,
      onAutoClose: options?.onAutoClose,
      onDismiss: options?.onDismiss,
    },
  );
};

export const notify = {
  // ── Default Appearance (Colored / Tinted) ──
  success: (title: React.ReactNode, options?: NotifyOptions) =>
    triggerToast('success', title, options),
  info: (title: React.ReactNode, options?: NotifyOptions) =>
    triggerToast('info', title, options),
  warning: (title: React.ReactNode, options?: NotifyOptions) =>
    triggerToast('warning', title, options),
  error: (title: React.ReactNode, options?: NotifyOptions) =>
    triggerToast('error', title, options),
  loading: (title: React.ReactNode, options?: NotifyOptions) =>
    triggerToast('loading', title, options),

  // ── Plain (White / Neutral Card) Helpers ──
  plain: {
    success: (title: React.ReactNode, options?: Omit<NotifyOptions, 'appearance'>) =>
      triggerToast('success', title, { ...options, appearance: 'plain' }),
    info: (title: React.ReactNode, options?: Omit<NotifyOptions, 'appearance'>) =>
      triggerToast('info', title, { ...options, appearance: 'plain' }),
    warning: (title: React.ReactNode, options?: Omit<NotifyOptions, 'appearance'>) =>
      triggerToast('warning', title, { ...options, appearance: 'plain' }),
    error: (title: React.ReactNode, options?: Omit<NotifyOptions, 'appearance'>) =>
      triggerToast('error', title, { ...options, appearance: 'plain' }),
    loading: (title: React.ReactNode, options?: Omit<NotifyOptions, 'appearance'>) =>
      triggerToast('loading', title, { ...options, appearance: 'plain' }),
  },

  // ── Solid (High-Contrast Color) Helpers ──
  solid: {
    success: (title: React.ReactNode, options?: Omit<NotifyOptions, 'appearance'>) =>
      triggerToast('success', title, { ...options, appearance: 'solid' }),
    info: (title: React.ReactNode, options?: Omit<NotifyOptions, 'appearance'>) =>
      triggerToast('info', title, { ...options, appearance: 'solid' }),
    warning: (title: React.ReactNode, options?: Omit<NotifyOptions, 'appearance'>) =>
      triggerToast('warning', title, { ...options, appearance: 'solid' }),
    error: (title: React.ReactNode, options?: Omit<NotifyOptions, 'appearance'>) =>
      triggerToast('error', title, { ...options, appearance: 'solid' }),
    loading: (title: React.ReactNode, options?: Omit<NotifyOptions, 'appearance'>) =>
      triggerToast('loading', title, { ...options, appearance: 'solid' }),
  },

  // ── Promise Toast Helper (Auto transitions Loading -> Success / Error) ──
  promise: <T,>(
    promise: Promise<T> | (() => Promise<T>),
    data: {
      loading: React.ReactNode;
      success: React.ReactNode | ((data: T) => React.ReactNode);
      error: React.ReactNode | ((error: any) => React.ReactNode);
      appearance?: ToastAppearance;
      description?: React.ReactNode;
    },
  ) => {
    const toastId = triggerToast('loading', data.loading, {
      appearance: data.appearance,
      duration: Infinity,
    });

    const promiseToExecute = typeof promise === 'function' ? promise() : promise;

    promiseToExecute
      .then((res) => {
        sonnerToast.dismiss(toastId);
        const successMessage =
          typeof data.success === 'function' ? data.success(res) : data.success;
        triggerToast('success', successMessage, {
          appearance: data.appearance,
          description: data.description,
        });
      })
      .catch((err) => {
        sonnerToast.dismiss(toastId);
        const errorMessage =
          typeof data.error === 'function' ? data.error(err) : data.error;
        triggerToast('error', errorMessage, {
          appearance: data.appearance,
          description: data.description,
        });
      });

    return toastId;
  },

  dismiss: sonnerToast.dismiss,
};

export default Toast;
