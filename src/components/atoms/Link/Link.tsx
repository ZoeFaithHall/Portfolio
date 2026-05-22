import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils/cn';
import styles from './Link.module.scss';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: ReactNode;
  underline?: boolean;
};

function isExternal(to: string): boolean {
  return /^(https?:)?\/\//.test(to) || to.startsWith('mailto:') || to.startsWith('tel:');
}

export default function Link({ to, children, underline = false, className, ...rest }: LinkProps) {
  const classes = cn(styles.root, underline && styles.underline, className);

  if (isExternal(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }

  // Internal links are hash anchors in this single-page setup.
  return (
    <a href={to} className={classes} {...rest}>
      {children}
    </a>
  );
}
