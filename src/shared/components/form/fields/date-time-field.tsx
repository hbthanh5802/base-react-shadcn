import { type FieldValues, type Path } from 'react-hook-form';

import { DateTimePicker } from '@/shared/components/ui/date-time-picker';

import { FormField } from '../form-field';

interface DateTimeFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  placeholder?: string;
  className?: string;
  displayFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  clearable?: boolean;
  needConfirm?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
}

export function DateTimeField<T extends FieldValues>({
  name,
  label,
  required,
  disabled,
  description,
  placeholder,
  className,
  displayFormat,
  minDate,
  maxDate,
  clearable,
  needConfirm,
  onConfirm,
  confirmText,
}: DateTimeFieldProps<T>) {
  return (
    <FormField<T> name={name} className={className} hideError>
      {({ value, onChange, onBlur, invalid, error }) => {
        const dateValue = value instanceof Date ? value : value ? new Date(value as string) : null;

        return (
          <DateTimePicker
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
            displayFormat={displayFormat}
            minDate={minDate}
            maxDate={maxDate}
            clearable={clearable}
            needConfirm={needConfirm}
            onConfirm={onConfirm}
            confirmText={confirmText}
          />
        );
      }}
    </FormField>
  );
}
