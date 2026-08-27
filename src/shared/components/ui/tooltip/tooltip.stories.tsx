import { InfoCircle } from 'iconsax-react';

import {
  Tooltip,
  TooltipBubbleContent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TooltipBubbleContent> = {
  title: 'UI/Tooltip',
  component: TooltipBubbleContent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TooltipBubbleContent>;

const items = ['Title 1', 'Title 2', 'Title 3', 'Title 4'];

export const DesignBubbleMatrix: Story = {
  render: () => {
    const matrix = [
      ['bottom-start', 'bottom-center', 'bottom-end'],
      ['right-start', 'left-center', 'left-end'],
      ['right-center', 'right-end', 'left-start'],
      ['top-start', 'top-center', 'top-end'],
    ] as const;

    return (
      <div className="space-y-4 p-4">
        <h3 className="text-title-2 text-neutral-1000">Tooltips</h3>
        <div className="grid grid-cols-3 gap-6 rounded-lg border border-dashed border-primary-300 p-6">
          {matrix.flat().map((key, idx) => {
            const [side, align] = key.split('-') as [
              'top' | 'right' | 'bottom' | 'left',
              'start' | 'center' | 'end',
            ];
            return (
              <TooltipBubbleContent
                key={`${key}-${idx}`}
                side={side}
                align={align}
                label="Label"
                items={items}
              />
            );
          })}
        </div>
      </div>
    );
  },
};

export const HoverBubblePositions: Story = {
  render: () => {
    const positions = [
      ['bottom-start', 'bottom-center', 'bottom-end'],
      ['right-start', 'left-center', 'left-end'],
      ['right-center', 'right-end', 'left-start'],
      ['top-start', 'top-center', 'top-end'],
    ] as const;

    return (
      <TooltipProvider>
        <div className="space-y-4 p-4">
          <h3 className="text-title-2 text-neutral-1000">Hover Bubble Positions</h3>
          <div className="grid grid-cols-3 gap-4 rounded-lg border border-neutral-200 p-4">
            {positions.flat().map((position, index) => {
              const [side, align] = position.split('-') as [
                'top' | 'right' | 'bottom' | 'left',
                'start' | 'center' | 'end',
              ];

              return (
                <div
                  key={`${position}-${index}`}
                  className="space-y-2 rounded-lg border border-neutral-200 p-3"
                >
                  <p className="text-body-3-sb text-neutral-700">
                    {side} - {align}
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 text-body-2-sb text-neutral-700 hover:bg-neutral-100"
                      >
                        <InfoCircle size={16} variant="Bold" />
                        Hover
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side={side} align={align}>
                      <TooltipBubbleContent side={side} align={align} label="Label" items={items} />
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      </TooltipProvider>
    );
  },
};
