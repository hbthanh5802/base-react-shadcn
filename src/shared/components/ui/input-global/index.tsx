import { cva } from 'class-variance-authority';
import { CloseCircle, Eye, EyeSlash } from 'iconsax-react';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { useDebounce } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';

import type { ChangeEvent, MouseEvent, ReactNode } from 'react';

const inputGlobalContainerVariants = cva(
  [
    'flex w-full items-center gap-2 rounded-lg border border-input bg-background transition-colors',
    'has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-muted/50 has-[:disabled]:border-border',
    'hover:border-neutral-400 dark:hover:border-neutral-600',
    'focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgb(5_150_105_/_0.14)]',
  ],
  {
    variants: {
      size: {
        large: 'h-12 px-3.5 text-base',
        medium: 'h-10 px-3 text-sm',
        small: 'h-8 px-2.5 text-sm',
      },
      error: {
        true: 'border-error-600 hover:border-error-600 focus-within:border-error-600 focus-within:shadow-[0_0_0_3px_rgb(217_45_32_/_0.14)]',
        false: '',
      },
    },
    defaultVariants: {
      size: 'medium',
      error: false,
    },
  },
);

export interface InputGlobalProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix'
> {
  size?: 'small' | 'medium' | 'large';
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  debounceTime?: number;
  onDebouncedChange?: (value: string) => void;
  showPasswordToggle?: boolean;
  containerClassName?: string;
  onPrefixIconClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  onSuffixIconClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  formatDisplayValue?: (value: string) => string;
  parseRawValue?: (value: string) => string;
}

const InputGlobal = forwardRef<HTMLInputElement, InputGlobalProps>(
  (
    {
      className,
      containerClassName,
      size = 'medium',
      type = 'text',
      error = false,
      prefixIcon,
      suffixIcon,
      prefix,
      suffix,
      clearable = false,
      onClear,
      debounceTime,
      onDebouncedChange,
      showPasswordToggle = false,
      onPrefixIconClick,
      onSuffixIconClick,
      formatDisplayValue,
      parseRawValue,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;

    // Khởi tạo state ban đầu
    const [internalValue, setInternalValue] = useState<string>(() => {
      const val = isControlled ? controlledValue : defaultValue;
      return val !== undefined && val !== null ? String(val) : '';
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
      if (isControlled) {
        setInternalValue(
          controlledValue !== undefined && controlledValue !== null ? String(controlledValue) : '',
        );
      }
    }, [controlledValue, isControlled]);

    // Handle Debounce
    const debouncedTimeMs = debounceTime ?? 0;
    const debouncedVal = useDebounce(internalValue, debouncedTimeMs);

    const onDebouncedChangeRef = useRef(onDebouncedChange);
    useEffect(() => {
      onDebouncedChangeRef.current = onDebouncedChange;
    }, [onDebouncedChange]);

    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      if (debouncedTimeMs > 0 && onDebouncedChangeRef.current) {
        onDebouncedChangeRef.current(debouncedVal);
      }
    }, [debouncedVal, debouncedTimeMs]);

    const currentRawValue = isControlled ? String(controlledValue ?? '') : internalValue;

    // Display value formatting
    const displayVal = formatDisplayValue ? formatDisplayValue(currentRawValue) : currentRawValue;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputCharValue = e.target.value;
      const rawValue = parseRawValue ? parseRawValue(inputCharValue) : inputCharValue;

      if (!isControlled) {
        setInternalValue(rawValue);
      } else {
        setInternalValue(rawValue);
      }

      if (onChange) {
        const customEvent = {
          ...e,
          target: { ...e.target, value: rawValue },
          currentTarget: { ...e.currentTarget, value: rawValue },
        } as ChangeEvent<HTMLInputElement>;
        onChange(customEvent);
      }
    };

    const handleClear = (e: MouseEvent) => {
      e.stopPropagation();
      setInternalValue('');
      onClear?.();
      if (onChange) {
        const event = {
          target: { value: '' },
          currentTarget: { value: '' },
        } as ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const isPasswordType = type === 'password';
    const computedType = isPasswordType && passwordVisible ? 'text' : type;
    const hasValue = Boolean(currentRawValue);

    const iconSizeMap = {
      small: 16,
      medium: 18,
      large: 20,
    };
    const iconSize = iconSizeMap[size] || 18;

    return (
      <div
        className={cn(
          'InputGlobal',
          inputGlobalContainerVariants({ size, error }),
          disabled && 'cursor-not-allowed border-border bg-muted/50',
          containerClassName,
        )}
      >
        {prefixIcon && (
          <span
            onClick={
              onPrefixIconClick
                ? (e) => {
                    e.stopPropagation();
                    if (!disabled) onPrefixIconClick(e);
                  }
                : undefined
            }
            className={cn(
              'inline-flex shrink-0 items-center text-muted-foreground',
              onPrefixIconClick && !disabled
                ? 'cursor-pointer transition-colors hover:text-foreground'
                : 'pointer-events-none',
            )}
          >
            {prefixIcon}
          </span>
        )}

        {prefix && <span className="inline-flex shrink-0 items-center">{prefix}</span>}

        <input
          ref={ref}
          type={computedType}
          disabled={disabled}
          readOnly={readOnly}
          value={displayVal}
          onChange={handleInputChange}
          className={cn(
            'w-full min-w-0 flex-1 bg-transparent text-foreground outline-none',
            'placeholder:text-muted-foreground',
            'disabled:cursor-not-allowed disabled:text-muted-foreground disabled:placeholder:text-muted-foreground',
            className,
          )}
          {...props}
        />

        {clearable && hasValue && !disabled && !readOnly && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex shrink-0 items-center text-muted-foreground transition-colors hover:text-foreground"
            title="Xoá dữ liệu"
          >
            <CloseCircle size={iconSize} variant="Bold" />
          </button>
        )}

        {isPasswordType && showPasswordToggle && !disabled && (
          <button
            type="button"
            onClick={() => setPasswordVisible((prev) => !prev)}
            className="inline-flex shrink-0 items-center text-muted-foreground transition-colors hover:text-foreground"
            title={passwordVisible ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
          >
            {passwordVisible ? <EyeSlash size={iconSize} /> : <Eye size={iconSize} />}
          </button>
        )}

        {suffix}

        {suffixIcon && (
          <span
            onClick={
              onSuffixIconClick
                ? (e) => {
                    e.stopPropagation();
                    if (!disabled) onSuffixIconClick(e);
                  }
                : undefined
            }
            className={cn(
              'inline-flex shrink-0 items-center text-muted-foreground',
              onSuffixIconClick && !disabled
                ? 'cursor-pointer transition-colors hover:text-foreground'
                : 'pointer-events-none',
            )}
          >
            {suffixIcon}
          </span>
        )}
      </div>
    );
  },
);

InputGlobal.displayName = 'InputGlobal';

export { InputGlobal, inputGlobalContainerVariants };
export default InputGlobal;
