import Text from '@components/atoms/Text';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section id="hero" className={styles.root}>
      <div className={styles.inner}>
        <Text as="h1" variant="display-1" className={styles.wordmark}>
          zoë hall
        </Text>
        <div className={styles.footer}>
          <Text variant="body" className={styles.tagline}>
            Your engineers aren&rsquo;t the bottleneck.
          </Text>
          <a href="#work" className={styles.cta}>
            see the work
          </a>
        </div>
      </div>
    </section>
  );
}
