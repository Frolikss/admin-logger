import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props {
  fetchImageSrc?: string;
  uploadImageSrc?: string;
}

export const Image: FC<Props> = ({ uploadImageSrc, fetchImageSrc }) => {
  const [searchParams] = useSearchParams();

  if (!searchParams.has('id') && !uploadImageSrc) return null;
  return (
    <img
      src={
        !uploadImageSrc ? `${process.env.REACT_APP_ADMIN_IMAGES}${fetchImageSrc}` : uploadImageSrc
      }
      alt="img"
      className="object-contain self-center z-30"
    />
  );
};
