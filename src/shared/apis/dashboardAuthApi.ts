import { AxiosRequestConfig } from 'axios';

import { dashboardApiClient } from '@shared/config';

import { LoginFieldValues } from '@features/login-form/types/fields.interfaces';

class DashboardAuthApi {
  constructor(private readonly url: string) {
    this.url = url;
  }

  signIn(payload: LoginFieldValues, config?: AxiosRequestConfig) {
    return dashboardApiClient.post(`${this.url}/login`, payload, config);
  }

  getSelf(config?: AxiosRequestConfig) {
    return dashboardApiClient.get(`${this.url}/`, config);
  }
}

export const authApi = new DashboardAuthApi('/auth');
