import { Input } from 'logger-components';
import moment from 'moment/moment';

import { FieldErrors } from '@shared/constants';

export enum EventFieldNames {
  BANNER = 'banner',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  DESCRIPTION = 'description',
  NAME = 'name'
}

export const EVENT_FIELDS_CONTENT = [
  {
    name: EventFieldNames.NAME,
    component: Input,
    label: 'Event name',
    placeholder: 'Enter event name here',
    options: {
      required: FieldErrors.REQUIRED
    }
  },
  {
    name: EventFieldNames.START_DATE,
    component: Input,
    min: moment().format('YYYY-MM-DD'),
    label: 'Start date',
    type: 'date',
    options: {
      required: FieldErrors.DATE
    }
  },
  {
    name: EventFieldNames.END_DATE,
    component: Input,
    label: 'End date',
    type: 'date',
    options: {
      required: FieldErrors.DATE
    }
  }
];
