import type { ReactNode } from 'react';
import styles from './NavItem.module.scss';

interface NavItemProps {
  href: string;
  children: ReactNode;
}

export const NavItem = ({ href, children }: NavItemProps) => {
  return (
    <a href={href} className={styles.root}>
      {children}
    </a>
  );
};