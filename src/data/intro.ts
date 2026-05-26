/**
 * Data for every intro section (Philosophy + chapter announcements). All
 * render via the same IntroGrid pattern; only the data differs.
 */

export type IntroParagraph = {
  text: string;
  muted?: boolean;
};

export type IntroTheme = {
  bg: string;
  text: string;
  accent: string;
};

/** Philosophy-style intro: paragraphs + tag list in the rail. */
export type PhilosophyIntroData = {
  band: { label: string };
  statement: string;
  paragraphs: readonly IntroParagraph[];
  tags: readonly string[];
};

/** Announcement-style intro: eyebrow + tagline in the rail, themed background. */
export type AnnouncementIntroData = {
  band: { label: string };
  statement: string;
  statementColor: string;
  eyebrow: string;
  tagline: string;
  theme: IntroTheme;
};

/** Stat-grid intro: heading + grid of value/caption cells. */
export type NumbersIntroData = {
  band: { label: string };
  heading: string;
  cells: readonly { value: string; caption: string }[];
};

export const introData = {
  philosophy: {
    band: { label: 'philosophy' },
    statement: 'Build infrastructure that makes fires nearly impossible to start.',
    paragraphs: [
      {
        text: 'Frontend Architect. Founder of Rune Lab. Most teams point AI at code. I point it at architecture.',
      },
      {
        text: 'Based in Harrisburg. Working remote. Available for Staff, Principal, Lead, and Director roles. Consulting via Rune Lab.',
        muted: true,
      },
    ],
    tags: ['Systems thinking', 'Design systems', 'AI architecture', 'Accessibility'],
  } satisfies PhilosophyIntroData,

  caseStudies: {
    band: { label: '02 Case Studies' },
    statement: 'case studies',
    statementColor: '#EF233C',
    eyebrow: '02 Case Studies',
    tagline: 'where the philosophy gets tested',
    theme: { bg: '#2B2D42', text: '#EDF2F4', accent: '#EF233C' },
  } satisfies AnnouncementIntroData,

  techStack: {
    band: { label: '03 Tech Stack' },
    statement: 'tech stack',
    statementColor: '#D80032',
    eyebrow: '03 Tech Stack',
    tagline: 'the tools I reach for',
    theme: { bg: '#8D99AE', text: '#2B2D42', accent: '#D80032' },
  } satisfies AnnouncementIntroData,

  numbers: {
    band: { label: '04 By The Numbers' },
    heading: 'by the numbers',
    cells: [
      { value: '14M+', caption: 'cumulative users across three years' },
      { value: '0', caption: 'production UI defects in three years' },
      { value: '$6B', caption: 'valuation supported through scale' },
      { value: '1 → 12', caption: 'team grown as sole architect' },
      { value: '67 → 134%', caption: 'revenue attainment in two quarters' },
      { value: '13M', caption: 'Pennsylvania residents on Keystone' },
    ],
  } satisfies NumbersIntroData,
};
