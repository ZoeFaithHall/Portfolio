import { Text } from '@/components/atoms/Text';
import { Link } from '@/components/atoms/Link';
import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section id="hero" className={styles.root} data-surface="light">
      <div className={styles.image} aria-hidden="true">
        {/* Replace with <Image src="/hero.jpg" alt="" .../> when ready */}
      </div>
      <div className={styles.bottom}>
        <Text variant="display-2" className={styles.tagline}>
          lorem ipsum dolor sit amet, consectetur adipiscing.
        </Text>
        <Link to="#work" className={styles.cta}>
          see the work
        </Link>
      </div>
    </section>
  );
};
