import { useRef } from 'react';
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
  /** Optional override of the cascade duration in scroll-progress units. Default 0.7. */
  cascade?: number;
  /** Optional override of how long each letter takes to land. Default 0.3. */
  perLetter?: number;
}

export const FooterWordmark = ({
  surface = 'dark',
  cascade = 0.7,
  perLetter = 0.3,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Progress runs from 0 when the top of the wordmark hits the viewport bottom
  // to 1 when the wordmark settles at its resting position.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const { width: W, height: H } = letters.source;

  return (
    <div
      ref={ref}
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