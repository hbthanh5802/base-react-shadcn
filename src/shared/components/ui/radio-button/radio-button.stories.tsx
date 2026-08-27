import { useState } from 'react';

import { Label } from '@/shared/components/ui/label';

import { RadioButton, RadioGroup } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof RadioButton> = {
  title: 'UI/Radio Button',
  component: RadioButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

const rowLabelClass = 'text-title-3 text-neutral-1000';
const cellClass = 'flex min-h-16 items-center justify-center rounded-md bg-neutral-25 p-2';

const MatrixRadio = ({
  checked = false,
  disabled = false,
  className,
  ...props
}: Omit<React.ComponentProps<typeof RadioButton>, 'value'> & { checked?: boolean }) => (
  <RadioGroup value={checked ? 'on' : undefined}>
    <RadioButton value="on" disabled={disabled} className={className} {...props} />
  </RadioGroup>
);

export const DesignStateMatrix: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <h3 className="text-title-2 text-neutral-1000">Radio button</h3>
      <div className="grid grid-cols-[140px_repeat(5,92px)] gap-3">
        <div />
        <div className="text-body-1-md text-center">Default</div>
        <div className="text-body-1-md text-center">Hover</div>
        <div className="text-body-1-md text-center">Pressed</div>
        <div className="text-body-1-md text-center">Focus</div>
        <div className="text-body-1-md text-center">Disable</div>

        <div className={rowLabelClass}>Check</div>
        <div className={cellClass}>
          <MatrixRadio checked />
        </div>
        <div className={cellClass}>
          <MatrixRadio checked data-ui-hover="true" />
        </div>
        <div className={cellClass}>
          <MatrixRadio checked data-ui-pressed="true" />
        </div>
        <div className={cellClass}>
          <MatrixRadio checked data-ui-focus="true" />
        </div>
        <div className={cellClass}>
          <MatrixRadio checked disabled />
        </div>

        <div className={rowLabelClass}>Uncheck</div>
        <div className={cellClass}>
          <MatrixRadio />
        </div>
        <div className={cellClass}>
          <MatrixRadio data-ui-hover="true" />
        </div>
        <div className={cellClass}>
          <MatrixRadio data-ui-pressed="true" />
        </div>
        <div className={cellClass}>
          <MatrixRadio data-ui-focus="true" />
        </div>
        <div className={cellClass}>
          <MatrixRadio disabled />
        </div>
      </div>
    </div>
  ),
};

const InteractiveDemo = () => {
  const [value, setValue] = useState('a');

  return (
    <RadioGroup value={value} onValueChange={setValue} className="gap-3">
      <div className="flex items-center space-x-2">
        <RadioButton value="a" id="a" />
        <Label htmlFor="a">Option A</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioButton value="b" id="b" />
        <Label htmlFor="b">Option B</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioButton value="c" id="c" />
        <Label htmlFor="c">Option C</Label>
      </div>
      <p className="pt-2 text-body-2-rg text-neutral-700">Selected: {value}</p>
    </RadioGroup>
  );
};

export const InteractiveGroup: Story = {
  render: () => (
    <div className="max-w-sm p-4">
      <InteractiveDemo />
    </div>
  ),
};
