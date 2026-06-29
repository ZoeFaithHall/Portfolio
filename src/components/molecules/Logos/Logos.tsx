import { ClientLogo, type ClientSlug } from '@/components/atoms/ClientLogo';
import styles from './Logos.module.scss';

export type LogosProps = {
  /** Which logos to show, in order. Defaults to the full set. */
  slugs?: readonly ClientSlug[];
  /** Optional className passthrough for layout customization. */
  className?: string;
};

const DEFAULT_SLUGS: readonly ClientSlug[] = [
  'fleetio',
  'tyler-technologies',
  'curion',
  'ford',
  'verizon',
  'mercedes-benz',
  'samsara',
  'geotab',
  'johnson-controls',
  'danfoss',
  'avantor',
  'assa-abloy',
  'ecore',
  'axis-lighting',
  'coleman',
  'jlg',
  'jeep',
  'fiat',
  'dodge',
  'nissan',
  'auto-integrate',
  'tech-ladies',
];

/**
 * Grid of client logos rendered as low-opacity indigo silhouettes
 * (glass-like treatment via CSS mask). Hover bumps opacity on each.
 *
 * Pass `slugs` to limit or reorder. Default ordering surfaces the most
 * recognizable brands first.
 */
export function Logos({ slugs = DEFAULT_SLUGS, className }: LogosProps) {
  return (
    <ul
      className={[styles.wall, className].filter(Boolean).join(' ')}
      role="list"
      aria-label="Clients and partners"
    >
      {slugs.map((slug) => (
        <li key={slug} className={styles.cell}>
          <ClientLogo slug={slug} />
        </li>
      ))}
    </ul>
  );
}