import { Link } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { MENU_CONTENT } from '@features/side-nav-menu/constants/menu-content';

export const SideNavMenu = () => {
  return (
    <nav className="flex flex-col gap-2 h-screen bg-purple-500 p-2">
      <Link to={AppRoutes.USERS} className="mb-4 select-none">
        Logo
      </Link>
      {MENU_CONTENT.map(({ path, icon: Icon }) => (
        <Link key={path} to={path} className="hover:bg-purple-800 transition-all p-2 rounded-full">
          <Icon className="fill-white w-6 pointer-events-none" />
        </Link>
      ))}
    </nav>
  );
};
