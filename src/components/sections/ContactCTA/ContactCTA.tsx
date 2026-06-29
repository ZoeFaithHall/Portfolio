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
        <Link to="mailto:zoefhall@gmail.com" className={styles.cta}>
          get in touch
        </Link>
      </div>
    </section>
  );
}
