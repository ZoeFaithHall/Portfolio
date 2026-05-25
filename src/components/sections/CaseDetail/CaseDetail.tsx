import type { CaseStudy } from '@/types';
import { SectionBand } from '@/components/molecules/SectionBand';
import { CaseStudySection } from '@/components/organisms/CaseStudySection';
import { PinnedHero } from '@/components/organisms/PinnedHero';
import { Carousel } from '@/components/organisms/Carousel';
import { themeVars } from '@/utils/themeVars';
import styles from './CaseDetail.module.scss';

export type CaseDetailProps = {
  study: CaseStudy;
  index: number;
  total: number;
};

export function CaseDetail({ study, index, total }: CaseDetailProps) {
  return (
    <article id={study.slug} className={styles.root} style={themeVars(study.theme)}>
      <SectionBand
        label={study.client}
        meta={study.years}
        theme={{ bg: study.theme.band, color: study.theme.text }}
      />
      <CaseStudySection study={study} index={index} total={total} layout="flow" />
      <PinnedHero study={study} />
      <Carousel id={study.slug} heading="Take a closer look." items={study.carousel} />
    </article>
  );
}
