import { useEffect, useMemo, useRef, useState } from 'react';

interface UseCountUpOptions {
  duration?: number;
  locale?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function useCountUp(target: number, options: UseCountUpOptions = {}): string {
  const { duration = 900, locale = 'vi-VN' } = options;
  const [animated, setAnimated] = useState(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const formatter = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      currentRef.current = target;
      return;
    }

    const from = currentRef.current;
    if (from === target) return;

    const start = performance.now();
    const delta = target - from;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(progress);
      const value = from + delta * eased;

      currentRef.current = value;
      setAnimated(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentRef.current = target;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [target, duration]);

  const display = prefersReducedMotion() ? target : animated;
  return formatter.format(Math.round(display));
}
