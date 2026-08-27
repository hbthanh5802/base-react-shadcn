import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Breadcrumb } from './index';

describe('Breadcrumb', () => {
  it('renders all breadcrumb labels', () => {
    render(<Breadcrumb items={[{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }]} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('renders breadcrumb navigation landmark', () => {
    render(<Breadcrumb items={[{ label: 'Tab 1' }, { label: 'Tab 2' }]} />);
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
  });

  it('calls onNavigate when clicking non-last item', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(
      <Breadcrumb
        items={[{ label: 'Tab 1', href: '#' }, { label: 'Tab 2' }]}
        onNavigate={onNavigate}
      />,
    );

    await user.click(screen.getByRole('link', { name: 'Tab 1' }));
    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onNavigate.mock.calls[0]?.[0]).toBe(0);
  });
});
