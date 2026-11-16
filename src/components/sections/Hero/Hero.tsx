import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Text } from '@/components/atoms/Text';
import { Link } from '@/components/atoms/Link';
import styles from './Hero.module.scss';

/**
 * Hero scroll (250vh tall, 100vh pinned, 150vh of scroll):
 *   0 – 40vh    the header's name shrinks into the top-left corner
 *               (owned by Header, driven by the same scroll)
 *   40 – 100vh  the tagline scrolls up and out
 *   50 – 150vh  the philosophy banner wipes up (that chapter overlaps this
 *               last 100vh), starting while the tagline is still leaving,
 *               so there is no empty screen between them
 */
const TAGLINE = 'Revenue was at 67% of target. Two quarters later, 134%.';

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const motionOk = !useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const copyY = useTransform(scrollYProgress, [40 / 150, 100 / 150], ['0vh', '-100vh'], { clamp: true });

  return (
    <section
      id="hero"
      ref={ref}
      className={motionOk ? styles.root : styles.rootStatic}
      data-surface="light"
    >
      <div className={styles.stage}>
        <div className={styles.image} aria-hidden="true">
          {/* Replace with <Image src="/hero.jpg" alt="" .../> when ready */}
        </div>
        <motion.div className={styles.bottom} style={motionOk ? { y: copyY } : undefined}>
          <h1 className={styles.heading}>
            <span className="sr-only">Zoë Hall. </span>
            <Text as="span" variant="display-2" className={styles.tagline}>
              {TAGLINE.split(' ').map((w, i) => (
                <span key={i} className={styles.word} style={{ animationDelay: `${300 + i * 60}ms` }}>
                  {w}{' '}
                </span>
              ))}
            </Text>
          </h1>
          <Link to="#case-studies" className={styles.cta}>
            see the work
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
