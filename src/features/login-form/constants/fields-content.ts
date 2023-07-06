import { EMAIL_PATTERN, FieldErrors } from '@shared/constants';

import { Input } from '@shared/components/input';

import { LoginFieldsErrors } from './fields-errors';

export enum LoginFieldsNames {
  EMAIL = 'email',
  PASSWORD = 'password'
}

export const LOGIN_FIELDS_CONTENT = [
  {
    name: LoginFieldsNames.EMAIL,
    placeholder: 'Enter your email',
    component: Input,
    label: 'Email',
    type: 'email',
    options: {
      required: FieldErrors.REQUIRED,
      pattern: {
        value: EMAIL_PATTERN,
        message: FieldErrors.EMAIL
      }
    }
  },
  {
    name: LoginFieldsNames.PASSWORD,
    placeholder: 'Enter your password',
    component: Input,
    label: 'Password',
    options: {
      required: FieldErrors.REQUIRED,
      minLength: {
        value: 6,
        message: LoginFieldsErrors.CODE_LENGTH
      }
    }
  }
];