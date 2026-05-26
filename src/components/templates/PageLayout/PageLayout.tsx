import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Outro } from '@/components/sections/Outro';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { useLenis } from '@/hooks/useLenis';
import styles from './PageLayout.module.scss';

/**
 * Composes the whole page: Header + every section in order + Footer.
 * Owns the smooth-scroll setup (useLenis). App.tsx just renders this.
 *
 * Intro and Outro are wipe-stack sections (two announce layers each,
 * clipping over one another). CaseStudies and ContactCTA flow normally
 * between them.
 */
export const PageLayout = () => {
  useLenis();

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <Intro />
        <CaseStudies />
        <Outro />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};
