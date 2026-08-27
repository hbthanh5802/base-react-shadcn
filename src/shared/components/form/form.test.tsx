import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { z, zodResolver, zEmail, zRequired } from '@/shared/lib/zod';

import { CheckboxField } from './fields/checkbox-field';
import { RadioGroupField } from './fields/radio-group-field';
import { SelectField } from './fields/select-field';
import { SwitchField } from './fields/switch-field';
import { TextField } from './fields/text-field';
import { TextareaField } from './fields/textarea-field';
import { Form } from './form';

// ── Helpers ────────────────────────────────────────────────────────────────────

type BasicSchema = { name: string; email: string };

const BasicForm = ({ onSubmit = vi.fn() }: { onSubmit?: (v: BasicSchema) => void }) => {
  const form = useForm<BasicSchema>({ defaultValues: { name: '', email: '' } });
  return (
    <Form form={form} onSubmit={onSubmit}>
      <TextField<BasicSchema> name="name" label="Name" />
      <TextField<BasicSchema> name="email" label="Email" type="email" />
      <button type="submit">Submit</button>
    </Form>
  );
};

// ── Form rendering ─────────────────────────────────────────────────────────────

describe('Form', () => {
  it('renders children inside a form element', () => {
    render(<BasicForm />);
    expect(
      screen.getByRole('form', { hidden: true }) ?? document.querySelector('form'),
    ).toBeTruthy();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('calls onSubmit with form values on submit', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<BasicForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Name'), 'Alice');
    await user.type(screen.getByLabelText('Email'), 'alice@example.com');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { name: 'Alice', email: 'alice@example.com' },
        expect.anything(),
      );
    });
  });
});

// ── TextField ──────────────────────────────────────────────────────────────────

describe('TextField', () => {
  it('renders label and input', () => {
    const TextFieldComp = () => {
      const form = useForm<{ text: string }>({ defaultValues: { text: '' } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <TextField name="text" label="Text" placeholder="Type here" />
          <button type="submit">Go</button>
        </Form>
      );
    };
    render(<TextFieldComp />);
    expect(screen.getByLabelText('Text')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('shows validation error for zod required field', async () => {
    const schema = z.object({ username: zRequired('Username required') });
    type S = z.infer<typeof schema>;
    const Comp = () => {
      const form = useForm<S>({
        resolver: zodResolver(schema),
        defaultValues: { username: '' },
        mode: 'onBlur',
      });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <TextField<S> name="username" label="Username" required />
          <button type="submit">Submit</button>
        </Form>
      );
    };
    const user = userEvent.setup();
    render(<Comp />);
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText('Username required')).toBeInTheDocument();
    });
  });

  it('shows email validation error', async () => {
    const schema = z.object({ email: zEmail() });
    type S = z.infer<typeof schema>;
    const Comp = () => {
      const form = useForm<S>({
        resolver: zodResolver(schema),
        defaultValues: { email: '' },
        mode: 'onBlur',
      });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <TextField<S> name="email" label="Email" type="email" />
          <button type="submit">Submit</button>
        </Form>
      );
    };
    const user = userEvent.setup();
    render(<Comp />);
    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText('Email không hợp lệ')).toBeInTheDocument();
    });
  });
});

// ── SelectField ────────────────────────────────────────────────────────────────

describe('SelectField', () => {
  const options = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ];

  it('renders label and trigger', () => {
    const Comp = () => {
      const form = useForm<{ role: string }>({ defaultValues: { role: '' } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <SelectField name="role" label="Role" options={options} />
          <button type="submit">Go</button>
        </Form>
      );
    };
    render(<Comp />);
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Chọn...')).toBeInTheDocument();
  });

  it('shows validation error when required field left empty', async () => {
    const schema = z.object({ role: z.string().min(1, 'Role required') });
    type S = z.infer<typeof schema>;
    const Comp = () => {
      const form = useForm<S>({ resolver: zodResolver(schema), defaultValues: { role: '' } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <SelectField<S> name="role" label="Role" required options={options} />
          <button type="submit">Submit</button>
        </Form>
      );
    };
    const user = userEvent.setup();
    render(<Comp />);
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText('Role required')).toBeInTheDocument();
    });
  });
});

// ── TextareaField ──────────────────────────────────────────────────────────────

