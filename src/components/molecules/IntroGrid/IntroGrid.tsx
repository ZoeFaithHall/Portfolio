import type { CSSProperties, ReactNode } from 'react';
import { Text } from '@/components/atoms/Text';
import { SectionBand } from '@/components/molecules/SectionBand';
import styles from './IntroGrid.module.scss';

export type StatementGridBand = {
  label: string;
  meta?: string;
  theme?: { bg: string; color: string };
};

export type StatementGridProps = {
  /** Bold left-column statement (the big bold heading). */
  statement: string;
  /** Right-rail content (paragraphs, tags, eyebrow + tagline, metadata, etc.). */
  rail: ReactNode;
  /** Optional sticky band at the top (label, meta, theme). */
  band?: StatementGridBand;
  /** Statement text color override. Defaults to inherit. */
  statementColor?: string;
  /** id on the statement Text for aria-labelledby pairing. */
  statementId?: string;
};

/**
 * The universal "section content" pattern — Optional sticky band, then a 65/35 grid with statement-styled
 * heading on the left and a supporting rail on the right.
 *
 * Used by every page section that needs this layout. Consumers pass data
 * (statement string + rail ReactNode) and styling (statementColor, band
 * theme).
 */
export function IntroGrid({
  statement,
  rail,
  band,
  statementColor,
  statementId,
}: StatementGridProps) {
  const statementStyle: CSSProperties | undefined = statementColor
    ? { color: statementColor }
    : undefined;

  return (
    <>
      {band && (
        <SectionBand label={band.label} meta={band.meta} theme={band.theme} />
      )}
      <div className={styles.grid}>
        <Text
          as="h2"
          variant="display-2"
          id={statementId}
          className={styles.statement}
          style={statementStyle}
        >
          {statement}
        </Text>
        <aside className={styles.rail}>{rail}</aside>
      </div>
    </>
  );
}
