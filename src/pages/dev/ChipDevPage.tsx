import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Chip } from '@/shared/components/ui/chip';
import { StatusPill } from '@/shared/components/ui/status-pill';

const lightTones = [
  'neutral',
  'gray',
  'blue',
  'green',
  'yellow',
  'pink',
  'purple',
  'rose',
  'teal',
  'orange',
  'mint',
] as const;

const darkTones = [
  'neutralDark',
  'redSolid',
  'blueSolid',
  'greenSolid',
  'yellowSolid',
  'orangeSolid',
  'tealSolid',
  'roseSolid',
] as const;

const sizes = ['large', 'medium', 'small'] as const;

const dynamicColors = [
  { label: 'Đang xử lý', color: '#1570EF' },
  { label: 'Hoàn thành', color: '#12B76A' },
  { label: 'Cảnh báo', color: '#F79009' },
  { label: 'Lỗi / Hủy', color: '#F04438' },
  { label: 'Tím mộng mơ', color: '#7A5AF8' },
  { label: 'Xanh ngọc', color: '#0BA5EC' },
];

export const ChipDevPage = () => {
  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Chip" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Chip & StatusPill</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Thẻ nhãn phân loại nội dung, hỗ trợ cả bảng màu định sẵn (Chip) và mã màu Hex tùy biến (StatusPill).
        </p>
      </div>

      {/* StatusPill Section */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. StatusPill (Mã màu động - Dynamic Hex)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            Tự động tính toán màu nền và viền từ mã màu Hex tùy chỉnh.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <h3 className="text-body-1-sb text-foreground">Mã màu tùy biến:</h3>
            <div className="flex flex-wrap gap-3">
              {dynamicColors.map((item) => (
                <StatusPill key={item.color} color={item.color} label={item.label} />
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-body-1-sb text-foreground">Các kiểu dáng (Variants):</h3>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill color="#1570EF" variant="light" label="Light (Mặc định)" />
              <StatusPill color="#1570EF" variant="filled" label="Filled (Đậm)" />
              <StatusPill color="#1570EF" variant="outline" label="Outline" />
              <StatusPill color="#1570EF" variant="dot" label="With Dot" />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-body-1-sb text-foreground">Kích thước (Sizes):</h3>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill size="small" color="#1570EF" label="Small (h-6)" />
              <StatusPill size="medium" color="#1570EF" label="Medium (h-7)" />
              <StatusPill size="large" color="#1570EF" label="Large (h-9)" />
            </div>
          </div>
        </div>
      </section>

      {/* Chip Light Tones */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Chip màu sáng (Light Tones)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Chữ đậm trên nền màu pastel nhẹ nhàng.</p>
        </div>
        <div className="space-y-4 pt-2">
          {sizes.map((size) => (
            <div key={size} className="space-y-2">
              <p className="text-caption-1-sb capitalize text-muted-foreground">{size}</p>
              <div className="flex flex-wrap gap-2">
                {lightTones.map((tone) => (
                  <Chip key={`${size}-${tone}`} tone={tone} size={size}>
                    {tone}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chip Dark / Solid Tones */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">3. Chip màu đậm (Solid Tones)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Chữ trắng trên nền màu đậm nổi bật.</p>
        </div>
        <div className="space-y-4 pt-2">
          {sizes.map((size) => (
            <div key={size} className="space-y-2">
              <p className="text-caption-1-sb capitalize text-muted-foreground">{size}</p>
              <div className="flex flex-wrap gap-2">
                {darkTones.map((tone) => (
                  <Chip key={`${size}-${tone}`} tone={tone} size={size}>
                    {tone}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChipDevPage;
