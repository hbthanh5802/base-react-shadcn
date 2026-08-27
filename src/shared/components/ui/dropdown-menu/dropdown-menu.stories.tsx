import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DropdownMenu> = {
  title: 'UI/Dropdown Menu',
  component: DropdownMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const DropdownMenuDemo = () => {
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <div className="p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View detail</DropdownMenuItem>
          <DropdownMenuItem>Edit item</DropdownMenuItem>
          <DropdownMenuCheckboxItem checked={bookmarked} onCheckedChange={setBookmarked}>
            Bookmark
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const Basic: Story = {
  render: () => <DropdownMenuDemo />,
};
