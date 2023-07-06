import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ListPagination } from '@shared/components/list-pagination/ListPagination';
import { DashboardTable } from '@shared/components/table';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { Request } from '@widgets/requests-list';
import { getRequestsAsync } from '@widgets/requests-list/model/requests/actions';
import { selectRequests } from '@widgets/requests-list/model/requests/selectors';

import { getColumns } from '../constants/columns-content';

interface Props {
  setSelectedRequest: Dispatch<SetStateAction<Request | undefined>>;
}

export const RequestsList: FC<Props> = ({ setSelectedRequest }) => {
  const dispatch = useAppDispatch();
  const requestsData = useAppSelector(selectRequests);

  const [selectedRow, setSelectedRow] = useState(-1);

  const [searchParams] = useSearchParams();

  const table = useReactTable({
    data: requestsData?.requests ?? [],
    columns: getColumns(),
    getCoreRowModel: getCoreRowModel()
  });

  useEffect(() => {
    dispatch(
      getRequestsAsync({
        limit: searchParams.get('limit') ?? '10',
        offset: searchParams.get('offset') ?? '0'
      })
    );
  }, [searchParams]);

  useEffect(() => {
    setSelectedRequest(requestsData?.requests[selectedRow]);
  }, [selectedRow]);

  if (!requestsData?.requests) return null;
  return (
    <div className="flex flex-col items-center">
      <DashboardTable table={table} setSelectedRow={setSelectedRow} />
      <ListPagination count={requestsData.count} />
    </div>
  );
};
