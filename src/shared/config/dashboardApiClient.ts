import axios from 'axios';

import { requestConfig, responseConfig, responseErrorHandling } from './';

export const dashboardApiClient = axios.create({
  withCredentials: true,
  baseURL: 'http://49.12.205.35:9000/api'
});

dashboardApiClient.interceptors.request.use(requestConfig);
dashboardApiClient.interceptors.response.use(responseConfig, responseErrorHandling);
