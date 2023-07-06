import cn from 'classnames';
import { FC, Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, ButtonVariants } from '@shared/components/button';
import { Input } from '@shared/components/input';
import { useAppDispatch } from '@shared/lib';

import { SEARCH_FIELDS_CONTENT } from '@features/search-form/constants/fields-content';
import { SearchFieldValues } from '@features/search-form/types/fields.interfaces';

import { getRequestsAsync } from '@widgets/requests-list/model/requests/actions';

interface Props {
  searchIsOpened: boolean;
}

export const SearchForm: FC<Props> = ({ searchIsOpened }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SearchFieldValues>();

  const onSubmit: SubmitHandler<SearchFieldValues> = (data) => {
    dispatch(getRequestsAsync({ limit: '10', offset: '0', ...data }));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('grid grid-rows-0 transition-all gap-2', {
        'grid-rows-auto': searchIsOpened
      })}>
      <div className="overflow-hidden w-full flex flex-col gap-2">
        {SEARCH_FIELDS_CONTENT.map(({ name, options, ...props }) => (
          <Fragment key={name}>
            <Input {...register(name, options)} {...props} />
            <p>{errors[name]?.message}</p>
          </Fragment>
        ))}
        <Button className="overflow-hidden" variant={ButtonVariants.UTILITY}>
          Submit
        </Button>
      </div>
    </form>
  );
};
