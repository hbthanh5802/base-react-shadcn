import { useState } from 'react';

import { Breadcrumb } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Design: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <h3 className="text-title-2 text-neutral-1000">Breadcrumb</h3>
      <div className="w-full rounded-lg border border-dashed border-primary-300 p-4">
        <div className="space-y-3">
          <Breadcrumb items={[{ label: 'Tab 1' }]} />
          <Breadcrumb items={[{ label: 'Tab 1' }, { label: 'Tab 2' }]} />
          <Breadcrumb items={[{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }]} />
          <Breadcrumb
            items={[{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }, { label: 'Tab 4' }]}
          />
        </div>
      </div>
    </div>
  ),
};

const pageOptions = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];

const InteractiveStackDemo = () => {
  const [stack, setStack] = useState(['Tab 1']);
  const canAppend = stack.length < pageOptions.length;

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-title-2 text-neutral-1000">Interactive Stack</h3>
      <div className="space-y-3 rounded-lg border border-dashed border-primary-300 p-4">
        <Breadcrumb
          items={stack.map((label) => ({ label, href: '#' }))}
          onNavigate={(index, _item, event) => {
            event.preventDefault();
            setStack((prev) => prev.slice(0, index + 1));
          }}
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md bg-primary-600 px-3 py-2 text-body-2-sb text-neutral-0 disabled:bg-neutral-200 disabled:text-neutral-450"
            disabled={!canAppend}
            onClick={() => {
              if (!canAppend) return;
              setStack((prev) => [...prev, pageOptions[prev.length]]);
            }}
          >
            Append page
          </button>
          <button
            type="button"
            className="rounded-md border border-neutral-200 bg-neutral-0 px-3 py-2 text-body-2-sb text-neutral-1000"
            onClick={() => setStack(['Tab 1'])}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export const InteractiveStack: Story = {
  render: () => <InteractiveStackDemo />,
};
