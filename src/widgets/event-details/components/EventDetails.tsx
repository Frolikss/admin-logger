import moment from 'moment';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoutes } from '@shared/constants';

import { useAppDispatch, useAppSelector } from '@shared/lib';

import { EventForm } from '@features/event-form';
import { EventFieldNames } from '@features/event-form/constants/fields-content';
import { EventFields } from '@features/event-form/types/fields.interfaces';

import {
  createEventAsync,
  getEventAsync,
  updateEventAsync
} from '@widgets/events-list/model/actions';
import { selectSelectedEvent } from '@widgets/events-list/model/selectors';

export const EventDetails = () => {
  const selectedEvent = useAppSelector(selectSelectedEvent);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onEventSubmit: SubmitHandler<EventFields> = ({
    startDate,
    endDate,
    name,
    banner,
    description
  }) => {
    const formData = new FormData();
    const bannerImg = banner && banner[0];

    const start = moment.utc(startDate);
    const end = moment.utc(endDate);

    if (bannerImg && bannerImg?.type !== 'image/png' && bannerImg?.type !== 'image/jpeg') {
      return null;
    }

    if (start.valueOf() > end.valueOf()) {
      toast.warning('End date can`t be smaller than Start date');
      return null;
    }

    if (bannerImg) {
      formData.append(EventFieldNames.BANNER, bannerImg);
    }

    formData.append(EventFieldNames.NAME, name);
    formData.append(EventFieldNames.DESCRIPTION, description);
    formData.append(EventFieldNames.START_DATE, `${moment.utc(startDate).valueOf()}`);
    formData.append(EventFieldNames.END_DATE, `${moment.utc(endDate).valueOf()}`);

    if (searchParams.has('id')) {
      formData.append('id', selectedEvent?.id ?? '');
      dispatch(updateEventAsync(formData));
    } else {
      dispatch(createEventAsync(formData));
    }
    navigate(AppRoutes.EVENTS);
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      dispatch(getEventAsync(id));
    }
  }, []);

  if (!selectedEvent && searchParams.has('id')) return <p>Event doesn&apos;t exist</p>;
  return (
    <div className="p-4 rounded-md bg-white w-2/3 mx-auto shadow-md">
      <EventForm onEventSubmit={onEventSubmit} selectedEvent={selectedEvent} />
    </div>
  );
};
