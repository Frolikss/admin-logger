import { User, UserData } from '@shared/types';

export interface UsersState {
  isLoading?: boolean;
  isAuthorized: boolean;
  users?: UserData;
  selectedUser?: User;
}
