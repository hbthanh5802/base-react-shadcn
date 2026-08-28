import * as React from 'react';

import { cn } from '@/shared/lib/utils';

import { HSVA } from './types';
import { clamp, hsvaToRgba } from './utils';

interface SliderProps {
  color: HSVA;
  onChange: (color: HSVA) => void;
  className?: string;
  disabled?: boolean;
}

// ── Hue Slider (0 - 360) ──
export const HueSlider: React.FC<SliderProps> = ({
  color,
  onChange,
  className,
  disabled = false,
}) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef<boolean>(false);

  const handlePointerMove = React.useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      const h = Math.round((x / rect.width) * 360) % 360;

      onChange({
        ...color,
        h,
      });
    },
    [color, onChange],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e.clientX);
  };

  const handlePointerMoveEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || disabled) return;
    handlePointerMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const step = e.shiftKey ? 10 : 2;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        onChange({ ...color, h: (color.h - step + 360) % 360 });
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        onChange({ ...color, h: (color.h + step) % 360 });
        break;
    }
  };

  return (
    <div
      ref={sliderRef}
      role="slider"
      aria-label="Thanh chọn tông màu chính (Hue)"
      aria-valuenow={color.h}
      aria-valuemin={0}
      aria-valuemax={360}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMoveEvent}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative h-3 w-full select-none rounded-full cursor-pointer touch-none shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
      style={{
        background:
          'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
      }}
    >
      {/* Slider Thumb */}
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${(color.h / 360) * 100}%` }}
      >
        <div className="size-4 rounded-full border-2 border-white bg-transparent shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.25)]" />
      </div>
    </div>
  );
};

// ── Alpha / Opacity Slider (0 - 1) ──
export const AlphaSlider: React.FC<SliderProps> = ({
  color,
  onChange,
  className,
  disabled = false,
}) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef<boolean>(false);

  const rgba = hsvaToRgba(color);
  const solidColorStr = `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;

  const handlePointerMove = React.useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      const a = Math.round((x / rect.width) * 100) / 100;

      onChange({
        ...color,
        a,
      });
    },
    [color, onChange],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e.clientX);
  };

  const handlePointerMoveEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || disabled) return;
    handlePointerMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const step = e.shiftKey ? 0.1 : 0.02;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        onChange({ ...color, a: clamp(Math.round((color.a - step) * 100) / 100, 0, 1) });
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        onChange({ ...color, a: clamp(Math.round((color.a + step) * 100) / 100, 0, 1) });
        break;
    }
  };

  return (
    <div
      ref={sliderRef}
      role="slider"
      aria-label="Thanh chọn độ trong suốt (Alpha/Opacity)"
      aria-valuenow={Math.round(color.a * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMoveEvent}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative h-3 w-full select-none rounded-full cursor-pointer touch-none shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, transparent, ${solidColorStr}),
          linear-gradient(45deg, #ccc 25%, transparent 25%),
          linear-gradient(-45deg, #ccc 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ccc 75%),
          linear-gradient(-45deg, transparent 75%, #ccc 75%)
        `,
        backgroundSize: '100% 100%, 8px 8px, 8px 8px, 8px 8px, 8px 8px',
        backgroundPosition: '0 0, 0 0, 0 4px, 4px -4px, -4px 0px',
      }}
    >
      {/* Slider Thumb */}
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${color.a * 100}%` }}
      >
        <div className="size-4 rounded-full border-2 border-white bg-transparent shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.25)]" />
      </div>
    </div>
  );
};
