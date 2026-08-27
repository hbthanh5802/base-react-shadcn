import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { RadioButton, RadioGroup } from './index';

describe('RadioButton', () => {
  it('renders checked state', () => {
    render(
      <RadioGroup value="a">
        <RadioButton value="a" aria-label="radio a" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'radio a' })).toHaveAttribute('data-state', 'checked');
  });

  it('changes selected value when clicked', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="a">
        <RadioButton value="a" aria-label="radio a" />
        <RadioButton value="b" aria-label="radio b" />
      </RadioGroup>,
    );

    await user.click(screen.getByRole('radio', { name: 'radio b' }));
    expect(screen.getByRole('radio', { name: 'radio b' })).toHaveAttribute('data-state', 'checked');
    expect(screen.getByRole('radio', { name: 'radio a' })).toHaveAttribute(
      'data-state',
      'unchecked',
    );
  });
});
