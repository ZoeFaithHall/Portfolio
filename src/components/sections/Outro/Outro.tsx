import { Text } from '@/components/atoms/Text';
import { SectionBand } from '@/components/molecules/SectionBand';
import { IntroGrid } from '@/components/molecules/IntroGrid';
import { WipeStack } from '@/components/organisms/WipeStack';
import { introData } from '@/data/intro';
import styles from './Outro.module.scss';

/**
 * Two closing announce layers wiped in sequence: Tech Stack (base) →
 * By The Numbers (clips over). Mirrors Intro's structure: WipeStack owns
 * pin + clip + surface; this section just provides the two layer contents
 * + the surface sequence.
 */
export const Outro = () => {
  const ts = introData.techStack;
  const numbers = introData.numbers;

  return (
    <WipeStack surfaces={['light', 'light']}>
      <section
        id="tech-stack"
        className={styles.layerFill}
        data-surface="light"
        aria-labelledby="tech-stack-heading"
        style={{ background: ts.theme.bg, color: ts.theme.text }}
      >
        <IntroGrid
          band={ts.band}
          statement={ts.statement}
          statementColor={ts.statementColor}
          statementId="tech-stack-heading"
          rail={
            <>
              <Text variant="mono">{ts.eyebrow}</Text>
              <Text variant="body">{ts.tagline}</Text>
            </>
          }
        />
      </section>

      <section
        id="numbers"
        className={styles.layerFill}
        data-surface="light"
        aria-labelledby="numbers-heading"
      >
        <SectionBand label={numbers.band.label} />
        <div className={styles.numbersInner}>
          <Text as="h2" variant="display-2" id="numbers-heading" className={styles.numbersHeading}>
            {numbers.heading}
          </Text>
          <ul className={styles.numbersGrid} role="list">
            {numbers.cells.map((cell) => (
              <li key={cell.value} className={styles.numbersCell}>
                <Text variant="display-2" className={styles.numbersValue}>{cell.value}</Text>
                <Text variant="body-sm" muted>{cell.caption}</Text>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </WipeStack>
  );
};
