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
        className,
        BUTTON_STYLES[variant],
        'rounded-md border-2 p-2 transition-all flex gap-1 items-center justify-center shrink-0 disabled:opacity-30 disabled:select-none'
      )}
      {...props}>
      {children}
    </button>
  );
};
