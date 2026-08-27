import { X } from 'lucide-react';
import { useState } from 'react';

import { Checkbox } from '@/shared/components/ui/checkbox';
import { Chip } from '@/shared/components/ui/chip';

import { MultiSelect } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MultiSelect> = {
  title: 'UI/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const options = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Tailwind CSS', value: 'tailwind' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Node.js', value: 'nodejs' },
];

const MultiSelectDemo = () => {
  const [value, setValue] = useState<string[]>(['react']);
  return (
    <div className="w-96 p-4">
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Chọn công nghệ..."
      />
    </div>
  );
};

export const Basic: Story = {
  render: () => <MultiSelectDemo />,
};

const CustomDemo = () => {
  const [value, setValue] = useState<string[]>(['react', 'typescript']);
  return (
    <div className="w-96 p-4">
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Chọn công nghệ..."
        renderSelected={(selected, onRemove) => (
          <div className="flex flex-wrap items-center gap-1.5">
            {selected.map((opt) => (
              <Chip
                key={opt.value}
                tone="neutral"
                size="small"
                className="flex items-center gap-1 border border-neutral-200 bg-neutral-100 text-neutral-800"
              >
                <span className="max-w-[120px] truncate">{opt.label}</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(e, opt.value);
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="cursor-pointer rounded-full p-0.5 hover:bg-neutral-250"
                >
                  <X className="h-3 w-3 text-neutral-600" />
                </span>
              </Chip>
            ))}
          </div>
        )}
        renderItem={(opt, isSelected) => (
          <div className="flex items-center gap-2.5">
            <Checkbox
              checked={isSelected}
              disabled={opt.disabled}
              className="pointer-events-none"
            />
            <span>{opt.label}</span>
          </div>
        )}
      />
    </div>
  );
};

export const Custom: Story = {
  render: () => <CustomDemo />,
};

const MaxSelectDemo = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="w-96 p-4">
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Chọn tối đa 2 công nghệ..."
        maxSelect={2}
      />
    </div>
  );
};

export const MaxSelectionLimit: Story = {
  render: () => <MaxSelectDemo />,
};
