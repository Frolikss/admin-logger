import moment from 'moment';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { User } from '@shared/types';

import { Button, ButtonVariants } from '@shared/components/button';
import { Input } from '@shared/components/input';
import { Modal } from '@shared/components/modal';
import { useAppDispatch } from '@shared/lib';

import { UserFieldsNames } from '@widgets/user-modal/constants/fields-names';
import { createUserAsync, getUsersAsync, updateUserAsync } from '@widgets/users-list';

import { USER_FIELDS_CONTENT, initialValue } from '../constants/field-content';
import { UserFieldValues } from '../types/fields.interfaces';

interface Props {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  selectedUser: Partial<User> | undefined;
  setSelectedUser: Dispatch<SetStateAction<Partial<User> | undefined>>;
}

export const UserModal: FC<Props> = ({ isOpened, setIsOpened, selectedUser, setSelectedUser }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<UserFieldValues>();

  const onSubmit: SubmitHandler<UserFieldValues> = (data) => {
    const formData = new FormData();
    const avatar = data.avatar[0];

    if (avatar && avatar?.type !== 'application/png' && avatar?.type !== 'application/jpeg') {
      setError('avatar', {
        type: 'filetype',
        message: 'Only PNGs and JPEGs are valid.'
      });
      return null;
    }

    formData.append(UserFieldsNames.SURNAME, data.surname);
    formData.append(UserFieldsNames.EMAIL, data.email);
    avatar && formData.append(UserFieldsNames.AVATAR, avatar);
    formData.append(UserFieldsNames.PHONE, data.phone);
    formData.append(UserFieldsNames.LASTNAME, data.lastName);
    formData.append(UserFieldsNames.FIRSTNAME, data.firstName);
    formData.append(UserFieldsNames.BIRTHDAY, data.birthday);
    selectedUser?.id && formData.append('id', selectedUser?.id);

    if (selectedUser) {
      dispatch(updateUserAsync(formData));
    } else {
      dispatch(createUserAsync(formData));
    }
  };

  const onCloseModal = () => {
    setSelectedUser(undefined);
    dispatch(getUsersAsync());
    reset(initialValue);
    setIsOpened(false);
  };

  useEffect(() => {
    if (selectedUser) {
      const date = moment(selectedUser.birthday).format('YYYY-MM-DD');

      reset({
        birthday: date,
        ...selectedUser
      } as Omit<User, 'avatar'>);
    }
  }, [selectedUser]);

  return (
    <Modal header="Add new user" isOpened={isOpened} onCloseModal={onCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {USER_FIELDS_CONTENT.map(({ name, options, label, ...props }) => (
          <div key={name} className="flex flex-col gap-2">
            <label htmlFor={name}>{label}</label>
            <Input {...register(name, options)} {...props} />
            <p>{errors[name]?.message}</p>
          </div>
        ))}
        <Button variant={ButtonVariants.UTILITY} onClick={onCloseModal}>
          Create new user
        </Button>
      </form>
    </Modal>
  );
};
