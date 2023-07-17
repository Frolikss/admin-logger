import axios from 'axios';

import { requestConfig, responseConfig, responseErrorHandling } from './';

export const dashboardApiClient = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL
});

dashboardApiClient.interceptors.request.use(requestConfig);
dashboardApiClient.interceptors.response.use(responseConfig, responseErrorHandling);
