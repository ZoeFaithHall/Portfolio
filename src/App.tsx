import PageLayout from '@components/templates/PageLayout';
import Hero from '@components/sections/Hero';
import Philosophy from '@components/sections/Philosophy';
import Cases from '@components/sections/Cases';
import Bento from '@components/sections/Bento';
import ContactCTA from '@components/sections/ContactCTA';
import { useLenis } from '@hooks/useLenis';

export default function App() {
  useLenis();

  return (
    <PageLayout>
      <Hero />
      <Philosophy />
      <Cases />
      <Bento />
      <ContactCTA />
    </PageLayout>
  );
}
