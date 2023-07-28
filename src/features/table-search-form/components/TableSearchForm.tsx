import cn from 'classnames';
import { FC, Fragment, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { FieldContent } from '@shared/types';

import { Button, ButtonVariants } from '@shared/components/button';
import { Input } from '@shared/components/input';
import { Modal } from '@shared/components/modal';

import { ReactComponent as SearchIcon } from '@svg/search.svg';

interface Props {
  fields: FieldContent[];
  onSubmit: SubmitHandler<FieldValues>;
}

export const TableSearchForm: FC<Props> = ({ fields, onSubmit }) => {
  const { register, handleSubmit } = useForm<FieldValues>();

  const [searchIsOpened, setSearchIsOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onSearchClick = () => setSearchIsOpened((prev) => !prev);
  const onCloseModal = () => setSearchIsOpened(false);

  return (
    <>
      <Button
        ref={buttonRef}
        variant={ButtonVariants.UTILITY}
        onClick={onSearchClick}
        className={cn('self-start', { 'bg-blue-600': searchIsOpened })}>
        <SearchIcon className={cn('w-4 h-4', { 'fill-white': searchIsOpened })} />
      </Button>
      <Modal
        header="Search"
        isOpened={searchIsOpened}
        buttonRef={buttonRef}
        onCloseModal={onCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {fields.map(({ name, options, label, ...props }) => (
            <Fragment key={name}>
              <label htmlFor={name}>{label}</label>
              <Input {...register(name, options)} {...props} />
            </Fragment>
          ))}
          <Button>Search</Button>
        </form>
      </Modal>
    </>
  );
};
