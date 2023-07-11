import moment from 'moment';
import { useEffect, useState } from 'react';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoutes } from '@shared/constants';

import { useAppDispatch, useAppSelector } from '@shared/lib';

import { getRequestsAsync } from '@widgets/requests-list/model/requests/actions';
import { selectRequests } from '@widgets/requests-list/model/requests/selectors';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export const RequestsCalendar = () => {
  const requestsData = useAppSelector(selectRequests);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [sortedEvents, setSortedEvents] = useState<Event[]>();

  const navigate = useNavigate();

  const onRequestClick = (event: Event) => navigate(`${AppRoutes.REQUEST}/?id=${event.resource}`);

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
        formattedRequests.map(({ type, startDate, endDate, user, id }): Event => {
          const sortedEvent = {
            title: `${user.firstName.charAt(0)}. ${user.lastName}: ${type}`,
            start: moment.utc(startDate).toDate(),
            end: moment.utc(endDate).toDate(),
            resource: id
          };
          return startDate && endDate ? sortedEvent : {};
        })
      );
    }
  }, [requestsData?.requests]);

  useEffect(() => {}, []);

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar
        onSelectEvent={onRequestClick}
        className="h-screen"
        localizer={localizer}
        events={sortedEvents}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};
