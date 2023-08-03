import { FieldContent } from '@shared/types';

enum EventsListFieldNames {
  NAME = 'name',
  START_DATE = 'startDate',
  END_DATE = 'endDate'
}

export const EVENTS_LIST_FIELDS_CONTENT: FieldContent[] = [
  {
    name: EventsListFieldNames.NAME,
    label: 'Name',
    placeholder: 'Name',
    options: {}
  },
  {
    name: EventsListFieldNames.START_DATE,
    label: 'Start date',
    placeholder: 'Start date',
    type: 'date',
    options: {}
  },
  {
    name: EventsListFieldNames.END_DATE,
    label: 'End date',
    placeholder: 'End date',
    type: 'date',
    options: {}
  }
];
