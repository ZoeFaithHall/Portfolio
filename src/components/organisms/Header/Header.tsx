import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { NavItem } from '@/components/molecules/NavItem';
import { Wordmark, type WordmarkSurface } from '@/components/atoms/Wordmark';
import styles from './Header.module.scss';

const navAnchors = [
  { href: '#philosophy',   label: 'philosophy' },
  { href: '#case-studies', label: 'case studies' },
  { href: 'https://www.the-creator-book.com/', label: 'the book' },
  { href: '#contact',      label: 'contact' },
];

// Point sampled under the header row to read the surface behind it.
const SAMPLE_X = 8;
const SAMPLE_Y = 32;

/** Surface of the topmost non-header element at a point. */
function surfaceAt(x: number, y: number): WordmarkSurface | null {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest('header')) continue;
    const s = el.closest<HTMLElement>('[data-surface]')?.dataset.surface;
    if (s === 'light' || s === 'dark') return s;
  }
  return null;
}

/**
 * Fixed header. The name starts full width at the top of the hero, shrinks
 * into the top-left corner over the first 40% of a screen of scroll, and
 * stays there for the whole page. Name and nav flip between dark and light
 * to match whatever surface is behind them.
 */
export const Header = () => {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);
  const [surface, setSurface] = useState<WordmarkSurface>('light');

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    let raf = 0;
    const detect = () => {
      raf = 0;
      const s = surfaceAt(SAMPLE_X, SAMPLE_Y);
      if (s) setSurface(s);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(detect);
    };
    detect();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const progress = useTransform(scrollY, [0, vh * 0.4], [0, 1], { clamp: true });

  return (
    <motion.header
      className={styles.root}
      data-tone={surface}
      style={{ ['--wordmark-progress' as string]: progress }}
    >
      <p className={styles.wordmark}>
        <a href="#" className={styles.wordmarkLink} aria-label="Zoë Hall, back to top">
          <Wordmark variant="zoe-hall" surface={surface} className={styles.wordmarkImg} />
        </a>
      </p>
      <nav className={styles.nav} aria-label="Primary">
        {navAnchors.map((anchor) => (
          <NavItem key={anchor.href} href={anchor.href}>
            {anchor.label}
          </NavItem>
        ))}
      </nav>
    </motion.header>
  );
};
