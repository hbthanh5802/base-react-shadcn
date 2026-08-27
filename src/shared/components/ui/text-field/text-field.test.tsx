import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TextField } from './index';

describe('TextField', () => {
  it('renders label with required marker', () => {
    render(<TextField label="Label" required placeholder="Select date" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders supporting text', () => {
    render(<TextField label="Label" supportingText="Supporting text" placeholder="Select date" />);
    expect(screen.getByText('Supporting text')).toBeInTheDocument();
  });

  it('renders error text and hides supporting text when error', () => {
    render(
      <TextField
        label="Label"
        error
        errorText="Error text"
        supportingText="Supporting text"
        placeholder="Select date"
      />,
    );
    expect(screen.getByText('Error text')).toBeInTheDocument();
    expect(screen.queryByText('Supporting text')).not.toBeInTheDocument();
  });

  it('supports legacy string error prop', () => {
    render(
      <TextField
        label="Label"
        error="Invalid value"
        supportingText="Supporting text"
        placeholder="Select date"
      />,
    );
    expect(screen.getByText('Invalid value')).toBeInTheDocument();
  });

  it('marks input as invalid when error is true', () => {
    render(<TextField label="Label" error placeholder="Select date" aria-label="date" />);
    expect(screen.getByPlaceholderText('Select date')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders calendar icon when showCalendarIcon is set', () => {
    const { container } = render(<TextField showCalendarIcon placeholder="Select date" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders tags and removes tag on click', async () => {
    const user = userEvent.setup();
    const onRemoveTag = vi.fn();

    render(
      <TextField
        tags={[
          { id: '1', label: 'Tag 1', tone: 'blue' },
          { id: '2', label: 'Tag 2', tone: 'green' },
        ]}
        onRemoveTag={onRemoveTag}
        placeholder="Select date"
      />,
    );

    expect(screen.getByText('Tag 1')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Remove Tag 1' }));
    expect(onRemoveTag).toHaveBeenCalledWith('1');
  });

  it('renders date range inputs', () => {
    render(
      <TextField
        variant="dateRange"
        label="Label"
        required
        showCalendarIcon
        startPlaceholder="Start date"
        endPlaceholder="End date"
      />,
    );

    expect(screen.getByPlaceholderText('Start date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('End date')).toBeInTheDocument();
  });

  it('renders textarea for note size', () => {
    render(<TextField size="note" placeholder="Note" aria-label="note" />);
    expect(screen.getByPlaceholderText('Note').tagName).toBe('TEXTAREA');
  });
});
