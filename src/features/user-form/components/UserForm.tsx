import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { StatusNames } from '@shared/constants';

import { Button, ButtonVariants } from '@shared/components/button';
import { Image } from '@shared/components/image';
import { Input } from '@shared/components/input';
import { useAppDispatch, useAppSelector, useFilePreview } from '@shared/lib';

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
  const [imageSrc] = useFilePreview(image);

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
      className="p-4 bg-white flex flex-col gap-2 rounded-md shadow-sm flex-0 basis-2/3">
      {USER_FIELDS_CONTENT.map(({ name, options, label, ...props }) => (
        <div key={name} className="flex flex-col gap-1">
          <label
            htmlFor={name}
            className={cn('flex items-baseline gap-2', {
              'relative self-center flex group w-32 h-32 rounded-full overflow-hidden bg-gray-500':
                isAvatar(name)
            })}>
            {label}
            {isAvatar(name) && (
              <div
                className={cn(
                  'w-full h-full transition-all hover:bg-slate-200 flex items-center justify-center absolute left-0 top-0 z-10 mx-auto w-10 opacity-0 group-hover:opacity-100',
                  { 'opacity-100': !imageSrc }
                )}></div>
            )}
            {name === UserFieldsNames.AVATAR &&
            ((isAvatar(name) && image && image.length !== 0) || selectedUser?.avatar) ? (
              <Image uploadImageSrc={imageSrc} fetchImageSrc={selectedUser?.avatar} />
            ) : null}
            <span className="text-red-600 text-xs"> {errors[name]?.message}</span>
          </label>
          <Input
            id={name}
            {...register(name, options)}
            {...props}
            className={cn({ 'border-red-600': errors[name], hidden: isAvatar(name) })}></Input>
        </div>
      ))}
      <Button className="flex-1 w-full mt-2">
        {searchParams.has('id') ? 'Update User' : 'Create User'}
      </Button>
      {searchParams.has('id') && (
        <Button
          variant={ButtonVariants.SECONDARY}
          onClick={onSuspendClick}
          className="flex-1 border-red-600 w-full mt-2">
          {userIsActive ? 'Suspend' : 'Activate'}
        </Button>
      )}
    </form>
  );
};
