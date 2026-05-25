import { Text } from '@/components/atoms/Text';
import { useCarouselScroll } from '@/hooks/useCarouselScroll';
import type { CarouselItem } from '@/types';
import styles from './Carousel.module.scss';

export type CarouselProps = {
  /** Unique id used for the heading's id (for aria-labelledby pairing). */
  id: string;
  heading: string;
  items: readonly CarouselItem[];
};

/**
 * Horizontal scroll-snap track with arrow-button controls.
 * Reads --case-bg / --case-text / --case-band from a themed parent wrapper.
 */
export function Carousel({ id, heading, items }: CarouselProps) {
  const { trackRef, scrollByCard } = useCarouselScroll();
  const headingId = `${id}-carousel-heading`;

  return (
    <section
      data-surface="light"
      className={styles.root}
      aria-labelledby={headingId}
    >
      <Text as="h3" variant="display-2" id={headingId} className={styles.heading}>
        {heading}
      </Text>
      <div className={styles.track} ref={trackRef}>
        {items.map((item, i) => (
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
