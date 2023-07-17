import { FC, SVGProps } from 'react';

import { SVGComponent } from '@shared/types';

import { ReactComponent as OvertimeIcon } from '@svg/overtime.svg';
import { ReactComponent as SickLeaveIcon } from '@svg/sick-leave.svg';
import { ReactComponent as VacationIcon } from '@svg/vacation.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  type: string;
}

const ICONS: Record<string, SVGComponent> = {
  overtime: OvertimeIcon,
  sick_leave: SickLeaveIcon,
  vacation: VacationIcon
};

export const Icon: FC<IconProps> = ({ type, ...props }) => {
  const Svg = ICONS[type];
  return <Svg {...props} />;
};
