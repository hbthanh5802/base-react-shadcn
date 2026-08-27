import { type FieldValues, type Path } from 'react-hook-form';

import { TextField as TextFieldUi } from '@/shared/components/ui/text-field';

import { FormField } from '../form-field';

interface TextareaFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export function TextareaField<T extends FieldValues>({
  name,
  label,
  placeholder,
  required,
  description,
  disabled,
  maxLength,
  className,
}: TextareaFieldProps<T>) {
  return (
    <FormField<T> name={name} className={className} hideError>
      {({ invalid, error, ...field }) => (
        <TextFieldUi
          {...field}
          id={field.name}
          size="note"
          label={label}
          required={required}
          value={(field.value as string) ?? ''}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          supportingText={description}
          error={invalid}
          errorText={error}
        />
      )}
    </FormField>
  );
}
