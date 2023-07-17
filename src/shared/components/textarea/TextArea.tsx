import cn from 'classnames';
import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from 'react';

import { TEXTAREA_STYLES, TextareaVariants } from './text-area-style-variants';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariants;
}

export const TextArea = forwardRef(
  (
    { variant = TextareaVariants.PRIMARY, className, ...props }: Props,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <textarea rows={3} ref={ref} className={cn(className, TEXTAREA_STYLES[variant])} {...props} />
    );
  }
);

TextArea.displayName = 'TextArea';
