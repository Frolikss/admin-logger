import { Table } from 'logger-components';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { ListPagination } from '@shared/components/list-pagination';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { TableSearchForm } from '@features/table-search-form';

import { EVENTS_LIST_FIELDS_CONTENT } from '@widgets/events-list/constants/fields-content';

import { getColumns } from '../constants/column-content';
import { getEventsAsync, unsetSelectedEvent } from '../model/actions';
import { selectEvents } from '../model/selectors';

export const EventsList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedRow, setSelectedRow] = useState(-1);

  const eventsData = useAppSelector(selectEvents);
  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldValues) =>
    setSearchParams({ name: data.name, startDate: data.startDate, endDate: data.endDate });

  useEffect(() => {
    setSearchParams();
  }, []);

  useEffect(() => {
    dispatch(
      getEventsAsync({
        offset: searchParams.get('offset') ?? '0',
        limit: searchParams.get('limit') ?? '10',
        name: searchParams.get('name') ?? '',
        startDate: searchParams.get('startDate') ?? '',
        endDate: searchParams.get('endDate') ?? ''
      })
    );

    if (!searchParams.has('id')) {
      dispatch(unsetSelectedEvent());
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedRow >= 0 && eventsData?.events) {
      navigate(`${AppRoutes.EVENT}?id=${eventsData.events[selectedRow].id}`);
    }
  }, [selectedRow]);

  if (!eventsData?.events) return null;
  return (
    <div className="flex flex-col bg-white p-2 shadow-dashboard rounded-md">
      <TableSearchForm fields={EVENTS_LIST_FIELDS_CONTENT} onSubmit={onSubmit} />
      <Table data={eventsData.events} setSelectedRow={setSelectedRow} columns={getColumns()} />
      <ListPagination count={eventsData.count} />
    </div>
  );
};
