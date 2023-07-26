import { Dispatch, FC, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { Button } from '@shared/components/button';

import { ReactComponent as AddIcon } from '@svg/add.svg';
import { ReactComponent as MenuIcon } from '@svg/menu.svg';
import { ReactComponent as SearchIcon } from '@svg/search.svg';

interface Props {
  path?: AppRoutes;
  setIsMenuOpened: Dispatch<SetStateAction<boolean>>;
}

const HEADERS: Record<string, string> = {
  [AppRoutes.USERS]: 'Users',
  [AppRoutes.REQUESTS]: 'Requests',
  [AppRoutes.EVENTS]: 'Events'
};

export const Header: FC<Props> = ({ path, setIsMenuOpened }) => {
  const { pathname } = useLocation();
  const onMenuClick = () => setIsMenuOpened((prev) => !prev);

  return (
    <header className="header flex items-center justify-between p-2">
      <Button onClick={onMenuClick} className="border-none">
        <MenuIcon className="w-5" />
      </Button>
      {HEADERS[pathname] && <h2 className="text-xl 2xl:text-2xl">{HEADERS[pathname]}</h2>}
      <div className="flex items-center justify-center gap-2">
        {path && (
          <Link to={path} className="p-2 rounded-md transition-all hover:bg-gray-200">
            <AddIcon className="w-6" />
          </Link>
        )}
        {pathname === AppRoutes.REQUESTS && (
          <Button className="border-none hover:bg-gray-200">
            <SearchIcon className="fill-black w-6" />
          </Button>
        )}
      </div>
    </header>
  );
};
