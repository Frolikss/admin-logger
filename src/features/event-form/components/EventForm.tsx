import cn from 'classnames';
import moment from 'moment';
import { FC, Fragment, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@shared/components/button';
import { Image } from '@shared/components/image';
import { WysiwygEditor } from '@shared/components/wysiwyg-editor';
import { useFilePreview } from '@shared/lib';

import { EventFields } from '@features/event-form';

import { EventItem } from '@widgets/events-list/types/events.interfaces';

import { ReactComponent as AddIcon } from '@svg/add.svg';

import { EVENT_FIELDS_CONTENT, EventFieldNames } from '../constants/fields-content';

interface Props {
  onEventSubmit: SubmitHandler<EventFields>;
  selectedEvent?: EventItem;
}

export const EventForm: FC<Props> = ({ onEventSubmit, selectedEvent }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors }
  } = useForm<EventFields>({ defaultValues: {} });

  const [searchParams] = useSearchParams();

  const image: FileList = watch([EventFieldNames.BANNER])[0];
  const [imageSrc] = useFilePreview(image);

  const watchStartDate = watch(EventFieldNames.START_DATE);
  const watchEndDate = watch(EventFieldNames.END_DATE);

  const isBanner = (name: string) => name === EventFieldNames.BANNER;

  useEffect(() => {
    if (selectedEvent && searchParams.has('id')) {
      const startDate = moment(selectedEvent.startDate).format('YYYY-MM-DD');
      const endDate = moment(selectedEvent.endDate).format('YYYY-MM-DD');
      const { banner: _, startDate: __, endDate: ___, ...rest } = selectedEvent;
      reset({ startDate, endDate, ...rest });
    }
  }, [selectedEvent]);

  return (
    <form onSubmit={handleSubmit(onEventSubmit)} className="flex flex-col gap-2">
      {EVENT_FIELDS_CONTENT.map(({ name, options, label, component: Component, ...props }) => (
        <Fragment key={name}>
          <label
            htmlFor={name}
            className={
              isBanner(name)
                ? 'relative self-center flex group w-32 h-32 rounded-full overflow-hidden bg-gray-500'
                : ''
            }>
            {label}
            {isBanner(name) && (
              <div
                className={cn(
                  'w-full h-full transition-all hover:bg-slate-200 flex items-center justify-center absolute left-0 top-0 z-10 mx-auto w-10 opacity-0 group-hover:opacity-100',
                  { 'opacity-100': !imageSrc }
                )}>
                <AddIcon className="w-12" />
              </div>
            )}
            {isBanner(name) && image && image.length !== 0 ? (
              <Image uploadImageSrc={imageSrc} />
            ) : null}
            <span className="text-red-600 text-xs">{errors[name]?.message}</span>
            <Component
              className={isBanner(name) ? 'hidden' : ''}
              id={name}
              min={
                name === EventFieldNames.END_DATE && watchStartDate
                  ? watchStartDate
                  : moment().format('YYYY-MM-DD')
              }
              max={name === EventFieldNames.START_DATE && watchEndDate ? watchEndDate : undefined}
              {...register(name, options)}
              {...props}></Component>
          </label>
        </Fragment>
      ))}
      <Controller
        name="description"
        control={control}
        render={({ field }) => <WysiwygEditor field={field} />}
      />
      <Button className="p-2">Create Event</Button>
    </form>
  );
};
