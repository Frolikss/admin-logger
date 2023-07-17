import { InternalAxiosRequestConfig } from 'axios';

import { TokenNames } from '@shared/constants';

export const requestConfig = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(TokenNames.ACCESS_TOKEN)}`;
  return config;
};
