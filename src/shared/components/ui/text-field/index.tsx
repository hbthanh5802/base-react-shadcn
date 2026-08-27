import { cva } from 'class-variance-authority';
import { Calendar, CloseCircle, Eye, EyeSlash } from 'iconsax-react';
import { ChevronRight } from 'lucide-react';
import * as React from 'react';

import { Chip, type ChipProps } from '@/shared/components/ui/chip';
import { Separator } from '@/shared/components/ui/separator';
import { cn } from '@/shared/lib/utils';

import {
  TEXT_FIELD_ICON_COLOR,
  TEXT_FIELD_ICON_SIZES,
  TEXT_FIELD_PLACEHOLDER_CLASS,
  TEXT_FIELD_SEPARATOR_ICON_SIZE,
} from './tokens';

const textFieldContainerVariants = cva(
  [
    'flex w-full items-center gap-2 rounded-lg border border-input bg-background transition-colors',
    'has-[:disabled]:cursor-not-allowed',
    'hover:border-neutral-400 dark:hover:border-neutral-600 data-[ui-hover=true]:border-neutral-400',
    'focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgb(5_150_105_/_0.14)]',
    'data-[ui-focus=true]:border-primary data-[ui-focus=true]:shadow-[0_0_0_3px_rgb(5_150_105_/_0.14)]',
  ],
  {
    variants: {
      size: {
        large: 'h-12 px-3',
        medium: 'h-10 px-3',
        small: 'h-8 px-2',
        note: 'min-h-[120px] items-start px-3 py-2',
      },
      mode: {
        default: '',
        view: 'h-auto min-h-0 border-transparent bg-transparent px-0 shadow-none hover:border-transparent focus-within:border-transparent focus-within:shadow-none',
      },
      error: {
        true: 'border-error-600 hover:border-error-600 focus-within:border-error-600 focus-within:shadow-[0_0_0_3px_rgb(217_45_32_/_0.14)] data-[ui-hover=true]:border-error-600 data-[ui-focus=true]:border-error-600',
        false: '',
      },
      disabled: {
        true: 'border-border bg-muted/50 text-muted-foreground hover:border-border focus-within:border-border focus-within:shadow-none',
        false: '',
      },
    },
    defaultVariants: {
      size: 'large',
      mode: 'default',
      error: false,
      disabled: false,
    },
  },
);

