import { X } from 'lucide-react';
import * as React from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/utils';

import { ColorPickerPanel } from './color-picker-panel';
import { ColorPickerProps, HSVA } from './types';
import {
  DEFAULT_PRESETS,
  formatColorOutput,
  hsvaToHex,
  hsvaToRgba,
  parseColorToHsva,
} from './utils';

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value: controlledValue,
      defaultValue = '#059669',
      onChange,
      format = 'hex',
      showAlpha = false,
      showEyeDropper = true,
      showFormatSwitcher = true,
      showPresets = true,
      presets = DEFAULT_PRESETS,
      showRecentColors = true,
      maxRecentColors = 10,
      inline = false,
      size = 'medium',
      swatchPosition = 'end',
      disabled = false,
      readOnly = false,
      placeholder = 'Chọn màu...',
      clearable = false,
      onClear,
      needConfirm = false,
      confirmText = 'Xác nhận',
      cancelText = 'Hủy',
      onConfirm,
      onCancel,
      className,
      panelClassName,
      renderTrigger,
    },
    ref,
  ) => {
    // ── Value & State ──
    const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
    const currentColorStr = controlledValue !== undefined ? controlledValue : internalValue;

    const [isOpen, setIsOpen] = React.useState(false);
    const [recentColors, setRecentColors] = React.useState<string[]>([]);

    // Confirmed HSVA
    const [hsva, setHsva] = React.useState<HSVA>(() => parseColorToHsva(currentColorStr));
    // Pending HSVA for needConfirm mode
    const [tempHsva, setTempHsva] = React.useState<HSVA>(() => parseColorToHsva(currentColorStr));

    // Keep hsva synced when external value changes
    React.useEffect(() => {
      if (currentColorStr) {
        const parsed = parseColorToHsva(currentColorStr);
        setHsva(parsed);
        setTempHsva(parsed);
      }
    }, [currentColorStr]);

    // Handle Open/Close sync
    const handleOpenToggle = () => {
      if (disabled || readOnly) return;
      if (!isOpen) {
        setTempHsva(hsva);
      } else if (needConfirm) {
        setTempHsva(hsva);
        onCancel?.();
      }
      setIsOpen((prev) => !prev);
    };

    // Handle Color Change from inside Panel
    const handlePanelChange = (newHsva: HSVA) => {
      if (disabled || readOnly) return;
      setTempHsva(newHsva);

      // If no confirmation needed, commit live immediately
      if (!needConfirm) {
        setHsva(newHsva);
        const formatted = formatColorOutput(newHsva, format, showAlpha);
        const rgba = hsvaToRgba(newHsva);

        if (controlledValue === undefined) {
          setInternalValue(formatted);
        }

        onChange?.(formatted, rgba);

        // Add to recent colors (debounced on hex)
        const hex = hsvaToHex(newHsva);
        setRecentColors((prev) => {
          const filtered = prev.filter((c) => c.toUpperCase() !== hex.toUpperCase());
          return [hex, ...filtered].slice(0, maxRecentColors);
        });
      }
    };

    // Confirm Action
    const handleConfirm = () => {
      setHsva(tempHsva);
      const formatted = formatColorOutput(tempHsva, format, showAlpha);
      const rgba = hsvaToRgba(tempHsva);

      if (controlledValue === undefined) {
        setInternalValue(formatted);
      }

      onChange?.(formatted, rgba);
      onConfirm?.(formatted, rgba);

      const hex = hsvaToHex(tempHsva);
      setRecentColors((prev) => {
        const filtered = prev.filter((c) => c.toUpperCase() !== hex.toUpperCase());
        return [hex, ...filtered].slice(0, maxRecentColors);
      });

      setIsOpen(false);
    };

    // Cancel Action
    const handleCancel = () => {
      setTempHsva(hsva);
      onCancel?.();
      setIsOpen(false);
    };

    // ── Popover Positioning & Outside Click ──
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const popoverRef = React.useRef<HTMLDivElement>(null);
    const [popoverPos, setPopoverPos] = React.useState<{ top: number; left: number }>({
      top: 0,
      left: 0,
    });

    const updatePosition = React.useCallback(() => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const panelWidth = 276;
      const panelHeight = needConfirm ? 400 : 360;

      // Smart viewport bounds checking
      let top = rect.bottom + 6;
      let left = rect.left;

      if (top + panelHeight > window.innerHeight && rect.top - panelHeight > 0) {
        top = rect.top - panelHeight - 6;
      }

      if (left + panelWidth > window.innerWidth) {
        left = window.innerWidth - panelWidth - 16;
      }

      setPopoverPos({ top, left });
    }, [needConfirm]);

    React.useEffect(() => {
      if (isOpen) {
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
      }
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [isOpen, updatePosition]);

    // Click outside listener
    React.useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          triggerRef.current?.contains(target) ||
          popoverRef.current?.contains(target)
        ) {
          return;
        }
        if (needConfirm) {
          setTempHsva(hsva);
          onCancel?.();
        }
        setIsOpen(false);
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, needConfirm, hsva, onCancel]);

    // ── Clear Action ──
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || readOnly) return;
      if (controlledValue === undefined) {
        setInternalValue('');
      }
      onChange?.('', { r: 0, g: 0, b: 0, a: 0 });
      onClear?.();
    };

    // ── Inline Mode ──
    if (inline) {
      return (
        <div ref={ref} className={cn('inline-block', className)}>
          <ColorPickerPanel
            color={needConfirm ? tempHsva : hsva}
            onChange={handlePanelChange}
            showAlpha={showAlpha}
            showEyeDropper={showEyeDropper}
            showFormatSwitcher={showFormatSwitcher}
            showPresets={showPresets}
            presets={presets}
            showRecentColors={showRecentColors}
            recentColors={recentColors}
            disabled={disabled}
            needConfirm={needConfirm}
            confirmText={confirmText}
            cancelText={cancelText}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            className={panelClassName}
          />
        </div>
      );
    }

    // ── Size Classes ──
    const sizeClasses = {
      small: 'h-8 px-2.5 text-caption-1-rg gap-2',
      medium: 'h-10 px-3 text-body-2-rg gap-2.5',
      large: 'h-12 px-3.5 text-body-1-rg gap-3',
    }[size];

    const swatchSizeClasses = {
      small: 'size-5 rounded-[4px]',
      medium: 'size-6 rounded-md',
      large: 'size-7 rounded-lg',
    }[size];

    const activeHsva = isOpen && needConfirm ? tempHsva : hsva;
    const formattedColor = currentColorStr
      ? formatColorOutput(activeHsva, format, showAlpha)
      : '';

    // Swatch block element
    const renderSwatch = () => (
      <div
        className={cn(
          'relative shrink-0 border border-border/80 shadow-xs overflow-hidden transition-transform',
          swatchSizeClasses,
        )}
        style={{
          backgroundImage: `
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%)
          `,
          backgroundSize: '4px 4px',
          backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px',
        }}
      >
        {currentColorStr && (
          <div
            className="size-full"
            style={{
              backgroundColor: formatColorOutput(activeHsva, 'rgb', true),
            }}
          />
        )}
      </div>
    );

    return (
      <div ref={ref} className={cn('relative inline-block w-full max-w-xs', className)}>
        {/* Trigger Button */}
        <div ref={triggerRef}>
          {renderTrigger ? (
            renderTrigger({
              color: formattedColor,
              isOpen,
              disabled: disabled || readOnly,
              onClick: handleOpenToggle,
            })
          ) : (
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              disabled={disabled}
              onClick={handleOpenToggle}
              className={cn(
                'group flex w-full items-center justify-between rounded-lg border border-input bg-background transition-all cursor-pointer',
                'hover:border-primary-500 hover:shadow-xs',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isOpen && 'border-primary ring-2 ring-primary/20',
                disabled && 'cursor-not-allowed opacity-60 hover:border-input hover:shadow-none',
                readOnly && 'cursor-default',
                sizeClasses,
              )}
            >
              {/* If Swatch is at Start */}
              {swatchPosition === 'start' && renderSwatch()}

              {/* Color text or placeholder */}
              <span className="truncate font-mono text-foreground font-medium min-w-0 text-left flex-1">
                {formattedColor || (
                  <span className="text-muted-foreground font-sans">{placeholder}</span>
                )}
              </span>

              {/* End Section: Clear Button + Color Swatch at End */}
              <div className="flex items-center gap-1.5 shrink-0">
                {clearable && currentColorStr && !disabled && !readOnly && (
                  <span
                    role="button"
                    title="Xóa màu"
                    aria-label="Xóa màu đã chọn"
                    onClick={handleClear}
                    className="flex size-5 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                  >
                    <X size={13} />
                  </span>
                )}

                {/* Swatch at the end replacing chevron icon */}
                {swatchPosition === 'end' && renderSwatch()}
              </div>
            </button>
          )}
        </div>

        {/* Floating Popover Panel Portal */}
        {isOpen &&
          createPortal(
            <div
              ref={popoverRef}
              style={{
                position: 'fixed',
                top: `${popoverPos.top}px`,
                left: `${popoverPos.left}px`,
                zIndex: 9999,
              }}
              className="animate-in fade-in-0 zoom-in-95 duration-150"
            >
              <ColorPickerPanel
                color={tempHsva}
                onChange={handlePanelChange}
                showAlpha={showAlpha}
                showEyeDropper={showEyeDropper}
                showFormatSwitcher={showFormatSwitcher}
                showPresets={showPresets}
                presets={presets}
                showRecentColors={showRecentColors}
                recentColors={recentColors}
                disabled={disabled || readOnly}
                needConfirm={needConfirm}
                confirmText={confirmText}
                cancelText={cancelText}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                className={panelClassName}
              />
            </div>,
            document.body,
          )}
      </div>
    );
  },
);

ColorPicker.displayName = 'ColorPicker';

export * from './types';
export * from './utils';
export { ColorCanvas } from './color-canvas';
export { ColorInputs } from './color-inputs';
export { ColorPickerPanel } from './color-picker-panel';
export { AlphaSlider, HueSlider } from './color-slider';
export { ColorSwatches } from './color-swatches';
