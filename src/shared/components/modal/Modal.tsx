import cn from 'classnames';
import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';

import { Button } from '@shared/components/button';

import { ReactComponent as ExitIcon } from '@svg/add.svg';

interface Props {
  header: string;
  children: ReactNode;
  isOpened: boolean;
  onCloseModal: VoidFunction;
}

export const Modal: FC<Props> = ({ header, children, isOpened, onCloseModal }) => {
  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'unset';
  }, [isOpened]);

  return createPortal(
    <div
      className={cn(
        'flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-black/50',
        {
          hidden: !isOpened
        }
      )}>
      <div className="w-1/3 p-4 flex flex-col gap-4 rounded-md bg-white">
        <div className="flex items-center">
          <span className="flex-1" />
          <h2 className="text-center">{header}</h2>
          <div className="flex flex-1 justify-end">
            <Button onClick={onCloseModal}>
              <ExitIcon className="rotate-45 w-6 h-6" />
            </Button>
          </div>
        </div>
        {children}
      </div>
      <ToastContainer />
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};
