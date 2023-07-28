import { FC, ReactNode, useState } from 'react';

import { AppRoutes } from '@shared/constants';

import { SideNavMenu } from '@features/side-nav-menu';

import { Header } from '@widgets/header';

interface Props {
  linkPath?: AppRoutes;
  children: ReactNode;
}

export const DashboardWrapper: FC<Props> = ({ children, linkPath }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <div className="flex text-gray-800">
      <SideNavMenu isMenuOpened={isMenuOpened} />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header setIsMenuOpened={setIsMenuOpened} path={linkPath} />
        <div className="bg-stone-100 h-full w-full p-4 overflow-auto">{children}</div>
      </div>
    </div>
  );
};
