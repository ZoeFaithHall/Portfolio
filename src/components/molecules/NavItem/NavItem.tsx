import styles from './NavItem.module.scss';

export type NavItemProps = {
  href: string;
  label: string;
};

export default function NavItem({ href, label }: NavItemProps) {
  return (
    <a href={href} className={styles.root}>
      {label}
    </a>
  );
}
