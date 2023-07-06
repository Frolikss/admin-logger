export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: string;
  createdAt: string;
  balance: Balance;
}

export interface UserData {
  count: number;
  users: User[];
}

interface Balance {
  [key: string]: number;
  overtime: number;
  sick_leave: number;
  vacation: number;
}
