import { useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react';
import { Text } from '@/components/atoms/Text';
import { IntroGrid } from '@/components/molecules/IntroGrid';
import { introData } from '@/data/intro';
import styles from './Intro.module.scss';

const SURFACE_THRESHOLD = 0.94;

/**
 * Two-layer wipe: Philosophy (base) → Case Studies intro (clipPath wipes
 * over). Both layers occupy the SAME pinned 100vh viewport — scrolling
 * transitions them via clipPath, never pushing content out of view. After
 * the wipe completes, the pin releases and the next section (case details)
 * enters in normal document flow.
 */
export const Intro = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const wipeY = useTransform(scrollYProgress, [0, 1], [100, 0], { clamp: true });
  const clipPath = useTransform(wipeY, (v) => `inset(${v}% 0 0 0)`);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!ref.current) return;
    const next = v > SURFACE_THRESHOLD ? 'dark' : 'light';
    if (ref.current.dataset.surface !== next) {
      ref.current.dataset.surface = next;
    }
  });

  const phil = introData.philosophy;
  const cs = introData.caseStudies;

  return (
    <div ref={ref} className={styles.root} data-surface="light">
      <div className={styles.pinned}>
        <section
          id="philosophy"
          className={styles.layer}
          data-surface="light"
          aria-labelledby="philosophy-heading"
        >
          <IntroGrid
            band={phil.band}
            statement={phil.statement}
            statementId="philosophy-heading"
            rail={
              <>
                {phil.paragraphs.map((p, i) => (
                  <Text key={i} variant="body" muted={p.muted}>
                    {p.text}
                  </Text>
                ))}
                <ul className={styles.tags} role="list">
                  {phil.tags.map((tag) => (
                    <li key={tag}>
                      <Text variant="caption">{tag}</Text>
                    </li>
                  ))}
                </ul>
              </>
            }
          />
        </section>

        <motion.section
          id="case-studies"
          className={styles.layer}
          data-surface="dark"
          style={{ clipPath, background: cs.theme.bg, color: cs.theme.text }}
          aria-labelledby="case-studies-heading"
        >
          <IntroGrid
            band={cs.band}
            statement={cs.statement}
            statementColor={cs.statementColor}
            statementId="case-studies-heading"
            rail={
              <>
                <Text variant="mono">{cs.eyebrow}</Text>
                <Text variant="body">{cs.tagline}</Text>
              </>
            }
          />
        </motion.section>
      </div>
    </div>
  );
};
