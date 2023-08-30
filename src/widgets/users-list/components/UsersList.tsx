import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table } from 'logger-components';
import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { ListPagination } from '@shared/components/list-pagination';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { TableSearchForm } from '@features/table-search-form';

import { getUsersAsync, selectUsers } from '@widgets/users-list';
import { USERS_SEARCH_CONTENT } from '@widgets/users-list/constants/field-content';

import { getColumns } from '../constants/columns-content';

export const UsersList = () => {
  const [_, setSearchParams] = useSearchParams();

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

  const onSubmit = (data: FieldValues) => setSearchParams({ search: data.search });

  useEffect(() => {
    setSearchParams();
  }, []);

  useEffect(() => {
    dispatch(
      getUsersAsync({
        limit: searchParams.get('limit') ?? '10',
        offset: searchParams.get('offset') ?? '0',
        search: searchParams.get('search') ?? ''
      })
    );
  }, [searchParams]);

  if (!usersData?.users) return <p>No users</p>;
  return (
    <div className="flex flex-col items-center bg-white p-2 rounded-md">
      <TableSearchForm fields={USERS_SEARCH_CONTENT} onSubmit={onSubmit} />
      <Table table={table} />
      <ListPagination count={usersData.count} />
    </div>
  );
};
