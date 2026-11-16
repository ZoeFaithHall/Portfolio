import { Text } from '@/components/atoms/Text';
import { WipeChapter } from '@/components/organisms/WipeChapter';
import { introData } from '@/data/intro';
import styles from './Outro.module.scss';

/** Numbers: the last chapter. Wipes in, then the footer follows in normal flow. */
export const Outro = () => {
  const numbers = introData.numbers;

  return (
    <WipeChapter
      id="numbers"
      index={6}
      label="By the numbers"
      ariaLabel="By the numbers"
    >
      <div className={styles.numbersInner}>
        <Text as="h2" variant="display-2" className={styles.numbersHeading}>
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
    </WipeChapter>
  );
};
