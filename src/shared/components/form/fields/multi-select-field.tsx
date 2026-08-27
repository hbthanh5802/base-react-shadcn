import { type FieldValues, type Path } from 'react-hook-form';

import { MultiSelect, type MultiSelectOption } from '@/shared/components/ui/multi-select';
import { cn } from '@/shared/lib/utils';

import { FormField } from '../form-field';

interface MultiSelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  options?: MultiSelectOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxSelect?: number;
  maxVisibleItems?: number;
  searchable?: boolean;
  renderSelected?: (
    selected: MultiSelectOption[],
    onRemove: (e: React.MouseEvent, val: string) => void,
  ) => React.ReactNode;
  renderItem?: (option: MultiSelectOption, isSelected: boolean) => React.ReactNode;

  // Infinite scroll additions
  fetchData?: (params: { page: number; search: string }) => Promise<{
    options: MultiSelectOption[];
    hasMore: boolean;
  }>;
  defaultOptions?: MultiSelectOption[];
  debounceMs?: number;
}

export function MultiSelectField<T extends FieldValues>({
  options = [],
  placeholder = 'Chọn...',
  disabled,
  maxSelect,
  maxVisibleItems,
  searchable,
  renderSelected,
  renderItem,
  className,
  fetchData,
  defaultOptions,
  debounceMs,
  ...rest
}: MultiSelectFieldProps<T>) {
  return (
    <FormField<T> className={className} {...rest}>
      {({ value, onChange, invalid }) => (
        <MultiSelect
          options={options}
          value={(value as string[]) ?? []}
          onChange={onChange as (value: string[]) => void}
          placeholder={placeholder}
          disabled={disabled}
          maxSelect={maxSelect}
          maxVisibleItems={maxVisibleItems}
          searchable={searchable}
          renderSelected={renderSelected}
          renderItem={renderItem}
          fetchData={fetchData}
          defaultOptions={defaultOptions}
          debounceMs={debounceMs}
          size="medium"
          className={cn(
            invalid && 'border-error-600 focus-visible:border-error-600 focus-visible:ring-error-600/20',
          )}
        />
      )}
    </FormField>
  );
}
