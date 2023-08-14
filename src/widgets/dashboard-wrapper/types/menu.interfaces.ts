import { AppRoutes } from '@shared/constants';

import { SVGComponent } from '@shared/types';

export interface MenuItem {
  path: AppRoutes;
  icon: SVGComponent;
  text: string;
}
