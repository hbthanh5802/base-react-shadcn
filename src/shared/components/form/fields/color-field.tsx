import { type FieldValues, type Path } from 'react-hook-form';

import { ColorPicker, type ColorPickerProps } from '@/shared/components/ui/color-picker';
import { cn } from '@/shared/lib/utils';

import { FormField } from '../form-field';

export interface ColorFieldProps<T extends FieldValues>
  extends Omit<ColorPickerProps, 'value' | 'onChange' | 'defaultValue'> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  className?: string;
}

export function ColorField<T extends FieldValues>({
  name,
  label,
  required,
  disabled,
  description,
  className,
  placeholder = 'Chọn mã màu...',
  clearable = true,
  ...colorPickerProps
}: ColorFieldProps<T>) {
  return (
    <FormField<T> name={name} className={className} hideError>
      {({ value, onChange, onBlur, invalid, error }) => (
        <div className="space-y-1.5 w-full">
          {label && (
            <label className="text-caption-1-sb font-medium text-foreground flex items-center gap-1">
              {label}
              {required && <span className="text-danger-500">*</span>}
            </label>
          )}

          <ColorPicker
            value={value as string}
            onChange={(color) => {
              onChange(color);
              onBlur();
            }}
            disabled={disabled}
            placeholder={placeholder}
            clearable={clearable}
            className={cn('w-full', invalid && 'border-danger-500')}
            {...colorPickerProps}
          />

          {description && !invalid && (
            <p className="text-caption-2-rg text-muted-foreground">{description}</p>
          )}

          {invalid && error && (
            <p className="text-caption-2-rg text-danger-500">{error}</p>
          )}
        </div>
      )}
    </FormField>
  );
}
