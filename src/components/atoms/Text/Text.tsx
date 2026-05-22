import { createElement } from 'react';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils/cn';
import styles from './Text.module.scss';

export type TextVariant =
  | 'display-1'
  | 'display-2'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'mono';

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant?: TextVariant;
  muted?: boolean;
  children: ReactNode;
};

export default function Text({
  as = 'p',
  variant = 'body',
  muted = false,
  className,
  children,
  ...rest
}: TextProps) {
  return createElement(
    as,
    {
      className: cn(styles.root, styles[`variant--${variant}`], muted && styles.muted, className),
      ...rest,
    },
    children
  );
}
