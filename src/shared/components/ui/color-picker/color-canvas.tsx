import * as React from 'react';

import { cn } from '@/shared/lib/utils';

import { HSVA } from './types';
import { clamp } from './utils';

interface ColorCanvasProps {
  color: HSVA;
  onChange: (color: HSVA) => void;
  className?: string;
  disabled?: boolean;
}

export const ColorCanvas: React.FC<ColorCanvasProps> = ({
  color,
  onChange,
  className,
  disabled = false,
}) => {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef<boolean>(false);

  const handlePointerMove = React.useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      const y = clamp(clientY - rect.top, 0, rect.height);

      const s = Math.round((x / rect.width) * 100);
      const v = Math.round((1 - y / rect.height) * 100);

      onChange({
        ...color,
        s,
        v,
      });
    },
    [color, onChange],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e.clientX, e.clientY);
  };

  const handlePointerMoveEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || disabled) return;
    handlePointerMove(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const step = e.shiftKey ? 10 : 2;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        onChange({ ...color, s: clamp(color.s - step, 0, 100) });
        break;
      case 'ArrowRight':
        e.preventDefault();
        onChange({ ...color, s: clamp(color.s + step, 0, 100) });
        break;
      case 'ArrowUp':
        e.preventDefault();
        onChange({ ...color, v: clamp(color.v + step, 0, 100) });
        break;
      case 'ArrowDown':
        e.preventDefault();
        onChange({ ...color, v: clamp(color.v - step, 0, 100) });
        break;
    }
  };

  const pureHueColor = `hsl(${color.h}, 100%, 50%)`;

  return (
    <div
      ref={canvasRef}
      role="slider"
      aria-label="Vùng chọn sắc độ và độ sáng màu"
      aria-valuetext={`Độ bão hòa ${color.s}%, Độ sáng ${color.v}%`}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMoveEvent}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      style={{ backgroundColor: pureHueColor }}
      className={cn(
        'relative h-40 w-full select-none overflow-hidden rounded-lg cursor-crosshair touch-none shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      {/* Saturation white gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
      {/* Brightness black gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      {/* Interactive Drag Handle */}
      <div
        className="absolute -translate-x-1/2 translate-y-1/2 pointer-events-none transition-transform duration-75"
        style={{
          left: `${color.s}%`,
          bottom: `${color.v}%`,
        }}
      >
        <div className="relative flex size-4.5 items-center justify-center rounded-full border-2 border-white bg-transparent shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.3)]">
          <div
            className="size-2 rounded-full"
            style={{
              backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.v}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
