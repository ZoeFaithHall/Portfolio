import { CaseDetail } from '@/components/organisms/CaseDetail';
import { caseStudies } from '@/data/casestudies';

/**
 * Renders every case study as a CaseDetail in document flow. The Case
 * Studies announcement intro lives in the Intro wipe section above, so
 * this is purely the case detail loop.
 */
export function CaseStudies() {
  return (
    <>
      {caseStudies.map((study, i) => (
        <CaseDetail
          key={study.slug}
          study={study}
          index={i + 1}
          total={caseStudies.length}
        />
      ))}
    </>
  );
}
