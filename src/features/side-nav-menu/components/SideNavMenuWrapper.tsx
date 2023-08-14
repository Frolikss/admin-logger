import cn from 'classnames';
import { SideNavMenu } from 'logger-components';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { MENU_CONTENT } from '../constants/menu-content';

export const SideNavMenuWrapper: FC = () => {
  return (
    <SideNavMenu>
      {MENU_CONTENT.map(({ path, icon: Icon, text }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            'hover:bg-blue-600 self-start flex gap-2 self-start overflow-hidden transition-all p-1.5 rounded-lg',
            {
              'bg-amber-600': location.pathname === path
            }
          )}>
          <Icon className={cn('fill-white transition-all w-6 shrink-0')} />
          <span className="text-white overflow-hidden">{text}</span>
        </Link>
      ))}
    </SideNavMenu>
  );
};
