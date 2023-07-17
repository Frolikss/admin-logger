import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment/moment';

import { Request } from '../types/requests.interfaces';

const columnHelper = createColumnHelper<Request>();

export const getColumns = () => [
  columnHelper.accessor('user.firstName', {
    header: 'First Name',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('user.lastName', {
    header: 'Last Name',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('user.email', {
    header: 'Email',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('startDate', {
    header: 'Start',
    cell: (props) => moment(props.getValue()).format('DD.MM.yyyy')
  }),
  columnHelper.accessor('endDate', {
    header: 'End',
    cell: (props) => moment(props.getValue()).format('DD.MM.yyyy')
  })
];
