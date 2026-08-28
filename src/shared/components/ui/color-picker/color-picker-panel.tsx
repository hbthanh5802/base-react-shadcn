import * as React from 'react';

import { cn } from '@/shared/lib/utils';

import { ColorCanvas } from './color-canvas';
import { ColorInputs } from './color-inputs';
import { AlphaSlider, HueSlider } from './color-slider';
import { ColorSwatches } from './color-swatches';
import { ColorPickerPanelProps } from './types';
import { DEFAULT_PRESETS, hsvaToRgba } from './utils';

export const ColorPickerPanel: React.FC<ColorPickerPanelProps> = ({
  color,
  onChange,
  showAlpha = false,
  showEyeDropper = true,
  showFormatSwitcher = true,
  showPresets = true,
  presets = DEFAULT_PRESETS,
  showRecentColors = true,
  recentColors = [],
  className,
  disabled = false,
  needConfirm = false,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onConfirm,
  onCancel,
}) => {
  const rgba = hsvaToRgba(color);
  const colorRgbaString = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;

  return (
    <div
      className={cn(
        'flex w-[276px] flex-col gap-3 rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-lg',
        disabled && 'pointer-events-none opacity-60',
        className,
      )}
    >
      {/* 2D Saturation & Brightness Canvas */}
      <ColorCanvas color={color} onChange={onChange} disabled={disabled} />

      {/* Sliders & Active Preview Swatch */}
      <div className="flex items-center gap-2.5">
        {/* Large Preview Swatch */}
        <div
          className="relative size-7 shrink-0 rounded-full border border-border/80 shadow-sm overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #ccc 25%, transparent 25%),
              linear-gradient(-45deg, #ccc 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #ccc 75%),
              linear-gradient(-45deg, transparent 75%, #ccc 75%)
            `,
            backgroundSize: '6px 6px',
            backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px',
          }}
        >
          <div
            className="size-full"
            style={{ backgroundColor: colorRgbaString }}
          />
        </div>

        {/* Sliders Column */}
        <div className="flex flex-1 flex-col gap-1.5 min-w-0">
          <HueSlider color={color} onChange={onChange} disabled={disabled} />
          {showAlpha && <AlphaSlider color={color} onChange={onChange} disabled={disabled} />}
        </div>
      </div>

      {/* Inputs (HEX / RGB / HSL) & Eyedropper & Copy */}
      <ColorInputs
        color={color}
        onChange={onChange}
        showAlpha={showAlpha}
        showEyeDropper={showEyeDropper}
        showFormatSwitcher={showFormatSwitcher}
        disabled={disabled}
      />

      {/* Preset Swatches & Recent Colors */}
      {(showPresets || showRecentColors) && (
        <div className="border-t border-border/60 pt-2.5">
          <ColorSwatches
            color={color}
            onChange={onChange}
            presets={presets}
            showPresets={showPresets}
            recentColors={recentColors}
            showRecentColors={showRecentColors}
            disabled={disabled}
          />
        </div>
      )}

      {/* Confirmation Footer */}
      {needConfirm && (
        <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-2.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={disabled}
            className="h-7 rounded-md border border-border bg-background px-2.5 text-caption-1-sb text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={disabled}
            className="h-7 rounded-md bg-primary px-3 text-caption-1-sb text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {confirmText}
          </button>
        </div>
      )}
    </div>
  );
};
