import { Chip } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Chip> = {
  title: 'UI/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    children: 'Text',
    tone: 'neutral',
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

const tones = [
  'neutral',
  'neutralDark',
  'blue',
  'green',
  'yellow',
  'pink',
  'purple',
  'rose',
  'gray',
  'teal',
  'orange',
  'mint',
  'redSolid',
  'blueSolid',
  'greenSolid',
] as const;

const sizes = ['large', 'medium', 'small'] as const;

export const DesignGallery: Story = {
  render: () => (
    <div className="space-y-3 rounded-lg border border-dashed border-primary-300 p-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-wrap gap-2">
          {tones.map((tone) => (
            <Chip key={`${size}-${tone}`} tone={tone} size={size}>
              Text
            </Chip>
          ))}
        </div>
      ))}
    </div>
  ),
};
