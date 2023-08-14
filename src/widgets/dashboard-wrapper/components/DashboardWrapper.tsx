import cn from 'classnames';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { SideNavMenuWrapper } from '@features/side-nav-menu';
import { MENU_CONTENT } from '@features/side-nav-menu/constants/menu-content';

import { Header } from '@widgets/header';

interface Props {
  linkPath?: AppRoutes;
  children: ReactNode;
}

// const MenuItems = [
//   {
//     path: AppRoutes.USERS,
//     icon: UsersIcon,
//     text: 'Users'
//   }
// ];

export const DashboardWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <SideNavMenuWrapper />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <div className="bg-stone-100 flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};
