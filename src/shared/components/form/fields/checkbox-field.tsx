import { type FieldValues, type Path } from 'react-hook-form';

import { Checkbox } from '@/shared/components/ui/checkbox/index';
import { Label } from '@/shared/components/ui/label';

import { FormField } from '../form-field';

interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  description?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function CheckboxField<T extends FieldValues>({
  label,
  description,
  disabled,
  readOnly,
  name,
  size,
}: CheckboxFieldProps<T>) {
  return (
    <FormField<T> name={name}>
      {({ value, onChange, name: fieldName }) => (
        <div className="flex items-center gap-3">
          <Checkbox
            id={fieldName}
            checked={Boolean(value)}
            onCheckedChange={onChange as (checked: boolean) => void}
            disabled={disabled}
            readOnly={readOnly}
            size={size}
          />
          <div className="space-y-0.5 leading-none">
            <Label htmlFor={fieldName} className="cursor-pointer text-lg font-normal">
              {label}
            </Label>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
      )}
    </FormField>
  );
}
