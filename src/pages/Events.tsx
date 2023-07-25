import { Link } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { EventsList } from '@widgets/events-list';

import { ReactComponent as AddIcon } from '@svg/add.svg';

export const Events = () => {
  return (
    <div>
      <Link to={AppRoutes.EVENT} className="flex items-end justify-end">
        <AddIcon className="w-10 transition-all p-2 rounded-full hover:bg-gray-300" />
      </Link>
      <EventsList />
    </div>
  );
};
