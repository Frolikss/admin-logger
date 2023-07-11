import { Link } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { UsersList } from '@widgets/users-list';

import { ReactComponent as AddIcon } from '@svg/add.svg';

export const Users = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link
        to={AppRoutes.USER}
        className="self-end transition-all p-2 rounded-full hover:bg-gray-300">
        <AddIcon className="w-10" />
      </Link>
      <UsersList />
    </div>
  );
};
