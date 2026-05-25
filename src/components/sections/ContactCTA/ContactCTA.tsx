import { Text } from '@/components/atoms/Text';
import { Link } from '@/components/atoms/Link';
import styles from './ContactCTA.module.scss';

export function ContactCTA() {
  return (
    <section id="contact" className={styles.root} data-surface="light">
      <div className={styles.inner}>
        <Text as="h2" variant="display-1" className={styles.heading}>
          Let&rsquo;s build something durable.
        </Text>
        <Link to="mailto:hi@zoehall.dev" className={styles.cta}>
          get in touch
        </Link>
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
              <Link to="https://runelab.co" className={styles.link}>Rune Lab</Link>
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
