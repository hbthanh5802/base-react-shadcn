import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { cn } from '@/shared/lib/utils';

export interface BarConfig {
  dataKey: string;
  label: string;
  color?: string;
}

export interface GroupedBarChartProps {
  data: Record<string, string | number>[];
  bars: BarConfig[];
  title?: string;
  subtitle?: string;
  height?: number;
  showLabel?: boolean;
  className?: string;
}

const defaultBarColors = ['#4f8ef7', '#f4a4a4'];

export function GroupedBarChart({
  data,
  bars,
  title,
  subtitle,
  height = 280,
  showLabel = true,
  className,
}: GroupedBarChartProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-4 shadow-xs', className)}>
      {(title || subtitle) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-title-2 text-foreground">{title}</h3>}
            {subtitle && <p className="text-body-2-rg text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: showLabel ? 24 : 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#d1d5db' }} />
          <YAxis tickLine={false} axisLine={{ stroke: '#d1d5db' }} />
          <Tooltip cursor={{ fill: '#f3f4f6' }} />
          <Legend />
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.label}
              fill={bar.color ?? defaultBarColors[index % defaultBarColors.length]}
              radius={[4, 4, 0, 0]}
            >
              {showLabel && (
                <LabelList
                  dataKey={bar.dataKey}
                  position="top"
                  className="fill-neutral-700 text-body-3-sb"
                />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
