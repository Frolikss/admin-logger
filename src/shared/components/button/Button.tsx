import cn from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

import { BUTTON_STYLES, ButtonVariants } from './button-style-variants';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

export const Button: FC<Props> = ({
  variant = ButtonVariants.PRIMARY,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        BUTTON_STYLES[variant],
        'transition-all flex gap-1 items-center justify-center shrink-0',
        className
      )}
      {...props}>
      {children}
    </button>
  );
};
