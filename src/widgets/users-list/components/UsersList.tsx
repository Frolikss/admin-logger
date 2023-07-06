import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { User } from '@shared/types';

import { ListPagination } from '@shared/components/list-pagination/ListPagination';
import { DashboardTable } from '@shared/components/table';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { deleteUsersAsync, getUsersAsync, selectUsers } from '@widgets/users-list';

import { getColumns } from '../constants/columns-content';

interface Props {
  setSelectedUser: Dispatch<SetStateAction<Partial<User> | undefined>>;
}

export const UsersList: FC<Props> = ({ setSelectedUser }) => {
  const dispatch = useAppDispatch();
  const usersData = useAppSelector(selectUsers);

  const [searchParams] = useSearchParams();

  const table = useReactTable({
    data: usersData?.users ?? [],
    columns: getColumns(
      (index) => usersData?.users && dispatch(deleteUsersAsync(usersData?.users[index].id)),
      (index) => setSelectedUser(usersData?.users && usersData?.users[index])
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

  if (!usersData?.users) return null;
  return (
    <div className="flex flex-col items-center">
      <DashboardTable table={table} />
      <ListPagination count={usersData.count} />
    </div>
  );
};
