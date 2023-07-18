import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { TokenNames } from '../constants';

export const responseConfig = (response: AxiosResponse) => {
  if (response.data?.accessToken) {
    localStorage.setItem(TokenNames.ACCESS_TOKEN, response.data?.accessToken);
  }
  return response;
};

export const responseErrorHandling = (error: AxiosError) => {
  const err = error as AxiosError;
  if (err.response?.status === 401) {
    localStorage.removeItem(TokenNames.ACCESS_TOKEN);
    return Promise.reject('Please log in first');
  }
  toast.error(error.response?.statusText);
  return Promise.reject(error.response?.statusText);
};
