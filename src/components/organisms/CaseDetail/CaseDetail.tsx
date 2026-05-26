import { Text } from '@/components/atoms/Text';
import { SectionBand } from '@/components/molecules/SectionBand';
import { IntroGrid } from '@/components/molecules/IntroGrid';
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
              <span className={styles.counterCurrent}>{current}</span>
              <span className={styles.counterTotal}>/{totalPadded}</span>
            </Text>

            <dl className={styles.meta}>
              <div className={styles.metaBlock}>
                <dt><Text variant="caption" muted>role</Text></dt>
                <dd><Text variant="body">{study.role}</Text></dd>
              </div>
              <div className={styles.metaBlock}>
                <dt><Text variant="caption" muted>scale</Text></dt>
                <dd>
                  <ul className={styles.tagList} role="list">
                    {study.scale.map((item) => (
                      <li key={item}><Text variant="caption">{item}</Text></li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className={styles.metaBlock}>
                <dt><Text variant="caption" muted>stack</Text></dt>
                <dd>
                  <ul className={styles.tagList} role="list">
                    {study.stack.map((item) => (
                      <li key={item}><Text variant="caption">{item}</Text></li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </>
        }
      />

      <PinnedHero study={study} />
      <Carousel id={study.slug} heading="Take a closer look." items={study.carousel} />
    </article>
  );
}
