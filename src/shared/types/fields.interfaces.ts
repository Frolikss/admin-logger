import { InputHTMLAttributes } from 'react';
import { RegisterOptions } from 'react-hook-form';

export interface FieldContent extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  options?: RegisterOptions;
}
