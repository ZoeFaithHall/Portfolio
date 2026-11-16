import { Text } from '@/components/atoms/Text';
import { WipeChapter } from '@/components/organisms/WipeChapter';
import { testimonials } from '@/data/testimonials';
import styles from './Testimonials.module.scss';

/** "In their words": colleague testimonials, verbatim from zoehall.dev. */
export const Testimonials = () => (
  <WipeChapter id="testimonials" index={7} label="In their words" ariaLabel="Testimonials">
    <div className={styles.inner}>
      <Text as="h2" variant="display-2" className={styles.heading} data-reveal>
        What it is like to build with me.
      </Text>
      <ul className={styles.grid} role="list">
        {testimonials.map((t, i) => (
          <li key={t.name} className={styles.item} data-reveal style={{ ['--reveal-i' as string]: i % 3 }}>
            <figure className={`${styles.card} ${styles.figure}`}>
              <svg className={styles.mark} viewBox="0 0 32 24" width="28" height="21" aria-hidden="true" focusable="false">
                <path d="M0 24V14C0 6 4 1 12 0l1 4C8 5 6 8 6 12h6v12H0zm18 0V14c0-8 4-13 12-14l1 4c-5 1-7 4-7 8h6v12H18z" fill="currentColor" />
              </svg>
              <blockquote className={styles.quote}>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className={styles.caption}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.role}>{t.role}, {t.org}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  </WipeChapter>
);
