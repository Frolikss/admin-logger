import cn from 'classnames';
import { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef } from 'react';

import { INPUT_STYLES, InputVariants } from './input-style-variants';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariants;
  children?: ReactNode;
}

export const Input = forwardRef(
  (
    { variant = InputVariants.PRIMARY, children, className, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={cn(INPUT_STYLES[variant], className)}>
        <input ref={ref} {...props} className="flex-1 bg-transparent outline-none" />
        {children}
      </div>
    );
  }
);

Input.displayName = 'Input';
