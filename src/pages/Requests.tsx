import cn from 'classnames';
import { useEffect, useState } from 'react';

import { Button, ButtonVariants } from '@shared/components/button';

import { SearchForm } from '@features/search-form';

import { RequestModal } from '@widgets/request-modal';
import { RequestsList } from '@widgets/requests-list';
import { Request } from '@widgets/requests-list/types/requests.interfaces';

export const Requests = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchIsOpened, setSearchIsOpened] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request>();

  const onClick = () => {
    setSearchIsOpened((prev) => !prev);
  };

  useEffect(() => {
    if (selectedRequest) {
      setIsOpened(true);
    }
  }, [selectedRequest]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant={ButtonVariants.UTILITY}
        onClick={onClick}
        className={cn({ 'border-red-600 text-red-600': searchIsOpened })}>
        {searchIsOpened ? 'Close' : 'Search'}
      </Button>
      <SearchForm searchIsOpened={searchIsOpened} />
      <RequestsList setSelectedRequest={setSelectedRequest} />
      <RequestModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
      />
    </div>
  );
};
