import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { ReactComponent as AddIcon } from '@svg/add.svg';

interface Props {
  path?: AppRoutes;
}

const HEADERS: Record<string, string> = {
  [AppRoutes.USERS]: 'Users',
  [AppRoutes.REQUESTS]: 'Requests',
  [AppRoutes.EVENTS]: 'Events'
};

export const Header: FC<Props> = ({ path }) => {
  const { pathname } = useLocation();

  const headerText = HEADERS[pathname];

  return (
    <header className="header flex items-center justify-between p-4">
      {headerText && (
        <h2 className="text-2xl font-bold text-primary-dim 2xl:text-xl">{headerText}</h2>
      )}
      <div className="flex items-center justify-center gap-2">
        {path && (
          <Link to={path} className="p-2 rounded-md transition-all bg-dim hover:bg-utility-200">
            <AddIcon className="w-6" />
          </Link>
        )}
      </div>
    </header>
  );
};
