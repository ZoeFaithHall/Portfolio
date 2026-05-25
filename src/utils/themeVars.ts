import type { CSSProperties } from 'react';

export type CaseThemeTokens = {
  bg: string;
  text: string;
  accent: string;
  band: string;
};

const DEFAULT_ON_ACCENT = '#EDF2F4';

/**
 * Build the inline CSS custom properties that case-themed organisms
 * (PinnedHero, Carousel, CaseStudySection) read via var(--case-*).
 * Apply the result to a parent wrapper's `style` prop and the tokens
 * flow to every child.
 */
export const themeVars = (theme: CaseThemeTokens, onAccent: string = DEFAULT_ON_ACCENT): CSSProperties =>
  ({
    '--case-bg': theme.bg,
    '--case-text': theme.text,
    '--case-accent': theme.accent,
    '--case-band': theme.band,
    '--case-on-accent': onAccent,
  } as CSSProperties);
