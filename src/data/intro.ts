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
    statement: 'Good architecture shows up on the balance sheet.',
    paragraphs: [
      {
        text: 'Frontend architect. Founder of Rune Lab. Author of The Creator.',
      },
      {
        text: 'At Fleetio, the sales tools I built took revenue attainment from 67% to 134% of a $100M target in two quarters. That is $67M. I carried the frontend from Series B to a $6B valuation with zero production UI defects.',
      },
      {
        text: 'Most recently, founding frontend engineer at Prysm Health, building an EHR for skilled nursing facilities. Before that, the Keystone Design System for 13M Pennsylvania residents. Most teams point AI at code. I point it at architecture.',
      },
      {
        text: 'Harrisburg, working remote. Taking founding and lead architecture roles, advisory work, and speaking engagements.',
        muted: true,
      },
    ],
    tags: ['Revenue impact', 'Design systems', 'AI architecture', 'Accessibility'],
  } satisfies PhilosophyIntroData,

  caseStudies: {
    band: { label: '02 Case Studies' },
    statement: 'case studies',
    statementColor: '#D80032',
    eyebrow: '02 Case Studies',
    tagline: 'where the philosophy gets tested',
    theme: { bg: '#F7F9FA', text: '#2B2D42', accent: '#D80032' },
  } satisfies AnnouncementIntroData,

  techStack: {
    band: { label: '03 Tech Stack' },
    statement: 'tech stack',
    statementColor: '#D80032',
    eyebrow: '03 Tech Stack',
    tagline: 'the tools I reach for',
    theme: { bg: '#F7F9FA', text: '#2B2D42', accent: '#D80032' },
  } satisfies AnnouncementIntroData,

  numbers: {
    band: { label: '04 By The Numbers' },
    heading: 'what the work is worth',
    cells: [
      { value: '+$67M', caption: 'revenue attainment in two quarters, 67% to 134% of target' },
      { value: '$6B', caption: 'valuation, from Series B, on a frontend I architected' },
      { value: '788%', caption: 'year-one ROI on an AI decision system, CFO approved' },
      { value: '$7.02M', caption: 'ten-year value modeled from 13,395 records' },
      { value: '0', caption: 'production UI defects in three years' },
      { value: '14M+', caption: 'users across three years' },
    ],
  } satisfies NumbersIntroData,
};
