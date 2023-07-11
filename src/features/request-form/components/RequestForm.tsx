import moment from 'moment';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Select from 'react-select';

import { AppRoutes } from '@shared/constants';

import { Button } from '@shared/components/button';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { REQUEST_OPTIONS } from '@features/request-form/constants/fields-content';
import { RequestFieldsValues } from '@features/request-form/types/field.interfaces';

import { getRequestAsync, selectSelectedRequest, updateRequestAsync } from '@widgets/requests-list';

export const RequestForm = () => {
  const selectedRequest = useAppSelector(selectSelectedRequest);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitSuccessful }
  } = useForm<RequestFieldsValues>();

  const onSubmit: SubmitHandler<RequestFieldsValues> = ({ status }) => {
    dispatch(updateRequestAsync({ requestId: selectedRequest?.id ?? '', status }));
  };

  useEffect(() => {
    dispatch(getRequestAsync(searchParams?.get('id') ?? ''));
  }, []);

  useEffect(() => {
    reset({ status: selectedRequest?.status ?? '' });
  }, [selectedRequest]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      navigate(AppRoutes.REQUESTS);
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="flex flex-col gap-4 justify-between flex-0 w-full bg-white shadow-sm rounded-md p-4 text-lg">
      <h3 className="text-center font-semibold text-xl">Update Request</h3>
      <p className="underline">
        Author: {selectedRequest?.user.firstName}. {selectedRequest?.user.lastName}
      </p>
      <p>Email: {selectedRequest?.user.email}</p>
      <div className="flex gap-8 items-center justify-between">
        <div className="flex flex-col flex-1 justify-center items-center gap-2 rounded-md p-2 bg-green-200">
          <p>Start Date: </p>
          <p className="font-bold">{moment(selectedRequest?.startDate).format('DD.MM.YYYY')}</p>
        </div>
        <span>-</span>
        <div className="flex flex-col flex-1 justify-center items-center gap-2 rounded-md p-2 bg-red-200">
          <p>End Date: </p>
          <p className="font-bold">{moment(selectedRequest?.endDate).format('DD.MM.YYYY')}</p>
        </div>
      </div>
      <p>Status: {selectedRequest?.status}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex gap-2">
        <Controller
          name="status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              className="flex-1 [&>*:last-child]:h-full outline-violet-600"
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  height: '100%',
                  borderRadius: '6px'
                })
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#7c3aed',
                  primary: '#7c3aed'
                }
              })}
              options={REQUEST_OPTIONS}
              value={REQUEST_OPTIONS.find((option) => option.value === value)}
              onChange={(option) => onChange(option?.value ?? '')}
              required={true}
            />
          )}
          rules={{ required: true }}
        />
        <Button className="flex-1 w-full">Submit</Button>
      </form>
    </div>
  );
};
