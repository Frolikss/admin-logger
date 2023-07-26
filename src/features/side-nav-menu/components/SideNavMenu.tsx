import cn from 'classnames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { MENU_CONTENT } from '@features/side-nav-menu/constants/menu-content';

interface Props {
  isMenuOpened: boolean;
}

export const SideNavMenu: FC<Props> = ({ isMenuOpened }) => {
  const location = useLocation();

  return (
    <nav
      className={cn(
        'grid grid-cols-0 min-h-0 grid-rows-nav gap-2 bg-blue-400 p-2 ease-in-out transition-all duration-500',
        {
          'grid-cols-auto': isMenuOpened
        }
      )}>
      <Link to={AppRoutes.USERS} className="mb-4 select-none">
        Logo
      </Link>
      {MENU_CONTENT.map(({ path, icon: Icon, text }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            'hover:bg-blue-800 self-start flex gap-2 self-start overflow-hidden transition-all p-1.5 rounded-full',
            {
              'bg-blue-800': location.pathname === path
            }
          )}>
          <Icon className="fill-white w-6 pointer-events-none shrink-0" />
          <span className="text-white overflow-hidden">{text}</span>
        </Link>
      ))}
    </nav>
  );
};
