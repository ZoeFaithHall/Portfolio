import { CaseDetail } from '@/components/organisms/CaseDetail';
import { caseStudies } from '@/data/casestudies';

/**
 * Renders every case study as a CaseDetail in document flow. Each
 * CaseDetail owns its own pinned hero + carousel; this section is
 * purely the loop.
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