const textFieldInputVariants = cva(
  [
    'w-full min-w-0 flex-1 bg-transparent text-foreground outline-none',
    TEXT_FIELD_PLACEHOLDER_CLASS,
    'disabled:cursor-not-allowed disabled:text-muted-foreground disabled:placeholder:text-muted-foreground',
  ],
  {
    variants: {
      size: {
        large: 'text-body-1-rg',
        medium: 'text-body-2-rg',
        small: 'text-body-2-rg',
        note: 'min-h-[96px] resize-none text-body-2-rg',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  },
);

export interface TextFieldTag {
  id: string;
  label: string;
  tone?: ChipProps['tone'];
}

type TextFieldBaseProps = {
  label?: string;
  required?: boolean;
  supportingText?: string;
  errorText?: string;
  /** @deprecated Prefer `errorText`. String value is treated as error message. */
  error?: boolean | string;
  size?: 'large' | 'medium' | 'small' | 'note';
  mode?: 'default' | 'view';
  trailingIcon?: React.ReactNode;
  showCalendarIcon?: boolean;
  labelSwitch?: React.ReactNode;
  switchPosition?: 'left' | 'right';
  tags?: TextFieldTag[];
  onRemoveTag?: (id: string) => void;
  containerClassName?: string;
  'data-ui-hover'?: boolean | 'true' | 'false';
  'data-ui-focus'?: boolean | 'true' | 'false';
  layout?: 'horizontal' | 'vertical';
};

type TextFieldDefaultProps = TextFieldBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    variant?: 'default';
  };

type TextFieldDateRangeProps = TextFieldBaseProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'value' | 'defaultValue' | 'onChange'
  > & {
    variant: 'dateRange';
    startValue?: string;
    endValue?: string;
    defaultStartValue?: string;
    defaultEndValue?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    onStartChange?: React.ChangeEventHandler<HTMLInputElement>;
    onEndChange?: React.ChangeEventHandler<HTMLInputElement>;
  };

export type TextFieldProps = TextFieldDefaultProps | TextFieldDateRangeProps;

const TextFieldIcon = ({ icon: IconComponent, size }: { icon: typeof Calendar; size: number }) => (
  <span className="inline-flex shrink-0 items-center justify-center leading-none">
    <IconComponent size={size} variant="Linear" color={TEXT_FIELD_ICON_COLOR} />
  </span>
);

const TextFieldTagItem = ({
  tag,
  size,
  onRemove,
  disabled,
}: {
  tag: TextFieldTag;
  size: 'large' | 'medium' | 'small' | 'note';
  onRemove?: (id: string) => void;
  disabled?: boolean;
}) => {
  const chipSize = size === 'large' ? 'medium' : 'small';

  return (
    <span className="inline-flex items-center gap-1">
      <Chip tone={tag.tone ?? 'blue'} size={chipSize}>
        {tag.label}
      </Chip>
      {onRemove && !disabled && (
        <button
          type="button"
          aria-label={`Remove ${tag.label}`}
          className="inline-flex text-neutral-500 hover:text-neutral-700"
          onClick={() => onRemove(tag.id)}
        >
          <CloseCircle size={14} variant="Bold" color={TEXT_FIELD_ICON_COLOR} />
        </button>
      )}
    </span>
  );
};

const TextField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    {
      className,
      containerClassName,
      label,
      required,
      supportingText,
      errorText,
      error,
      size = 'large',
      mode = 'default',
      disabled,
      trailingIcon,
      showCalendarIcon,
      labelSwitch,
      switchPosition = 'right',
      tags,
      onRemoveTag,
      id: idProp,
      variant = 'default',
      'data-ui-hover': dataUiHover,
      'data-ui-focus': dataUiFocus,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const supportingTextId = `${generatedId}-supporting`;
    const errorTextId = `${generatedId}-error`;
    const fieldId = idProp ?? generatedId;

    const legacyErrorMessage = typeof error === 'string' ? error : undefined;
    const isError = Boolean(error) || Boolean(errorText) || Boolean(legacyErrorMessage);
    const resolvedErrorText = errorText ?? legacyErrorMessage;
    const isView = mode === 'view';
    const isNote = size === 'note';
    const isDateRange = variant === 'dateRange';
    const resolvedLayout = props.layout ?? 'horizontal';

    const nativeInputType = (props as React.InputHTMLAttributes<HTMLInputElement>).type;
    const isPasswordType = nativeInputType === 'password';
    const [showPassword, setShowPassword] = React.useState(false);

    const iconSize = TEXT_FIELD_ICON_SIZES[size === 'note' ? 'large' : size];

    const passwordToggleBtn = isPasswordType ? (
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
        className="inline-flex shrink-0 items-center text-neutral-500 hover:text-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setShowPassword((v) => !v)}
      >
        {showPassword ? (
          <EyeSlash size={iconSize} variant="Linear" color={TEXT_FIELD_ICON_COLOR} />
        ) : (
          <Eye size={iconSize} variant="Linear" color={TEXT_FIELD_ICON_COLOR} />
        )}
      </button>
    ) : null;

    const calendarIcon = showCalendarIcon ? (
      <TextFieldIcon icon={Calendar} size={iconSize} />
    ) : null;
    const resolvedTrailingIcon = trailingIcon ?? passwordToggleBtn ?? calendarIcon;

    const labelNode = label ? (
      <label
        htmlFor={isDateRange ? undefined : fieldId}
        className={cn(
          'text-body-2-sb font-medium text-foreground transition-colors',
          isError && 'text-error-600',
          disabled && 'text-muted-foreground',
        )}
      >
        {label}
        {required && <span className="ml-0.5 text-error-600">*</span>}
      </label>
    ) : null;

    const labelRow =
      labelNode || labelSwitch ? (
        <div className="flex items-center justify-between gap-3">
          {switchPosition === 'left' && labelSwitch}
          {labelNode}
          {switchPosition === 'right' && labelSwitch}
        </div>
      ) : null;

    const tagNodes =
      tags && tags.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <TextFieldTagItem
              key={tag.id}
              tag={tag}
              size={size}
              onRemove={onRemoveTag}
              disabled={disabled}
            />
          ))}
        </div>
      ) : null;

    const inputClassName = cn(textFieldInputVariants({ size }), 'text-base', className);
    const ariaDescribedBy =
      [
        isError && resolvedErrorText ? errorTextId : null,
        !isError && supportingText ? supportingTextId : null,
      ]
        .filter(Boolean)
        .join(' ') || undefined;

    const renderDefaultInput = () => {
      const { type: inputType, ...nativePropsRest } =
        props as React.InputHTMLAttributes<HTMLInputElement>;

      if (isNote) {
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={fieldId}
            disabled={disabled}
            readOnly={isView}
            aria-invalid={isError || undefined}
            aria-describedby={ariaDescribedBy}
            className={inputClassName}
            {...(nativePropsRest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        );
      }

      const resolvedType = isPasswordType
        ? showPassword
          ? 'text'
          : 'password'
        : (inputType ?? 'text');

      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={fieldId}
          type={resolvedType}
          disabled={disabled}
          readOnly={isView}
          aria-invalid={isError || undefined}
          aria-describedby={ariaDescribedBy}
          className={inputClassName}
          {...nativePropsRest}
        />
      );
    };

    const renderDateRangeInput = () => {
      const {
        startValue,
        endValue,
        defaultStartValue,
        defaultEndValue,
        startPlaceholder = '',
        endPlaceholder = '',
        onStartChange,
        onEndChange,
        layout = 'horizontal',
        ...rest
      } = props as TextFieldDateRangeProps;

      const sharedInputProps = rest as React.InputHTMLAttributes<HTMLInputElement>;

      if (layout === 'vertical') {
        return (
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 py-1">
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={fieldId}
              value={startValue}
              defaultValue={defaultStartValue}
              placeholder={startPlaceholder}
              disabled={disabled}
              readOnly={isView}
              aria-invalid={isError || undefined}
              aria-describedby={ariaDescribedBy}
              onChange={onStartChange}
              className={cn(textFieldInputVariants({ size }), 'h-8 w-full')}
              {...sharedInputProps}
            />
            <Separator />
            <input
              value={endValue}
              defaultValue={defaultEndValue}
              placeholder={endPlaceholder}
              disabled={disabled}
              readOnly={isView}
              aria-invalid={isError || undefined}
              aria-describedby={ariaDescribedBy}
              onChange={onEndChange}
              className={cn(textFieldInputVariants({ size }), 'h-8 w-full')}
              {...sharedInputProps}
            />
          </div>
        );
      }

      return (
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={fieldId}
            value={startValue}
            defaultValue={defaultStartValue}
            placeholder={startPlaceholder}
            disabled={disabled}
            readOnly={isView}
            aria-invalid={isError || undefined}
            aria-describedby={ariaDescribedBy}
            onChange={onStartChange}
            className={cn(textFieldInputVariants({ size }), 'flex-1')}
            {...sharedInputProps}
          />
          <TextFieldIcon icon={ChevronRight} size={TEXT_FIELD_SEPARATOR_ICON_SIZE} />
          <input
            value={endValue}
            defaultValue={defaultEndValue}
            placeholder={endPlaceholder}
            disabled={disabled}
            readOnly={isView}
            aria-invalid={isError || undefined}
            aria-describedby={ariaDescribedBy}
            onChange={onEndChange}
            className={cn(textFieldInputVariants({ size }), 'flex-1')}
            {...sharedInputProps}
          />
        </div>
      );
    };

    const renderViewValue = () => {
      const nativeProps = props as React.InputHTMLAttributes<HTMLInputElement>;
      const displayValue = nativeProps.value ?? nativeProps.defaultValue ?? '';

      if (isNote) {
        return (
          <p className={cn(textFieldInputVariants({ size }), 'whitespace-pre-wrap py-0')}>
            {displayValue}
          </p>
        );
      }

      return <p className={cn(textFieldInputVariants({ size }), 'py-0')}>{displayValue}</p>;
    };

    const renderFieldControl = () => {
      if (isView && tagNodes) {
        return <div className="flex flex-wrap items-center gap-1.5 py-1">{tagNodes}</div>;
      }

      if (isView) {
        return renderViewValue();
      }

      return (
        <div
          data-ui-hover={dataUiHover}
          data-ui-focus={dataUiFocus}
          className={cn(
            textFieldContainerVariants({
              size,
              mode,
              error: isError,
              disabled: Boolean(disabled),
            }),
            (isNote || (isDateRange && resolvedLayout === 'vertical')) && '!h-auto py-2',
            containerClassName,
          )}
        >
          {!isNote && !isDateRange && tagNodes}
          {isDateRange ? renderDateRangeInput() : renderDefaultInput()}
          {resolvedTrailingIcon && (
            <span className="inline-flex shrink-0 items-center">{resolvedTrailingIcon}</span>
          )}
        </div>
      );
    };

    return (
      <div className="flex w-full flex-col gap-1.5">
        {labelRow}
        {renderFieldControl()}

        {supportingText && !isError && (
          <p
            id={supportingTextId}
            className={cn('text-body-3-rg text-muted-foreground', disabled && 'opacity-60')}
          >
            {supportingText}
          </p>
        )}

        {isError && resolvedErrorText && (
          <p id={errorTextId} className="text-body-3-rg text-error-600">
            {resolvedErrorText}
          </p>
        )}
      </div>
    );
  },
);
TextField.displayName = 'TextField';

export { TextField, textFieldContainerVariants, textFieldInputVariants };
