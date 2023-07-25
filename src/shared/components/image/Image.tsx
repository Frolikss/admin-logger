import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props {
  fetchImageSrc?: string;
  uploadImageSrc?: string;
}

export const Image: FC<Props> = ({ uploadImageSrc, fetchImageSrc }) => {
  const [searchParams] = useSearchParams();

  if (!searchParams.has('id')) return null;
  return (
    <img
      src={
        !uploadImageSrc ? `${process.env.REACT_APP_USERS_IMAGES}${fetchImageSrc}` : uploadImageSrc
      }
      alt="img"
      className="text-center object-contain mx-auto"
    />
  );
};
