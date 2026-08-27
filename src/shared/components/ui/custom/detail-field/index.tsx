import { type ReactNode } from 'react';

export interface DetailFieldProps {
  label: string;
  value?: ReactNode;
  required?: boolean;
  /**
   * 'dialog'     – modal catalog dùng text-lg / text-base neutral (mặc định)
   * 'form'       – form detail dùng text-body-1-md
   * 'warning'    – warning dialog dùng text-lg / text-lg neutral-1000
   * 'modal-view' – form view dùng text-lg / text-lg text-foreground
   */
  variant?: 'dialog' | 'form' | 'warning' | 'modal-view';
  className?: string;
  valueClassName?: string;
}

export function DetailField({
  label,
  value,
  required,
  variant = 'dialog',
  className,
  valueClassName,
}: DetailFieldProps) {
  const labelClass =
    variant === 'form'
      ? 'text-body-1-md text-muted-foreground'
      : variant === 'modal-view'
        ? 'text-lg font-semibold text-muted-foreground'
        : 'text-lg font-medium text-neutral-800';

  const valueClass =
    variant === 'form'
      ? 'text-body-1-md text-foreground'
      : variant === 'modal-view'
        ? 'text-lg font-semibold text-foreground'
        : variant === 'warning'
          ? 'text-lg font-medium text-neutral-1000'
          : 'text-base font-normal text-neutral-700';

  const asteriskClass =
    variant === 'modal-view' ? 'ml-0.5 text-error-600' : 'ml-1 text-error-600';
  const fallbackValue = variant === 'modal-view' ? '—' : '---';

  return (
    <div className={`DetailField flex flex-col gap-1.5 ${className ?? ''}`}>
      <p className={labelClass}>
        {label}
        {required && <span className={asteriskClass}>*</span>}
      </p>
      <p className={`${valueClass} ${valueClassName ?? ''}`}>{value ? value : fallbackValue}</p>
    </div>
  );
}
