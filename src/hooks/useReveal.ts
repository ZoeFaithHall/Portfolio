import { useEffect } from 'react';

/**
 * Adds `.is-in` to every `[data-reveal]` element the first time it scrolls
 * into view. IntersectionObserver respects the wipe chapters' clipping, so
 * content rises in as the banner uncovers it. Under reduced motion the CSS
 * shows everything immediately, so this only adds the class.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
