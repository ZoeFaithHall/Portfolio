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
   * Each subsequent child slides up from below the viewport over an equal
   * segment of the scroll range — the band at the top of the layer leads
   * the rise.
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
  /**
   * Optional anchor ids per layer. Renders invisible spacers at the
   * correct scroll positions so `#layer-id` lands the user at the moment
   * that layer is fully revealed (band at top). Must have the same length
   * as `children`. Inner sections should NOT also carry these ids — they
   * live on the spacers so each layer gets a distinct scroll target.
   */
  anchorIds?: readonly string[];
};

const SURFACE_LEAD_IN = 0.06;

/**
 * Pinned viewport that layers its children one over the next via translateY.
 *
 * - Container height = N * 100vh (so each transition gets one viewport of
 *   scroll). The pinned inner viewport stays at 100vh.
 * - The first child is the base layer (no motion).
 * - Each subsequent layer K slides from y=100% (offscreen below) to y=0
 *   during scroll segment [(K-1)/(N-1), K/(N-1)]. The band at the top of
 *   the layer enters the viewport from the bottom and rises to the top.
 * - Anchor spacers (one per `anchorIds`) sit at top: K*100vh inside the
 *   root so #layer-id lands at the end of that layer's rise.
 */
export function WipeStack({
  children,
  id,
  className,
  surfaces,
  anchorIds,
}: WipeStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const layers = Children.toArray(children);
  const total = layers.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Toggle outer data-surface to match the topmost revealed layer.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!ref.current || !surfaces || surfaces.length !== total) return;
    let topIdx = 0;
    for (let i = 0; i < total - 1; i++) {
      const segEnd = (i + 1) / Math.max(1, total - 1);
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
      {anchorIds?.map((aid, i) => (
        <span
          key={aid}
          id={aid}
          className={styles.anchor}
          style={{ top: `${i * 100}vh` }}
          aria-hidden
        />
      ))}
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

  // Overlay slides up from below the viewport; base stays put.
  const y = useTransform(
    scrollYProgress,
    [segStart, segEnd],
    isBase ? ['0%', '0%'] : ['100%', '0%'],
    { clamp: true }
  );

  return (
    <motion.div className={styles.layer} style={{ y }}>
      {children}
    </motion.div>
  );
}