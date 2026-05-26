import { Text } from '@/components/atoms/Text';
import { SectionBand } from '@/components/molecules/SectionBand';
import { IntroGrid } from '@/components/molecules/IntroGrid';
import { TagList } from '@/components/molecules/TagList';
import { MetaBlock } from '@/components/molecules/MetaBlock';
import { PinnedHero } from '@/components/organisms/PinnedHero';
import { Carousel } from '@/components/organisms/Carousel';
import { themeVars } from '@/utils/themeVars';
import type { CaseStudy } from '@/types';
import styles from './CaseDetail.module.scss';

export type CaseDetailProps = {
  study: CaseStudy;
  index: number;
  total: number;
};

/**
 * One case study end-to-end:
 *   sticky band → intro (IntroGrid: statement + counter + role/scale/stack rail)
 *   → pinned hero → carousel
 *
 * Pulls everything from a single `study: CaseStudy` data row. Theme tokens
 * flow to descendant organisms via CSS custom properties set by themeVars().
 */
export function CaseDetail({ study, index, total }: CaseDetailProps) {
  const current = String(index).padStart(2, '0');
  const totalPadded = String(total).padStart(2, '0');

  return (
    <article id={study.slug} className={styles.root} style={themeVars(study.theme)}>
      <SectionBand
        label={study.client}
        meta={study.years}
        theme={{ bg: study.theme.band, color: study.theme.text }}
      />

      <IntroGrid
        statement={study.statement}
        statementId={`${study.slug}-heading`}
        statementColor="var(--case-text)"
        rail={
          <>
            <Text variant="mono" className={styles.counter}>
              <Text as="span" variant="mono" className={styles.counterCurrent}>{current}</Text>
              <Text as="span" variant="mono" className={styles.counterTotal}>/{totalPadded}</Text>
            </Text>

            <dl className={styles.meta}>
              <MetaBlock label="role">
                <Text variant="body">{study.role}</Text>
              </MetaBlock>
              <MetaBlock label="scale">
                <TagList items={study.scale} ariaLabel="scale" />
              </MetaBlock>
              <MetaBlock label="stack">
                <TagList items={study.stack} ariaLabel="stack" />
              </MetaBlock>
            </dl>
          </>
        }
      />

      <PinnedHero study={study} />
      <Carousel id={study.slug} heading="Take a closer look." items={study.carousel} />
    </article>
  );
}
