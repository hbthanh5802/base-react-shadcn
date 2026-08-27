import { useState } from 'react';

import { Switch } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    checked: false,
    iconMode: 'none',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

const rowLabelClass = 'text-title-3 text-foreground';
const cellClass = 'flex min-h-16 items-center justify-center rounded-md bg-neutral-25 p-2';

const InteractivePlaygroundDemo = () => {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [iconMode, setIconMode] = useState<'none' | 'active' | 'all'>('all');

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-3">
        <Switch
          checked={checked}
          disabled={disabled}
          iconMode={iconMode}
          onCheckedChange={setChecked}
        />
        <p className="text-body-2-md">
          Value: <span className="text-primary-600">{String(checked)}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="text-body-2-md rounded bg-primary-600 px-3 py-2 text-neutral-0"
          onClick={() => setChecked(false)}
        >
          Set inactive
        </button>
        <button
          type="button"
          className="text-body-2-md rounded bg-primary-600 px-3 py-2 text-neutral-0"
          onClick={() => setChecked(true)}
        >
          Set active
        </button>
        <button
          type="button"
          className="text-body-2-md rounded bg-neutral-700 px-3 py-2 text-neutral-0"
          onClick={() => setDisabled((prev) => !prev)}
        >
          Toggle disabled ({String(disabled)})
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="text-body-2-md rounded border border-neutral-300 px-3 py-2"
          onClick={() => setIconMode('none')}
        >
          icon: none
        </button>
        <button
          type="button"
          className="text-body-2-md rounded border border-neutral-300 px-3 py-2"
          onClick={() => setIconMode('active')}
        >
          icon: active
        </button>
        <button
          type="button"
          className="text-body-2-md rounded border border-neutral-300 px-3 py-2"
          onClick={() => setIconMode('all')}
        >
          icon: all
        </button>
      </div>
    </div>
  );
};

export const DesignStatesMatrix: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <h3 className="text-title-2">Switch state matrix</h3>
      <div className="grid grid-cols-[160px_repeat(5,100px)] gap-3">
        <div />
        <div className="text-body-1-md text-center">Default</div>
        <div className="text-body-1-md text-center">Hover</div>
        <div className="text-body-1-md text-center">Focus</div>
        <div className="text-body-1-md text-center">Pressed</div>
        <div className="text-body-1-md text-center">Disable</div>

        <div className={rowLabelClass}>Active</div>
        <div className={cellClass}>
          <Switch checked />
        </div>
        <div className={cellClass}>
          <Switch checked data-ui-hover="true" />
        </div>
        <div className={cellClass}>
          <Switch checked data-ui-focus="true" />
        </div>
        <div className={cellClass}>
          <Switch checked data-ui-pressed="true" />
        </div>
        <div className={cellClass}>
          <Switch checked disabled />
        </div>

        <div className={rowLabelClass}>Active/With icon</div>
        <div className={cellClass}>
          <Switch checked iconMode="active" />
        </div>
        <div className={cellClass}>
          <Switch checked iconMode="active" data-ui-hover="true" />
        </div>
        <div className={cellClass}>
          <Switch checked iconMode="active" data-ui-focus="true" />
        </div>
        <div className={cellClass}>
          <Switch checked iconMode="active" data-ui-pressed="true" />
        </div>
        <div className={cellClass}>
          <Switch checked iconMode="active" disabled />
        </div>

        <div className={rowLabelClass}>Inactive</div>
        <div className={cellClass}>
          <Switch />
        </div>
        <div className={cellClass}>
          <Switch data-ui-hover="true" />
        </div>
        <div className={cellClass}>
          <Switch data-ui-focus="true" />
        </div>
        <div className={cellClass}>
          <Switch data-ui-pressed="true" />
        </div>
        <div className={cellClass}>
          <Switch disabled />
        </div>

        <div className={rowLabelClass}>Inactive/With icon</div>
        <div className={cellClass}>
          <Switch iconMode="all" />
        </div>
        <div className={cellClass}>
          <Switch iconMode="all" data-ui-hover="true" />
        </div>
        <div className={cellClass}>
          <Switch iconMode="all" data-ui-focus="true" />
        </div>
        <div className={cellClass}>
          <Switch iconMode="all" data-ui-pressed="true" />
        </div>
        <div className={cellClass}>
          <Switch iconMode="all" disabled />
        </div>
      </div>
    </div>
  ),
};

export const InteractivePlayground: Story = {
  render: () => <InteractivePlaygroundDemo />,
};
