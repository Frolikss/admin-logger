import { useRef, useState } from 'react';

import { Button } from '@shared/components/button';
import { Modal } from '@shared/components/modal';

import { SearchForm } from '@features/search-form';

import { RequestsCalendar } from '@widgets/requests-calendar';

import { ReactComponent as SearchIcon } from '@svg/search.svg';

export const Requests = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [searchIsOpened, setSearchIsOpened] = useState(false);

  const onCloseModal = () => {
    setSearchIsOpened(false);
  };

  const onOpenModal = () => {
    setSearchIsOpened((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        ref={buttonRef}
        className="border-none absolute m-2 top-0 right-0 hover:bg-gray-200"
        onClick={onOpenModal}>
        <SearchIcon className="fill-black w-6 pointer-events-none" />
      </Button>
      <RequestsCalendar />
      <Modal
        header="Search"
        buttonRef={buttonRef}
        isOpened={searchIsOpened}
        onCloseModal={onCloseModal}>
        <SearchForm searchIsOpened={searchIsOpened} onCloseModal={onCloseModal} />
      </Modal>
    </div>
  );
};
