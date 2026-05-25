import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      // The main knob: how much the page moves per wheel tick.
      // 1.0 = default, 0.6 = noticeably slower, 0.4 = very slow.
      wheelMultiplier: 0.8,

      // How long the smooth scroll easing lasts after you stop scrolling.
      // Higher = longer glide. Default 1.2.
      duration: 2.5,

      // How tightly the visible scroll tracks your input.
      // Lower = smoother but laggier. Default 0.1.
      lerp: 0.04,

      // Easing curve for the glide.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};