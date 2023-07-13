import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ListPagination } from '@shared/components/list-pagination/ListPagination';
import { DashboardTable } from '@shared/components/table';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { getUsersAsync, selectUsers } from '@widgets/users-list';

import { getColumns } from '../constants/columns-content';

export const UsersList = () => {
  const dispatch = useAppDispatch();
  const usersData = useAppSelector(selectUsers);

  const [searchParams] = useSearchParams();

  const table = useReactTable({
    data: usersData?.users ?? [],
    columns: getColumns(
      (index) => usersData?.users[index].id ?? '',
      (index) => usersData?.users[index].avatar ?? ''
    ),
    getCoreRowModel: getCoreRowModel()
  });

  useEffect(() => {
    dispatch(
      getUsersAsync({
        limit: searchParams.get('limit') ?? '10',
        offset: searchParams.get('offset') ?? '0'
      })
    );
  }, [searchParams]);

  if (!usersData?.users) return <p>No users</p>;
  return (
    <div className="flex flex-col items-center">
      <DashboardTable table={table} />
      <ListPagination count={usersData.count} />
    </div>
  );
};
