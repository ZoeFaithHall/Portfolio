import { useRef, type ReactNode } from 'react';
import Text from '@components/atoms/Text';
import type { CaseStudy } from '@types';
import styles from './CaseStudySection.module.scss';

export type CaseStudySectionProps = {
  study: CaseStudy;
  /** 01, 02, 03 etc. — passed in by the parent so the section doesn't have to know its own index. */
  index: number;
  total: number;
  /** Visual artifact rendered in the center of the split. Could be an <img>, an SVG diagram, etc. */
  artifact?: ReactNode;
};

export default function CaseStudySection({ study, index, total, artifact }: CaseStudySectionProps) {
  const ref = useRef<HTMLElement>(null);

  // Theme tokens scoped to this section via inline CSS custom properties.
  // Components inside read these (e.g. background, accent, text color) instead of hardcoding.
  const themeVars = {
    '--case-bg': study.theme.bg,
    '--case-text': study.theme.text,
    '--case-accent': study.theme.accent,
    '--case-band': study.theme.band,
  } as React.CSSProperties;

  const counter = `${String(index).padStart(2, '0')}/${String(total).padStart(2, '0')}`;

  return (
    <section
      ref={ref}
      id={study.slug}
      className={styles.root}
      style={themeVars}
      aria-labelledby={`${study.slug}-heading`}
    >
      <div className={styles.band}>
        <Text variant="mono">{study.client}</Text>
        <Text variant="mono" className={styles.years}>{study.years}</Text>
      </div>

      <div className={styles.grid}>
        <div className={styles.display}>
          <Text as="h2" variant="display-1" id={`${study.slug}-heading`} className={styles.frame}>
            {study.punchWord}
          </Text>
          <Text variant="display-2" className={styles.frameSub} muted>
            {study.frame}
          </Text>
        </div>

        <aside className={styles.rail}>
          <Text variant="mono" className={styles.counter}>
            <span className={styles.counterCurrent}>{counter.split('/')[0]}</span>
            <span className={styles.counterTotal}>/{counter.split('/')[1]}</span>
          </Text>

          {study.description.map((paragraph, i) => (
            <Text key={i} variant="body" className={styles.paragraph}>
              {paragraph}
            </Text>
          ))}

          <dl className={styles.meta}>
            <div className={styles.metaBlock}>
              <dt><Text variant="caption" muted>role</Text></dt>
              <dd><Text variant="body">{study.role}</Text></dd>
            </div>
            <div className={styles.metaBlock}>
              <dt><Text variant="caption" muted>scale</Text></dt>
              <dd>
                <ul className={styles.tagList} role="list">
                  {study.scale.map((item) => (
                    <li key={item}><Text variant="body">{item}</Text></li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className={styles.metaBlock}>
              <dt><Text variant="caption" muted>stack</Text></dt>
              <dd>
                <ul className={styles.tagList} role="list">
                  {study.stack.map((item) => (
                    <li key={item}><Text variant="body">{item}</Text></li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>

        {artifact && (
          <div className={styles.artifact} aria-hidden>
            {artifact}
          </div>
        )}
      </div>
    </section>
  );
}
