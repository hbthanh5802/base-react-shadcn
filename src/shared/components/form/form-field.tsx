import { type ReactNode } from 'react';
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';

import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  /** Set true when the child UI component renders its own error/description text */
  hideError?: boolean;
  children: (field: {
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    name: string;
    error?: string;
    invalid: boolean;
  }) => ReactNode;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  description,
  required,
  className,
  hideError = false,
  children,
}: FormFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { ref: _ref, ...safeField } = field;
        return (
          <div className={cn('space-y-1.5', className)}>
            {label && (
              <Label
                htmlFor={field.name}
                className={cn(
                  'text-body-2-sb font-medium text-foreground transition-colors',
                  fieldState.invalid && 'text-error-600',
                )}
              >
                {label}
                {required && <span className="ml-0.5 text-error-600">*</span>}
              </Label>
            )}
            {children({
              ...safeField,
              error: fieldState.error?.message,
              invalid: fieldState.invalid,
            })}
            {!hideError && description && !fieldState.error && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {!hideError && fieldState.error && (
              <p className="text-xs text-error-600">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
