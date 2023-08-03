import { Button, Input } from 'logger-components';
import { Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '@shared/lib';

import { sendLoginAsync } from '@features/login-form/model/auth/actions';

import { LOGIN_FIELDS_CONTENT } from '../constants/fields-content';
import { LoginFieldValues } from '../types/fields.interfaces';

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFieldValues>();

  const onSubmit: SubmitHandler<LoginFieldValues> = async (data) => {
    dispatch(sendLoginAsync(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {LOGIN_FIELDS_CONTENT.map(({ name, options, label, ...props }) => {
        return (
          <Fragment key={name}>
            <label htmlFor={name}>{label}</label>
            <Input
              {...register(name, options)}
              {...props}
              className="flex-1 p-2 border-2 rounded-md"
            />
            <p className="text-secondary-600">{errors[name]?.message}</p>
          </Fragment>
        );
      })}
      <Button>Sign In</Button>
    </form>
  );
};
