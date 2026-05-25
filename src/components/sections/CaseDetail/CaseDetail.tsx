import { useRef, type CSSProperties } from 'react';
import { CaseStudySection } from '@/components/sections/CaseStudySection';
import { Text } from '@/components/atoms/Text';
import type { CaseStudy } from '@/types';
import styles from './CaseDetail.module.scss';

export type CaseDetailProps = {
  study: CaseStudy;
  index: number;
  total: number;
};

/**
 * One case study as a normal-document-flow section:
 *   Sticky band (stays at top throughout this case)
 *   Intro    — Philosophy-style 65/35 layout
 *   Hero     — 200vh outer, image pins for 100vh, title scrolls up over it
 *   Carousel — Take a closer look + horizontal scroll with right-aligned arrows
 *
 * Bands transition between adjacent cases via natural sticky stacking: as
 * this case ends, its band scrolls up out of view; the next case's band
 * slides up from below into the top:0 position.
 */
export function CaseDetail({ study, index, total }: CaseDetailProps) {
  const themeVars = {
    '--case-bg': study.theme.bg,
    '--case-text': study.theme.text,
    '--case-accent': study.theme.accent,
    '--case-band': study.theme.band,
    '--case-on-accent': '#EDF2F4',
  } as CSSProperties;

  return (
    <article id={study.slug} className={styles.root} style={themeVars}>
      <div className={styles.band} data-surface="light">
        <span>{study.client}</span>
        <span className={styles.bandYears}>{study.years}</span>
      </div>

      <CaseStudySection study={study} index={index} total={total} layout="flow" />
      <CaseDetailHero study={study} />
      <CaseDetailCarousel study={study} />
    </article>
  );
}

function CaseDetailHero({ study }: { study: CaseStudy }) {
  return (
    <section
      data-surface="dark"
      className={styles.hero}
      aria-label={`${study.client} hero`}
    >
      <div className={styles.heroBg} aria-hidden />
      <div className={styles.heroTitle}>
        <Text variant="mono" className={styles.heroEyebrow}>{study.client}</Text>
        <Text as="h3" variant="display-1" className={styles.heroStatement}>
          {study.statement}
        </Text>
      </div>
    </section>
  );
}

function CaseDetailCarousel({ study }: { study: CaseStudy }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingId = `${study.slug}-closer`;

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('article');
    const cardWidth = card?.offsetWidth ?? track.clientWidth;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * cardWidth, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      data-surface="light"
      className={styles.carousel}
      aria-labelledby={headingId}
    >
      <Text as="h3" variant="display-2" id={headingId} className={styles.carouselHeading}>
        Take a closer look.
      </Text>
      <div className={styles.track} ref={trackRef}>
        {study.carousel.map((item, i) => (
          <article key={i} className={styles.card}>
            <div className={styles.cardImage} aria-hidden />
            <div className={styles.cardCopy}>
              <Text as="h4" variant="heading-3" className={styles.cardTitle}>
                {item.title}
              </Text>
              <Text variant="body" muted>{item.caption}</Text>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.controlButton}
          onClick={() => scrollByCard(-1)}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          type="button"
          className={styles.controlButton}
          onClick={() => scrollByCard(1)}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
}
