import type { ReactNode } from 'react';
import { Text } from '@/components/atoms/Text';
import styles from './MetaBlock.module.scss';

export type MetaBlockProps = {
  /** Caption-styled label (e.g., "role", "available for"). */
  label: string;
  /** Value content — accepts text, a TagList, a Link, anything. */
  children: ReactNode;
};

/**
 * Semantic label/value pair using <dt>/<dd>. Consumers wrap one or more
 * MetaBlocks inside a <dl> (see MetaList for the list wrapper, or use
 * <dl> directly when you only need a single pair).
 */
export function MetaBlock({ label, children }: MetaBlockProps) {
  return (
    <div className={styles.root}>
      <dt className={styles.label}>
        <Text as="span" variant="caption" muted>{label}</Text>
      </dt>
      <dd className={styles.value}>{children}</dd>
    </div>
  );
}
