import { Text } from '@/components/atoms/Text';
import styles from './TagList.module.scss';

export type TagListProps = {
  items: readonly string[];
  ariaLabel?: string;
};

/**
 * Horizontal pill list. Consolidates the repeated `<ul role="list">` +
 * `<li>` + caption-styled tag pattern that previously lived in Intro
 * (philosophy tags) and CaseDetail (scale, stack).
 */
export function TagList({ items, ariaLabel }: TagListProps) {
  return (
    <ul className={styles.root} role="list" aria-label={ariaLabel}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <Text as="span" variant="caption">{item}</Text>
        </li>
      ))}
    </ul>
  );
}
