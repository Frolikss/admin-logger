import { AxiosRequestConfig } from 'axios';

import { QueryParams, User } from '@shared/types';

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
      `${this.url}/?limit=${payload?.limit ?? 10}&offset=${payload?.offset ?? 0}&search=${
        payload?.search ?? ''
      }`,
      config
    );
  }

  deleteUser(payload: User, config?: AxiosRequestConfig) {
    return dashboardApiClient.patch(
      `${this.url}/change-status/${payload.id}`,
      { status: payload.status },
      config
    );
  }

  updateUser(payload: FormData, config?: AxiosRequestConfig) {
    return dashboardApiClient.patch(`${this.url}/${payload.get('id')}`, payload, config);
  }

  getSelectedUser(payload?: string, config?: AxiosRequestConfig) {
    return dashboardApiClient.get(`${this.url}/${payload}`, config);
  }

  getCurrentUser(config?: AxiosRequestConfig) {
    return dashboardApiClient.get(`${this.url}/self`, config);
  }
}

export const usersApi = new DashboardUsersApi('/users');
