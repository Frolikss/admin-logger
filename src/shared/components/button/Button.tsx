import cn from 'classnames';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';

import { BUTTON_STYLES, ButtonVariants } from './button-style-variants';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

export const Button = forwardRef(
  (
    { variant = ButtonVariants.PRIMARY, children, className, ...props }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          className,
          BUTTON_STYLES[variant],
          'rounded-md border-2 p-2 transition-all flex gap-1 items-center justify-center shrink-0 disabled:opacity-40 disabled:select-none'
        )}
        {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
