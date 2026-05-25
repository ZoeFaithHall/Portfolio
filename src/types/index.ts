export type CarouselItem = {
  title: string;
  caption: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  years: string;
  /** Large display statement rendered on the left of the section. */
  statement: string;
  role: string;
  scale: readonly string[];
  stack: readonly string[];
  /** "Take a closer look" carousel items — 3 per case. */
  carousel: readonly CarouselItem[];
  /** Per-study theme tokens. Reference these in CaseStudySection styles via CSS custom properties. */
  theme: {
    bg: string;
    text: string;
    accent: string;
    band: string;
  };
};

export type NavAnchor = {
  href: string;
  label: string;
};
