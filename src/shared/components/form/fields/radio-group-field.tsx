import { type FieldValues, type Path } from 'react-hook-form';

import { Label } from '@/shared/components/ui/label';
import { RadioButton, RadioGroup } from '@/shared/components/ui/radio-button';

import { FormField } from '../form-field';

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  options: RadioOption[];
  required?: boolean;
  description?: string;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function RadioGroupField<T extends FieldValues>({
  name,
  options,
  disabled,
  direction = 'vertical',
  label,
  required,
  description,
  className,
}: RadioGroupFieldProps<T>) {
  return (
    <FormField<T>
      name={name}
      label={label}
      required={required}
      description={description}
      className={className}
    >
      {({ value, onChange }) => (
        <RadioGroup
          value={(value as string) ?? ''}
          onValueChange={onChange as (value: string) => void}
          disabled={disabled}
          className={direction === 'horizontal' ? 'flex flex-row flex-wrap gap-4' : 'grid gap-2'}
        >
          {options.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioButton
                id={`${name}-${opt.value}`}
                value={opt.value}
                disabled={opt.disabled ?? disabled}
              />
              <Label htmlFor={`${name}-${opt.value}`} className="cursor-pointer font-normal">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </FormField>
  );
}
