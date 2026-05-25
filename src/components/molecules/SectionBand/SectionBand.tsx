import type { CSSProperties } from 'react';
import styles from './SectionBand.module.scss';

export type SectionBandProps = {
  label: string;
  meta?: string;
  /** Optional themed background + text color (overrides the default surface). */
  theme?: { bg: string; color: string };
  className?: string;
};

/**
 * Sticky band at the top of a section: shows the section's label and
 * (optionally) a meta string (e.g., years). Sticks to viewport top while
 * the parent section is in view; the next section's band slides up and
 * replaces it via natural sticky stacking.
 */
export const SectionBand = ({ label, meta, theme, className }: SectionBandProps) => {
  const style: CSSProperties | undefined = theme
    ? { background: theme.bg, color: theme.color }
    : undefined;
  return (
    <div
      className={`${styles.root}${className ? ` ${className}` : ''}`}
      style={style}
    >
      <span className={styles.label}>{label}</span>
      {meta && <span className={styles.meta}>{meta}</span>}
    </div>
  );
};
