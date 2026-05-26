import { Text } from '@/components/atoms/Text';
import { IntroGrid } from '@/components/molecules/IntroGrid';
import { TagList } from '@/components/molecules/TagList';
import { WipeStack } from '@/components/organisms/WipeStack';
import { introData } from '@/data/intro';
import styles from './Intro.module.scss';

/**
 * Two announce layers wiped in sequence: Philosophy (base) → Case
 * Studies announce (clips over). Layout/scroll logic lives in WipeStack;
 * this section just supplies the two layer contents and the surface
 * sequence so the Header's wordmark color flips at the right moment.
 */
export const Intro = () => {
  const phil = introData.philosophy;
  const cs = introData.caseStudies;

  return (
    <WipeStack surfaces={['light', 'dark']}>
      <section
        id="philosophy"
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
      </section>

      <section
        id="case-studies"
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
