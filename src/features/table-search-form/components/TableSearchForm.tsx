import { Button, ButtonVariants, Input } from 'logger-components';
import { FC, Fragment } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { FieldContent } from '@shared/types';

import { ReactComponent as SearchIcon } from '@svg/search.svg';

interface Props {
  fields: FieldContent[];
  onSubmit: SubmitHandler<FieldValues>;
}

export const TableSearchForm: FC<Props> = ({ fields, onSubmit }) => {
  const { register, handleSubmit } = useForm<FieldValues>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 justify-between self-start items-center w-full pb-4">
      {fields.map(({ name, options, label, ...props }) => (
        <Fragment key={name}>
          <label htmlFor={name}>{label}</label>
          <Input {...register(name, options)} {...props} className="p-1" />
        </Fragment>
      ))}
      <Button variant={ButtonVariants.UTILITY} className="bg-sky-800 self-stretch">
        <SearchIcon className="w-4 h-4 fill-white" />
      </Button>
    </form>
  );
};
