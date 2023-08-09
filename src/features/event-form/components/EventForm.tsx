import { Button, Input } from 'logger-components';
import moment from 'moment';
import { FC, Fragment, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ImageField } from '@shared/components/image-field';
import { WysiwygEditor } from '@shared/components/wysiwyg-editor';
import { useAppDispatch } from '@shared/lib';

import { EventFields } from '@features/event-form';

import {
  createEventAsync,
  getEventAsync,
  updateEventAsync
} from '@widgets/events-list/model/actions';
import { EventItem } from '@widgets/events-list/types/events.interfaces';

import { EVENT_FIELDS_CONTENT, EventFieldNames } from '../constants/fields-content';

interface Props {
  selectedEvent?: EventItem;
}

const IMAGE_FIELD_CONTENT = {
  name: EventFieldNames.BANNER,
  component: Input,
  accept: 'image/png, image/jpeg',
  type: 'file'
};

export const EventForm: FC<Props> = ({ selectedEvent }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors }
  } = useForm<EventFields>({ defaultValues: {} });

  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const formData = new FormData();

  const watchStartDate = watch(EventFieldNames.START_DATE);
  const watchEndDate = watch(EventFieldNames.END_DATE);

  const onEventSubmit: SubmitHandler<EventFields> = ({
    startDate,
    endDate,
    name,
    banner,
    description
  }) => {
    const bannerImg = banner && banner[0];

    const start = moment.utc(startDate);
    const end = moment.utc(endDate);

    if (bannerImg && bannerImg?.type !== 'image/png' && bannerImg?.type !== 'image/jpeg') {
      return null;
    }

    if (start.valueOf() > end.valueOf()) {
      toast.warning('End date can`t be smaller than Start date');
      return null;
    }

    if (bannerImg) {
      formData.append(EventFieldNames.BANNER, bannerImg);
    }

    formData.append(EventFieldNames.NAME, name);
    formData.append(EventFieldNames.DESCRIPTION, description ?? '');
    formData.append(EventFieldNames.START_DATE, `${moment.utc(startDate).valueOf()}`);
    formData.append(EventFieldNames.END_DATE, `${moment.utc(endDate).valueOf()}`);

    if (searchParams.has('id')) {
      formData.append('id', selectedEvent?.id ?? '');
      dispatch(updateEventAsync(formData));
    } else {
      dispatch(createEventAsync(formData));
    }
  };

  const submitCallback = async (formData: FormData) => {
    await dispatch(updateEventAsync(formData));
    await dispatch(getEventAsync(searchParams.get('id') ?? ''));
  };

  useEffect(() => {
    if (selectedEvent && searchParams.has('id')) {
      const startDate = moment(selectedEvent.startDate).format('YYYY-MM-DD');
      const endDate = moment(selectedEvent.endDate).format('YYYY-MM-DD');
      const { banner: _, startDate: __, endDate: ___, ...rest } = selectedEvent;
      reset({ startDate, endDate, ...rest });
    }
  }, [selectedEvent]);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      dispatch(getEventAsync(id));
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <ImageField
        existingFormData={formData}
        selectedItem={selectedEvent?.banner}
        fieldContent={IMAGE_FIELD_CONTENT}
        submitCallback={submitCallback}
      />
      <form onSubmit={handleSubmit(onEventSubmit)} className="flex flex-col gap-4">
        {EVENT_FIELDS_CONTENT.map(({ name, options, label, component: Component, ...props }) => (
          <Fragment key={name}>
            {label && (
              <label>
                {label}
                <span className="text-secondary-600 pl-2 text-xs">{errors[name]?.message}</span>
              </label>
            )}
            <Component
              id={name}
              min={
                name === EventFieldNames.END_DATE && watchStartDate
                  ? watchStartDate
                  : moment().format('YYYY-MM-DD')
              }
              max={name === EventFieldNames.START_DATE && watchEndDate ? watchEndDate : undefined}
              {...register(name, options)}
              {...props}></Component>
          </Fragment>
        ))}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <WysiwygEditor field={field} />}
        />
        <Button className="p-2">{selectedEvent ? 'Update Event' : 'Create Event'}</Button>
      </form>
    </div>
  );
};
