import type { ReactNode } from 'react';
import { Link } from '@/components/atoms/Link';
import styles from './NavItem.module.scss';

interface NavItemProps {
  href: string;
  children: ReactNode;
}

export const NavItem = ({ href, children }: NavItemProps) => {
  return (
    <Link to={href} className={styles.root}>
      {children}
    </Link>
  );
};
