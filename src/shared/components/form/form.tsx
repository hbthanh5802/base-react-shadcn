import { type ComponentProps, type ReactNode } from 'react';
import { FormProvider, type FieldValues, type UseFormReturn } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';

interface FormProps<T extends FieldValues> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  // Accept UseFormReturn with any context/transform generics (e.g. when using zodResolver)
  form: UseFormReturn<T, any, any>;
  onSubmit: (values: T) => void | Promise<void>;
  children: ReactNode;
}

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...rest
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', className)}
        noValidate
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
}
