'use client';

import { FormikErrors } from 'formik';

const useImageHandler = ({
  maxSize = 150,
  setFieldValue,
}: {
  maxSize?: number;
  setFieldValue: (field: string, value: string) => Promise<void> | Promise<FormikErrors<{ base64Photo: string }>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    let file = null;

    if ('files' in event.target && event.target.files?.length) {
      file = event.target.files[0];
    } else if ('dataTransfer' in event && event.dataTransfer.files.length) {
      file = event.dataTransfer.files[0];
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx?.drawImage(img, 0, 0, width, height);
          const resizedBase64 = canvas.toDataURL('image/png');
          setFieldValue('base64Photo', resizedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return { handleImageChange };
};

export default useImageHandler;
