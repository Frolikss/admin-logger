import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as LoadingIcon } from '@svg/loading.svg';

interface Props {
  fetchImageSrc?: string;
  uploadImageSrc?: string;
}

export const Image: FC<Props> = ({ uploadImageSrc, fetchImageSrc }) => {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const onFinishLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (fetchImageSrc || uploadImageSrc) {
      setIsLoading(true);
    }
  }, [fetchImageSrc, uploadImageSrc]);

  if (!searchParams.has('id') && !uploadImageSrc) return null;
  return (
    <>
      {isLoading && (
        <LoadingIcon className="absolute w-12 h-12 top-0 left-0 right-0 bottom-0 z-40" />
      )}
      <img
        src={
          !uploadImageSrc ? `${process.env.REACT_APP_ADMIN_IMAGES}${fetchImageSrc}` : uploadImageSrc
        }
        alt="img"
        className={cn('object-scale-down w-full h-full self-center z-30', { hidden: isLoading })}
        onLoad={onFinishLoading}
      />
    </>
  );
};
