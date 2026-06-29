import { useRef, type RefObject } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import letters from './letters.json';
import styles from './FooterWordmark.module.scss';

interface Props {
  /**
   * Background tone the wordmark sits on.
   * `light` → dark wordmark, `dark` → light wordmark.
   */
  surface?: 'light' | 'dark';
  /** Optional override of the cascade duration in scroll-progress units. Default 0.85. */
  cascade?: number;
  /** Optional override of how long each letter takes to land. Default 0.4. */
  perLetter?: number;
  /**
   * Element whose scroll range drives the animation. Defaults to the
   * wordmark itself, which is ~300px tall — usually too short for the
   * cascade to be visible at normal scroll speeds. Pass a taller parent
   * (e.g., the Footer) so the cascade unfolds over more scroll.
   */
  scrollTargetRef?: RefObject<HTMLElement | null>;
}

export const FooterWordmark = ({
  surface = 'dark',
  cascade = 0.85,
  perLetter = 0.4,
  scrollTargetRef,
}: Props) => {
  const ownRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Drive scroll from a parent if one was passed, otherwise from the
  // wordmark element itself.
  const target = scrollTargetRef ?? ownRef;
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end end'],
  });

  const { width: W, height: H } = letters.source;

  return (
    <div
      ref={ownRef}
      className={styles.root}
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label={letters.text}
    >
      {letters.letters.map((L, i) => (
        <Letter
          key={L.index}
          scrollYProgress={scrollYProgress}
          index={i}
          total={letters.letters.length}
          cascade={cascade}
          perLetter={perLetter}
          reduced={!!prefersReduced}
          src={`/wordmarks/letters/${surface === 'dark' ? L.file_light : L.file}`}
          xPct={(L.x / W) * 100}
          yPct={(L.y / H) * 100}
          wPct={(L.width / W) * 100}
        />
      ))}
    </div>
  );
};

interface LetterProps {
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
  cascade: number;
  perLetter: number;
  reduced: boolean;
  src: string;
  xPct: number;
  yPct: number;
  wPct: number;
}

const Letter = ({
  scrollYProgress,
  index,
  total,
  cascade,
  perLetter,
  reduced,
  src,
  xPct,
  yPct,
  wPct,
}: LetterProps) => {
  // Stagger each letter's animation slice across the cascade range.
  const start = (index / total) * cascade;
  const end = Math.min(start + perLetter, 1);

  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    reduced ? [1, 1] : [0, 1],
    { clamp: true },
  );
  const y = useTransform(
    scrollYProgress,
    [start, end],
    reduced ? ['0%', '0%'] : ['40%', '0%'],
    { clamp: true },
  );

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      className={styles.letter}
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        width: `${wPct}%`,
        opacity,
        y,
      }}
    />
  );
};