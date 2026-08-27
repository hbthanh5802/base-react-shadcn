import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { cn } from '@/shared/lib/utils';

export interface DonutSegment {
  name: string;
  value: number;
  color?: string;
}

export interface DonutChartProps {
  data: DonutSegment[];
  title?: string;
  subtitle?: string;
  innerRadius?: number | string;
  outerRadius?: number | string;
  height?: number;
  className?: string;
}

const defaultDonutColors = ['#abebae', '#fff29a', '#ff9f9f'];

const colorMap: Record<string, string> = {
  '#22c55e': '#abebae', // green -> pastel green
  '#f59e0b': '#fff29a', // orange -> pastel yellow
  '#e02b2b': '#ff9f9f', // red -> pastel pink/red
};

type PieLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  percent?: number;
  value?: number;
  name?: string;
  index?: number;
  payload?: any;
};

function renderCustomLabelLine(props: PieLabelProps) {
  const { cx, cy, midAngle, outerRadius, index = 0, payload } = props;
  if (cx === undefined || cy === undefined || midAngle === undefined || outerRadius === undefined) {
    return <line x1={0} y1={0} x2={0} y2={0} stroke="none" />;
  }

  const numericRadius =
    typeof outerRadius === 'number' ? outerRadius : parseFloat(String(outerRadius));
  const radians = (-midAngle * Math.PI) / 180;
  const cosVal = Math.cos(radians);
  const sinVal = Math.sin(radians);

  // Starting point (edge of the pie)
  const x1 = cx + numericRadius * cosVal;
  const y1 = cy + numericRadius * sinVal;

  // Normalize angle to [0, 360]
  let normAngle = midAngle % 360;
  if (normAngle < 0) normAngle += 360;
  // Shift top-left labels pointing close to the top vertical axis slightly upwards to avoid collision
  const yShift = normAngle >= 90 && normAngle <= 115 ? -14 : 0;

  // Bend point (extending 30% of outer radius)
  const radialExt = numericRadius * 0.3;
  const x2 = cx + (numericRadius + radialExt) * cosVal;
  const y2 = cy + (numericRadius + radialExt) * sinVal + yShift;

  // End point (horizontal extension of 95% of outer radius)
  const horizontalExt = numericRadius * 0.95;
  const isRight = cosVal >= 0;
  const x3 = x2 + (isRight ? horizontalExt : -horizontalExt);
  const y3 = y2;

  const rawColor = payload?.color ?? defaultDonutColors[index % defaultDonutColors.length];
  const color = colorMap[rawColor.toLowerCase()] ?? rawColor;

  return (
    <polyline
      points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
      stroke={color}
      strokeWidth={1}
      fill="none"
    />
  );
}

function renderCustomLabel(props: PieLabelProps) {
  const { cx, cy, midAngle, outerRadius, value, name, percent = 0, index = 0, payload } = props;
  if (cx === undefined || cy === undefined || midAngle === undefined || outerRadius === undefined) {
    return <g />;
  }

  const numericRadius =
    typeof outerRadius === 'number' ? outerRadius : parseFloat(String(outerRadius));
  const radians = (-midAngle * Math.PI) / 180;
  const cosVal = Math.cos(radians);
  const sinVal = Math.sin(radians);

  // Normalize angle to [0, 360]
  let normAngle = midAngle % 360;
  if (normAngle < 0) normAngle += 360;
  const yShift = normAngle >= 90 && normAngle <= 115 ? -14 : 0;

  // Bend point (extending 30% of outer radius)
  const radialExt = numericRadius * 0.3;
  const x2 = cx + (numericRadius + radialExt) * cosVal;
  const y2 = cy + (numericRadius + radialExt) * sinVal + yShift;

  // End point (outer end of the horizontal line)
  const horizontalExt = numericRadius * 0.95;
  const isRight = cosVal >= 0;
  const x3 = x2 + (isRight ? horizontalExt : -horizontalExt);
  const y3 = y2;

  // Position text anchor at the outer end of the horizontal line (with 4px padding inward)
  const xText = x3 + (isRight ? -4 : 4);
  const textAnchor = isRight ? 'end' : 'start';

  const rawColor = payload?.color ?? defaultDonutColors[index % defaultDonutColors.length];
  const color = colorMap[rawColor.toLowerCase()] ?? rawColor;
  const percentageStr = `${(percent * 100).toFixed(2)}%`;

  return (
    <g>
      <text
        x={xText}
        y={y3}
        textAnchor={textAnchor}
        dominantBaseline="central"
        style={{ fontFamily: 'inherit' }}
      >
        <tspan x={xText} dy="-8" fill="currentColor" className="fill-muted-foreground" fontSize={12} fontWeight={500}>
          {name}
        </tspan>
        <tspan x={xText} dy="18" fill={color} fontSize={12} fontWeight={600}>
          {value}
          <tspan fill={color} fontSize={11} fontWeight={400}>
            {`  ${percentageStr}`}
          </tspan>
        </tspan>
      </text>
    </g>
  );
}

export function DonutChart({
  data,
  title,
  subtitle,
  innerRadius = 0,
  outerRadius = '70%',
  height = 280,
  className,
}: DonutChartProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-4 shadow-xs', className)}>
      {(title || subtitle) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          {title && <h3 className="text-title-2 text-foreground">{title}</h3>}
          {subtitle && <p className="text-body-2-rg text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <ResponsiveContainer width="100%" height={height}>
            <PieChart margin={{ top: 24, right: 75, bottom: 24, left: 75 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                label={renderCustomLabel as any}
                labelLine={renderCustomLabelLine as any}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((segment, index) => {
                  const rawColor =
                    segment.color ?? defaultDonutColors[index % defaultDonutColors.length];
                  const color = colorMap[rawColor.toLowerCase()] ?? rawColor;
                  return <Cell key={segment.name} fill={color} />;
                })}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom HTML Legend */}
        <div className="flex shrink-0 select-none flex-col justify-center gap-3 border-l border-neutral-100 pl-4 pr-4">
          {data.map((segment, index) => {
            const rawColor = segment.color ?? defaultDonutColors[index % defaultDonutColors.length];
            const color = colorMap[rawColor.toLowerCase()] ?? rawColor;
            return (
              <div key={segment.name} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="whitespace-nowrap text-[13px] font-medium text-neutral-600">
                  {segment.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
