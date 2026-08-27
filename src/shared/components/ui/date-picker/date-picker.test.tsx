import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DatePickerPanel } from './date-picker-panel';

describe('DatePickerPanel', () => {
  it('renders weekday headers for day mode', () => {
    render(<DatePickerPanel mode="day" />);
    expect(screen.getByText('T2')).toBeInTheDocument();
    expect(screen.getByText('CN')).toBeInTheDocument();
  });

  it('calls onSelect when a day is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<DatePickerPanel mode="day" onSelect={onSelect} />);

    await user.click(screen.getByRole('button', { name: '14' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('renders month grid', () => {
    render(<DatePickerPanel mode="month" />);
    expect(screen.getByText('Tháng 1')).toBeInTheDocument();
    expect(screen.getByText('Tháng 12')).toBeInTheDocument();
  });

  it('renders quarter grid', () => {
    render(<DatePickerPanel mode="quarter" />);
    expect(screen.getByText('Quý 1')).toBeInTheDocument();
    expect(screen.getByText('Quý 4')).toBeInTheDocument();
  });
});
