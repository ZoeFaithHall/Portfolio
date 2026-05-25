import { useCallback, useRef } from 'react';

/**
 * Encapsulates a horizontal-scroll carousel's ref + scroll-by-card behavior.
 * The track ref attaches to the scrolling container (a flex row with
 * scroll-snap-x). scrollByCard(±1) advances by one card's width, honoring
 * `prefers-reduced-motion`.
 */
export const useCarouselScroll = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('article');
    const cardWidth = card?.offsetWidth ?? track.clientWidth;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * cardWidth,
      behavior: reduced ? 'auto' : 'smooth',
    });
  }, []);

  return { trackRef, scrollByCard };
};
