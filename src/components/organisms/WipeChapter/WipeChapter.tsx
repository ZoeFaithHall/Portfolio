import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/utils/cn';
import styles from './WipeChapter.module.scss';

export type WipeChapterProps = {
  /** Anchor id. Scrolling to it lands on the fully revealed chapter. */
  id?: string;
  /** Banner content. The banner is the wipe edge, then sticks at the top. */
  label: ReactNode;
  /** Stacking order. Each chapter sits above the one before it. */
  index: number;
  /** Wipe in over the previous block's held last screen. */
  wipeIn?: boolean;
  /** Hold this chapter's last screen in place while the next one wipes over it. */
  holdForNext?: boolean;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  children: ReactNode;
};

/**
 * One chapter of the scroll story.
 *
 * The wipe: the chapter overlaps the previous block's last 100vh
 * (negative margin) and stacks above it. While its top edge rises from
 * the bottom of the viewport to the top, its content is counter-translated
 * by the same distance, so the content holds still and the rising edge
 * uncovers it in place. The banner rides that edge, then sticks at top: 0
 * while the chapter scrolls normally underneath it.
 *
 * The hold: the body sticks once its bottom meets the viewport bottom,
 * followed by a 100vh spacer, so the last screen stays put while the next
 * chapter wipes over it.
 */
export function WipeChapter({
  id,
  label,
  index,
  wipeIn = true,
  holdForNext = true,
  className,
  style,
  ariaLabel,
  children,
}: WipeChapterProps) {
  const ref = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const motionOk = !useReducedMotion();
  const wipe = motionOk && wipeIn;
  const hold = motionOk && holdForNext;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });
  // Edge at the viewport bottom → content shifted up a full screen; edge at the top → no shift.
  const y = useTransform(scrollYProgress, [0, 1], ['-100vh', '0vh']);

  const [stickTop, setStickTop] = useState(0);
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el || !hold) return;
    const update = () => setStickTop(Math.min(0, window.innerHeight - el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [hold]);

  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={cn(styles.root, wipe && styles.overlap, className)}
      style={{ zIndex: index, ...style }}
    >
      <div className={styles.banner} data-surface="dark">
        <span className={styles.marker} aria-hidden />
        <span className={styles.label}>{label}</span>
      </div>
      <motion.div style={wipe ? { y } : undefined}>
        <div
          ref={bodyRef}
          className={styles.body}
          style={hold ? { position: 'sticky', top: stickTop } : undefined}
        >
          {children}
        </div>
        {hold && <div className={styles.hold} aria-hidden />}
      </motion.div>
    </section>
  );
}
