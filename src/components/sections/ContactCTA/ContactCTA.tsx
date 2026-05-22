import Text from '@components/atoms/Text';
import styles from './ContactCTA.module.scss';

export default function ContactCTA() {
  return (
    <section id="contact" className={styles.root}>
      <div className={styles.inner}>
        <Text as="h2" variant="display-1" className={styles.heading}>
          Let&rsquo;s build something durable.
        </Text>
        <a href="mailto:hi@zoehall.dev" className={styles.cta}>
          get in touch
        </a>
        <div className={styles.row}>
          <div>
            <Text variant="caption" muted>available for</Text>
            <Text variant="body">Staff, Principal, Lead, Director</Text>
          </div>
          <div>
            <Text variant="caption" muted>based in</Text>
            <Text variant="body">Harrisburg · remote</Text>
          </div>
          <div>
            <Text variant="caption" muted>consulting via</Text>
            <Text variant="body">
              <a href="https://runelab.co" className={styles.link}>Rune Lab</a>
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