describe('TextareaField', () => {
  it('renders a textarea', () => {
    const Comp = () => {
      const form = useForm<{ notes: string }>({ defaultValues: { notes: '' } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <TextareaField name="notes" label="Notes" placeholder="Enter notes..." />
        </Form>
      );
    };
    render(<Comp />);
    expect(screen.getByPlaceholderText('Enter notes...')).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText('Enter notes...');
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });

  it('accepts user input', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    const Comp = () => {
      const form = useForm<{ notes: string }>({ defaultValues: { notes: '' } });
      return (
        <Form form={form} onSubmit={onSubmit}>
          <TextareaField name="notes" label="Notes" placeholder="Enter notes..." />
          <button type="submit">Go</button>
        </Form>
      );
    };
    render(<Comp />);
    await user.type(screen.getByPlaceholderText('Enter notes...'), 'Hello notes');
    await user.click(screen.getByRole('button', { name: 'Go' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ notes: 'Hello notes' }, expect.anything());
    });
  });
});

// ── CheckboxField ──────────────────────────────────────────────────────────────

describe('CheckboxField', () => {
  it('renders with label', () => {
    const Comp = () => {
      const form = useForm<{ agree: boolean }>({ defaultValues: { agree: false } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <CheckboxField name="agree" label="I agree" />
        </Form>
      );
    };
    render(<Comp />);
    expect(screen.getByText('I agree')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('toggles checked state', async () => {
    const user = userEvent.setup();
    const Comp = () => {
      const form = useForm<{ agree: boolean }>({ defaultValues: { agree: false } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <CheckboxField name="agree" label="I agree" />
        </Form>
      );
    };
    render(<Comp />);
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});

// ── SwitchField ────────────────────────────────────────────────────────────────

describe('SwitchField', () => {
  it('renders with label and description', () => {
    const Comp = () => {
      const form = useForm<{ notif: boolean }>({ defaultValues: { notif: false } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <SwitchField name="notif" label="Notifications" description="Receive alerts" />
        </Form>
      );
    };
    render(<Comp />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Receive alerts')).toBeInTheDocument();
  });

  it('starts unchecked by default', () => {
    const Comp = () => {
      const form = useForm<{ on: boolean }>({ defaultValues: { on: false } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <SwitchField name="on" label="Toggle" />
        </Form>
      );
    };
    render(<Comp />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked');
  });

  it('starts checked when defaultValue is true', () => {
    const Comp = () => {
      const form = useForm<{ on: boolean }>({ defaultValues: { on: true } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <SwitchField name="on" label="Toggle" />
        </Form>
      );
    };
    render(<Comp />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const Comp = () => {
      const form = useForm<{ on: boolean }>({ defaultValues: { on: false } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <SwitchField name="on" label="Toggle" />
        </Form>
      );
    };
    render(<Comp />);
    await user.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
  });
});

// ── RadioGroupField ────────────────────────────────────────────────────────────

describe('RadioGroupField', () => {
  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ];

  it('renders all options', () => {
    const Comp = () => {
      const form = useForm<{ choice: string }>({ defaultValues: { choice: '' } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <RadioGroupField name="choice" label="Pick one" options={options} />
        </Form>
      );
    };
    render(<Comp />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('submits selected value', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    const Comp = () => {
      const form = useForm<{ choice: string }>({ defaultValues: { choice: '' } });
      return (
        <Form form={form} onSubmit={onSubmit}>
          <RadioGroupField name="choice" options={options} />
          <button type="submit">Go</button>
        </Form>
      );
    };
    render(<Comp />);
    await user.click(screen.getByLabelText('Option B'));
    await user.click(screen.getByRole('button', { name: 'Go' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ choice: 'b' }, expect.anything());
    });
  });

  it('disables individual options', () => {
    const withDisabled = [...options, { label: 'Disabled', value: 'd', disabled: true }];
    const Comp = () => {
      const form = useForm<{ choice: string }>({ defaultValues: { choice: '' } });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <RadioGroupField name="choice" options={withDisabled} />
        </Form>
      );
    };
    render(<Comp />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });
});

// ── Zod utilities ──────────────────────────────────────────────────────────────

describe('zod utilities', () => {
  it('zRequired rejects empty string', () => {
    const schema = z.object({ f: zRequired('Required') });
    const result = schema.safeParse({ f: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Required');
    }
  });

  it('zRequired accepts non-empty string', () => {
    const schema = z.object({ f: zRequired() });
    expect(schema.safeParse({ f: 'hello' }).success).toBe(true);
  });

  it('zEmail rejects invalid email', () => {
    const schema = z.object({ e: zEmail() });
    expect(schema.safeParse({ e: 'not-email' }).success).toBe(false);
  });

  it('zEmail accepts valid email', () => {
    const schema = z.object({ e: zEmail() });
    expect(schema.safeParse({ e: 'user@example.com' }).success).toBe(true);
  });
});
