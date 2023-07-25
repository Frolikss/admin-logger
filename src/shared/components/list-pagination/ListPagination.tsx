import Pagination from 'rc-pagination';
import { FC, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@shared/components/button';

interface Props {
  count: number;
  limit?: number;
}

export const ListPagination: FC<Props> = ({ count, limit = 10 }) => {
  const [_, setSearchParams] = useSearchParams();

  const setPageQueryParams = (current: number) =>
    setSearchParams({
      offset: `${current - 1}`,
      limit: `${limit}`
    });

  const paginationRender = (current: number, type: string, element: ReactNode) => {
    if (type === 'prev' && current !== 0) {
      return <Button className="border-none">{'<'}</Button>;
    }
    if (type === 'next') {
      return <Button className="border-none">{'>'}</Button>;
    }
    if (type === 'jump-next' || type === 'jump-prev') {
      return <span>...</span>;
    }
    return element;
  };

  return (
    <Pagination
      hideOnSinglePage
      showLessItems
      pageSize={limit}
      className="flex gap-4 bg-gray-200 rounded-md p-2 w-full justify-center items-center [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:w-2.5 [&>*]:h-2.5 [&>*]:cursor-pointer [&>*]:p-5"
      total={count}
      onChange={setPageQueryParams}
      itemRender={paginationRender}
    />
  );
};
