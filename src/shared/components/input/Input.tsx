import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

import { INPUT_STYLES, InputVariants } from './input-style-variants';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariants;
}

export const Input = forwardRef(
  ({ variant = InputVariants.PRIMARY, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return <input ref={ref} className={INPUT_STYLES[variant]} {...props} />;
  }
);

Input.displayName = 'Input';
