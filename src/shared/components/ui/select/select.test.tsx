import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './index';

describe('Select', () => {
  it('opens options and selects one item', async () => {
    const user = userEvent.setup();
    render(
      <Select defaultValue="draft">
        <SelectTrigger aria-label="status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="published">Published</SelectItem>
        </SelectContent>
      </Select>,
    );

    await user.click(screen.getByRole('combobox', { name: 'status' }));
    await user.click(screen.getByRole('option', { name: 'Published' }));
    expect(screen.getByRole('combobox', { name: 'status' })).toHaveTextContent('Published');
  });
});
