import { User } from '@shared/types';

export interface RequestsState {
  isLoading: boolean;
  requests?: RequestData;
  selectedRequest?: Request;
}

export interface RequestData {
  count: number;
  requests: Request[];
}

export interface Request {
  id: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  comment?: string;
  user: User;
}

export interface UpdateRequest {
  requestId: string;
  status: string;
}
