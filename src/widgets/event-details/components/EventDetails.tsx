import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@shared/lib';

import { EventForm } from '@features/event-form';

import { getEventAsync } from '@widgets/events-list/model/actions';
import { selectSelectedEvent } from '@widgets/events-list/model/selectors';

export const EventDetails = () => {
  const selectedEvent = useAppSelector(selectSelectedEvent);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      dispatch(getEventAsync(id));
    }
  }, []);

  if (!selectedEvent && searchParams.has('id'))
    return <p className="text-center">Event doesn&apos;t exist</p>;
  return (
    <div className="p-4 rounded-md bg-white w-2/3 mx-auto shadow-md">
      <EventForm selectedEvent={selectedEvent} />
    </div>
  );
};
