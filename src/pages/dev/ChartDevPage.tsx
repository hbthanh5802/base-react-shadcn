import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { DonutChart, GroupedBarChart } from '@/shared/components/ui/chart';

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

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Biểu đồ cột nhóm (Grouped Bar Chart)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            So sánh nhiều chỉ số trên từng danh mục kèm tooltip và chú giải.
          </p>
        </div>
        <div className="pt-2">
          <GroupedBarChart
            title="Hồ sơ & Nhiệm vụ theo phân hệ"
            subtitle="Dữ liệu tổng hợp kỳ hiện tại"
            data={groupedBarData}
            bars={[
              { dataKey: 'cases', label: 'Hồ sơ' },
              { dataKey: 'tasks', label: 'Nhiệm vụ' },
            ]}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <div>
            <h2 className="text-title-1 font-semibold text-foreground">2. Biểu đồ tròn / Vành khuyên (Donut / Pie Chart)</h2>
            <p className="text-body-2-rg text-muted-foreground mt-0.5">
              Phân bổ tỷ lệ phần trăm các trạng thái trong hệ thống.
            </p>
          </div>
          <div className="flex gap-2">
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
        </div>
        <div className="pt-2">
          <DonutChart
            title="Tỷ lệ trạng thái xử lý"
            subtitle={isDonut ? 'Dạng vành khuyên (Donut)' : 'Dạng hình tròn đầy đủ (Pie)'}
            data={donutData}
            innerRadius={isDonut ? 60 : 0}
          />
        </div>
      </section>
    </div>
  );
};

export default ChartDevPage;
