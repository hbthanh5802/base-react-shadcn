import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { X } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { Chip } from '@/shared/components/ui/chip';

import { MultiSelect } from './index';

const options = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Node.js', value: 'nodejs' },
];

describe('MultiSelect', () => {
  it('renders placeholder when no options are selected', () => {
    render(
      <MultiSelect
        options={options}
        value={[]}
        onChange={() => {}}
        placeholder="Chọn kỹ năng..."
      />,
    );
    expect(screen.getByText('Chọn kỹ năng...')).toBeInTheDocument();
  });

  it('opens options list when clicked', async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={options}
        value={[]}
        onChange={() => {}}
        placeholder="Chọn kỹ năng..."
      />,
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    expect(screen.getByPlaceholderText('Tìm kiếm...')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('calls onChange with correct value when an option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={[]}
        onChange={handleChange}
        placeholder="Chọn kỹ năng..."
      />,
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    const option = screen.getByText('TypeScript');
    await user.click(option);

    expect(handleChange).toHaveBeenCalledWith(['typescript']);
  });

  it('removes option when clicking the close button on a custom rendered chip', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { container } = render(
      <MultiSelect
        options={options}
        value={['react']}
        onChange={handleChange}
        placeholder="Chọn kỹ năng..."
        renderSelected={(selected, onRemove) => (
          <>
            {selected.map((opt) => (
              <Chip key={opt.value} tone="neutral" size="small">
                <span>{opt.label}</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(e, opt.value);
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="close-btn"
                >
                  <X className="h-3 w-3" />
                </span>
              </Chip>
            ))}
          </>
        )}
      />,
    );

    const chipText = screen.getByText('React');
    expect(chipText).toBeInTheDocument();

    const closeBtn = container.querySelector('.close-btn');
    expect(closeBtn).toBeInTheDocument();
    if (closeBtn) {
      await user.click(closeBtn);
    }

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('supports custom selected options rendering in trigger', () => {
    const renderSelected = (selected: typeof options) => (
      <span>CustomSelected: {selected.map((o) => o.label).join(', ')}</span>
    );

    render(
      <MultiSelect
        options={options}
        value={['react', 'typescript']}
        onChange={() => {}}
        renderSelected={renderSelected}
      />,
    );

    expect(screen.getByText('CustomSelected: React, TypeScript')).toBeInTheDocument();
  });

  it('supports custom dropdown item rendering', async () => {
    const user = userEvent.setup();
    const renderItem = (opt: (typeof options)[0], isSelected: boolean) => (
      <div data-testid={`custom-${opt.value}`}>
        {opt.label} - {isSelected ? 'selected' : 'not'}
      </div>
    );

    const { container } = render(
      <MultiSelect
        options={options}
        value={['react']}
        onChange={() => {}}
        renderItem={renderItem}
      />,
    );

    const trigger = container.querySelector('button');
    if (trigger) {
      await user.click(trigger);
    }

    expect(screen.getByTestId('custom-react')).toHaveTextContent('React - selected');
    expect(screen.getByTestId('custom-typescript')).toHaveTextContent('TypeScript - not');
  });

  it('disables other unselected options when maxSelect limit is reached', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MultiSelect
        options={options}
        value={['react', 'typescript']}
        onChange={() => {}}
        maxSelect={2}
      />,
    );

    const trigger = container.querySelector('button');
    if (trigger) {
      await user.click(trigger);
    }

    const reactItem = screen.getByText('React').closest('[role="menuitem"]');
    const typescriptItem = screen.getByText('TypeScript').closest('[role="menuitem"]');
    const nodejsItem = screen.getByText('Node.js').closest('[role="menuitem"]');

    expect(reactItem).not.toHaveAttribute('data-disabled');
    expect(typescriptItem).not.toHaveAttribute('data-disabled');
    expect(nodejsItem).toHaveAttribute('data-disabled');

    expect(screen.queryByText('Chọn tất cả')).not.toBeInTheDocument();
  });
});
