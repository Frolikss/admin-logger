import cn from 'classnames';
import { Button } from 'logger-components';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { MENU_CONTENT } from '@features/side-nav-menu/constants/menu-content';

import { ReactComponent as ArrowIcon } from '@svg/arrow.svg';

export const SideNavMenu = () => {
  const location = useLocation();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onOpenMenuClick = () => setIsMenuOpened((prev) => !prev);

  return (
    <nav
      className={cn(
        'grid grid-cols-0 min-h-0 relative grid-rows-nav gap-2 bg-blue-400 p-2 ease-in-out transition-all duration-500',
        {
          'grid-cols-auto': isMenuOpened
        }
      )}>
      <Link to={AppRoutes.USERS} className="mb-10 select-none">
        Logo
      </Link>
      <Button
        onClick={onOpenMenuClick}
        className="border-none absolute -right-4 top-11 p-2 !rounded-full bg-primary-800">
        <ArrowIcon
          className={cn('stroke-white transition-all ease-in-out duration-500 delay-300 w-4 h-4', {
            'rotate-180': isMenuOpened
          })}
        />
      </Button>
      {MENU_CONTENT.map(({ path, icon: Icon, text }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            'hover:bg-primary-800 self-start flex gap-2 self-start overflow-hidden transition-all p-1.5 rounded-lg',
            {
              'bg-primary-800': location.pathname === path
            }
          )}>
          <Icon className="fill-white w-6 pointer-events-none shrink-0" />
          <span className="text-white overflow-hidden">{text}</span>
        </Link>
      ))}
    </nav>
  );
};
