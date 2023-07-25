import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { ListPagination } from '@shared/components/list-pagination/ListPagination';
import { DashboardTable } from '@shared/components/table';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { getColumns } from '../constants/column-content';
import { getEventsAsync } from '../model/actions';
import { selectEvents } from '../model/selectors';

export const EventsList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedRow, setSelectedRow] = useState(-1);

  const eventsData = useAppSelector(selectEvents);
  const dispatch = useAppDispatch();

  const table = useReactTable({
    data: eventsData?.events ?? [],
    columns: getColumns(),
    getCoreRowModel: getCoreRowModel()
  });

  useEffect(() => {
    dispatch(getEventsAsync(searchParams.get('offset') ?? '0'));
  }, [searchParams]);

  useEffect(() => {
    if (selectedRow >= 0 && eventsData?.events) {
      navigate(`${AppRoutes.EVENT}?id=${eventsData.events[selectedRow].id}`);
    }
  }, [selectedRow]);

  if (!eventsData) return null;
  return (
    <div className="flex flex-col gap-2">
      <DashboardTable table={table} setSelectedRow={setSelectedRow} />
      <ListPagination count={eventsData.count} />
    </div>
  );
};
