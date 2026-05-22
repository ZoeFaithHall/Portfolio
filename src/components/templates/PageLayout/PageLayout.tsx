import type { ReactNode } from 'react';
import Header from '@components/organisms/Header';
import Footer from '@components/organisms/Footer';
import styles from './PageLayout.module.scss';

export type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <a href="#hero" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main" className={styles.main}>
        {children}
      </main>
      <Footer />
    </>
  );
}
