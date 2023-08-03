import { Input } from 'logger-components';

export enum SearchFieldsNames {
  EMAIL = 'email',
  FIRST_NAME = 'firstName',
  SURNAME = 'surname',
  LAST_NAME = 'lastName'
}

export const SEARCH_FIELDS_CONTENT = [
  {
    name: SearchFieldsNames.EMAIL,
    placeholder: 'Email',
    component: Input,
    label: 'Email'
  },
  {
    name: SearchFieldsNames.FIRST_NAME,
    placeholder: 'First name',
    component: Input,
    label: 'First name',
    options: {
      minLength: {
        value: 2,
        message: 'Too short'
      }
    }
  },
  {
    name: SearchFieldsNames.LAST_NAME,
    placeholder: 'Last name',
    component: Input,
    label: 'Last name',
    options: {
      minLength: {
        value: 2,
        message: 'Too short'
      }
    }
  },
  {
    name: SearchFieldsNames.SURNAME,
    placeholder: 'Surname',
    component: Input,
    label: 'Surname',
    options: {
      minLength: {
        value: 2,
        message: 'Too short'
      }
    }
  }
];
