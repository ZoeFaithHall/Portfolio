import { Text } from '@/components/atoms/Text';
import { IntroGrid } from '@/components/molecules/IntroGrid';
import { TagList } from '@/components/molecules/TagList';
import { MetaBlock } from '@/components/molecules/MetaBlock';
import { Link } from '@/components/atoms/Link';
import { PinnedHero } from '@/components/organisms/PinnedHero';
import { CaseStudyCarousel } from '@/components/organisms/CaseStudyCarousel';
import type { CaseStudy } from '@/types';
import styles from './CaseDetail.module.scss';

export type CaseDetailProps = {
  study: CaseStudy;
  index: number;
  total: number;
};

/** Banner text for a case chapter, e.g. "01 / 04  Rune Lab". */
export function caseBannerLabel(index: number, total: number, client: string) {
  return `${String(index).padStart(2, '0')} / ${String(total).padStart(2, '0')}  ${client}`;
}

/**
 * One case study's content, rendered inside its WipeChapter:
 *   intro grid (statement + counter/role/scale/stack)
 *   → carousel ("take a closer look")
 *   → pinned hero finale (client name, image grows full width, statement
 *     over it). That last screen is what the next chapter wipes over.
 */
export function CaseDetail({ study, index, total }: CaseDetailProps) {
  const current = String(index).padStart(2, '0');
  const totalPadded = String(total).padStart(2, '0');

  return (
    <>
      <IntroGrid
        statement={study.statement}
        statementId={`${study.slug}-heading`}
        statementColor="var(--case-text)"
        rail={
          <>
            {study.logo && (
              <img
                src={study.logo.src}
                alt={study.logo.alt}
                className={styles.logo}
                width={3000}
                height={600}
                loading="lazy"
              />
            )}
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
              {study.link && (
                <MetaBlock label="see it live">
                  <Link to={study.link.href} underline className={styles.liveLink}>
                    {study.link.label}
                    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
                      <path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Link>
                </MetaBlock>
              )}
            </dl>
          </>
        }
      />

      <CaseStudyCarousel id={study.slug} heading="Take a closer look." items={study.carousel} />
      <PinnedHero study={study} />
    </>
  );
}