import { Check, Copy, Pipette } from 'lucide-react';
import * as React from 'react';

import { notify } from '@/shared/components/ui/toast';
import { cn } from '@/shared/lib/utils';

import { ColorFormat, HSVA } from './types';
import {
  clamp,
  formatColorOutput,
  hexToHsva,
  hslaToHsva,
  hsvaToHex,
  hsvaToHsla,
  hsvaToRgba,
  isValidHex,
  rgbaToHsva,
} from './utils';

interface ColorInputsProps {
  color: HSVA;
  onChange: (color: HSVA) => void;
  showAlpha?: boolean;
  showEyeDropper?: boolean;
  showFormatSwitcher?: boolean;
  disabled?: boolean;
  className?: string;
}

export const ColorInputs: React.FC<ColorInputsProps> = ({
  color,
  onChange,
  showAlpha = false,
  showEyeDropper = true,
  showFormatSwitcher = true,
  disabled = false,
  className,
}) => {
  const [format, setFormat] = React.useState<ColorFormat>('hex');
  const [copied, setCopied] = React.useState(false);

  // Local text state to allow fluid user typing
  const [hexInput, setHexInput] = React.useState('');

  const rgba = hsvaToRgba(color);
  const hsla = hsvaToHsla(color);

  // Sync internal hex text when color prop changes
  React.useEffect(() => {
    setHexInput(hsvaToHex(color, showAlpha).replace(/^#/, ''));
  }, [color, showAlpha]);

  // Format cycle
  const handleNextFormat = () => {
    const formats: ColorFormat[] = ['hex', 'rgb', 'hsl'];
    const nextIdx = (formats.indexOf(format) + 1) % formats.length;
    setFormat(formats[nextIdx]);
  };

  // Eyedropper API
  const isEyeDropperSupported = typeof window !== 'undefined' && 'EyeDropper' in window;

  const handleEyeDropper = async () => {
    if (!isEyeDropperSupported || disabled) return;
    try {
      // @ts-expect-error - Native EyeDropper API
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      if (result?.sRGBHex) {
        const nextHsva = hexToHsva(result.sRGBHex);
        onChange({ ...nextHsva, a: color.a });
        notify.success(`Đã hút màu: ${result.sRGBHex}`);
      }
    } catch {
      // User cancelled or aborted
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    const formatted = formatColorOutput(color, format, showAlpha);
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    notify.success(`Đã sao chép: ${formatted}`);
    setTimeout(() => setCopied(false), 1500);
  };

  // Hex Input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9A-Fa-f]/g, '');
    setHexInput(val);
    if (isValidHex(val)) {
      const parsed = hexToHsva('#' + val);
      onChange({ ...parsed, a: showAlpha && val.length === 8 ? parsed.a : color.a });
    }
  };

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      {/* ── Section 1: Hàng Công cụ (Pick màu & Copy) và Tabs Chuyển đổi Định dạng ── */}
      <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2">
        {/* Chế độ chuyển đổi định dạng (Tabs Switcher) */}
        {showFormatSwitcher ? (
          <div className="flex items-center rounded-lg bg-muted/60 p-0.5">
            {(['hex', 'rgb', 'hsl'] as ColorFormat[]).map((fmt) => (
              <button
                key={fmt}
                type="button"
                disabled={disabled}
                onClick={() => setFormat(fmt)}
                className={cn(
                  'h-6.5 rounded-md px-2 text-[11px] font-semibold uppercase transition-all cursor-pointer select-none',
                  format === fmt
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground',
                  disabled && 'cursor-not-allowed opacity-50',
                )}
              >
                {fmt}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-caption-1-sb font-semibold text-muted-foreground uppercase">
            {format}
          </span>
        )}

        {/* Section Công cụ: Nút Pick màu & Nút Copy */}
        <div className="flex items-center gap-1">
          {showEyeDropper && isEyeDropperSupported && (
            <button
              type="button"
              title="Hút màu trên màn hình (EyeDropper)"
              aria-label="Hút màu trên màn hình"
              onClick={handleEyeDropper}
              disabled={disabled}
              className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Pipette size={14} />
            </button>
          )}

          <button
            type="button"
            title="Sao chép mã màu"
            aria-label="Sao chép mã màu"
            onClick={handleCopy}
            disabled={disabled}
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* ── Section 2: Hàng Nhập liệu Giá trị Màu Rộng Rãi & Cân Đối ── */}
      {format === 'hex' ? (
        <div className="flex items-center gap-2">
          {/* Ô Hex Input */}
          <div className="relative flex-1 min-w-0">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-caption-1-rg text-muted-foreground select-none">
              #
            </span>
            <input
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              maxLength={showAlpha ? 8 : 6}
              disabled={disabled}
              placeholder="FFFFFF"
              className="h-8 w-full rounded-lg border border-input bg-background pl-6 pr-2.5 font-mono text-caption-1-sb uppercase text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Ô Alpha khi ở chế độ HEX (cùng độ cao h-8, thẳng hàng tuyệt đối) */}
          {showAlpha && (
            <div className="relative w-16 shrink-0">
              <input
                type="number"
                min={0}
                max={100}
                value={Math.round(color.a * 100)}
                disabled={disabled}
                onChange={(e) =>
                  onChange({
                    ...color,
                    a: clamp((parseInt(e.target.value) || 0) / 100, 0, 1),
                  })
                }
                className="h-8 w-full rounded-lg border border-input bg-background pl-1.5 pr-4 text-center font-mono text-caption-1-sb text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[14px] text-muted-foreground select-none pointer-events-none">
                %
              </span>
            </div>
          )}
        </div>
      ) : format === 'rgb' ? (
        <div className={cn('grid gap-1.5', showAlpha ? 'grid-cols-4' : 'grid-cols-3')}>
          <div className="flex flex-col items-center gap-1">
            <input
              type="number"
              min={0}
              max={255}
              value={rgba.r}
              disabled={disabled}
              onChange={(e) =>
                onChange(
                  rgbaToHsva({
                    ...rgba,
                    r: clamp(parseInt(e.target.value) || 0, 0, 255),
                  }),
                )
              }
              className="h-8 w-full rounded-lg border border-input bg-background px-1 text-center font-mono text-caption-1-sb text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[12px] font-medium text-muted-foreground uppercase">R</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <input
              type="number"
              min={0}
              max={255}
              value={rgba.g}
              disabled={disabled}
              onChange={(e) =>
                onChange(
                  rgbaToHsva({
                    ...rgba,
                    g: clamp(parseInt(e.target.value) || 0, 0, 255),
                  }),
                )
              }
              className="h-8 w-full rounded-lg border border-input bg-background px-1 text-center font-mono text-caption-1-sb text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[12px] font-medium text-muted-foreground uppercase">G</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <input
              type="number"
              min={0}
              max={255}
              value={rgba.b}
              disabled={disabled}
              onChange={(e) =>
                onChange(
                  rgbaToHsva({
                    ...rgba,
                    b: clamp(parseInt(e.target.value) || 0, 0, 255),
                  }),
                )
              }
              className="h-8 w-full rounded-lg border border-input bg-background px-1 text-center font-mono text-caption-1-sb text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[12px] font-medium text-muted-foreground uppercase">B</span>
          </div>
          {showAlpha && (
            <div className="flex flex-col items-center gap-1">
              <div className="relative w-full">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={Math.round(color.a * 100)}
                  disabled={disabled}
                  onChange={(e) =>
                    onChange({
                      ...color,
                      a: clamp((parseInt(e.target.value) || 0) / 100, 0, 1),
                    })
                  }
                  className="h-8 w-full rounded-lg border border-input bg-background pl-0.5 pr-3.5 text-center font-mono text-caption-1-sb text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground select-none pointer-events-none">
                  %
                </span>
              </div>
              <span className="text-[12px] font-medium text-muted-foreground uppercase">A</span>
            </div>
          )}
        </div>
      ) : (
        <div className={cn('grid gap-1.5', showAlpha ? 'grid-cols-4' : 'grid-cols-3')}>
          <div className="flex flex-col items-center gap-1">
            <input
              type="number"
              min={0}
              max={360}
              value={hsla.h}
              disabled={disabled}
              onChange={(e) =>
                onChange(
                  hslaToHsva({
                    ...hsla,
                    h: clamp(parseInt(e.target.value) || 0, 0, 360),
                  }),
                )
              }
              className="h-8 w-full rounded-lg border border-input bg-background px-1 text-center font-mono text-caption-1-sb text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[12px] font-medium text-muted-foreground uppercase">H</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <input
              type="number"
              min={0}
              max={100}
              value={hsla.s}
              disabled={disabled}
              onChange={(e) =>
                onChange(
                  hslaToHsva({
                    ...hsla,
                    s: clamp(parseInt(e.target.value) || 0, 0, 100),
                  }),
                )
              }
              className="h-8 w-full rounded-lg border border-input bg-background px-1 text-center font-mono text-caption-1-sb text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[12px] font-medium text-muted-foreground uppercase">S%</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <input
              type="number"
              min={0}
              max={100}
              value={hsla.l}
              disabled={disabled}
              onChange={(e) =>
                onChange(
                  hslaToHsva({
                    ...hsla,
                    l: clamp(parseInt(e.target.value) || 0, 0, 100),
                  }),
                )
              }
              className="h-8 w-full rounded-lg border border-input bg-background px-1 text-center font-mono text-caption-1-sb text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[12px] font-medium text-muted-foreground uppercase">L%</span>
          </div>
          {showAlpha && (
            <div className="flex flex-col items-center gap-1">
              <div className="relative w-full">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={Math.round(color.a * 100)}
                  disabled={disabled}
                  onChange={(e) =>
                    onChange({
                      ...color,
                      a: clamp((parseInt(e.target.value) || 0) / 100, 0, 1),
                    })
                  }
                  className="h-8 w-full rounded-lg border border-input bg-background pl-0.5 pr-3.5 text-center font-mono text-caption-1-sb text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground select-none pointer-events-none">
                  %
                </span>
              </div>
              <span className="text-[12px] font-medium text-muted-foreground uppercase">A</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
