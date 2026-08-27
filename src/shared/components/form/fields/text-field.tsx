import { type FieldValues, type Path } from 'react-hook-form';

import { TextField as TextFieldUi } from '@/shared/components/ui/text-field';

import { FormField } from '../form-field';

interface TextFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  required?: boolean;
  description?: string;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  size?: 'large' | 'medium' | 'small' | 'note';
  min?: number | string;
  max?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  disabled,
  autoComplete,
  className,
  description,
  required,
  size = 'large',
  min,
  max,
  onChange,
}: TextFieldProps<T>) {
  return (
    <FormField<T> name={name} className={className} hideError>
      {({ invalid, error, ...field }) => (
        <TextFieldUi
          {...field}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e);
          }}
          id={field.name}
          label={label}
          required={required}
          value={(field.value as string) ?? ''}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          size={size}
          supportingText={description}
          error={invalid}
          errorText={error}
          min={min}
          max={max}
        />
      )}
    </FormField>
  );
}
