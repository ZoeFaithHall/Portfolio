import { SectionBand } from '@/components/molecules/SectionBand';
import { AnnouncementCard } from '@/components/organisms/AnnouncementCard';
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
 * Sticky band + full-viewport AnnouncementCard. Used for the Tech Stack
 * announcement (and any future chapter announcements that sit standalone
 * outside the Intro wipe).
 */
export function ChapterIntro({ id, eyebrow, title, tagline, surface, theme }: ChapterIntroProps) {
  return (
    <section
      id={id}
      className={styles.root}
      data-surface={surface}
      aria-labelledby={`${id}-title`}
      style={{ background: theme.bg, color: theme.text }}
    >
      <SectionBand label={title} theme={theme.band} />
      <div className={styles.card}>
        <AnnouncementCard
          eyebrow={eyebrow}
          title={title}
          tagline={tagline}
          theme={{ bg: theme.bg, text: theme.text, accent: theme.accent }}
        />
      </div>
    </section>
  );
}
