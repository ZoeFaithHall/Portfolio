import { cn } from '@/utils/cn';
import styles from './Dagaz.module.scss';

export type DagazProps = { className?: string };

/**
 * The outline Dagaz from the Rune Lab design system's seal (assets/Marks),
 * redrawn at mark size. Decorative: it always sits beside a text label.
 */
export function Dagaz({ className }: DagazProps) {
  return (
    <svg className={cn(styles.root, className)} viewBox="62 66 76 68" aria-hidden="true" focusable="false">
      <path d="M66 70 L66 130 L134 70 L134 130 Z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="miter" />
    </svg>
  );
}
