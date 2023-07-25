import { AxiosRequestConfig } from 'axios';

import { dashboardApiClient } from '@shared/config';

class DashboardAuthApi {
  constructor(private readonly url: string) {
    this.url = url;
  }

  getEvents(payload: string, config?: AxiosRequestConfig) {
    return dashboardApiClient.get(`${this.url}/?limit=10&offset=${payload}`, config);
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
