import { Button, ButtonVariants } from 'logger-components';
import Pagination from 'rc-pagination';
import { FC, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '@svg/arrow.svg';

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

  const showTotal = (total: number, range: [number, number]) =>
    `${range[0]} - ${range[1]} of ${total}`;

  const paginationRender = (current: number, type: string, element: ReactNode) => {
    if (type === 'prev') {
      return (
        <Button variant={ButtonVariants.UTILITY}>
          <ArrowIcon className="w-4 h-4 rotate-180 stroke-blue-600 hover:stroke-blue-900" />
        </Button>
      );
    }
    if (type === 'next') {
      return (
        <Button variant={ButtonVariants.UTILITY}>
          <ArrowIcon className="w-4 h-4 stroke-blue-600 hover:stroke-blue-900" />
        </Button>
      );
    }
    return element;
  };

  return (
    <Pagination
      showTotal={showTotal}
      showSizeChanger
      hideOnSinglePage
      showLessItems
      pageSize={limit}
      className="flex relative gap-2 border-t-2 p-2 pt-4 w-full justify-end items-center [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:cursor-pointer"
      total={count}
      onChange={setPageQueryParams}
      itemRender={paginationRender}
    />
  );
};
