import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Text } from '@/components/atoms/Text';
import type { CaseStudy } from '@/types';
import styles from './PinnedHero.module.scss';

export type PinnedHeroProps = {
  study: CaseStudy;
};

/**
 * Sticky case-study hero with a scroll-scrubbed image expansion.
 *
 * Layout: client name as huge background text, image as the focal layer,
 * statement as the final overlay.
 *
 * Scroll phases (within the 200vh container):
 *   0.00 – 0.55 : image scales from 0.45 → 1.00 (small-center → full-bleed)
 *   0.55 – 0.75 : statement fades in over the now-full image
 *   0.75 – 1.00 : holds, giving the user room to see the assembled state
 *                 before the Carousel below scrolls naturally into view
 *
 * Reads --case-bg / --case-text / --case-accent / --case-on-accent from
 * a themed parent wrapper (CaseDetail applies these via themeVars()).
 */
export function PinnedHero({ study }: PinnedHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Image grows from 45% scale (small, centered) to 100% (full bleed)
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.55],
    [0.45, 1],
    { clamp: true },
  );

  // Client wordmark fades out as the image takes over (it's behind the image,
  // so it's visually covered too, but fading it adds depth)
  const clientOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    [0.18, 0],
    { clamp: true },
  );

  // Statement enters after the image lands
  const statementOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.75],
    [0, 1],
    { clamp: true },
  );
  const statementY = useTransform(
    scrollYProgress,
    [0.55, 0.75],
    ['16px', '0px'],
    { clamp: true },
  );

  return (
    <section
      ref={ref}
      data-surface="dark"
      className={styles.root}
      aria-label={`${study.client} hero`}
    >
      <div className={styles.pinned}>
        {/* Huge client name behind the image */}
        <motion.div
          className={styles.client}
          style={{ opacity: clientOpacity }}
          aria-hidden
        >
          {study.client}
        </motion.div>

        {/* Image (or gradient fallback) that scales from small to full */}
        <motion.div className={styles.imageWrap} style={{ scale: imageScale }}>
          {study.heroImage ? (
            <img src={study.heroImage} alt="" className={styles.image} />
          ) : (
            <div className={styles.fallback} aria-hidden />
          )}
        </motion.div>

        {/* Statement overlay — fades in once the image is full */}
        <motion.div
          className={styles.statementWrap}
          style={{ opacity: statementOpacity, y: statementY }}
        >
          <Text variant="mono" className={styles.eyebrow}>{study.client}</Text>
          <Text as="h3" variant="display-1" className={styles.statement}>
            {study.statement}
          </Text>
        </motion.div>
      </div>
    </section>
  );
}