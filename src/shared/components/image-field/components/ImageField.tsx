import cn from 'classnames';
import { Button, ButtonVariants, Input } from 'logger-components';
import { FC, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { FieldContent } from '@shared/types';

import { Image } from '@shared/components/image';
import { useFilePreview } from '@shared/lib';

import { ReactComponent as AvatarIcon } from '@svg/add-image.svg';
import { ReactComponent as DeleteIcon } from '@svg/add.svg';
import { ReactComponent as AddIcon } from '@svg/upload.svg';

interface Props {
  selectedItem?: string;
  existingFormData?: FormData;
  fieldContent: FieldContent;
  submitCallback: (formData: FormData) => void;
}

export const ImageField: FC<Props> = ({
  selectedItem,
  fieldContent,
  submitCallback,
  existingFormData
}) => {
  const { register, watch, handleSubmit } = useForm<FieldValues>();

  const formData = existingFormData ?? new FormData();

  const [searchParams] = useSearchParams();

  const image: FileList = watch(fieldContent.name);
  const [imageSrc] = useFilePreview(image);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const entityId = searchParams.get('id');

    formData.append(fieldContent.name, data[fieldContent.name][0] ?? false);

    if (!existingFormData || !entityId) return;

    formData.append('id', entityId ?? '');

    await submitCallback(formData);

    formData.delete(fieldContent.name);
    formData.delete('id');
  };

  const onDeleteImageClick = () => {
    if (formData.has(fieldContent.name)) {
      formData.set(fieldContent.name, '');
    } else {
      formData.append(fieldContent.name, '');
    }

    if (searchParams.has('id')) {
      formData.append('id', searchParams.get('id') ?? '');
      submitCallback(formData);
    }
  };

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  return (
    <form className="flex relative items-center justify-center mb-2">
      <label className="relative self-center cursor-pointer flex border-1 group w-32 h-32 rounded-full overflow-hidden bg-utility-500">
        <Input
          {...register(fieldContent.name, {
            validate: { lessThan3MB: (files) => files[0]?.size < 3500000 || 'Max 3.5MB' }
          })}
          {...fieldContent}
          className="hidden"
        />
        <div
          className={cn(
            'w-full h-full cursor-pointer transition-all bg-utility-200 hover:bg-utility-400 flex items-center justify-center absolute left-0 top-0 z-20 mx-auto w-10 opacity-0',
            { 'opacity-100': !imageSrc }
          )}>
          <AvatarIcon
            className={cn('z-20 w-12', {
              hidden: (image && image.length !== 0) || (selectedItem && searchParams.has('id'))
            })}
          />
        </div>
        {((image && image.length !== 0) || selectedItem) && (
          <>
            <Image
              uploadImageSrc={searchParams.has('id') ? undefined : imageSrc}
              fetchImageSrc={selectedItem}
            />
            <AddIcon className="w-12 h-12 p-2 bg-white rounded-full shadow-md absolute duration-700 translate-y-10 group-hover:translate-y-0 transition-all pointer-events-none m-auto left-0 right-0 top-0 bottom-0 z-40 opacity-0 group-hover:opacity-100" />
          </>
        )}
      </label>
      {selectedItem && (
        <Button
          variant={ButtonVariants.UTILITY}
          className="!rounded-full flex-0 hover:bg-secondary-300 absolute top-0 left-[55%] z-50"
          onClick={onDeleteImageClick}
          type="button">
          <DeleteIcon className="w-4 h-4 rotate-45" />
        </Button>
      )}
    </form>
  );
};
