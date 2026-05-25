import { Text } from '@/components/atoms/Text';
import type { CaseStudy } from '@/types';
import styles from './PinnedHero.module.scss';

export type PinnedHeroProps = {
  study: CaseStudy;
};

/**
 * 200vh outer with a `position: sticky` image bg that pins for 100vh,
 * while the absolutely-positioned title block scrolls up over it.
 * Reads --case-accent / --case-on-accent from a themed parent wrapper.
 */
export function PinnedHero({ study }: PinnedHeroProps) {
  return (
    <section
      data-surface="dark"
      className={styles.root}
      aria-label={`${study.client} hero`}
    >
      <div className={styles.bg} aria-hidden />
      <div className={styles.title}>
        <Text variant="mono" className={styles.eyebrow}>{study.client}</Text>
        <Text as="h3" variant="display-1" className={styles.statement}>
          {study.statement}
        </Text>
      </div>
    </section>
  );
}
