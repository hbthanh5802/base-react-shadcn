import { useState } from 'react';

import { Label } from '@/shared/components/ui/label';

import { Checkbox } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    checked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const rowLabelClass = 'text-title-3 text-neutral-900';
const cellClass = 'flex min-h-16 items-center justify-center rounded-md bg-neutral-25 p-2';

const InteractivePlaygroundDemo = () => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-3">
        <Checkbox
          id="playground-checkbox"
          checked={checked}
          disabled={disabled}
          onCheckedChange={(value) => setChecked(value)}
        />
        <Label htmlFor="playground-checkbox">
          Checked: <span className="font-semibold">{String(checked)}</span>
        </Label>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="text-body-2-md rounded bg-primary-600 px-3 py-2 text-neutral-0"
          onClick={() => setChecked(false)}
        >
          Set unchecked
        </button>
        <button
          type="button"
          className="text-body-2-md rounded bg-primary-600 px-3 py-2 text-neutral-0"
          onClick={() => setChecked('indeterminate')}
        >
          Set indeterminate
        </button>
        <button
          type="button"
          className="text-body-2-md rounded bg-primary-600 px-3 py-2 text-neutral-0"
          onClick={() => setChecked(true)}
        >
          Set checked
        </button>
        <button
          type="button"
          className="text-body-2-md rounded bg-neutral-700 px-3 py-2 text-neutral-0"
          onClick={() => setDisabled((prev) => !prev)}
        >
          Toggle disabled ({String(disabled)})
        </button>
      </div>
    </div>
  );
};

export const DesignStatesMatrix: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <h3 className="text-title-2">Checkbox state matrix</h3>
      <div className="grid grid-cols-[140px_repeat(5,100px)] gap-3">
        <div />
        <div className="text-body-1-md text-center">Default</div>
        <div className="text-body-1-md text-center">Hover</div>
        <div className="text-body-1-md text-center">Pressed</div>
        <div className="text-body-1-md text-center">Focus</div>
        <div className="text-body-1-md text-center">Disable</div>

        <div className={rowLabelClass}>Check</div>
        <div className={cellClass}>
          <Checkbox checked />
        </div>
        <div className={cellClass}>
          <Checkbox checked data-ui-hover="true" />
        </div>
        <div className={cellClass}>
          <Checkbox checked data-ui-pressed="true" />
        </div>
        <div className={cellClass}>
          <Checkbox checked data-ui-focus="true" />
        </div>
        <div className={cellClass}>
          <Checkbox checked disabled />
        </div>

        <div className={rowLabelClass}>Indeterminate</div>
        <div className={cellClass}>
          <Checkbox checked="indeterminate" />
        </div>
        <div className={cellClass}>
          <Checkbox checked="indeterminate" data-ui-hover="true" />
        </div>
        <div className={cellClass}>
          <Checkbox checked="indeterminate" data-ui-pressed="true" />
        </div>
        <div className={cellClass}>
          <Checkbox checked="indeterminate" data-ui-focus="true" />
        </div>
        <div className={cellClass}>
          <Checkbox checked="indeterminate" disabled />
        </div>

        <div className={rowLabelClass}>Uncheck</div>
        <div className={cellClass}>
          <Checkbox />
        </div>
        <div className={cellClass}>
          <Checkbox data-ui-hover="true" />
        </div>
        <div className={cellClass}>
          <Checkbox data-ui-pressed="true" />
        </div>
        <div className={cellClass}>
          <Checkbox data-ui-focus="true" />
        </div>
        <div className={cellClass}>
          <Checkbox disabled />
        </div>
      </div>
    </div>
  ),
};

export const InteractivePlayground: Story = {
  render: () => <InteractivePlaygroundDemo />,
};
