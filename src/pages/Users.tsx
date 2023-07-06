import { useEffect, useState } from 'react';

import { User } from '@shared/types';

import { Button } from '@shared/components/button';

import { UserModal } from '@widgets/user-modal';
import { UsersList } from '@widgets/users-list';

import { ReactComponent as AddIcon } from '@svg/add.svg';

export const Users = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Partial<User>>();

  const onAddUserClick = () => setIsOpened(true);

  useEffect(() => {
    if (selectedUser) {
      setIsOpened(true);
    }
  }, [selectedUser]);

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={onAddUserClick}>
        <AddIcon className="w-10" />
      </Button>
      <UsersList setSelectedUser={setSelectedUser} />
      <UserModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};
