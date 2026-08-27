import { type FieldValues, type Path } from 'react-hook-form';

import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';

import { FormField } from '../form-field';

interface SwitchFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  switchLabel?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  readOnly?: boolean;
  iconMode?: 'none' | 'active' | 'all';
  className?: string;
}

export function SwitchField<T extends FieldValues>({
  name,
  label,
  switchLabel,
  required,
  description,
  disabled,
  readOnly,
  iconMode = 'none',
  className,
}: SwitchFieldProps<T>) {
  return (
    <FormField<T> name={name} label={label} required={required} className={className}>
      {({ value, onChange, name: fieldName }) => (
        <div className="flex items-center gap-3 py-1.5">
          <Switch
            id={fieldName}
            checked={Boolean(value)}
            onCheckedChange={onChange as (checked: boolean) => void}
            disabled={disabled}
            readOnly={readOnly}
            iconMode={iconMode}
          />
          <div className="space-y-0.5 leading-none">
            <Label htmlFor={fieldName} className="cursor-pointer text-lg font-normal">
              {switchLabel || label}
            </Label>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
      )}
    </FormField>
  );
}
