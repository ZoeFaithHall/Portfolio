import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { NavItem } from '@/components/molecules/NavItem';
import { Wordmark, type WordmarkSurface } from '@/components/atoms/Wordmark';
const navAnchors = [
  { href: '#philosophy',   label: 'philosophy' },
  { href: '#case-studies', label: 'case studies' },
  { href: '#contact',      label: 'contact' },
];
import styles from './Header.module.scss';

// y-coordinate (from viewport top) where we sample what surface sits behind the wordmark.
// Roughly matches where the wordmark parks once shrunk.
const DETECTION_Y = 48;

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
      const sections = document.querySelectorAll<HTMLElement>('[data-surface]');
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= DETECTION_Y && rect.bottom > DETECTION_Y) {
          const tone = el.dataset.surface;
          if (tone === 'light' || tone === 'dark') setSurface(tone);
          return; // first match wins; sections don't overlap vertically
        }
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(detect);
    };

    detect();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const progress = useTransform(
    scrollY,
    [vh * 0.35, vh * 0.70],
    [0, 1],
    { clamp: true }
  );

  return (
    <motion.header
      className={styles.root}
      style={{ ['--wordmark-progress' as string]: progress }}
    >
      <h1 className={styles.wordmark}>
        <Wordmark variant="zoe-hall" surface={surface} className={styles.wordmarkImg} />
      </h1>
      <nav className={styles.nav}>
        {navAnchors.map((anchor) => (
          <NavItem key={anchor.href} href={anchor.href}>
            {anchor.label}
          </NavItem>
        ))}
      </nav>
    </motion.header>
  );
};