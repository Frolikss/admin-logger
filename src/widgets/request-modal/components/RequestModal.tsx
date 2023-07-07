import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';

import { Button, ButtonVariants } from '@shared/components/button';
import { Modal } from '@shared/components/modal';
import { useAppDispatch } from '@shared/lib';

import { REQUEST_OPTIONS } from '@widgets/request-modal/constants/fields-content';
import { RequestFieldsValues } from '@widgets/request-modal/types/field.interfaces';
import { Request } from '@widgets/requests-list';
import {
  getRequestsAsync,
  updateRequestAsync
} from '@widgets/requests-list/model/requests/actions';

interface Props {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  selectedRequest?: Request;
  setSelectedRequest: Dispatch<SetStateAction<Request | undefined>>;
}

export const RequestModal: FC<Props> = ({
  isOpened,
  setIsOpened,
  selectedRequest,
  setSelectedRequest
}) => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<RequestFieldsValues>();

  const onCloseModal = () => {
    setSelectedRequest(undefined);
    dispatch(getRequestsAsync());
    setIsOpened(false);
  };

  const onSubmit: SubmitHandler<RequestFieldsValues> = ({ status }) => {
    dispatch(updateRequestAsync({ requestId: selectedRequest?.id ?? '', status })).then(() => {
      onCloseModal();
    });
  };

  useEffect(() => {
    reset({ status: selectedRequest?.status });
  }, [selectedRequest]);

  return (
    <Modal header="Request" isOpened={isOpened} onCloseModal={onCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              options={REQUEST_OPTIONS}
              value={REQUEST_OPTIONS.find((option) => option.value === value)}
              onChange={(option) => onChange(option?.value ?? '')}
              required={true}
            />
          )}
          rules={{ required: true }}
        />
        <Button variant={ButtonVariants.UTILITY} className="flex-1 w-full">
          Submit
        </Button>
      </form>
    </Modal>
  );
};
