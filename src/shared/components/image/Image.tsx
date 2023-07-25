import { FC } from 'react';

interface Props {
  fetchImageSrc?: string;
  uploadImageSrc?: string;
}

export const Image: FC<Props> = ({ uploadImageSrc, fetchImageSrc }) => {
  return (
    <img
      src={fetchImageSrc ? `${process.env.REACT_APP_USERS_IMAGES}${fetchImageSrc}` : uploadImageSrc}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = `${process.env.REACT_APP_ADMIN_IMAGES}${fetchImageSrc}`;
      }}
      alt="img"
      className="text-center object-contain"
    />
  );
};
