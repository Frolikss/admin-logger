import { ColumnItem } from 'logger-components';
import moment from 'moment';

import { Image } from '@shared/components/image';

import { EventItem } from '@widgets/events-list/types/events.interfaces';

export const getColumns = (): ColumnItem<EventItem>[] => [
  { id: '1', accessor: 'name', header: 'Name', cell: (item) => `${item}` },
  {
    id: '2',
    accessor: 'startDate',
    header: 'Start',
    cell: (item) => moment(`${item}`).format('DD.MM.yyyy')
  },
  {
    id: '3',
    accessor: 'endDate',
    header: 'End',
    cell: (item) => moment(`${item}`).format('DD.MM.yyyy')
  },
  {
    id: '4',
    accessor: 'description',
    header: 'Description',
    cell: (item) =>
      item && item !== 'undefined' ? <span dangerouslySetInnerHTML={{ __html: `${item}` }} /> : ''
  }
];
