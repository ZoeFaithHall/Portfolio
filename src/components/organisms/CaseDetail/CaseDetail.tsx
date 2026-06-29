import { Text } from '@/components/atoms/Text';
import { IntroGrid } from '@/components/molecules/IntroGrid';
import { TagList } from '@/components/molecules/TagList';
import { MetaBlock } from '@/components/molecules/MetaBlock';
import { PinnedHero } from '@/components/organisms/PinnedHero';
import { CaseStudyCarousel } from '@/components/organisms/CaseStudyCarousel';
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
 *   intro grid (statement + counter/role/scale/stack)
 *   → pinned hero (image expansion + statement overlay)
 *   → carousel ("take a closer look")
 *
 * SectionBands intentionally absent here — they were stacking across
 * sibling case studies (each one sticky at top:0). The Case Studies
 * intro layer in WipeStack is the only place a band lives now.
 */
export function CaseDetail({ study, index, total }: CaseDetailProps) {
  const current = String(index).padStart(2, '0');
  const totalPadded = String(total).padStart(2, '0');

  return (
    <article id={study.slug} className={styles.root} style={themeVars(study.theme)}>
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
              <MetaBlock label="client">
                <Text variant="body">{study.client}</Text>
              </MetaBlock>
              <MetaBlock label="years">
                <Text variant="body">{study.years}</Text>
              </MetaBlock>
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
      <CaseStudyCarousel id={study.slug} heading="Take a closer look." items={study.carousel} />
    </article>
  );
}