import { PageLayout } from '@/components/templates/PageLayout';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { ChapterIntro } from '@/components/sections/ChapterIntro';
import { CaseDetail } from '@/components/sections/CaseDetail';
import { Bento } from '@/components/sections/Bento';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { caseStudies } from '@/data/projects';
import { useLenis } from '@/hooks/useLenis';

const TECH_STACK_INTRO = {
  id: 'tech-stack',
  eyebrow: 'chapter 03',
  title: 'tech stack',
  tagline: 'the tools I reach for',
  surface: 'light' as const,
  theme: {
    bg: '#8D99AE',
    text: '#2B2D42',
    accent: '#D80032',
    band: { bg: '#EDF2F4', color: '#2B2D42' },
  },
};

function App() {
  useLenis();

  return (
    <PageLayout>
      <Hero />
      <Intro />
      {caseStudies.map((study, i) => (
        <CaseDetail
          key={study.slug}
          study={study}
          index={i + 1}
          total={caseStudies.length}
        />
      ))}
      <ChapterIntro {...TECH_STACK_INTRO} />
      <Bento />
      <ContactCTA />
    </PageLayout>
  );
}

export default App;
