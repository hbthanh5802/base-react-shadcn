import { InputGlobal, type InputGlobalProps } from '@/shared/components/ui/input-global';

import { FormField } from '../form-field';

import type { FieldValues, Path } from 'react-hook-form';

export interface InputGlobalFieldProps<T extends FieldValues> extends Omit<
  InputGlobalProps,
  'name' | 'error'
> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
}

export function InputGlobalField<T extends FieldValues>({
  name,
  label,
  description,
  required,
  className,
  containerClassName,
  disabled,
  size = 'medium',
  ...rest
}: InputGlobalFieldProps<T>) {
  return (
    <FormField<T>
      name={name}
      label={label}
      description={description}
      required={required}
      className={className}
    >
      {({ invalid, value, onChange, onBlur, name: fieldName }) => (
        <InputGlobal
          {...rest}
          id={fieldName}
          name={fieldName}
          size={size}
          disabled={disabled}
          error={invalid}
          value={(value as string) ?? ''}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={onBlur}
          containerClassName={containerClassName}
        />
      )}
    </FormField>
  );
}
