import { useRef } from 'react';
import { Text } from '@/components/atoms/Text';
import { Link } from '@/components/atoms/Link';
import { FooterWordmark } from './FooterWordmark/FooterWordmark';
import styles from './Footer.module.scss';

type FooterLink = {
  to: string;
  label: string;
};

const navLinks: readonly FooterLink[] = [
  { to: '#philosophy',   label: 'philosophy' },
  { to: '#case-studies', label: 'case studies' },
  { to: '#tech-stack',   label: 'tech stack' },
  { to: '#contact',      label: 'contact' },
];

const workLinks: readonly FooterLink[] = [
  { to: 'https://runelab.co',      label: 'rune lab' },
  { to: 'mailto:zoe@runelab.co',   label: 'consulting' },
];

const elsewhereLinks: readonly FooterLink[] = [
  { to: 'https://github.com/ZoeFaithHall',     label: 'github' },
  { to: 'https://www.linkedin.com/in/zoefhall', label: 'linkedin' },
];

export const Footer = () => {
  const year = new Date().getFullYear();
  // Drives the wordmark cascade from the footer's full scroll range
  // rather than the wordmark's own (much shorter) range.
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer ref={footerRef} className={styles.root} data-surface="dark">
      <div className={styles.top}>
        <Text as="h2" variant="display-2" className={styles.statement}>
          Build infrastructure that makes fires nearly impossible to start.
        </Text>

        <nav className={styles.columns} aria-label="Footer navigation">
          <FooterColumn title="navigate"  items={navLinks} />
          <FooterColumn title="work"      items={workLinks} />
          <FooterColumn title="elsewhere" items={elsewhereLinks} />
        </nav>
      </div>


      <div className={styles.wordmarkWrap}>
        <FooterWordmark surface="dark" scrollTargetRef={footerRef} />
      </div>

      <div className={styles.legal}>
        <Text variant="caption" className={styles.legalCopy}>
          © {year} Zoë Hall. All rights reserved.
        </Text>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  items: readonly FooterLink[];
};

function FooterColumn({ title, items }: FooterColumnProps) {
  return (
    <div className={styles.column}>
      <Text as="span" variant="mono" className={styles.columnTitle}>
        {title}
      </Text>
      <ul className={styles.columnList} role="list">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}