import styles from './Wordmark.module.scss';

type WordmarkVariant = 'zoe-brautigam' | 'rune-lab' | 'zoe-hall';

export type WordmarkSurface = 'light' | 'dark';

interface WordmarkProps {
  variant?: WordmarkVariant;
  surface?: WordmarkSurface;
  alt?: string;
  className?: string;
}

type WordmarkAsset = {
  light: string;
  dark: string;
  alt: string;
};

const VARIANTS: Record<WordmarkVariant, WordmarkAsset> = {
  'zoe-hall': {
    light: '/wordmarks/zoe-hall.png',
    dark: '/wordmarks/zoe-hall-light.png',
    alt: 'Zoë Hall',
  },
  'zoe-brautigam': {
    light: '/wordmarks/zoe-brautigam.png',
    dark: '/wordmarks/zoe-brautigam-light.png',
    alt: 'Zoë Brautigam',
  },
  'rune-lab': {
    light: '/wordmarks/rune-lab.png',
    dark: '/wordmarks/rune-lab-light.png',
    alt: 'Rune Lab',
  },
};

export const Wordmark = ({
  variant = 'zoe-brautigam',
  surface = 'light',
  alt,
  className,
}: WordmarkProps) => {
  const asset = VARIANTS[variant];
  const label = alt ?? asset.alt;
  return (
    <span
      role="img"
      aria-label={label}
      data-surface={surface}
      className={`${styles.root}${className ? ` ${className}` : ''}`}
    >
      <img
        src={asset.light}
        alt=""
        aria-hidden
        className={`${styles.img} ${styles.imgLight}`}
      />
      <img
        src={asset.dark}
        alt=""
        aria-hidden
        className={`${styles.img} ${styles.imgDark}`}
      />
    </span>
  );
};
