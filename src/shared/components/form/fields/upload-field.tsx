import { CloseCircle, DocumentUpload } from 'iconsax-react';
import { useRef, useState } from 'react';
import { type FieldValues, type Path } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { cn } from '@/shared/lib/utils';

import { FormField } from '../form-field';

interface UploadFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  accept?: string;
  maxSize?: number;
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

export function UploadField<T extends FieldValues>({
  accept,
  maxSize = 5,
  disabled,
  ...rest
}: UploadFieldProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <FormField<T> {...rest}>
      {({ value, onChange, invalid }) => {
        const file = value as File | null;
        const onPick = () => inputRef.current?.click();
        const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
          const f = e.target.files?.[0];
          if (!f) return;
          if (f.size > maxSize * 1024 * 1024) {
            setError(`File exceeds ${maxSize}MB`);
            return;
          }
          setError(null);
          onChange(f);
        };
        const onClear = () => {
          onChange(null);
          if (inputRef.current) inputRef.current.value = '';
        };

        return (
          <div className="space-y-2">
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={onChangeFile}
              disabled={disabled}
            />
            {file ? (
              <div className="flex items-center justify-between rounded-md border bg-card px-3 py-2">
                <span className="truncate text-sm">{file.name}</span>
                <button type="button" onClick={onClear} className="text-muted-foreground">
                  <Icon icon={CloseCircle} size={18} />
                </button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={onPick}
                disabled={disabled}
                className={cn('w-full justify-start gap-2', invalid && 'border-destructive')}
              >
                <Icon icon={DocumentUpload} size={18} />
                Choose file ({accept || 'all'}, up to {maxSize}MB)
              </Button>
            )}
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
        );
      }}
    </FormField>
  );
}
