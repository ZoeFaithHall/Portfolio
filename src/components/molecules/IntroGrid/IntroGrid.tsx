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
  /** Small mono line above the statement (e.g. "Case study / Fleetio"). */
  eyebrow?: ReactNode;
  /** Replaces the eyebrow's default red square (e.g. the Dagaz). */
  eyebrowIcon?: ReactNode;
  /** Extra class on the grid, for section-specific spacing. */
  className?: string;
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
  eyebrow,
  eyebrowIcon,
  className,
}: StatementGridProps) {
  const statementStyle: CSSProperties | undefined = statementColor
    ? { color: statementColor }
    : undefined;

  return (
    <>
      {band && (
        <SectionBand label={band.label} meta={band.meta} theme={band.theme} />
      )}
      <div className={className ? `${styles.grid} ${className}` : styles.grid}>
        <div className={styles.lead} data-reveal>
          {eyebrow && (
            <p className={eyebrowIcon ? `${styles.eyebrow} ${styles.eyebrowCustom}` : styles.eyebrow}>
              {eyebrowIcon}
              {eyebrow}
            </p>
          )}
          <Text
            as="h2"
            variant="display-2"
            id={statementId}
            className={styles.statement}
            style={statementStyle}
          >
            {statement}
          </Text>
        </div>
        <aside className={styles.rail} data-reveal style={{ ['--reveal-i' as string]: 1 }}>{rail}</aside>
      </div>
    </>
  );
}
