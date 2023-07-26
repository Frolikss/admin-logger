import cn from 'classnames';
import { useEffect, useState } from 'react';

import { Button } from '@shared/components/button';

import { SearchForm } from '@features/search-form';

import { RequestsCalendar } from '@widgets/requests-calendar';
import { Request } from '@widgets/requests-calendar/types/requests.interfaces';

export const Requests = () => {
  const [, setIsOpened] = useState(false);
  const [searchIsOpened, setSearchIsOpened] = useState(false);
  const [selectedRequest] = useState<Request>();

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
      <div className="w-2/3 mx-auto">
        <Button
          onClick={onClick}
          className={cn('w-full mb-4', {
            'border-red-600 text-red-600 hover:border-red-300 hover:text-red-300': searchIsOpened
          })}>
          {searchIsOpened ? 'Close' : 'Search'}
        </Button>
        <SearchForm searchIsOpened={searchIsOpened} />
      </div>
      {/*<RequestsList setSelectedRequest={setSelectedRequest} />*/}
      <RequestsCalendar />
    </div>
  );
};
