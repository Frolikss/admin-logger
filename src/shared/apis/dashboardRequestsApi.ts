import { AxiosRequestConfig } from 'axios';

import { QueryParams } from '@shared/types';

import { dashboardApiClient } from '@shared/config';

import { UpdateRequest } from '@widgets/requests-list';

class DashboardRequestsApi {
  constructor(private readonly url: string) {
    this.url = url;
  }

  getRequests(payload?: QueryParams, config?: AxiosRequestConfig) {
    const searchRequests = `&email=${payload?.email ?? ''}&firstName=${
      payload?.firstName ?? ''
    }&lastName=${payload?.lastName ?? ''}&surname=${payload?.surname ?? ''}`;

    return dashboardApiClient.get(
      `${this.url}/?limit=${payload?.limit ?? 10}&offset=${payload?.offset ?? 0}${
        searchRequests ?? ''
      }`,
      config
    );
  }

  updateRequest(payload: UpdateRequest, config?: AxiosRequestConfig) {
    return dashboardApiClient.patch(`${this.url}/${payload.requestId}`, payload, config);
  }
}

export const requestsApi = new DashboardRequestsApi('/requests');
