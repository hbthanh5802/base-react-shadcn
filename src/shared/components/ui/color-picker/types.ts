import * as React from 'react';

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv';

export interface RGBA {
  r: number; // 0 - 255
  g: number; // 0 - 255
  b: number; // 0 - 255
  a: number; // 0 - 1
}

export interface HSVA {
  h: number; // 0 - 360
  s: number; // 0 - 100
  v: number; // 0 - 100
  a: number; // 0 - 1
}

export interface HSLA {
  h: number; // 0 - 360
  s: number; // 0 - 100
  l: number; // 0 - 100
  a: number; // 0 - 1
}

export interface ColorPreset {
  label?: string;
  colors: string[];
}

export type ColorPickerSize = 'small' | 'medium' | 'large';

export interface ColorPickerPanelProps {
  color: HSVA;
  onChange: (color: HSVA) => void;
  showAlpha?: boolean;
  showEyeDropper?: boolean;
  showFormatSwitcher?: boolean;
  showPresets?: boolean;
  presets?: string[] | ColorPreset[];
  showRecentColors?: boolean;
  recentColors?: string[];
  onAddRecentColor?: (hex: string) => void;
  className?: string;
  disabled?: boolean;
  needConfirm?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (colorString: string, rgba: RGBA) => void;
  format?: ColorFormat;
  showAlpha?: boolean;
  showEyeDropper?: boolean;
  showFormatSwitcher?: boolean;
  showPresets?: boolean;
  presets?: string[] | ColorPreset[];
  showRecentColors?: boolean;
  maxRecentColors?: number;
  inline?: boolean;
  size?: ColorPickerSize;
  swatchPosition?: 'start' | 'end'; // Vị trí ô màu trên input trigger: 'end' (mặc định) hoặc 'start'
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  clearable?: boolean;
  onClear?: () => void;
  needConfirm?: boolean; // Yêu cầu bấm nút Xác nhận để lưu màu
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (colorString: string, rgba: RGBA) => void;
  onCancel?: () => void;
  className?: string;
  panelClassName?: string;
  renderTrigger?: (props: {
    color: string;
    isOpen: boolean;
    disabled?: boolean;
    onClick: () => void;
  }) => React.ReactNode;
}
