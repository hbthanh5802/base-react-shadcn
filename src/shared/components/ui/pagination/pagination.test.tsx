import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from './index';

describe('Pagination', () => {
  it('renders current page as active', () => {
    render(<Pagination page={1} totalPages={10} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
  });

  it('calls onPageChange when clicking another page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={10} onPageChange={onPageChange} />);

    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables prev on first page', () => {
    render(<Pagination page={1} totalPages={10} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });

  it('disables next on last page', () => {
    render(<Pagination page={10} totalPages={10} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('calls page size callback', async () => {
    const onPageSizeChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalPages={10}
        onPageChange={vi.fn()}
        showPageSize
        pageSize={10}
        onPageSizeChange={onPageSizeChange}
      />,
    );

    onPageSizeChange(50);
    expect(onPageSizeChange).toHaveBeenCalledWith(50);
  });

  it('goto page input navigates on Enter', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={10} onPageChange={onPageChange} showGotoPage />);

    const input = screen.getByRole('textbox', { name: 'Go to page' });
    await user.type(input, '5');
    await user.keyboard('{Enter}');

    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it('goto page clamps to totalPages when out of range', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} showGotoPage />);

    const input = screen.getByRole('textbox', { name: 'Go to page' });
    await user.type(input, '99');
    await user.keyboard('{Enter}');

    expect(onPageChange).toHaveBeenCalledWith(5);
  });
});
