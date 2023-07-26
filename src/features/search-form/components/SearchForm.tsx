import cn from 'classnames';
import { FC, Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@shared/components/button';
import { Input } from '@shared/components/input';
import { useAppDispatch } from '@shared/lib';

import { SEARCH_FIELDS_CONTENT } from '@features/search-form/constants/fields-content';
import { SearchFieldValues } from '@features/search-form/types/fields.interfaces';

import { getRequestsAsync } from '@widgets/requests-calendar/model/requests/actions';

interface Props {
  searchIsOpened: boolean;
}

export const SearchForm: FC<Props> = ({ searchIsOpened }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SearchFieldValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<SearchFieldValues> = (data) => {
    dispatch(getRequestsAsync({ limit: '10', offset: '0', ...data }));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('grid grid-rows-0 transition-all gap-2', {
        'grid-rows-auto p-4 bg-white rounded-md shadow-md': searchIsOpened
      })}>
      <div className="overflow-hidden w-full flex flex-col gap-2">
        {SEARCH_FIELDS_CONTENT.map(({ name, options, label, ...props }) => (
          <Fragment key={name}>
            <label htmlFor={name}>{label}</label>
            <Input {...register(name, options)} {...props} />
            <p className="text-red-600">{errors[name]?.message}</p>
          </Fragment>
        ))}
        <Button className="overflow-hidden">Submit</Button>
      </div>
    </form>
  );
};
