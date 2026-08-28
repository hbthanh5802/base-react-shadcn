import { Check, Copy, Palette, RefreshCw, Sliders, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { CodePreview } from '@/shared/components/ui/code-block';
import {
  ColorPicker,
  ColorPickerPanel,
  ColorPreset,
  hexToHsva,
  HSVA,
  hsvaToHex,
} from '@/shared/components/ui/color-picker';
import { notify } from '@/shared/components/ui/toast';

const brandPresets: ColorPreset[] = [
  {
    label: 'Brand Colors',
    colors: ['#059669', '#10B981', '#34D399', '#0284C7', '#38BDF8', '#6366F1', '#8B5CF6'],
  },
  {
    label: 'Status & Alerts',
    colors: ['#16A34A', '#EAB308', '#F97316', '#DC2626', '#475569'],
  },
];

export const ColorPickerDevPage = () => {
  // Demo 1 State (Basic Popover)
  const [basicColor, setBasicColor] = useState('#059669');

  // Demo 2 State (Alpha Opacity)
  const [alphaColor, setAlphaColor] = useState('rgba(16, 185, 129, 0.75)');

  // Demo 3 State (Inline ColorPicker)
  const [inlineHsva, setInlineHsva] = useState<HSVA>({ h: 215, s: 85, v: 90, a: 1 });

  // Demo 4 State (Custom Presets & Recent)
  const [presetColor, setPresetColor] = useState('#6366F1');

  // Demo 5 State (Sizes & States)
  const [sizeSmallColor, setSizeSmallColor] = useState('#3B82F6');
  const [sizeMedColor, setSizeMedColor] = useState('#10B981');
  const [sizeLargeColor, setSizeLargeColor] = useState('#F59E0B');

  // Demo 6 State (Custom Trigger)
  const [customTriggerColor, setCustomTriggerColor] = useState('#EC4899');

  // Demo 7 State (Live Theme Preview Form)
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#059669',
    backgroundColor: '#0F172A',
    cardColor: '#1E293B',
    textColor: '#F8FAFC',
    accentColor: '#38BDF8',
  });

  return (
    <div className="space-y-8 pb-16">
      <DevBreadcrumb label="ColorPicker" />

      {/* Header Introduction */}
      <div className="space-y-2">
        <h1 className="text-display-2 text-foreground font-bold flex items-center gap-2">
          <Palette className="size-8 text-primary" />
          ColorPicker Component
        </h1>
        <p className="text-body-1-rg text-muted-foreground max-w-3xl">
          Component bộ chọn màu đa năng hỗ trợ canvas sắc độ 2D mượt mà, thanh trượt Hue 360°, thanh
          trượt Alpha Opacity, chuyển đổi linh hoạt HEX/RGB/HSL, công cụ hút màu màn hình EyeDropper,
          bảng màu preset và tích hợp form hoàn hảo.
        </p>
      </div>

      {/* ── 1. Basic Popover ColorPicker ── */}
      <CodePreview
        title="1. Bộ chọn màu Cơ bản (Default Popover)"
        description="Dạng Popover trigger gọn gàng. Click vào ô để mở panel chọn màu 2D, Hue slider và ô nhập mã HEX."
        code={`import { useState } from 'react';
import { ColorPicker } from '@/shared/components/ui/color-picker';

export const BasicColorPickerDemo = () => {
  const [color, setColor] = useState('#059669');

  return (
    <div className="flex items-center gap-4">
      <ColorPicker
        value={color}
        onChange={(newColor) => setColor(newColor)}
        clearable
      />
      <span className="text-sm font-mono">Màu đang chọn: {color}</span>
    </div>
  );
};`}
      >
        <div className="flex flex-wrap items-center gap-6">
          <ColorPicker
            value={basicColor}
            onChange={(newColor) => setBasicColor(newColor)}
            clearable
          />
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-2.5 shadow-xs">
            <div
              className="size-8 rounded-lg border border-border shadow-inner"
              style={{ backgroundColor: basicColor }}
            />
            <div>
              <p className="text-body-2-sb font-mono text-foreground">{basicColor}</p>
              <p className="text-caption-2-rg text-muted-foreground">Màu đã chọn</p>
            </div>
          </div>
        </div>
      </CodePreview>

      {/* ── 2. Alpha / Opacity ColorPicker ── */}
      <CodePreview
        title="2. Hỗ trợ Độ trong suốt (Alpha / Opacity Slider)"
        description="Kích hoạt prop showAlpha={true} để bật thanh trượt Alpha và nhập giá trị RGBA/HEX8 kèm độ trong suốt."
        code={`import { useState } from 'react';
import { ColorPicker } from '@/shared/components/ui/color-picker';

export const AlphaColorPickerDemo = () => {
  const [rgbaColor, setRgbaColor] = useState('rgba(16, 185, 129, 0.75)');

  return (
    <ColorPicker
      value={rgbaColor}
      onChange={(val) => setRgbaColor(val)}
      showAlpha
      format="rgb"
    />
  );
};`}
      >
        <div className="flex flex-wrap items-center gap-6">
          <ColorPicker
            value={alphaColor}
            onChange={(newColor) => setAlphaColor(newColor)}
            showAlpha
            format="rgb"
            clearable
          />
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-2.5 shadow-xs">
            <div
              className="relative size-9 rounded-lg border border-border shadow-inner overflow-hidden"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #ccc 25%, transparent 25%),
                  linear-gradient(-45deg, #ccc 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #ccc 75%),
                  linear-gradient(-45deg, transparent 75%, #ccc 75%)
                `,
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
              }}
            >
              <div className="size-full" style={{ backgroundColor: alphaColor }} />
            </div>
            <div>
              <p className="text-body-2-sb font-mono text-foreground">{alphaColor}</p>
              <p className="text-caption-2-rg text-muted-foreground">Giá trị màu kèm Alpha</p>
            </div>
          </div>
        </div>
      </CodePreview>

      {/* ── 3. Inline ColorPicker ── */}
      <CodePreview
        title="3. Chế độ Nhúng Trực tiếp (Inline ColorPicker)"
        description="Nhúng toàn bộ panel chọn màu trực tiếp vào trang bằng prop inline={true} (phù hợp cho ứng dụng vẽ, canvas, thiết kế đồ họa)."
        code={`import { useState } from 'react';
import { ColorPicker } from '@/shared/components/ui/color-picker';

export const InlineColorPickerDemo = () => {
  const [color, setColor] = useState('#3B82F6');

  return (
    <ColorPicker
      inline
      value={color}
      onChange={(val) => setColor(val)}
      showAlpha
    />
  );
};`}
      >
        <div className="flex flex-wrap gap-8 items-start">
          <div className="rounded-2xl border border-border bg-muted/20 p-4 shadow-sm">
            <ColorPickerPanel
              color={inlineHsva}
              onChange={(next) => setInlineHsva(next)}
              showAlpha
              showEyeDropper
              showPresets
            />
          </div>

          <div className="space-y-4 max-w-sm">
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <span className="text-title-2 font-semibold text-foreground">
                Xem trước đối tượng vẽ
              </span>
              <div
                className="h-32 w-full rounded-lg border border-border/80 shadow-md transition-colors flex items-center justify-center text-center font-semibold text-white p-3"
                style={{
                  backgroundColor: hsvaToHex(inlineHsva, true),
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                }}
              >
                Màu đối tượng trực quan
              </div>
              <div className="grid grid-cols-2 gap-2 text-caption-1-rg font-mono">
                <div className="rounded-md bg-muted/50 p-2">
                  HEX: {hsvaToHex(inlineHsva, true)}
                </div>
                <div className="rounded-md bg-muted/50 p-2">
                  Alpha: {Math.round(inlineHsva.a * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </CodePreview>

      {/* ── 4. Custom Presets & Recent Colors ── */}
      <CodePreview
        title="4. Tùy biến Bảng màu Mẫu (Custom Presets & Recent Colors)"
        description="Tùy biến danh sách màu có sẵn theo bộ nhận diện thương hiệu và tự động lưu lại các màu đã chọn gần đây."
        code={`import { useState } from 'react';
import { ColorPicker, type ColorPreset } from '@/shared/components/ui/color-picker';

const brandPresets: ColorPreset[] = [
  {
    label: 'Brand Colors',
    colors: ['#059669', '#10B981', '#34D399', '#0284C7', '#38BDF8', '#6366F1', '#8B5CF6'],
  },
  {
    label: 'Status & Alerts',
    colors: ['#16A34A', '#EAB308', '#F97316', '#DC2626', '#475569'],
  },
];

export const PresetColorPickerDemo = () => {
  const [color, setColor] = useState('#6366F1');

  return (
    <ColorPicker
      value={color}
      onChange={(val) => setColor(val)}
      presets={brandPresets}
      showRecentColors
      maxRecentColors={8}
    />
  );
};`}
      >
        <div className="flex flex-wrap items-center gap-6">
          <ColorPicker
            value={presetColor}
            onChange={(val) => setPresetColor(val)}
            presets={brandPresets}
            showRecentColors
            maxRecentColors={8}
            clearable
          />
          <div className="text-body-2-rg text-muted-foreground">
            Mở panel để thấy các nhóm bảng màu thương hiệu tùy chỉnh và danh sách màu vừa dùng.
          </div>
        </div>
      </CodePreview>

      {/* ── 5. Sizes & Disabled / Readonly ── */}
      <CodePreview
        title="5. Kích thước (Small, Medium, Large) & Trạng thái Khóa"
        description="Hỗ trợ 3 kích thước chuẩn: small (32px), medium (40px), large (48px) cùng các cờ disabled và readOnly."
        code={`import { ColorPicker } from '@/shared/components/ui/color-picker';

export const ColorPickerSizesDemo = () => {
  return (
    <div className="space-y-3">
      <ColorPicker size="small" defaultValue="#3B82F6" />
      <ColorPicker size="medium" defaultValue="#10B981" />
      <ColorPicker size="large" defaultValue="#F59E0B" />
      <ColorPicker defaultValue="#94A3B8" disabled />
      <ColorPicker defaultValue="#94A3B8" readOnly />
    </div>
  );
};`}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1.5">
            <span className="text-caption-1-sb text-muted-foreground">Size Small (32px)</span>
            <ColorPicker
              size="small"
              value={sizeSmallColor}
              onChange={(val) => setSizeSmallColor(val)}
              clearable
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-caption-1-sb text-muted-foreground">Size Medium (40px - Default)</span>
            <ColorPicker
              size="medium"
              value={sizeMedColor}
              onChange={(val) => setSizeMedColor(val)}
              clearable
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-caption-1-sb text-muted-foreground">Size Large (48px)</span>
            <ColorPicker
              size="large"
              value={sizeLargeColor}
              onChange={(val) => setSizeLargeColor(val)}
              clearable
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-caption-1-sb text-muted-foreground">Trạng thái Disabled</span>
            <ColorPicker defaultValue="#94A3B8" disabled />
          </div>

          <div className="space-y-1.5">
            <span className="text-caption-1-sb text-muted-foreground">Trạng thái ReadOnly</span>
            <ColorPicker defaultValue="#059669" readOnly />
          </div>
        </div>
      </CodePreview>

      {/* ── 6. Custom Trigger Swatch ── */}
      <CodePreview
        title="6. Tùy biến Nút Kích hoạt (Custom Trigger Button)"
        description="Sử dụng prop renderTrigger để tạo các kiểu nút trigger dạng viên tròn hoặc ô swatch đơn giản theo sở thích."
        code={`import { useState } from 'react';
import { ColorPicker } from '@/shared/components/ui/color-picker';

export const CustomTriggerDemo = () => {
  const [color, setColor] = useState('#EC4899');

  return (
    <ColorPicker
      value={color}
      onChange={(val) => setColor(val)}
      renderTrigger={({ color, onClick }) => (
        <button
          type="button"
          onClick={onClick}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm hover:scale-105 transition-transform"
        >
          <span className="size-5 rounded-full border shadow-inner" style={{ backgroundColor: color }} />
          <span className="font-mono text-xs font-semibold">{color}</span>
        </button>
      )}
    />
  );
};`}
      >
        <div className="flex flex-wrap items-center gap-6">
          <ColorPicker
            value={customTriggerColor}
            onChange={(val) => setCustomTriggerColor(val)}
            renderTrigger={({ color, onClick }) => (
              <button
                type="button"
                onClick={onClick}
                className="flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 shadow-sm transition-all hover:scale-105 hover:border-primary cursor-pointer"
              >
                <span
                  className="size-6 rounded-full border border-white/80 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="font-mono text-body-2-sb text-foreground">{color}</span>
                <Sparkles size={14} className="text-amber-500" />
              </button>
            )}
          />
        </div>
      </CodePreview>

      {/* ── 7. Live Theme Customizer Form ── */}
      <CodePreview
        title="7. Ứng dụng Thực tế: Form Cá nhân hóa Theme Giao diện (Live Preview)"
        description="Kết hợp nhiều ColorPicker để người dùng tự do phối màu giao diện, xem trước kết quả trực tiếp thời gian thực."
        code={`import { useState } from 'react';
import { ColorPicker } from '@/shared/components/ui/color-picker';

export const LiveThemeCustomizerDemo = () => {
  const [theme, setTheme] = useState({
    primary: '#059669',
    background: '#0F172A',
    card: '#1E293B',
    text: '#F8FAFC',
    accent: '#38BDF8',
  });

  return (
    // Kết hợp nhiều ColorPicker cập nhật theme
  );
};`}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Controls Form Column */}
          <div className="space-y-4 rounded-xl border border-border bg-muted/20 p-4 lg:col-span-6">
            <span className="text-title-2 font-semibold text-foreground flex items-center gap-2">
              <Sliders size={18} className="text-primary" />
              Cài đặt Bảng màu
            </span>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-caption-1-sb text-muted-foreground">Màu chủ đạo (Primary)</label>
                <ColorPicker
                  value={themeSettings.primaryColor}
                  onChange={(val) => setThemeSettings((prev) => ({ ...prev, primaryColor: val }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-caption-1-sb text-muted-foreground">Màu điểm nhấn (Accent)</label>
                <ColorPicker
                  value={themeSettings.accentColor}
                  onChange={(val) => setThemeSettings((prev) => ({ ...prev, accentColor: val }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-caption-1-sb text-muted-foreground">Màu nền chính (Background)</label>
                <ColorPicker
                  value={themeSettings.backgroundColor}
                  onChange={(val) =>
                    setThemeSettings((prev) => ({ ...prev, backgroundColor: val }))
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-caption-1-sb text-muted-foreground">Màu thẻ (Card Surface)</label>
                <ColorPicker
                  value={themeSettings.cardColor}
                  onChange={(val) => setThemeSettings((prev) => ({ ...prev, cardColor: val }))}
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-caption-1-sb text-muted-foreground">Màu văn bản (Text)</label>
                <ColorPicker
                  value={themeSettings.textColor}
                  onChange={(val) => setThemeSettings((prev) => ({ ...prev, textColor: val }))}
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Button
                variant="outline"
                size="small"
                onClick={() => {
                  setThemeSettings({
                    primaryColor: '#059669',
                    backgroundColor: '#0F172A',
                    cardColor: '#1E293B',
                    textColor: '#F8FAFC',
                    accentColor: '#38BDF8',
                  });
                  notify.info('Đã đặt lại bảng màu mặc định.');
                }}
              >
                <RefreshCw size={14} className="mr-1.5" />
                Đặt lại mặc định
              </Button>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              className="flex-1 rounded-2xl p-6 shadow-xl border border-white/10 transition-colors flex flex-col justify-between"
              style={{
                backgroundColor: themeSettings.backgroundColor,
                color: themeSettings.textColor,
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-bold text-lg">Bản xem trước Giao diện</span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{
                      backgroundColor: themeSettings.primaryColor,
                      color: '#fff',
                    }}
                  >
                    Active Pro
                  </span>
                </div>

                <div
                  className="rounded-xl p-4 shadow-sm space-y-2 border border-white/5"
                  style={{ backgroundColor: themeSettings.cardColor }}
                >
                  <p className="font-semibold text-base">Thẻ Thông tin Dự án</p>
                  <p className="text-sm opacity-80">
                    Bố cục và màu sắc giao diện được đồng bộ theo thời gian thực dựa vào các ColorPicker bên cạnh.
                  </p>
                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
                      style={{ backgroundColor: themeSettings.primaryColor }}
                    >
                      Bấm vào đây
                    </button>
                    <button
                      type="button"
                      className="rounded-lg px-3.5 py-1.5 text-xs font-semibold border transition-opacity hover:opacity-90 cursor-pointer"
                      style={{
                        borderColor: themeSettings.accentColor,
                        color: themeSettings.accentColor,
                      }}
                    >
                      Chi tiết thêm
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs opacity-50 pt-4">
                Design System • Live Palette Demonstration
              </p>
            </div>
          </div>
        </div>
      </CodePreview>

      {/* ── 8. Confirmation Mode (needConfirm) ── */}
      <CodePreview
        title="8. Chế độ Yêu cầu Xác nhận (needConfirm Props)"
        description="Khi bật needConfirm={true}, việc chọn màu sẽ ở trạng thái chờ (pending). Người dùng cần bấm 'Xác nhận' để áp dụng màu hoặc bấm 'Hủy' để quay lại màu ban đầu."
        code={`import { useState } from 'react';
import { ColorPicker } from '@/shared/components/ui/color-picker';
import { notify } from '@/shared/components/ui/toast';

export const ConfirmColorPickerDemo = () => {
  const [color, setColor] = useState('#7C3AED');

  return (
    <ColorPicker
      value={color}
      needConfirm
      confirmText="Lưu màu"
      cancelText="Đóng lại"
      onConfirm={(newColor) => {
        setColor(newColor);
        notify.success(\`Đã xác nhận màu mới: \${newColor}\`);
      }}
      onCancel={() => {
        notify.info('Đã hủy thay đổi màu');
      }}
    />
  );
};`}
      >
        <div className="flex flex-wrap items-center gap-6">
          <ColorPicker
            defaultValue="#7C3AED"
            needConfirm
            confirmText="Lưu màu"
            cancelText="Đóng lại"
            onConfirm={(newColor) => {
              notify.success(`Đã xác nhận màu mới: ${newColor}`);
            }}
            onCancel={() => {
              notify.info('Đã hủy thay đổi màu');
            }}
          />
          <div className="text-body-2-rg text-muted-foreground">
            Bấm vào ô để thử chọn màu khác, sau đó bấm <strong>Lưu màu</strong> hoặc <strong>Đóng lại</strong> để kiểm tra cơ chế commit / rollback.
          </div>
        </div>
      </CodePreview>

      {/* ── 9. Minimal Mode (Không có Color Palette / Swatches) ── */}
      <CodePreview
        title="9. Bảng màu Tối giản (Minimalist - Không có Color Palette)"
        description="Ẩn toàn bộ danh sách màu mẫu (presets) và màu đã dùng gần đây (recent colors) bằng showPresets={false} và showRecentColors={false}, mang lại giao diện tinh gọn, tập trung hoàn toàn vào canvas và thanh trượt."
        code={`import { useState } from 'react';
import { ColorPicker } from '@/shared/components/ui/color-picker';

export const MinimalColorPickerDemo = () => {
  const [color, setColor] = useState('#2563EB');

  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Popover dạng tối giản */}
      <ColorPicker
        value={color}
        onChange={setColor}
        showPresets={false}
        showRecentColors={false}
        clearable
      />

      {/* Inline dạng tối giản */}
      <ColorPicker
        value={color}
        onChange={setColor}
        showPresets={false}
        showRecentColors={false}
        inline
      />
    </div>
  );
};`}
      >
        <div className="flex flex-wrap items-start gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-caption-1-sb text-muted-foreground">Dạng Dropdown Popover:</span>
            <ColorPicker
              defaultValue="#2563EB"
              showPresets={false}
              showRecentColors={false}
              clearable
            />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-caption-1-sb text-muted-foreground">Dạng Nhúng Trực Tiếp (Inline):</span>
            <ColorPicker
              defaultValue="#EC4899"
              showPresets={false}
              showRecentColors={false}
              inline
            />
          </div>
        </div>
      </CodePreview>
    </div>
  );
};

export default ColorPickerDevPage;
