import { UsersList } from '@widgets/users-list';

export const Users = () => {
  return (
    <div className="flex shadow-dashboard flex-col gap-2">
      <UsersList />
    </div>
  );
};
