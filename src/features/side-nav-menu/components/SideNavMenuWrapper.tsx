import cn from 'classnames';
import { SideNavMenu } from 'logger-components';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { MENU_CONTENT } from '../constants/menu-content';

export const SideNavMenuWrapper: FC = () => {
  return (
    <SideNavMenu>
      <div className="mt-12 flex flex-col gap-2">
        <h4 className="text-blue-light text-xs ml-2 uppercase">Main menu</h4>
        {MENU_CONTENT.map(({ path, icon: Icon, text }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              'hover:bg-blue-600 opacity-70 hover:opacity-100 flex gap-2 transition-all p-3 rounded-lg',
              {
                'bg-primary-dim !opacity-100': location.pathname === path
              }
            )}>
            <Icon className={cn('fill-white transition-all w-6 shrink-0')} />
            <span className="text-white">{text}</span>
          </Link>
        ))}
      </div>
    </SideNavMenu>
  );
};
