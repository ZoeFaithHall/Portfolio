/** A card visual: a looping screen recording (with poster) or a still image. */
export type CarouselMedia = {
  video?: string;
  poster: string;
  alt: string;
};

export type CarouselItem = {
  title: string;
  caption: string;
  media?: CarouselMedia;
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
  /** Optional hero image used by PinnedHero. Path relative to /public. */
  heroImage?: string;
  /** Greyscale client logo shown at the top of the case's rail. Path relative to /public. */
  logo?: { src: string; alt: string };
  /** Optional live link shown at the bottom of the rail. Opens in a new tab. */
  link?: { href: string; label: string };
};

export type NavAnchor = {
  href: string;
  label: string;
};