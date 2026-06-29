import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

/**
 * Sets up the Lenis smooth-scroll instance and a global click handler for
 * hash links. The handler intercepts any `<a href="#...">` (including
 * `href="#"` for back-to-top) and routes the scroll through Lenis so
 * navigation animates with the same easing as wheel scroll.
 *
 * Mount once at the top of the tree (PageLayout already does this).
 */
export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      // The main knob: how much the page moves per wheel tick.
      // 1.0 = default, 0.6 = noticeably slower, 0.4 = very slow.
      wheelMultiplier: 0.8,

      // How long the smooth scroll easing lasts after you stop scrolling.
      duration: 2.5,

      // How tightly the visible scroll tracks your input.
      lerp: 0.04,

      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisInstance = lenis;

    const handleClick = (e: MouseEvent) => {
      // Ignore modified clicks (open in new tab, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      e.preventDefault();

      if (href === '#') {
        lenis.scrollTo(0);
        return;
      }

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        lenis.scrollTo(el);
      }
    };

    document.addEventListener('click', handleClick);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      document.removeEventListener('click', handleClick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};

/**
 * Read the active Lenis instance from anywhere in the tree.
 * Returns null before useLenis has mounted or after it unmounts.
 */
export const getLenis = (): Lenis | null => lenisInstance;