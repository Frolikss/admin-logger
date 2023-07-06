import { RegisterOptions } from 'react-hook-form';

export interface Field {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  options: RegisterOptions;
}
