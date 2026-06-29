import { Text } from '@/components/atoms/Text';
import Icon from '@/components/atoms/Icon';
import { IconButton } from '@/components/molecules/IconButton';
import { useCarouselScroll } from '@/hooks/useCarouselScroll';
import type { CarouselItem } from '@/types';
import styles from './CaseStudyCarousel.module.scss';

export type CaseStudyCarouselProps = {
  /** Unique id used for the heading's id (for aria-labelledby pairing). */
  id: string;
  heading: string;
  items: readonly CarouselItem[];
};

const ChevronLeft = (
  <Icon>
    <path d="M15 18l-6-6 6-6" />
  </Icon>
);

const ChevronRight = (
  <Icon>
    <path d="M9 18l6-6-6-6" />
  </Icon>
);

/**
 * Horizontal scroll-snap track with arrow-button controls.
 * Reads --case-bg / --case-text / --case-band from a themed parent wrapper.
 */
export function CaseStudyCarousel({ id, heading, items }: CaseStudyCarouselProps) {
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
        <IconButton
          label="Previous"
          icon={ChevronLeft}
          onClick={() => scrollByCard(-1)}
          className={styles.controlButton}
        />
        <IconButton
          label="Next"
          icon={ChevronRight}
          onClick={() => scrollByCard(1)}
          className={styles.controlButton}
        />
      </div>
    </section>
  );
}
