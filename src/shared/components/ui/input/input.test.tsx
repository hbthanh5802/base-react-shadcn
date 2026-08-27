import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './index';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="email" onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'email' }), 'abc');
    expect(onChange).toHaveBeenCalled();
  });
});
