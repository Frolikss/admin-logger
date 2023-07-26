import cn from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Image } from '@shared/components/image';
import { useFilePreview } from '@shared/lib';

import { ReactComponent as AvatarIcon } from '@svg/add-image.svg';

interface Props {
  isImage: boolean;
  image?: FileList;
  selectedItem?: string;
}

export const ImageLabel: FC<Props> = ({ isImage, image, selectedItem }) => {
  const [searchParams] = useSearchParams();
  const [imageSrc] = useFilePreview(image);

  if (!isImage) return null;
  return (
    <>
      <div
        className={cn(
          'w-full h-full cursor-pointer transition-all hover:bg-gray-200 flex items-center justify-center absolute left-0 top-0 z-20 mx-auto w-10 opacity-0 group-hover:opacity-100',
          { 'opacity-100': !imageSrc }
        )}>
        <AvatarIcon
          className={cn('z-20 w-12 group-hover:opacity-100', {
            'opacity-0': selectedItem && searchParams.has('id')
          })}
        />
      </div>
      {((image && image.length !== 0) || selectedItem) && (
        <Image uploadImageSrc={imageSrc} fetchImageSrc={selectedItem} />
      )}
    </>
  );
};
