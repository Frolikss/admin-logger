import { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef } from 'react';

import { INPUT_STYLES, InputVariants } from './input-style-variants';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariants;
  children?: ReactNode;
}

export const Input = forwardRef(
  (
    { variant = InputVariants.PRIMARY, children, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={INPUT_STYLES[variant]}>
        <input ref={ref} {...props} className="flex-1 bg-transparent outline-none" />
        {children}
      </div>
    );
  }
);

Input.displayName = 'Input';
