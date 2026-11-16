import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { BackToTop } from '@/components/molecules/BackToTop';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Outro } from '@/components/sections/Outro';
import { Testimonials } from '@/components/sections/Testimonials';
import { TechStack } from '@/components/sections/TechStack';
import { useLenis } from '@/hooks/useLenis';
import { useReveal } from '@/hooks/useReveal';
import styles from './PageLayout.module.scss';

/**
 * Composes the whole page. Owns the smooth-scroll setup (useLenis).
 *
 * Scroll story: Hero (name shrinks, then leaves with the tagline) →
 * Philosophy → each case study → Numbers, every one a WipeChapter whose
 * banner wipes up over the previous chapter's held last screen and then
 * sticks at the top → Footer in normal flow.
 */
export const PageLayout = () => {
  useLenis();
  useReveal();

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <Intro />
        <CaseStudies />
        <Outro />
        <Testimonials />
        <TechStack />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};
