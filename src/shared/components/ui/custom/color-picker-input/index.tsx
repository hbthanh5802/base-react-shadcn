import { Paintbrush } from 'lucide-react';
import { useRef } from 'react';

import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';

const getValidHex = (val: string) => {
  let clean = val.trim();
  if (clean && !clean.startsWith('#')) {
    clean = '#' + clean;
  }
  if (/^#[0-9A-F]{6}$/i.test(clean)) return clean;
  if (/^#[0-9A-F]{3}$/i.test(clean)) {
    return '#' + clean[1] + clean[1] + clean[2] + clean[2] + clean[3] + clean[3];
  }
  return '#059669';
};

interface ColorPickerInputProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function ColorPickerInput({
  value,
  onChange,
  label,
  required,
  placeholder = 'Màu hiển thị',
  className,
}: ColorPickerInputProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => colorInputRef.current?.click();

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <div className="flex w-full items-center justify-between">
          <Label className="text-[18px] font-medium text-foreground">
            {label} {required && <span className="text-destructive">*</span>}
          </Label>
          <button
            type="button"
            onClick={openPicker}
            className="text-body-2-md flex items-center gap-1.5 text-primary hover:text-primary-700 focus:outline-none transition-colors"
          >
            <Paintbrush size={16} />
            <span>Chọn màu hiển thị</span>
          </button>
        </div>
      )}

      {/* Input with inline color swatch */}
      <div className="flex h-12 w-full items-center overflow-hidden rounded-lg border border-input bg-background transition-shadow focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-full flex-1 border-none bg-transparent px-4 text-body-1-rg text-foreground outline-none placeholder:text-muted-foreground focus:ring-0"
        />

        {/* Color swatch inside input — color picker anchors here */}
        <button
          type="button"
          className="relative mr-2 h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-border shadow-xs transition-transform hover:scale-105 focus:outline-none"
          style={{ backgroundColor: getValidHex(value) }}
          aria-label="Mở bảng chọn màu"
        >
          <input
            type="color"
            ref={colorInputRef}
            value={getValidHex(value)}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            tabIndex={-1}
          />
        </button>
      </div>
    </div>
  );
}
