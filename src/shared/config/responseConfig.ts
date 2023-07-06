import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { TokenNames } from '../constants';

export const responseConfig = (response: AxiosResponse) => {
  if (response.data?.accessToken) {
    localStorage.setItem(TokenNames.ACCESS_TOKEN, response.data?.accessToken);
  }

  if (response.status === 200) {
    toast.success('Operation successful', { toastId: 'success' });
  }

  return response;
};

export const responseErrorHandling = (error: AxiosError) => {
  if (error?.status === 401) {
    const authToken = localStorage.getItem(TokenNames.ACCESS_TOKEN);
    toast.error(authToken ? 'Token Expired' : 'Please log in first');
    return Promise.reject(authToken ? 'Token Expired' : 'Please log in first');
  }
  toast.error(error.response?.statusText);
  return Promise.reject(error.response?.statusText);
};
