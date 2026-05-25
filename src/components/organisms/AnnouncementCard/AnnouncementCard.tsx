import { Text } from '@/components/atoms/Text';
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
 * Mirrors Philosophy's 65/35 layout: bold statement-style title on the left,
 * eyebrow + tagline rail on the right. Fills its parent container; parent
 * decides vertical sizing (Intro's wipe layer = 100vh; ChapterIntro's .card
 * = 100vh − 3rem band).
 */
export function AnnouncementCard({ eyebrow, title, tagline, theme }: AnnouncementCardProps) {
  return (
    <div
      className={styles.root}
      style={{ background: theme.bg, color: theme.text }}
    >
      <div className={styles.grid}>
        <Text
          as="h2"
          variant="display-2"
          className={styles.title}
          style={{ color: theme.accent }}
        >
          {title}
        </Text>
        <aside className={styles.rail}>
          <Text variant="mono" className={styles.eyebrow}>{eyebrow}</Text>
          <Text variant="body" className={styles.tagline}>{tagline}</Text>
        </aside>
      </div>
    </div>
  );
}
