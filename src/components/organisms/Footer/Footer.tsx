import { Text } from '@/components/atoms/Text';
import { Link } from '@/components/atoms/Link';
import styles from './Footer.module.scss';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <Text variant="caption">© {year} Zoë Hall</Text>

        <ul className={styles.links} role="list">
          <li>
            <Link to="https://github.com/ZoeFaithHall">GitHub</Link>
          </li>
          <li>
            <Link to="https://runelab.co">Rune Lab</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
