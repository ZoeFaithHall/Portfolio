import { Text } from '@/components/atoms/Text';
import { IntroGrid } from '@/components/molecules/IntroGrid';
import { introData } from '@/data/intro';
import styles from './TechStack.module.scss';

export function TechStack() {
  const ts = introData.techStack;
  return (
    <section
      id="tech-stack"
      data-surface="light"
      aria-labelledby="tech-stack-heading"
      className={styles.root}
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
  );
}

