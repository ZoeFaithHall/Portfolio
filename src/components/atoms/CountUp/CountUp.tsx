import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export type CountUpProps = {
  /** Display value such as "+$67M", "$7.02M", "788%", "14M+". */
  value: string;
  className?: string;
  durationMs?: number;
};

const PATTERN = /^(\D*?)(\d+(?:\.\d+)?)(.*)$/;

/**
 * Counts the numeric part of a display value up from zero the first time it
 * scrolls into view, keeping its prefix and suffix. Screen readers get the
 * final value only; reduced motion shows the final value immediately.
 */
export function CountUp({ value, className, durationMs = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const m = value.match(PATTERN);
  const prefix = m?.[1] ?? '';
  const digits = m?.[2] ?? '';
  const suffix = m?.[3] ?? '';
  const target = digits ? parseFloat(digits) : 0;
  const decimals = digits.includes('.') ? (digits.split('.')[1] ?? '').length : 0;
  const [shown, setShown] = useState(reduce || !m ? value : `${prefix}${(0).toFixed(decimals)}${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m || reduce) {
      setShown(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / durationMs);
        const eased = 1 - Math.pow(1 - p, 4);
        setShown(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // value is static per cell
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
