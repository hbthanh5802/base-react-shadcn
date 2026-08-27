/* eslint-disable no-console */
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { z, zodResolver, zEmail, zRequired } from '@/shared/lib/zod';

import { CheckboxField } from './fields/checkbox-field';
import { DateField } from './fields/date-field';
import { RadioGroupField } from './fields/radio-group-field';
import { SelectField } from './fields/select-field';
import { SwitchField } from './fields/switch-field';
import { TextField } from './fields/text-field';
import { TextareaField } from './fields/textarea-field';
import { Form } from './form';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Form/Fields',
  parameters: { layout: 'padded' },
};
export default meta;

// ── TextField ──────────────────────────────────────────────────────────────────

type TextSchema = { name: string; email: string };

const TextFieldsDemo = () => {
  const form = useForm<TextSchema>({ defaultValues: { name: '', email: '' } });
  return (
    <Form form={form} onSubmit={console.log} className="max-w-md space-y-4">
      <TextField<TextSchema> name="name" label="Full Name" placeholder="John Doe" />
      <TextField<TextSchema>
        name="email"
        label="Email"
        type="email"
        required
        placeholder="john@example.com"
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const TextFields: StoryObj = { render: () => <TextFieldsDemo /> };

// ── SelectField ────────────────────────────────────────────────────────────────

type SelectSchema = { country: string };

const SelectFieldsDemo = () => {
  const form = useForm<SelectSchema>({ defaultValues: { country: '' } });
  return (
    <Form form={form} onSubmit={console.log} className="max-w-md">
      <SelectField<SelectSchema>
        name="country"
        label="Country"
        required
        options={[
          { label: 'Vietnam', value: 'vn' },
          { label: 'Japan', value: 'jp' },
          { label: 'United States', value: 'us' },
        ]}
      />
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </Form>
  );
};

export const SelectFields: StoryObj = { render: () => <SelectFieldsDemo /> };

// ── TextareaField ──────────────────────────────────────────────────────────────

type TextareaSchema = { bio: string };

const TextareaFieldsDemo = () => {
  const form = useForm<TextareaSchema>({ defaultValues: { bio: '' } });
  return (
    <Form form={form} onSubmit={console.log} className="max-w-md">
      <TextareaField<TextareaSchema>
        name="bio"
        label="Biography"
        placeholder="Tell us about yourself..."
        description="Max 500 characters"
        maxLength={500}
      />
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </Form>
  );
};

export const TextareaFields: StoryObj = { render: () => <TextareaFieldsDemo /> };

// ── DateField ──────────────────────────────────────────────────────────────────

type DateSchema = { startDate: Date | null };

const DateFieldsDemo = () => {
  const form = useForm<DateSchema>({ defaultValues: { startDate: null } });
  return (
    <Form form={form} onSubmit={console.log} className="max-w-sm">
      <DateField<DateSchema>
        name="startDate"
        label="Start Date"
        required
        placeholder="Select date..."
      />
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </Form>
  );
};

export const DateFields: StoryObj = { render: () => <DateFieldsDemo /> };

// ── SwitchField ────────────────────────────────────────────────────────────────

type SwitchSchema = { notifications: boolean; darkMode: boolean };

const SwitchFieldsDemo = () => {
  const form = useForm<SwitchSchema>({
    defaultValues: { notifications: true, darkMode: false },
  });
  return (
    <Form form={form} onSubmit={console.log} className="max-w-md space-y-4">
      <SwitchField<SwitchSchema>
        name="notifications"
        label="Enable Notifications"
        description="Receive email and push alerts"
      />
      <SwitchField<SwitchSchema> name="darkMode" label="Dark Mode" iconMode="all" />
      <Button type="submit">Save</Button>
    </Form>
  );
};

export const SwitchFields: StoryObj = { render: () => <SwitchFieldsDemo /> };

// ── RadioGroupField ────────────────────────────────────────────────────────────

type RadioSchema = { gender: string; plan: string };

const RadioGroupFieldsDemo = () => {
  const form = useForm<RadioSchema>({ defaultValues: { gender: '', plan: '' } });
  return (
    <Form form={form} onSubmit={console.log} className="max-w-md space-y-6">
      <RadioGroupField<RadioSchema>
        name="gender"
        label="Gender"
        options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' },
        ]}
        direction="horizontal"
      />
      <RadioGroupField<RadioSchema>
        name="plan"
        label="Subscription Plan"
        required
        options={[
          { label: 'Free', value: 'free' },
          { label: 'Pro', value: 'pro' },
          { label: 'Enterprise', value: 'enterprise', disabled: true },
        ]}
      />
      <Button type="submit">Choose Plan</Button>
    </Form>
  );
};

export const RadioGroupFields: StoryObj = { render: () => <RadioGroupFieldsDemo /> };

// ── CheckboxField ──────────────────────────────────────────────────────────────

type CheckboxSchema = { agree: boolean; newsletter: boolean };

const CheckboxFieldsDemo = () => {
  const form = useForm<CheckboxSchema>({ defaultValues: { agree: false, newsletter: false } });
  return (
    <Form form={form} onSubmit={console.log} className="max-w-md space-y-4">
      <CheckboxField<CheckboxSchema> name="agree" label="I agree to the Terms and Conditions" />
      <CheckboxField<CheckboxSchema>
        name="newsletter"
        label="Subscribe to newsletter"
        description="Get weekly updates"
      />
      <Button type="submit">Continue</Button>
    </Form>
  );
};

export const CheckboxFields: StoryObj = { render: () => <CheckboxFieldsDemo /> };

// ── Validation Story ───────────────────────────────────────────────────────────

const validationSchema = z.object({
  username: zRequired('Username is required').min(3, 'Min 3 characters'),
  email: zEmail(),
});
type ValidatedSchema = z.infer<typeof validationSchema>;

const WithZodValidationDemo = () => {
  const form = useForm<ValidatedSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: { username: '', email: '' },
    mode: 'onBlur',
  });
  return (
    <Form form={form} onSubmit={console.log} className="max-w-md space-y-4">
      <TextField<ValidatedSchema>
        name="username"
        label="Username"
        required
        placeholder="min 3 characters"
      />
      <TextField<ValidatedSchema>
        name="email"
        label="Email"
        type="email"
        required
        placeholder="user@example.com"
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const WithZodValidation: StoryObj = { render: () => <WithZodValidationDemo /> };
