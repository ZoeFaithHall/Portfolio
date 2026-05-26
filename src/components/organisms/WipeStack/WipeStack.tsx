import { Children, useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react';
import { cn } from '@utils/cn';
import styles from './WipeStack.module.scss';

export type WipeSurface = 'light' | 'dark';

export type WipeStackProps = {
  /**
   * Layers, in stacking order. The first child is the base (always visible).
   * Each subsequent child wipes in over an equal segment of the scroll range
   * via `clipPath: inset(...% 0 0 0)` animating from 100% → 0%.
   */
  children: ReactNode;
  /** Optional id on the outer container (for anchor links). */
  id?: string;
  /** Optional className passthrough. */
  className?: string;
  /**
   * Optional surface per layer. When provided, WipeStack updates its outer
   * `data-surface` attribute to the topmost layer's surface as scroll
   * progresses — so Header can adapt its wordmark color. Must have the
   * same length as `children`.
   */
  surfaces?: readonly WipeSurface[];
};

const SURFACE_LEAD_IN = 0.06;

/**
 * Pinned viewport that layers its children one over the next via clipPath.
 *
 * - Container height = N * 100vh (so each transition gets one viewport of
 *   scroll). The pinned inner viewport stays at 100vh.
 * - The first child is the base layer (no wipe).
 * - Each subsequent layer K (1-indexed from 0) wipes during scroll segment
 *   [(K-1)/(N-1), K/(N-1)], revealing from bottom to top.
 * - Sections above the stack do not move while wipes happen.
 *
 * Generalizes the Intro section's hand-rolled two-layer wipe so the same
 * pattern can be used for any announce stack.
 */
export function WipeStack({ children, id, className, surfaces }: WipeStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const layers = Children.toArray(children);
  const total = layers.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Toggle outer data-surface to match the topmost revealed layer. Header's
  // wordmark color reads this attribute as it scrolls past.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!ref.current || !surfaces || surfaces.length !== total) return;
    let topIdx = 0;
    for (let i = 0; i < total - 1; i++) {
      const segEnd = (i + 1) / Math.max(1, total - 1);
      // Consider the next layer "on top" slightly before its wipe completes
      // so the surface flip lands during the visible transition.
      const threshold = segEnd - SURFACE_LEAD_IN / Math.max(1, total - 1);
      if (v >= threshold) topIdx = i + 1;
    }
    const next = surfaces[topIdx];
    if (next && ref.current.dataset.surface !== next) {
      ref.current.dataset.surface = next;
    }
  });

  return (
    <div
      ref={ref}
      id={id}
      className={cn(styles.root, className)}
      style={{ height: `${Math.max(1, total) * 100}vh` }}
      data-surface={surfaces?.[0]}
    >
      <div className={styles.pinned}>
        {layers.map((child, i) => (
          <Layer
            key={i}
            index={i}
            total={total}
            scrollYProgress={scrollYProgress}
          >
            {child}
          </Layer>
        ))}
      </div>
    </div>
  );
}

type LayerProps = {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  children: ReactNode;
};

function Layer({ index, total, scrollYProgress, children }: LayerProps) {
  const isBase = index === 0;
  const denom = Math.max(1, total - 1);
  const segStart = isBase ? 0 : (index - 1) / denom;
  const segEnd = isBase ? 0 : index / denom;

  // Base layer stays fully revealed (inset 0); overlays animate 100% → 0%.
  // Clip uses the BOTTOM inset so the layer reveals from the top down —
  // the band (at the top of the layer) appears first and the content
  // reveals beneath it as scroll progresses.
  const wipeY = useTransform(
    scrollYProgress,
    [segStart, segEnd],
    isBase ? [0, 0] : [100, 0],
    { clamp: true }
  );
  const clipPath = useTransform(wipeY, (v) => `inset(0 0 ${v}% 0)`);

  return (
    <motion.div className={styles.layer} style={{ clipPath }}>
      {children}
    </motion.div>
  );
}
