import { AxiosRequestConfig } from 'axios';

import { QueryParams } from '@shared/types';

import { dashboardApiClient } from '@shared/config';

class DashboardUsersApi {
  constructor(private readonly url: string) {
    this.url = url;
  }

  createUser(payload: FormData, config?: AxiosRequestConfig) {
    return dashboardApiClient.post(`${this.url}/create`, payload, config);
  }

  getUsers(payload?: QueryParams, config?: AxiosRequestConfig) {
    return dashboardApiClient.get(
      `${this.url}/?limit=${payload?.limit ?? 10}&offset=${payload?.offset ?? 0}`,
      config
    );
  }

  deleteUser(payload: string, config?: AxiosRequestConfig) {
    return dashboardApiClient.patch(
      `${this.url}/change-status/${payload}`,
      { status: 'inactive' },
      config
    );
  }

  updateUser(payload: FormData, config?: AxiosRequestConfig) {
    return dashboardApiClient.patch(`${this.url}/${payload.get('id')}`, payload, config);
  }
}

export const usersApi = new DashboardUsersApi('/users');
