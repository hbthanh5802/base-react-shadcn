import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Button } from '@/shared/components/ui/button';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './index';

describe('Dialog', () => {
  it('opens and closes when trigger/close are used', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Open dialog' }));
    expect(screen.getByText('Dialog title')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByText('Dialog title')).not.toBeInTheDocument();
  });
});
