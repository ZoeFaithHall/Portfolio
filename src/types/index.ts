export type CaseStudy = {
  slug: string;
  client: string;
  years: string;
  /** Single punch word rendered large in the accent color (e.g. "scale", "access", "judgment") */
  punchWord: string;
  /** Frame text rendered alongside the punch word (shared across studies, in data for flexibility) */
  frame: string;
  /** 1-2 short paragraphs in your voice */
  description: string[];
  role: string;
  scale: readonly string[];
  stack: readonly string[];
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
