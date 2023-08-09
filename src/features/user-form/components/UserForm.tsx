import cn from 'classnames';
import { Button, ButtonVariants, Input } from 'logger-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { StatusNames } from '@shared/constants';

import { ImageField } from '@shared/components/image-field';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { selectSelectedUser } from '@features/login-form';
import { UserFieldsNames } from '@features/user-form/constants/fields-names';
import { setFormData } from '@features/user-form/lib/helpers/getFormData';
import { useUserForm } from '@features/user-form/lib/hooks/useUserForm';

import {
  createUserAsync,
  getSelectedUserAsync,
  selectUsersIsLoading,
  suspendUserAsync,
  updateUserAsync
} from '@widgets/users-list';

import { ReactComponent as LoadingIcon } from '@svg/loading.svg';

import { USER_FIELDS_CONTENT } from '../constants/field-content';
import { UserFieldValues } from '../types/fields.interfaces';

const FIELD_CONTENT = {
  name: UserFieldsNames.AVATAR,
  accept: 'image/png, image/jpeg',
  label: 'Avatar',
  type: 'file'
};

export const UserForm = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const selectedUser = useAppSelector(selectSelectedUser);

  const userIsActive = selectedUser?.status === StatusNames.ACTIVE;
  const formData = new FormData();

  const isLoading = useAppSelector(selectUsersIsLoading);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<UserFieldValues>({
    defaultValues: {
      phone: '+380'
    }
  });

  const submitCallback = async (formData: FormData) => {
    await dispatch(updateUserAsync(formData));
    await dispatch(getSelectedUserAsync(searchParams.get('id') ?? ''));
  };

  const onSubmit: SubmitHandler<UserFieldValues> = (data) => {
    const avatar = data.avatar[0];

    if (avatar && avatar?.type !== 'image/png' && avatar?.type !== 'image/jpeg') {
      setError('avatar', {
        type: 'filetype',
        message: 'Only PNGs and JPEGs are valid.'
      });
      return null;
    }
    formData.append('id', searchParams?.get('id') ?? '');
    setFormData(formData, data);

    if (searchParams.has('id')) {
      dispatch(updateUserAsync(formData));
    } else {
      dispatch(createUserAsync(formData));
    }
  };

  const onSuspendClick = () => {
    if (selectedUser) {
      const { status: _, ...user } = selectedUser;
      dispatch(
        suspendUserAsync({
          status: userIsActive ? StatusNames.INACTIVE : StatusNames.ACTIVE,
          ...user
        })
      );
    }
  };

  useUserForm(reset, selectedUser);

  return (
    <div className="p-4 bg-white rounded-md shadow-sm w-2/3">
      <ImageField
        submitCallback={submitCallback}
        existingFormData={formData}
        selectedItem={selectedUser?.avatar}
        fieldContent={FIELD_CONTENT}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-wrap justify-center gap-2 flex-0">
        {isLoading && (
          <div className="w-full h-full bg-white/60 z-50 absolute top-0 left-0 flex items-center justify-center">
            <LoadingIcon />
          </div>
        )}
        {USER_FIELDS_CONTENT.map(({ name, options, label, ...props }) => (
          <div key={name} className="flex flex-1 flex-col basis-1/3 gap-1">
            {label && (
              <label htmlFor={name} className="flex items-baseline gap-2">
                {label}
                <span className="text-secondary-600 pl-2 text-xs"> {errors[name]?.message}</span>
              </label>
            )}
            <Input
              id={name}
              {...register(name, options)}
              {...props}
              className={cn({
                'border-secondary-600': errors[name]
              })}></Input>
          </div>
        ))}
        <Button className="flex-1 w-full mt-2 basis-1/2">
          {searchParams.has('id') ? 'Update User' : 'Create User'}
        </Button>
        {searchParams.has('id') && (
          <Button
            variant={ButtonVariants.SECONDARY}
            onClick={onSuspendClick}
            className="flex-1 border-secondary-600 w-full mt-2 basis-1/2">
            {userIsActive ? 'Suspend' : 'Activate'}
          </Button>
        )}
      </form>
    </div>
  );
};
