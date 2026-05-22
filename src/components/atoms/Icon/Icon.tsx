import type { SVGAttributes, ReactNode } from 'react';
import { cn } from '@utils/cn';
import styles from './Icon.module.scss';

export type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
  label?: string;
  children: ReactNode;
};

export default function Icon({
  size = 20,
  label,
  className,
  children,
  ...rest
}: IconProps) {
  const ariaProps = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(styles.root, className)}
      {...ariaProps}
      {...rest}
    >
      {children}
    </svg>
  );
}
