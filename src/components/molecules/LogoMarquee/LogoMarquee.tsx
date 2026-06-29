import type { CSSProperties } from 'react';
import { ClientLogo, type ClientSlug } from '@/components/atoms/ClientLogo';
import { cn } from '@utils/cn';
import styles from './LogoMarquee.module.scss';

export type LogoMarqueeProps = {
  slugs: readonly ClientSlug[];
  duration?: number;
  /** 'left' (default) scrolls right-to-left. 'right' scrolls left-to-right. */
  direction?: 'left' | 'right';
  className?: string;
};

export function LogoMarquee({
  slugs,
  duration = 60,
  direction = 'left',
  className,
}: LogoMarqueeProps) {
  const renderSet = (copyIndex: number) =>
    slugs.map((slug, i) => (
      <div
        key={`${copyIndex}-${slug}-${i}`}
        className={styles.slot}
        aria-hidden={copyIndex === 1}
      >
        <ClientLogo slug={slug} />
      </div>
    ));

  return (
    <div
      className={cn(styles.viewport, className)}
      role="region"
      aria-label="Clients and partners"
    >
      <div
        className={styles.track}
        style={{
          '--marquee-duration': `${duration}s`,
          '--marquee-direction': direction === 'right' ? 'reverse' : 'normal',
        } as CSSProperties}
      >
        {renderSet(0)}
        {renderSet(1)}
      </div>
    </div>
  );
}