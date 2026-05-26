import type { CSSProperties } from 'react';
import { Text } from '@/components/atoms/Text';
import { cn } from '@utils/cn';
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
    <div className={cn(styles.root, className)} style={style}>
      <Text as="span" variant="caption" className={styles.label}>{label}</Text>
      {meta && (
        <Text as="span" variant="caption" className={styles.meta}>{meta}</Text>
      )}
    </div>
  );
};
