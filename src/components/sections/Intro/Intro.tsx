import { useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react';
import { Philosophy } from '@/components/sections/Philosophy';
import { AnnouncementCard } from '@/components/organisms/AnnouncementCard';
import styles from './Intro.module.scss';

const SURFACE_THRESHOLD = 0.94;
const CASE_STUDIES_THEME = { bg: '#2B2D42', text: '#EDF2F4', accent: '#EF233C' };

/**
 * Two-layer wipe: Philosophy (base) → Case Studies announcement (clipPath
 * wipes up). The wipe band animates separately from `top: 100%` to `top: 0`.
 * Content stays in the same place; only the band reveals the next layer.
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
        <div className={styles.layer}>
          <Philosophy />
        </div>

        <motion.div className={styles.layer} style={{ clipPath }}>
          <AnnouncementCard
            eyebrow="chapter 02"
            title="case studies"
            tagline="where the philosophy gets tested"
            theme={CASE_STUDIES_THEME}
          />
        </motion.div>
        <motion.div className={styles.wipeBand} style={{ top: bandTop }}>
          <span>case studies</span>
        </motion.div>
      </div>
    </div>
  );
};
