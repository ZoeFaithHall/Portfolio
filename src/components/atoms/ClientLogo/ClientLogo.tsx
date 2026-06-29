import { cn } from '@utils/cn';
import styles from './ClientLogo.module.scss';

export type ClientSlug =
  | 'assa-abloy' | 'axis-lighting'
  | 'copa' | 'curion' | 'danfoss' | 'dodge' | 'ecore'
  | 'fleetio' | 'godfrey' | 'jeep'
  | 'jlg' | 'johnson-controls' | 'josh-shapiro' | 'mercedes-benz'
  | 'nissan' | 'samsara' | 'stealthx' | 'tech-ladies'
  | 'tyler-technologies' | 'verizon';

type LogoMeta = { file: string; alt: string };

export const CLIENT_LOGOS: Record<ClientSlug, LogoMeta> = {
  'assa-abloy': { file: 'assa-abloy.png', alt: 'Assa Abloy' },
  'axis-lighting': { file: 'axis-lighting.png', alt: 'Axis Lighting' },
  'copa': { file: 'copa.png', alt: 'CoPA' },
  'curion': { file: 'curion.png', alt: 'Curion' },
  'danfoss': { file: 'danfoss.png', alt: 'Danfoss' },
  'dodge': { file: 'dodge.png', alt: 'Dodge' },
  'ecore': { file: 'ecore.png', alt: 'Ecore' },
  'fleetio': { file: 'fleetio.png', alt: 'Fleetio' },
  'godfrey': { file: 'godfrey.png', alt: 'Godfrey' },
  'jeep': { file: 'jeep.png', alt: 'Jeep' },
  'jlg': { file: 'jlg.png', alt: 'JLG' },
  'johnson-controls': { file: 'johnson-controls.png', alt: 'Johnson Controls' },
  'josh-shapiro': { file: 'josh-shapiro.png', alt: 'Office of Governor Josh Shapiro' },
  'mercedes-benz': { file: 'mercedes-benz.png', alt: 'Mercedes-Benz' },
  'nissan': { file: 'nissan.png', alt: 'Nissan' },
  'samsara': { file: 'samsara.png', alt: 'Samsara' },
  'stealthx': { file: 'stealthx.png', alt: 'StealthX' },
  'tech-ladies': { file: 'tech-ladies.png', alt: 'Tech Ladies' },
  'tyler-technologies': { file: 'tyler-technologies.png', alt: 'Tyler Technologies' },
  'verizon': { file: 'verizon.png', alt: 'Verizon' },
};

export type ClientLogoProps = {
  slug: ClientSlug;
  alt?: string;
  className?: string;
};

/**
 * Renders a baked client logo PNG. Indigo tint and 0.3 opacity are
 * baked into the source asset, so this is just a sized image element.
 */
export function ClientLogo({ slug, alt, className }: ClientLogoProps) {
  const meta = CLIENT_LOGOS[slug];
  if (!meta) return null;

  return (
    <img
      src={`/logos/clientlogos/${meta.file}`}
      alt={alt ?? meta.alt}
      className={cn(styles.root, className)}
      loading="lazy"
      width={800}
      height={480}
    />
  );
}