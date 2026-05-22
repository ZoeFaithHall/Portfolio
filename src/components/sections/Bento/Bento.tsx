import Text from '@components/atoms/Text';
import styles from './Bento.module.scss';

const cells = [
  { value: '14M+', caption: 'cumulative users across three years' },
  { value: '0', caption: 'production UI defects in three years' },
  { value: '$6B', caption: 'valuation supported through scale' },
  { value: '1 → 12', caption: 'team grown as sole architect' },
  { value: '67 → 134%', caption: 'revenue attainment in two quarters' },
  { value: '13M', caption: 'Pennsylvania residents on Keystone' },
];

export default function Bento() {
  return (
    <section id="numbers" className={styles.root} aria-labelledby="numbers-heading">
      <Text as="h2" variant="display-2" id="numbers-heading" className={styles.heading}>
        by the numbers
      </Text>
      <ul className={styles.grid} role="list">
        {cells.map((cell) => (
          <li key={cell.value} className={styles.cell}>
            <Text variant="display-2" className={styles.value}>{cell.value}</Text>
            <Text variant="body-sm" muted>{cell.caption}</Text>
          </li>
        ))}
      </ul>
    </section>
  );
}
