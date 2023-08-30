import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';

import { EventItem } from '@widgets/events-list/types/events.interfaces';

const columnHelper = createColumnHelper<EventItem>();

export const getColumns = () => [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('startDate', {
    header: 'Start',
    cell: (props) => moment(props.getValue()).format('DD.MM.yyyy')
  }),
  columnHelper.accessor('endDate', {
    header: 'End',
    cell: (props) => moment(props.getValue()).format('DD.MM.yyyy')
  }),
  columnHelper.accessor('creators', {
    header: 'Creators',
    cell: (props) =>
      props.getValue().map((user) => `${user.firstName.charAt(0) ?? ''}.${user.lastName ?? ''}`)
  })
];
