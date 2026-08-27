import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { DonutChart, GroupedBarChart } from '@/shared/components/ui/chart';
import { CodePreview } from '@/shared/components/ui/code-block';

const groupedBarData = [
  { name: 'QLCL', cases: 220, tasks: 640 },
  { name: 'QLDL', cases: 180, tasks: 420 },
  { name: 'QLTC', cases: 95, tasks: 280 },
  { name: 'QLDKQS', cases: 140, tasks: 350 },
];

const donutData = [
  { name: 'Thành công', value: 82 },
  { name: 'Cảnh báo', value: 13 },
  { name: 'Lỗi', value: 5 },
];

const groupedBarCode = `import { GroupedBarChart } from '@/shared/components/ui/chart';

const data = [
  { name: 'QLCL', cases: 220, tasks: 640 },
  { name: 'QLDL', cases: 180, tasks: 420 },
  { name: 'QLTC', cases: 95, tasks: 280 },
];

<GroupedBarChart
  title="Hồ sơ & Nhiệm vụ theo phân hệ"
  subtitle="Dữ liệu tổng hợp kỳ hiện tại"
  data={data}
  bars={[
    { dataKey: 'cases', label: 'Hồ sơ' },
    { dataKey: 'tasks', label: 'Nhiệm vụ' },
  ]}
/>`;

const donutCode = `import { DonutChart } from '@/shared/components/ui/chart';

const data = [
  { name: 'Thành công', value: 82 },
  { name: 'Cảnh báo', value: 13 },
  { name: 'Lỗi', value: 5 },
];

// Dạng vành khuyên (Donut: innerRadius=60) hoặc Tròn đầy đủ (Pie: innerRadius=0)
<DonutChart
  title="Tỷ lệ trạng thái xử lý"
  subtitle="Biểu đồ tỷ lệ phần trăm"
  data={data}
  innerRadius={60}
/>`;

export const ChartDevPage = () => {
  const [isDonut, setIsDonut] = useState(true);

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Chart" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Chart</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Thành phần biểu đồ tái sử dụng xây dựng trên Recharts, đồng bộ màu sắc với Design System.
        </p>
      </div>

      {/* ── 1. Grouped Bar Chart ── */}
      <CodePreview
        title="1. Biểu đồ cột nhóm (Grouped Bar Chart)"
        description="So sánh nhiều chỉ số trên từng danh mục kèm tooltip và chú giải."
        code={groupedBarCode}
      >
        <GroupedBarChart
          title="Hồ sơ & Nhiệm vụ theo phân hệ"
          subtitle="Dữ liệu tổng hợp kỳ hiện tại"
          data={groupedBarData}
          bars={[
            { dataKey: 'cases', label: 'Hồ sơ' },
            { dataKey: 'tasks', label: 'Nhiệm vụ' },
          ]}
        />
      </CodePreview>

      {/* ── 2. Donut / Pie Chart ── */}
      <CodePreview
        title="2. Biểu đồ tròn / Vành khuyên (Donut / Pie Chart)"
        description="Phân bổ tỷ lệ phần trăm các trạng thái trong hệ thống."
        code={donutCode}
      >
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              size="small"
              variant={isDonut ? 'default' : 'outline'}
              onClick={() => setIsDonut(true)}
            >
              Donut
            </Button>
            <Button
              type="button"
              size="small"
              variant={!isDonut ? 'default' : 'outline'}
              onClick={() => setIsDonut(false)}
            >
              Full Pie
            </Button>
          </div>
          <DonutChart
            title="Tỷ lệ trạng thái xử lý"
            subtitle={isDonut ? 'Dạng vành khuyên (Donut)' : 'Dạng hình tròn đầy đủ (Pie)'}
            data={donutData}
            innerRadius={isDonut ? 60 : 0}
          />
        </div>
      </CodePreview>
    </div>
  );
};

export default ChartDevPage;
