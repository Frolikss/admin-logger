import { FC, ReactNode } from 'react';

import { SideNavMenu } from '@features/side-nav-menu';

interface Props {
  children: ReactNode;
}

export const DashboardWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <SideNavMenu />
      <div className="flex flex-col flex-1">
        <div className="bg-stone-100 h-screen w-full p-4 overflow-auto">{children}</div>
      </div>
    </div>
  );
};
