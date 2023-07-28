import cn from 'classnames';
import { FC, ReactNode, RefObject, useRef } from 'react';

import { useOnClickOutside } from '@shared/lib';

interface Props {
  header: string;
  children: ReactNode;
  isOpened: boolean;
  buttonRef: RefObject<HTMLButtonElement>;
  onCloseModal: VoidFunction;
}

export const Modal: FC<Props> = ({ header, children, isOpened, onCloseModal, buttonRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, buttonRef, onCloseModal);

  return (
    <div
      className={cn(
        'flex w-1/3 absolute shadow-md rounded-md justify-end z-50 fixed top-16 right-4',
        {
          hidden: !isOpened
        }
      )}>
      <div ref={modalRef} className="p-4 flex flex-col flex-1 gap-4 rounded-md bg-white">
        <h2 className="text-center">{header}</h2>
        {children}
      </div>
    </div>
  );
};
