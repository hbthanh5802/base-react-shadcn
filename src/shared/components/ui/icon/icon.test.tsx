import { render } from '@testing-library/react';
import { Add } from 'iconsax-react';
import { describe, expect, it } from 'vitest';

import { Icon } from './index';

describe('Icon', () => {
  it('renders icon wrapper', () => {
    const { container } = render(<Icon icon={Add} data-testid="icon" />);
    expect(container.querySelector('span')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
