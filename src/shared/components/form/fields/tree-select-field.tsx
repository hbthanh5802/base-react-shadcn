import { type FieldValues, type Path } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';

import { FormField } from '../form-field';

export interface TreeSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  children?: TreeSelectOption[];
}

interface TreeSelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: TreeSelectOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const renderTreeOptions = (options: TreeSelectOption[], depth = 0) => {
  return options.map((opt) => {
    // Base padding is 1rem (16px), add 1rem per depth
    const paddingLeft = `calc(1rem + ${depth * 1}rem)`;

    if (opt.children && opt.children.length > 0) {
      return (
        <SelectGroup key={opt.value}>
          <SelectItem value={opt.value} disabled={opt.disabled} style={{ paddingLeft }}>
            {opt.label}
          </SelectItem>
          {renderTreeOptions(opt.children, depth + 1)}
        </SelectGroup>
      );
    }
    return (
      <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled} style={{ paddingLeft }}>
        {opt.label}
      </SelectItem>
    );
  });
};

export function TreeSelectField<T extends FieldValues>({
  options,
  placeholder = 'Chọn...',
  disabled,
  className,
  ...rest
}: TreeSelectFieldProps<T>) {
  return (
    <FormField<T> {...rest}>
      {({ value, onChange, onBlur, invalid }) => (
        <Select
          value={(value as string) ?? ''}
          onValueChange={(val) => {
            onChange(val);
            onBlur();
          }}
          disabled={disabled}
        >
          <SelectTrigger
            className={cn(
              invalid && 'border-error-600 focus-visible:border-error-600 focus-visible:ring-error-600/20',
              className,
            )}
            error={invalid}
            aria-invalid={invalid}
            onBlur={onBlur}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>{renderTreeOptions(options)}</SelectContent>
        </Select>
      )}
    </FormField>
  );
}
