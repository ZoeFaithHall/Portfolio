import CaseStudySection from '@components/sections/CaseStudySection';
import { caseStudies } from '@data/projects';

export default function Cases() {
  return (
    <div id="work">
      {caseStudies.map((study, i) => (
        <CaseStudySection
          key={study.slug}
          study={study}
          index={i + 1}
          total={caseStudies.length}
          // Drop in a real artifact per study later: screenshot, diagram, SVG.
          // artifact={<img src={`/cases/${study.slug}.png`} alt="" />}
        />
      ))}
    </div>
  );
}
