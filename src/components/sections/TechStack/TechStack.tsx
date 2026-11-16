import { Text } from '@/components/atoms/Text';
import { TagList } from '@/components/molecules/TagList';
import { WipeChapter } from '@/components/organisms/WipeChapter';
import { techStack } from '@/data/techstack';
import styles from './TechStack.module.scss';

/** Tech stack: the last chapter before the footer, so it does not hold. */
export const TechStack = () => (
  <WipeChapter id="tech-stack" index={8} label="Tech stack" holdForNext={false} ariaLabel="Tech stack">
    <div className={styles.inner}>
      <div className={styles.intro}>
        <Text as="h2" variant="display-2" className={styles.heading}>
          The tools I reach for.
        </Text>
        <Text variant="body" muted className={styles.lede}>
          Preventive tooling over heroics: the stack is chosen so broken code is hard to ship.
        </Text>
      </div>
      <dl className={styles.groups}>
        {techStack.map((g) => (
          <div key={g.label} className={styles.group}>
            <dt className={styles.label}>{g.label}</dt>
            <dd className={styles.items}>
              <TagList items={g.items} ariaLabel={g.label} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </WipeChapter>
);
