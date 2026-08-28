import * as React from 'react';

import { cn } from '@/shared/lib/utils';

import { ColorPreset, HSVA } from './types';
import { hexToHsva, hsvaToHex, parseColorToHsva } from './utils';

interface ColorSwatchesProps {
  color: HSVA;
  onChange: (color: HSVA) => void;
  presets?: string[] | ColorPreset[];
  showPresets?: boolean;
  recentColors?: string[];
  showRecentColors?: boolean;
  disabled?: boolean;
  className?: string;
}

export const ColorSwatches: React.FC<ColorSwatchesProps> = ({
  color,
  onChange,
  presets,
  showPresets = true,
  recentColors = [],
  showRecentColors = true,
  disabled = false,
  className,
}) => {
  const currentHex = hsvaToHex(color).toUpperCase();

  // Normalize presets to ColorPreset[]
  const normalizedPresets: ColorPreset[] = React.useMemo(() => {
    if (!presets || presets.length === 0) return [];
    if (typeof presets[0] === 'string') {
      return [{ label: 'Màu đề xuất', colors: presets as string[] }];
    }
    return presets as ColorPreset[];
  }, [presets]);

  const handleSelectColor = (hex: string) => {
    if (disabled) return;
    const nextHsva = parseColorToHsva(hex);
    onChange({
      ...nextHsva,
      a: color.a, // Preserve current alpha unless preset contains alpha
    });
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Recent Colors */}
      {showRecentColors && recentColors.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-medium text-muted-foreground">Màu gần đây</span>
          <div className="flex flex-wrap gap-1.5">
            {recentColors.map((hex, idx) => {
              const isSelected = hex.toUpperCase() === currentHex;
              return (
                <button
                  key={`${hex}-${idx}`}
                  type="button"
                  title={hex}
                  aria-label={`Chọn màu ${hex}`}
                  disabled={disabled}
                  onClick={() => handleSelectColor(hex)}
                  className={cn(
                    'group relative size-6 shrink-0 rounded-md border border-border/80 p-0 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
                    isSelected && 'ring-2 ring-primary ring-offset-1',
                  )}
                  style={{
                    backgroundColor: hex,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Preset Palettes */}
      {showPresets &&
        normalizedPresets.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            {group.label && (
              <span className="text-[11px] font-medium text-muted-foreground">{group.label}</span>
            )}
            <div className="flex flex-wrap gap-1.5">
              {group.colors.map((hex, idx) => {
                const isSelected = hex.toUpperCase() === currentHex;
                return (
                  <button
                    key={`${hex}-${idx}`}
                    type="button"
                    title={hex}
                    aria-label={`Chọn màu ${hex}`}
                    disabled={disabled}
                    onClick={() => handleSelectColor(hex)}
                    className={cn(
                      'relative size-6 shrink-0 rounded-md border border-border/80 p-0 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
                      isSelected && 'ring-2 ring-primary ring-offset-1',
                    )}
                    style={{
                      backgroundColor: hex,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};
