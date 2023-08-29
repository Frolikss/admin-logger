import { FC, ReactNode } from 'react';

import { SideNavMenuWrapper } from '@features/side-nav-menu';

import { Header } from '@widgets/header';

interface Props {
  children: ReactNode;
}

export const DashboardWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <SideNavMenuWrapper />
      <div className="flex flex-col flex-1 basis-3/4 min-h-screen">
        <Header />
        <div className="bg-background flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};
