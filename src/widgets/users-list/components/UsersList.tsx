import { Table } from 'logger-components';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { ListPagination } from '@shared/components/list-pagination';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { TableSearchForm } from '@features/table-search-form';

import { getUsersAsync, selectUsers } from '@widgets/users-list';
import { USERS_SEARCH_CONTENT } from '@widgets/users-list/constants/field-content';

import { getColumns } from '../constants/columns-content';

export const UsersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUserId, setSelectedUserId] = useState(-1);

  const dispatch = useAppDispatch();
  const usersData = useAppSelector(selectUsers);

  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => setSearchParams({ search: data.search });

  useEffect(() => {
    setSearchParams();
  }, []);

  useEffect(() => {
    if (selectedUserId >= 0) {
      navigate(`${AppRoutes.USER}/?id=${usersData?.users[selectedUserId].id}`);
    }
  }, [selectedUserId]);

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
      <Table data={usersData?.users} columns={getColumns()} setSelectedRow={setSelectedUserId} />
      <ListPagination count={usersData.count} />
    </div>
  );
};
