import { ColumnItem } from 'logger-components';
import moment from 'moment/moment';

import { Balance, User } from '@shared/types';

import { Image } from '@shared/components/image';

export const getColumns = (): ColumnItem<User>[] => [
  {
    id: '1',
    accessor: 'avatar',
    header: 'Avatar',
    cell: (item) =>
      item ? (
        <Image className="w-8 h-8 rounded-full shrink-0 object-cover" fetchImageSrc={`${item}`} />
      ) : (
        <span className="bg-primary-300 flex rounded-full w-8 h-8 text-xs p-[1px] shrink-0 flex items-center justify-center">
          A
        </span>
      )
  },
  {
    id: '2',
    accessor: 'firstName',
    header: 'First Name',
    cell: (item) => `${item}`
  },
  { id: '3', accessor: 'lastName', header: 'Last Name', cell: (item) => `${item}` },
  { id: '4', accessor: 'email', header: 'Email', cell: (item) => `${item}` },
  {
    id: '5',
    accessor: 'balance',
    header: 'Vacation',
    cell: (item) => `${(item as Balance).vacation}`
  },
  {
    id: '6',
    accessor: 'balance',
    header: 'Sick leave',
    cell: (item) => `${(item as Balance).sick_leave}`
  },
  {
    id: '7',
    accessor: 'balance',
    header: 'Overtime',
    cell: (item) => `${(item as Balance).overtime}`
  },
  {
    id: '8',
    accessor: 'birthday',
    header: 'Birthday',
    cell: (item) => moment(`${item}`).format('DD.MM.yyyy')
  }
];
