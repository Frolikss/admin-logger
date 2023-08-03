import cn from 'classnames';
import { Button, ButtonVariants, Input } from 'logger-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { StatusNames } from '@shared/constants';

import { ImageLabel } from '@shared/components/image-label';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { selectSelectedUser } from '@features/login-form';
import { UserFieldsNames } from '@features/user-form/constants/fields-names';
import { setFormData } from '@features/user-form/lib/helpers/getFormData';
import { useUserForm } from '@features/user-form/lib/hooks/useUserForm';

import { suspendUserAsync, updateUserAsync } from '@widgets/users-list';

import { USER_FIELDS_CONTENT } from '../constants/field-content';
import { UserFieldValues } from '../types/fields.interfaces';

export const UserForm = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const selectedUser = useAppSelector(selectSelectedUser);
  const userIsActive = selectedUser?.status === StatusNames.ACTIVE;

  const {
    register,
    reset,
    watch,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful }
  } = useForm<UserFieldValues>({
    defaultValues: {
      phone: '+380'
    }
  });

  const isAvatar = (name: string) => name === UserFieldsNames.AVATAR;

  const image: FileList = watch([UserFieldsNames.AVATAR])[0];

  const onSubmit: SubmitHandler<UserFieldValues> = (data) => {
    const formData = new FormData();
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

    dispatch(updateUserAsync(formData));
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

  useUserForm(isSubmitSuccessful, reset, selectedUser);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-white flex flex-wrap justify-center w-2/3 gap-2 rounded-md shadow-sm flex-0">
      {USER_FIELDS_CONTENT.map(({ name, options, label, ...props }) => (
        <div
          key={name}
          className={cn('flex flex-1 flex-col basis-1/3 gap-1', { 'basis-full': isAvatar(name) })}>
          <label
            htmlFor={name}
            className={cn('flex items-baseline gap-2', {
              'relative self-center cursor-pointer flex border-1 group w-32 h-32 rounded-full overflow-hidden bg-utility-500':
                isAvatar(name)
            })}>
            {label}
            <ImageLabel
              isImage={name === UserFieldsNames.AVATAR}
              image={image}
              selectedItem={selectedUser?.avatar}
            />
            <span className="text-secondary-600 pl-2 text-xs"> {errors[name]?.message}</span>
          </label>
          <Input
            id={name}
            {...register(name, options)}
            {...props}
            className={cn({
              'border-secondary-600': errors[name],
              hidden: isAvatar(name)
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
  );
};
