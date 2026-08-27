import { DonutChart, GroupedBarChart } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'UI/Chart',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const groupedBarData = [
  { name: 'QLCL', cases: 220, tasks: 640 },
  { name: 'QLDL', cases: 180, tasks: 420 },
  { name: 'QLTC', cases: 95, tasks: 280 },
  { name: 'QLDKQS', cases: 140, tasks: 350 },
];

const groupedBars = [
  { dataKey: 'cases', label: 'Ho so' },
  { dataKey: 'tasks', label: 'Nhiem vu' },
];

const donutData = [
  { name: 'Success', value: 82 },
  { name: 'Warning', value: 13 },
  { name: 'Error', value: 5 },
];

export const GroupedBarDefault: Story = {
  render: () => (
    <div className="max-w-3xl p-4">
      <GroupedBarChart
        title="Ho so/Nhiem vu theo module"
        subtitle="Thang 05/2026"
        data={groupedBarData}
        bars={groupedBars}
      />
    </div>
  ),
};

export const GroupedBarCustomColors: Story = {
  render: () => (
    <div className="max-w-3xl p-4">
      <GroupedBarChart
        title="Xu ly theo phong ban"
        subtitle="Custom colors"
        data={groupedBarData}
        bars={[
          { dataKey: 'cases', label: 'Ho so', color: '#14b8a6' },
          { dataKey: 'tasks', label: 'Nhiem vu', color: '#8b5cf6' },
        ]}
      />
    </div>
  ),
};

export const DonutDefault: Story = {
  render: () => (
    <div className="max-w-xl p-4">
      <DonutChart title="Suc khoe he thong" subtitle="Realtime" data={donutData} />
    </div>
  ),
};

export const DonutFullPie: Story = {
  render: () => (
    <div className="max-w-xl p-4">
      <DonutChart title="Suc khoe he thong" subtitle="Full pie" data={donutData} innerRadius={0} />
    </div>
  ),
};

export const DesignGallery: Story = {
  render: () => (
    <div className="grid gap-4 p-4 xl:grid-cols-2">
      <GroupedBarChart
        title="Ho so/Nhiem vu theo module"
        subtitle="Thang 05/2026"
        data={groupedBarData}
        bars={groupedBars}
      />
      <DonutChart title="Suc khoe he thong" subtitle="Realtime" data={donutData} />
    </div>
  ),
};
