import { EMAIL_PATTERN, FieldErrors } from '@shared/constants';
import { PHONE_PATTERN } from '@shared/constants/fields-patterns';

import { UserFieldsNames } from './fields-names';

export const USER_FIELDS_CONTENT = [
  {
    name: UserFieldsNames.AVATAR,
    label: 'Avatar',
    type: 'file'
  },
  {
    name: UserFieldsNames.EMAIL,
    placeholder: 'Enter your email',
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
    name: UserFieldsNames.PHONE,
    placeholder: 'Enter your phone',
    label: 'Phone',
    type: 'tel',
    options: {
      required: FieldErrors.REQUIRED,
      pattern: {
        value: PHONE_PATTERN,
        message: FieldErrors.PHONE
      }
    }
  },
  {
    name: UserFieldsNames.FIRSTNAME,
    placeholder: 'Enter your name',
    label: 'First name',
    options: {
      required: FieldErrors.REQUIRED
    }
  },
  {
    name: UserFieldsNames.LASTNAME,
    placeholder: 'Enter your last name',
    label: 'Last name',
    options: {
      required: FieldErrors.REQUIRED
    }
  },
  {
    name: UserFieldsNames.SURNAME,
    placeholder: 'Enter your surname',
    label: 'Surname',
    options: {
      required: FieldErrors.REQUIRED
    }
  },
  {
    name: UserFieldsNames.BIRTHDAY,
    placeholder: 'Enter your birthday',
    type: 'date',
    label: 'Birthday',
    options: {
      required: FieldErrors.REQUIRED
    }
  }
];

export const initialValue = {
  surname: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  birthday: ''
};
