import { Text } from '@/components/atoms/Text';
import styles from './Philosophy.module.scss';

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className={styles.root}
      data-surface="light"
      aria-labelledby="philosophy-heading"
    >
      <div className={styles.band}>
        <span>philosophy</span>
      </div>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <Text as="h2" variant="display-2" id="philosophy-heading" className={styles.statement}>
            Build infrastructure that makes fires nearly impossible to start.
          </Text>

          <aside className={styles.rail}>
            <Text variant="body" className={styles.paragraph}>
              Frontend Architect. Founder of Rune Lab. Most teams point AI at code.
              I point it at architecture.
            </Text>
            <Text variant="body" className={styles.paragraph} muted>
              Based in Harrisburg. Working remote. Available for Staff, Principal, Lead,
              and Director roles. Consulting via Rune Lab.
            </Text>
            <ul className={styles.tags} role="list">
              <li><Text variant="caption">Systems thinking</Text></li>
              <li><Text variant="caption">Design systems</Text></li>
              <li><Text variant="caption">AI architecture</Text></li>
              <li><Text variant="caption">Accessibility</Text></li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}