import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Input } from '@/shared/components/ui/input';

import { Label } from './index';

describe('Label', () => {
  it('connects with form control by htmlFor', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" />
      </div>,
    );

    await user.click(screen.getByText('Email'));
    expect(screen.getByRole('textbox')).toHaveFocus();
  });
});
