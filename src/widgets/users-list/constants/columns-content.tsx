import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment/moment';

import { User } from '@shared/types';

import { Button } from '@shared/components/button';

import { ReactComponent as DeleteIcon } from '@svg/add.svg';
import { ReactComponent as EditIcon } from '@svg/edit.svg';

const columnHelper = createColumnHelper<User>();

export const getColumns = (
  handleDeleteClick: (index: number) => void,
  handleUpdateClick: (index: number) => void
) => [
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('balance.vacation', {
    header: 'Vacation',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('balance.sick_leave', {
    header: 'Sick leave',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('balance.overtime', {
    header: 'Overtime',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('birthday', {
    header: 'Birthday',
    cell: (props) => moment(props.getValue()).format('DD.MM.yyyy')
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (props) => moment(props.getValue()).format('DD.MM.yyyy')
  }),
  columnHelper.accessor('balance', {
    header: 'Edit',
    cell: (props) => (
      <div className="flex gap-2 items-center">
        <Button onClick={() => handleDeleteClick(props.row.index)}>
          <DeleteIcon className="rotate-45 fill-red w-5" />
        </Button>
        <Button onClick={() => handleUpdateClick(props.row.index)}>
          <EditIcon className="fill-green w-5" />
        </Button>
      </div>
    )
  })
];
