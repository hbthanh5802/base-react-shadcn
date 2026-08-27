import { type FieldValues, type Path } from 'react-hook-form';

import { DatePicker } from '@/shared/components/ui/date-picker';
import type { DatePickerMode } from '@/shared/components/ui/date-picker';

import { FormField } from '../form-field';

interface DateFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  placeholder?: string;
  pickerMode?: DatePickerMode;
  className?: string;
  clearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export function DateField<T extends FieldValues>({
  name,
  label,
  required,
  disabled,
  description,
  placeholder,
  pickerMode = 'day',
  className,
  clearable,
  minDate,
  maxDate,
}: DateFieldProps<T>) {
  return (
    <FormField<T> name={name} className={className} hideError>
      {({ value, onChange, onBlur, invalid, error }) => {
        const dateValue = value instanceof Date ? value : value ? new Date(value as string) : null;

        return (
          <DatePicker
            label={label}
            required={required}
            value={dateValue}
            onValueChange={(date) => {
              onChange(date);
              onBlur();
            }}
            onBlur={onBlur}
            error={invalid}
            errorText={error}
            disabled={disabled}
            supportingText={description}
            placeholder={placeholder}
            pickerMode={pickerMode}
            clearable={clearable}
            minDate={minDate}
            maxDate={maxDate}
          />
        );
      }}
    </FormField>
  );
}
