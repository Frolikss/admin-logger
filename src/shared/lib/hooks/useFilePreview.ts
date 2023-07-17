import { useEffect, useState } from 'react';

export const useFilePreview = (file?: FileList) => {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (file && file[0]) {
      const newUrl = URL.createObjectURL(file[0]);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    }
  }, [file]);

  return [imgSrc];
};
