import moment from 'moment';
import { CSSProperties, useEffect, useState } from 'react';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { useAppDispatch, useAppSelector } from '@shared/lib';

import { getRequestsAsync } from '@widgets/requests-calendar/model/requests/actions';
import { selectRequests } from '@widgets/requests-calendar/model/requests/selectors';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const STATUS_STYLES: Record<string, string> = {
  approved: '#16a34a',
  declined: '#dc2626',
  on_review: '#eab308'
};

export const RequestsCalendar = () => {
  const requestsData = useAppSelector(selectRequests);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [sortedEvents, setSortedEvents] = useState<Event[]>();

  const navigate = useNavigate();

  const onRequestClick = (event: Event) =>
    navigate(`${AppRoutes.REQUEST}/?id=${event.resource.split('-')[0]}`);

  const eventPropGetter = (event: Event) => {
    const status = event.resource.split('-')[1];

    const style: CSSProperties = {
      backgroundColor: STATUS_STYLES[status]
    };

    return {
      style
    };
  };

  useEffect(() => {
    dispatch(
      getRequestsAsync({
        limit: searchParams.get('limit') ?? '10',
        offset: searchParams.get('offset') ?? '0'
      })
    );
  }, [searchParams]);

  useEffect(() => {
    const formattedRequests = requestsData?.requests;
    if (formattedRequests) {
      setSortedEvents(
        formattedRequests.map(({ type, startDate, endDate, user, id, status }): Event => {
          const sortedEvent = {
            title: `${user.firstName.charAt(0)}. ${user.lastName}: ${type}`,
            start: moment.utc(startDate).toDate(),
            end: moment.utc(endDate).toDate(),
            resource: `${id}-${status}`
          };
          return startDate && endDate ? sortedEvent : {};
        })
      );
    }
  }, [requestsData?.requests]);

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar
        eventPropGetter={eventPropGetter}
        onSelectEvent={onRequestClick}
        className="h-screen text-base 2xl:text-xl "
        localizer={localizer}
        events={sortedEvents}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};
