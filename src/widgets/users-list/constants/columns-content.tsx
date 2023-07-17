import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { User } from '@shared/types';

import { ReactComponent as EditIcon } from '@svg/edit.svg';

const columnHelper = createColumnHelper<User>();

export const getColumns = (
  handleUpdateClick: (index: number) => string,
  getAvatar?: (index: number) => string
) => [
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (props) => (
      <div className="flex gap-2 items-center w-4">
        {getAvatar && getAvatar(props.row.index) ? (
          <img
            className="w-4 h-4 rounded-full shrink-0"
            src={`http://49.12.205.35:9000${getAvatar(props.row.index)}`}
            alt="avatar"
          />
        ) : (
          <div className="bg-violet-300 rounded-full w-full h-full text-xs p-[1px] shrink-0 flex items-center justify-center">
            {props.getValue().charAt(0)}
          </div>
        )}
        {props.getValue()}
      </div>
    )
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
        <Link
          to={`${AppRoutes.USER}/?id=${handleUpdateClick(props.row.index)}`}
          className="p-2 hover:bg-gray-200 transition-all rounded-full">
          <EditIcon className="fill-green w-5" />
        </Link>
      </div>
    )
  })
];
