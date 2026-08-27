import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Chip } from './index';

describe('Chip', () => {
  it('renders text content', () => {
    render(<Chip>Label</Chip>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('applies tone and size classes', () => {
    render(
      <Chip tone="redSolid" size="large">
        Label
      </Chip>,
    );
    const chip = screen.getByText('Label');
    expect(chip).toHaveClass('bg-primary-600');
    expect(chip).toHaveClass('h-8');
  });
});
