import { User } from '@shared/types';

export interface AuthState {
  isLoading: boolean;
  isAuthorized: boolean;
  currentUser?: User;
}
