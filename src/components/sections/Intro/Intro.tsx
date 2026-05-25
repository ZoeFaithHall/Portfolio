import { useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react';
import { Philosophy } from '@/components/sections/Philosophy';
import styles from './Intro.module.scss';

// Surface flips to dark when case-studies layer dominates y=48 (~94% of wipe).
const SURFACE_THRESHOLD = 0.94;

/**
 * Two-layer wipe: Philosophy (base) → Case Studies announcement (wipes up).
 * Pinned 200vh outer, 100vh sticky inner. Content stays in the same place;
 * only the band reveals the next layer.
 */
export const Intro = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const wipeY = useTransform(scrollYProgress, [0, 1], [100, 0], { clamp: true });
  const clipPath = useTransform(wipeY, (v) => `inset(${v}% 0 0 0)`);
  const bandTop = useTransform(wipeY, (v) => `${v}%`);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!ref.current) return;
    const next = v > SURFACE_THRESHOLD ? 'dark' : 'light';
    if (ref.current.dataset.surface !== next) {
      ref.current.dataset.surface = next;
    }
  });

  return (
    <div ref={ref} className={styles.root} data-surface="light">
      <div className={styles.pinned}>
        {/* Layer 1: Philosophy fills the pinned viewport */}
        <div className={styles.layer}>
          <Philosophy />
        </div>

        {/* Layer 2: Case Studies announcement wipes up over Philosophy */}
        <motion.div className={styles.layer} style={{ clipPath }}>
          <CaseStudiesAnnouncement />
        </motion.div>
        <motion.div className={styles.wipeBand} style={{ top: bandTop }}>
          <span>case studies</span>
        </motion.div>
      </div>
    </div>
  );
};

const CaseStudiesAnnouncement = () => (
  <div className={styles.announcement}>
    <div className={styles.announcementInner}>
      <p className={styles.eyebrow}>chapter 02</p>
      <h2 className={styles.title}>case studies</h2>
      <p className={styles.tagline}>where the philosophy gets tested</p>
    </div>
  </div>
);
