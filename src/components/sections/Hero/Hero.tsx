import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section id="hero" className={styles.root} data-surface="light">
      <div className={styles.image} aria-hidden="true">
        {/* Replace with <img src="/hero.jpg" alt="" /> when ready */}
      </div>
      <div className={styles.bottom}>
        <p className={styles.tagline}>
          lorem ipsum dolor sit amet, consectetur adipiscing.
        </p>
        <a href="#work" className={styles.cta}>
          see the work
        </a>
      </div>
    </section>
  );
};