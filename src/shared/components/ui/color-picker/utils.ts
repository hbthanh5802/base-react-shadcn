import { ColorFormat, ColorPreset, HSLA, HSVA, RGBA } from './types';

// Clamp number between min and max
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

// ── HSVA to RGBA ──
export function hsvaToRgba(hsva: HSVA): RGBA {
  const h = hsva.h / 60;
  const s = hsva.s / 100;
  const v = hsva.v / 100;

  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r = 0;
  let g = 0;
  let b = 0;

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: clamp(hsva.a, 0, 1),
  };
}

// ── RGBA to HSVA ──
export function rgbaToHsva(rgba: RGBA): HSVA {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : Math.round((delta / max) * 100);
  const v = Math.round(max * 100);

  return {
    h,
    s,
    v,
    a: clamp(rgba.a, 0, 1),
  };
}

// ── HSVA to HSLA ──
export function hsvaToHsla(hsva: HSVA): HSLA {
  const s = hsva.s / 100;
  const v = hsva.v / 100;

  const l = (2 - s) * v / 2;
  const sl = l !== 0 && l !== 1 ? (s * v) / (l < 0.5 ? l * 2 : 2 - l * 2) : 0;

  return {
    h: Math.round(hsva.h),
    s: Math.round(clamp(sl * 100, 0, 100)),
    l: Math.round(clamp(l * 100, 0, 100)),
    a: clamp(hsva.a, 0, 1),
  };
}

// ── HSLA to HSVA ──
export function hslaToHsva(hsla: HSLA): HSVA {
  const s = hsla.s / 100;
  const l = hsla.l / 100;

  const v = l + s * Math.min(l, 1 - l);
  const sv = v === 0 ? 0 : 2 * (1 - l / v);

  return {
    h: Math.round(hsla.h),
    s: Math.round(clamp(sv * 100, 0, 100)),
    v: Math.round(clamp(v * 100, 0, 100)),
    a: clamp(hsla.a, 0, 1),
  };
}

// ── RGBA to HEX string ──
export function rgbaToHex(rgba: RGBA, includeAlpha = false): string {
  const r = Math.round(rgba.r).toString(16).padStart(2, '0');
  const g = Math.round(rgba.g).toString(16).padStart(2, '0');
  const b = Math.round(rgba.b).toString(16).padStart(2, '0');

  if (includeAlpha && rgba.a < 1) {
    const a = Math.round(rgba.a * 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}${a}`.toUpperCase();
  }

  return `#${r}${g}${b}`.toUpperCase();
}

// ── HEX to RGBA ──
export function hexToRgba(hex: string): RGBA {
  let cleaned = hex.trim().replace(/^#/, '');

  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map((c) => c + c).join('');
  } else if (cleaned.length === 4) {
    cleaned = cleaned.split('').map((c) => c + c).join('');
  }

  if (cleaned.length === 6) {
    const r = parseInt(cleaned.slice(0, 2), 16) || 0;
    const g = parseInt(cleaned.slice(2, 4), 16) || 0;
    const b = parseInt(cleaned.slice(4, 6), 16) || 0;
    return { r, g, b, a: 1 };
  }

  if (cleaned.length === 8) {
    const r = parseInt(cleaned.slice(0, 2), 16) || 0;
    const g = parseInt(cleaned.slice(2, 4), 16) || 0;
    const b = parseInt(cleaned.slice(4, 6), 16) || 0;
    const a = Math.round((parseInt(cleaned.slice(6, 8), 16) / 255) * 100) / 100 || 0;
    return { r, g, b, a };
  }

  return { r: 0, g: 0, b: 0, a: 1 };
}

// ── HEX to HSVA ──
export function hexToHsva(hex: string): HSVA {
  return rgbaToHsva(hexToRgba(hex));
}

// ── HSVA to HEX ──
export function hsvaToHex(hsva: HSVA, includeAlpha = false): string {
  return rgbaToHex(hsvaToRgba(hsva), includeAlpha);
}

// ── Parse any color string to HSVA ──
export function parseColorToHsva(colorStr?: string): HSVA {
  if (!colorStr) {
    return { h: 210, s: 80, v: 90, a: 1 }; // Default nice primary blue
  }

  const str = colorStr.trim().toLowerCase();

  // Match hex
  if (str.startsWith('#')) {
    return hexToHsva(str);
  }

  // Match rgb / rgba
  const rgbaMatch = str.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/);
  if (rgbaMatch) {
    return rgbaToHsva({
      r: clamp(parseFloat(rgbaMatch[1]), 0, 255),
      g: clamp(parseFloat(rgbaMatch[2]), 0, 255),
      b: clamp(parseFloat(rgbaMatch[3]), 0, 255),
      a: rgbaMatch[4] !== undefined ? clamp(parseFloat(rgbaMatch[4]), 0, 1) : 1,
    });
  }

  // Match hsl / hsla
  const hslaMatch = str.match(/^hsla?\(\s*([\d.]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/);
  if (hslaMatch) {
    return hslaToHsva({
      h: clamp(parseFloat(hslaMatch[1]), 0, 360),
      s: clamp(parseFloat(hslaMatch[2]), 0, 100),
      l: clamp(parseFloat(hslaMatch[3]), 0, 100),
      a: hslaMatch[4] !== undefined ? clamp(parseFloat(hslaMatch[4]), 0, 1) : 1,
    });
  }

  return hexToHsva(str);
}

// ── Format output color string based on format ──
export function formatColorOutput(hsva: HSVA, format: ColorFormat, showAlpha = false): string {
  const rgba = hsvaToRgba(hsva);

  switch (format) {
    case 'hex':
      return rgbaToHex(rgba, showAlpha);

    case 'rgb':
      if (showAlpha && rgba.a < 1) {
        return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a.toFixed(2)})`;
      }
      return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;

    case 'hsl': {
      const hsla = hsvaToHsla(hsva);
      if (showAlpha && hsla.a < 1) {
        return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a.toFixed(2)})`;
      }
      return `hsl(${hsla.h}, ${hsla.s}%, ${hsla.l}%)`;
    }

    case 'hsv': {
      if (showAlpha && hsva.a < 1) {
        return `hsva(${Math.round(hsva.h)}, ${Math.round(hsva.s)}%, ${Math.round(hsva.v)}%, ${hsva.a.toFixed(2)})`;
      }
      return `hsv(${Math.round(hsva.h)}, ${Math.round(hsva.s)}%, ${Math.round(hsva.v)}%)`;
    }

    default:
      return rgbaToHex(rgba, showAlpha);
  }
}

// ── Check if a hex string is valid ──
export function isValidHex(hex: string): boolean {
  const cleaned = hex.trim().replace(/^#/, '');
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{4}$|^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{8}$/.test(cleaned);
}

// ── Curated Default Presets ──
export const DEFAULT_PRESETS: ColorPreset[] = [
  {
    label: 'Màu cơ bản',
    colors: [
      '#EF4444', // Red
      '#F97316', // Orange
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#06B6D4', // Cyan
      '#3B82F6', // Blue
      '#6366F1', // Indigo
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#64748B', // Slate
    ],
  },
  {
    label: 'Brand & UI',
    colors: [
      '#059669', // Emerald Primary
      '#0D9488', // Teal
      '#0284C7', // Sky
      '#2563EB', // Blue
      '#7C3AED', // Violet
      '#D97706', // Warm Amber
      '#DC2626', // Crimson Red
      '#1E293B', // Dark Slate
      '#000000', // Pure Black
      '#FFFFFF', // Pure White
    ],
  },
];
