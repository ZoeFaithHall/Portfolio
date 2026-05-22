import NavItem from '@components/molecules/NavItem';
import { navAnchors } from '@data/projects';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.brand} aria-label="Home">
          ZH
        </a>

        <nav aria-label="Primary">
          <ul className={styles.list} role="list">
            {navAnchors.map((anchor) => (
              <li key={anchor.href}>
                <NavItem href={anchor.href} label={anchor.label} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
