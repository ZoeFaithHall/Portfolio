import { Text } from '@/components/atoms/Text';
import { Link } from '@/components/atoms/Link';
import { MetaBlock } from '@/components/molecules/MetaBlock';
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
        <dl className={styles.row}>
          <MetaBlock label="available for">
            <Text variant="body">Staff, Principal, Lead, Director</Text>
          </MetaBlock>
          <MetaBlock label="based in">
            <Text variant="body">Harrisburg · remote</Text>
          </MetaBlock>
          <MetaBlock label="consulting via">
            <Text variant="body">
              <Link to="https://runelab.co" className={styles.link}>Rune Lab</Link>
            </Text>
          </MetaBlock>
        </dl>
      </div>
    </section>
  );
}
