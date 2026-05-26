import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import Button, { type ButtonProps } from '@/components/atoms/Button';
import { cn } from '@utils/cn';
import styles from './IconButton.module.scss';

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
  /** Icon atom (or any element) rendered as the only visible content. */
  icon: ReactNode;
  /** Required for accessibility — icon buttons need a name. */
  label: string;
};

/**
 * Round, fixed-size icon-only button. Composes the Button atom (ghost
 * variant) with an Icon child. Used for nav/carousel controls where the
 * visual is an icon, not text. The base Button's text padding is replaced
 * by a square click target.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, className, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        aria-label={label}
        className={cn(styles.root, className)}
        {...rest}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';
