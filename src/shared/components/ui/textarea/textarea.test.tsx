import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Textarea } from './index';

describe('Textarea', () => {
  it('renders with placeholder', () => {
    render(<Textarea placeholder="Description" />);
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea aria-label="description" onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'description' }), 'hello');
    expect(onChange).toHaveBeenCalled();
  });
});
