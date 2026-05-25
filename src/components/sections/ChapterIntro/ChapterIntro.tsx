import type { CSSProperties } from 'react';
import styles from './ChapterIntro.module.scss';

export type ChapterIntroProps = {
  id: string;
  eyebrow: string;
  title: string;
  tagline: string;
  surface: 'light' | 'dark';
  theme: {
    bg: string;
    text: string;
    accent: string;
    band: { bg: string; color: string };
  };
};

/**
 * 100vh announcement section with a sticky band at the top.
 * Used standalone (e.g., Tech Stack between the case studies and Bento).
 */
export function ChapterIntro({ id, eyebrow, title, tagline, surface, theme }: ChapterIntroProps) {
  const vars = {
    '--chapter-bg': theme.bg,
    '--chapter-text': theme.text,
    '--chapter-accent': theme.accent,
    '--chapter-band-bg': theme.band.bg,
    '--chapter-band-color': theme.band.color,
  } as CSSProperties;

  return (
    <section
      id={id}
      className={styles.root}
      data-surface={surface}
      style={vars}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.band}>
        <span>{title}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={`${id}-title`} className={styles.title}>{title}</h2>
          <p className={styles.tagline}>{tagline}</p>
        </div>
      </div>
    </section>
  );
}
