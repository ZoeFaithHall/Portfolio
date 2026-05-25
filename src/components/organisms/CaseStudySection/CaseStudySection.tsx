import { useRef, type CSSProperties } from 'react';
import { Text } from '@/components/atoms/Text';
import type { CaseStudy } from '@/types';
import styles from './CaseStudySection.module.scss';

export type CaseStudySectionProps = {
  study: CaseStudy;
  index: number;
  total: number;
  /** 'overlay' (default) for wipe layering; 'flow' for normal document flow inside CaseDetail. */
  layout?: 'overlay' | 'flow';
};

export function CaseStudySection({ study, index, total, layout = 'overlay' }: CaseStudySectionProps) {
  const ref = useRef<HTMLElement>(null);

  const themeVars = {
    '--case-bg': study.theme.bg,
    '--case-text': study.theme.text,
    '--case-accent': study.theme.accent,
    '--case-band': study.theme.band,
  } as CSSProperties;

  const current = String(index).padStart(2, '0');
  const totalPadded = String(total).padStart(2, '0');

  return (
    <section
      ref={ref}
      id={study.slug}
      className={`${styles.root}${layout === 'flow' ? ` ${styles.flow}` : ''}`}
      style={themeVars}
      aria-labelledby={`${study.slug}-heading`}
    >
      <div className={styles.band}>
        <Text variant="mono">{study.client}</Text>
        <Text variant="mono" className={styles.years}>{study.years}</Text>
      </div>

      <div className={styles.inner}>
        <div className={styles.grid}>
          <Text
            as="h2"
            variant="display-2"
            id={`${study.slug}-heading`}
            className={styles.statement}
          >
            {study.statement}
          </Text>

          <aside className={styles.rail}>
            <Text variant="mono" className={styles.counter}>
              <span className={styles.counterCurrent}>{current}</span>
              <span className={styles.counterTotal}>/{totalPadded}</span>
            </Text>

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
                      <li key={item}><Text variant="caption">{item}</Text></li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className={styles.metaBlock}>
                <dt><Text variant="caption" muted>stack</Text></dt>
                <dd>
                  <ul className={styles.tagList} role="list">
                    {study.stack.map((item) => (
                      <li key={item}><Text variant="caption">{item}</Text></li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
