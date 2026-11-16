import { Text } from '@/components/atoms/Text';
import { IntroGrid } from '@/components/molecules/IntroGrid';
import { TagList } from '@/components/molecules/TagList';
import { LogoMarquee } from '@/components/molecules/LogoMarquee';
import { WipeChapter } from '@/components/organisms/WipeChapter';
import type { ClientSlug } from '@/components/atoms/ClientLogo';
import { introData } from '@/data/intro';
import styles from './Intro.module.scss';

const ROW_ONE: readonly ClientSlug[] = [
  'rune-lab', 'prysm-health', 'fleetio', 'curion', 'verizon', 'samsara', 'dodge',
  'jlg', 'axis-lighting', 'copa', 'godfrey', 'tech-ladies',
];

const ROW_TWO: readonly ClientSlug[] = [
  'tyler-technologies', 'mercedes-benz', 'jeep', 'nissan',
  'johnson-controls', 'danfoss', 'assa-abloy', 'ecore',
  'josh-shapiro', 'stealthx',
];

/** Philosophy: the first chapter. Its banner wipes up over the emptied hero. */
export const Intro = () => {
  const phil = introData.philosophy;

  return (
    <WipeChapter id="philosophy" index={1} label={phil.band.label} ariaLabel="Philosophy">
      <div className={styles.even}>
      <IntroGrid
        statement={phil.statement}
        statementId="philosophy-heading"
        rail={
          <>
            {phil.paragraphs.map((p, i) => (
              <Text key={i} variant="body" muted={p.muted}>
                {p.text}
              </Text>
            ))}
            <TagList items={phil.tags} ariaLabel="philosophy tags" />
          </>
        }
      />
      <div className={styles.marqueeStack} data-reveal style={{ ['--reveal-i' as string]: 2 }}>
        <LogoMarquee slugs={ROW_ONE} duration={120} direction="left" />
        <LogoMarquee slugs={ROW_TWO} duration={140} direction="right" />
      </div>
      </div>
    </WipeChapter>
  );
};
