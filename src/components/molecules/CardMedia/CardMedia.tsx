import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import type { CarouselMedia } from '@/types';
import styles from './CardMedia.module.scss';

export type CardMediaProps = {
  media?: CarouselMedia;
  className?: string;
};

/**
 * Carousel card visual. A looping muted screen recording plays only while
 * it is on screen, never under reduced motion, and always has a pause
 * button (WCAG 2.2.2: moving content over 5s must be pausable). Without
 * media it renders the plain placeholder panel.
 */
export function CardMedia({ media, className }: CardMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(Boolean(reduce));
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView && !paused) el.play().catch(() => setPaused(true));
    else el.pause();
  }, [inView, paused]);

  if (!media) return <div className={className} aria-hidden />;

  if (!media.video) {
    return (
      <div className={className}>
        <img src={media.poster} alt={media.alt} className={styles.fill} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`${className ?? ''} ${styles.root}`}>
      <video
        ref={videoRef}
        className={styles.fill}
        src={media.video}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? `Play: ${media.alt}` : `Pause: ${media.alt}`}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
          {paused ? (
            <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
          ) : (
            <path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" fill="currentColor" />
          )}
        </svg>
      </button>
    </div>
  );
}
