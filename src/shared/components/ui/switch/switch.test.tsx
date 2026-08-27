import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './index';

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch aria-label="switch" />);
    const sw = screen.getByRole('switch', { name: 'switch' });
    expect(sw).toHaveAttribute('data-state', 'unchecked');
    expect(sw).toHaveAttribute('aria-checked', 'false');
  });

  it('renders checked state', () => {
    render(<Switch aria-label="switch" checked />);
    const sw = screen.getByRole('switch', { name: 'switch' });
    expect(sw).toHaveAttribute('data-state', 'checked');
    expect(sw).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onCheckedChange on click', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="switch" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole('switch', { name: 'switch' }));

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles by keyboard space', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="switch" onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole('switch', { name: 'switch' });

    sw.focus();
    await user.keyboard('[Space]');

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('does not trigger when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="switch" onCheckedChange={onCheckedChange} disabled />);

    await user.click(screen.getByRole('switch', { name: 'switch' }));

    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
