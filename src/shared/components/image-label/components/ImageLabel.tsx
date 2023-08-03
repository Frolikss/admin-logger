import cn from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Image } from '@shared/components/image';
import { useFilePreview } from '@shared/lib';

import { ReactComponent as AvatarIcon } from '@svg/add-image.svg';
import { ReactComponent as AddIcon } from '@svg/add.svg';

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
          'w-full h-full cursor-pointer transition-all bg-utility-200 hover:bg-utility-400 flex items-center justify-center absolute left-0 top-0 z-20 mx-auto w-10 opacity-0',
          { 'opacity-100': !imageSrc }
        )}>
        <AvatarIcon
          className={cn('z-20 w-12', {
            hidden: selectedItem && searchParams.has('id')
          })}
        />
      </div>
      {((image && image.length !== 0) || selectedItem) && (
        <>
          <Image uploadImageSrc={imageSrc} fetchImageSrc={selectedItem} />
          <AddIcon className="w-12 h-12 absolute duration-700 translate-y-full group-hover:translate-y-0 transition-all pointer-events-none m-auto left-0 right-0 top-0 bottom-0 z-40 opacity-0 group-hover:opacity-100" />
        </>
      )}
    </>
  );
};
