import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './index';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox aria-label="checkbox" />);
    const checkbox = screen.getByRole('checkbox', { name: 'checkbox' });
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('renders checked state', () => {
    render(<Checkbox aria-label="checkbox" checked />);
    const checkbox = screen.getByRole('checkbox', { name: 'checkbox' });
    expect(checkbox).toHaveAttribute('data-state', 'checked');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('renders indeterminate state', () => {
    render(<Checkbox aria-label="checkbox" checked="indeterminate" />);
    const checkbox = screen.getByRole('checkbox', { name: 'checkbox' });
    expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('calls onCheckedChange on click', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="checkbox" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole('checkbox', { name: 'checkbox' }));

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles by keyboard space', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="checkbox" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'checkbox' });

    checkbox.focus();
    await user.keyboard('[Space]');

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('does not trigger when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="checkbox" onCheckedChange={onCheckedChange} disabled />);

    await user.click(screen.getByRole('checkbox', { name: 'checkbox' }));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
