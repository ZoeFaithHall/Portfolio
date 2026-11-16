import { CaseDetail, caseBannerLabel } from '@/components/organisms/CaseDetail';
import { WipeChapter } from '@/components/organisms/WipeChapter';
import { caseStudies } from '@/data/casestudies';
import { themeVars } from '@/utils/themeVars';
import styles from './CaseStudies.module.scss';

/** Chapter stacking starts after Philosophy (1). */
const FIRST_INDEX = 2;

/**
 * Every case study as its own wipe chapter. The first carries the
 * #case-studies anchor; the rest are reachable by slug.
 */
export function CaseStudies() {
  const total = caseStudies.length;
  return (
    <>
      {caseStudies.map((study, i) => (
        <WipeChapter
          key={study.slug}
          id={i === 0 ? 'case-studies' : study.slug}
          index={FIRST_INDEX + i}
          label={caseBannerLabel(i + 1, total, study.client)}
          ariaLabel={`${study.client} case study`}
          className={styles.chapter}
          style={themeVars(study.theme)}
        >
          <CaseDetail study={study} index={i + 1} total={total} />
        </WipeChapter>
      ))}
    </>
  );
}
