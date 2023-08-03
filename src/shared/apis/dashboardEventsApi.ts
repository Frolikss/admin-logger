import { AxiosRequestConfig } from 'axios';

import { QueryParams } from '@shared/types';

import { dashboardApiClient } from '@shared/config';

class DashboardAuthApi {
  constructor(private readonly url: string) {
    this.url = url;
  }

  getEvents(payload: QueryParams, config?: AxiosRequestConfig) {
    return dashboardApiClient.get(
      `${this.url}/?limit=${payload.limit ?? ''}&offset=${payload.offset}&search=${
        payload.search ?? ''
      }&name=${payload.name ?? ''}&startDate=${payload.startDate ?? ''}&endDate=${
        payload.endDate ?? ''
      }`,
      config
    );
  }

  getEvent(payload: string, config?: AxiosRequestConfig) {
    return dashboardApiClient.get(`${this.url}/${payload}`, config);
  }

  createEvent(payload: FormData, config?: AxiosRequestConfig) {
    return dashboardApiClient.post(`${this.url}/create`, payload, config);
  }

  updateEvent(payload: FormData, config?: AxiosRequestConfig) {
    return dashboardApiClient.patch(`${this.url}/${payload.get('id')}`, payload, config);
  }
}

export const eventsApi = new DashboardAuthApi('/events');
