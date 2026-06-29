import { Text } from '@/components/atoms/Text';
import { IntroGrid } from '@/components/molecules/IntroGrid';
import { TagList } from '@/components/molecules/TagList';
import { WipeStack } from '@/components/organisms/WipeStack';
import { LogoMarquee } from '@/components/molecules/LogoMarquee';
import type { ClientSlug } from '@/components/atoms/ClientLogo';
import { introData } from '@/data/intro';
import styles from './Intro.module.scss';

/**
 * Two announce layers wiped in sequence: Philosophy (base) → Case
 * Studies announce (rises over). WipeStack owns the pin + rise + surface
 * flip + anchor spacers; this section just supplies the two layer
 * contents.
 *
 * Anchor ids (`philosophy`, `case-studies`) live on WipeStack's spacers
 * so clicking those nav links lands the user at the right scroll
 * position. The inner sections intentionally have no id.
 *
 */

const ROW_ONE: readonly ClientSlug[] = [
  'fleetio', 'curion', 'verizon', 'samsara', 'dodge',
  'jlg', 'axis-lighting', 'copa', 'godfrey', 'tech-ladies',
];

const ROW_TWO: readonly ClientSlug[] = [
  'tyler-technologies', 'mercedes-benz', 'jeep', 'nissan',
  'johnson-controls', 'danfoss', 'assa-abloy', 'ecore', 
  'josh-shapiro', 'stealthx',
];


export const Intro = () => {
  const phil = introData.philosophy;
  const cs = introData.caseStudies;

  return (
    <WipeStack
      surfaces={['light', 'dark']}
      anchorIds={['philosophy', 'case-studies']}
    >
      <section
        className={styles.layerFill}
        data-surface="light"
        aria-labelledby="philosophy-heading"
      >
        <IntroGrid
          band={phil.band}
          statement={phil.statement}
          statementId="philosophy-heading"
          rail={
            <>
              {phil.paragraphs.map((p, i) => (
                <Text key={i} variant="body" muted={p.muted}>
                  {p.text}
                </Text>
              ))}
              <TagList items={phil.tags} ariaLabel="philosophy tags" />
            </>
          }
        />
        <div className={styles.marqueeStack}>
            <LogoMarquee slugs={ROW_ONE} duration={120} direction="left" />
            <LogoMarquee slugs={ROW_TWO} duration={140} direction="right" />
        </div>

      </section>

      <section
        className={styles.layerFill}
        data-surface="dark"
        style={{ background: cs.theme.bg, color: cs.theme.text }}
        aria-labelledby="case-studies-heading"
      >
        <IntroGrid
          band={cs.band}
          statement={cs.statement}
          statementColor={cs.statementColor}
          statementId="case-studies-heading"
          rail={
            <>
              <Text variant="mono">{cs.eyebrow}</Text>
              <Text variant="body">{cs.tagline}</Text>
            </>
          }
        />
        
      </section>
    </WipeStack>
  );
};