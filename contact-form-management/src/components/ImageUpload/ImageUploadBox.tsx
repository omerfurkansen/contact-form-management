'use client';

import { Box, Avatar, Button, Typography, SpeedDial, SpeedDialAction } from '@mui/material';
import { PhotoCamera, CloudUpload, Delete } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { FormikErrors } from 'formik';

const ImageUploadBox = ({
  base64Photo,
  setFieldValue,
  handleImageChange,
}: {
  base64Photo: string;
  setFieldValue: (field: string, value: string) => Promise<void> | Promise<FormikErrors<{ base64Photo: string }>>;
  handleImageChange: (event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const t = useTranslations('ImageUpload');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imageActions = [
    { icon: <CloudUpload />, name: t('reupload') },
    { icon: <Delete />, name: t('remove') },
  ];

  const handleSpeedDialAction = async (action: string) => {
    if (action === t('reupload')) {
      setFieldValue('base64Photo', '').then(() => fileInputRef.current?.click());
    } else {
      setFieldValue('base64Photo', '');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 110,
        width: '100%',
        border: base64Photo
          ? '1px solid rgba(var(--palette-common-onBackgroundChannel) / 0.23)'
          : '1px dashed rgba(var(--palette-common-onBackgroundChannel) / 0.23)',
        borderRadius: '5px',
        boxSizing: 'border-box',

        // position: 'relative',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: 110,
        // width: '100%',
        // border: '1px solid rgba(var(--palette-common-onBackgroundChannel) / 0.23)',
        // borderRadius: '5px',
        // boxSizing: 'border-box',

        // border: '1px dashed rgba(var(--palette-common-onBackgroundChannel) / 0.23)',
        // borderRadius: '5px',
        // padding: '20px',
        // textAlign: 'center',
        // cursor: 'pointer',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // height: 110,
        // boxSizing: 'border-box',
        // borderColor:
        //   touched.base64Photo && errors.base64Photo
        //     ? 'var(--palette-error-main)'
        //     : 'rgba(var(--palette-common-onBackgroundChannel) / 0.23)',
      }}
      onDrop={base64Photo ? undefined : handleImageChange}
      onDragOver={base64Photo ? undefined : (event) => event.preventDefault()}
    >
      {base64Photo ? (
        <>
          <Avatar src={base64Photo} sx={{ width: 80, height: 80 }} />
          <SpeedDial
            ariaLabel="Image Actions"
            icon={<PhotoCamera />}
            sx={{ position: 'absolute', bottom: 0, right: 8 }}
            FabProps={{ size: 'small' }}
            direction="left"
          >
            {imageActions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleSpeedDialAction(action.name)}
              />
            ))}
          </SpeedDial>
        </>
      ) : (
        <>
          <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
            {t('uploadPhoto')}
            <input type="file" accept="image/*" hidden onChange={handleImageChange} ref={fileInputRef} />
          </Button>
          <Typography
            variant="body2"
            sx={{ mt: 1, color: 'var(--palette-text-secondary)', textAlign: 'center', px: 2 }}
          >
            {t('dragAndDrop')}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ImageUploadBox;
