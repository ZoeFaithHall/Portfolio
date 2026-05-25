import styles from './AnnouncementCard.module.scss';

export type AnnouncementTheme = {
  bg: string;
  text: string;
  accent: string;
};

export type AnnouncementCardProps = {
  eyebrow: string;
  title: string;
  tagline: string;
  theme: AnnouncementTheme;
};

/**
 * Centered eyebrow + display title + tagline card.
 * Fills its parent container (parent decides height — used both as a
 * full-bleed absolute layer in Intro and as a 100vh card in ChapterIntro).
 */
export function AnnouncementCard({ eyebrow, title, tagline, theme }: AnnouncementCardProps) {
  return (
    <div
      className={styles.root}
      style={{ background: theme.bg, color: theme.text }}
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title} style={{ color: theme.accent }}>
          {title}
        </h2>
        <p className={styles.tagline}>{tagline}</p>
      </div>
    </div>
  );
}
