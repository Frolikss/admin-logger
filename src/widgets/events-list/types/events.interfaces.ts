import { User } from '@shared/types';

export interface EventsState {
  isLoading: boolean;
  eventsData?: EventData;
  selectedEvent?: EventItem;
}

export interface EventItem {
  id: string;
  banner: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  members: User[];
  creators: User[];
}

export interface EventData {
  count: number;
  events?: EventItem[];
}
