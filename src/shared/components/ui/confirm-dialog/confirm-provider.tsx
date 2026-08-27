import * as React from 'react';

import { ConfirmDialog, type ConfirmTone } from './confirm-dialog';

export interface ConfirmOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  tone?: ConfirmTone;
  icon?: React.ReactNode;
}

interface ConfirmContextValue {
  /** Open a confirmation dialog. Resolves `true` when confirmed, `false` when cancelled/dismissed. */
  confirm: (options?: ConfirmOptions) => Promise<boolean>;
  /** Preset for delete actions: danger tone, "Xác nhận xóa" / "Xóa". Accepts a string description or options. */
  confirmDelete: (options?: ConfirmOptions | string) => Promise<boolean>;
}

const ConfirmContext = React.createContext<ConfirmContextValue | null>(null);

const DELETE_DEFAULTS: ConfirmOptions = {
  title: 'Xác nhận xóa',
  description: 'Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.',
  confirmText: 'Xóa',
  cancelText: 'Hủy',
  tone: 'danger',
};

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<ConfirmOptions>({});
  const resolverRef = React.useRef<((value: boolean) => void) | null>(null);

  const settle = React.useCallback((value: boolean) => {
    resolverRef.current?.(value);
    resolverRef.current = null;
    setOpen(false);
  }, []);

  const confirm = React.useCallback((opts: ConfirmOptions = {}) => {
    // Resolve any previous pending confirm as cancelled before opening a new one.
    resolverRef.current?.(false);
    setOptions(opts);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const confirmDelete = React.useCallback(
    (opts: ConfirmOptions | string = {}) => {
      const merged = typeof opts === 'string' ? { description: opts } : opts;
      return confirm({ ...DELETE_DEFAULTS, ...merged });
    },
    [confirm],
  );

  const value = React.useMemo<ConfirmContextValue>(
    () => ({ confirm, confirmDelete }),
    [confirm, confirmDelete],
  );

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <ConfirmDialog
        open={open}
        onOpenChange={(next) => {
          if (!next) settle(false);
        }}
        title={options.title}
        description={options.description}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        tone={options.tone}
        icon={options.icon}
        onConfirm={() => settle(true)}
        onCancel={() => settle(false)}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmContextValue {
  const ctx = React.useContext(ConfirmContext);
  if (!ctx) {
    throw new Error('useConfirm must be used within a <ConfirmProvider>');
  }
  return ctx;
}
