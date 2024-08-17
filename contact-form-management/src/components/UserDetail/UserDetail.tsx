'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAppStore } from '../../lib/zustand/provider';
import { Button, TextField, IconButton, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { userFormSchema } from '../../lib/utils/validationSchema';
import { useSnackbar } from '../../context/SnackbarContext';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { USER_ROLE } from '../../lib/constants';
import { StyledForm, StyledToolbar, SubmitButton } from '../styled';
import { useTranslations } from 'next-intl';
import ImageUploadBox from '../ImageUpload';
import useImageHandler from '../ImageUpload/useImageHandler';
import UserDetailSkeleton from './UserDetailSkeleton';

export default function UserDetail({ id }: { id: number | 'new' }) {
  const t = useTranslations('UserDetail');
  const isAddMode = id === 'new';
  const submitBtnText = isAddMode ? t('add') : t('update');
  const router = useRouter();
  const { selectedUser, addReaderUser, updateUserById, getUserById } = useAppStore((store) => store);
  const { showSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(selectedUser);

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, setFieldValue, initialValues, setValues } =
    useFormik({
      initialValues: {
        username: '',
        password: '',
        base64Photo: '',
        role: USER_ROLE.READER,
      },
      validationSchema: userFormSchema(
        {
          username: t('usernameRequired'),
          password: t('passwordRequired'),
          photo: t('photoRequired'),
        },
        {
          username: t('maxUsernameLength'),
          password: t('maxPasswordLength'),
        }
      ),
      onSubmit: async (values) => {
        if (isAddMode) {
          const error = await addReaderUser(values.username, values.password, values.base64Photo);
          if (error) {
            showSnackbar(error, 'error');
          } else {
            showSnackbar(t('addedSuccess', { username: values.username }), 'success');
            router.push('/users');
          }
        } else {
          const error = await updateUserById(id, values.username, values.password, values.base64Photo);
          if (error) {
            showSnackbar(error, 'error');
          } else {
            showSnackbar(t('updatedSuccess', { username: values.username }), 'success');
            router.push('/users');
          }
        }
      },
    });

  const { handleImageChange } = useImageHandler({ setFieldValue: setFieldValue });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAddMode) {
      return;
    }

    const fetchMessage = async () => {
      const user = await getUserById(+id);
      if (!user) {
        showSnackbar(t('userNotFound'), 'error');
        router.push('/users');
        return;
      }
      await setValues(user);
      setUser(user);
      setLoading(false);
    };

    fetchMessage();
  }, [getUserById, id, isAddMode, router, setValues, showSnackbar, t]);

  return (
    <>
      <StyledToolbar disableGutters>
        <Button
          onClick={() => router.push('/users')}
          startIcon={<ArrowBack />}
          sx={{ '&:hover': { backgroundColor: 'transparent' } }}
        >
          {t('backToList')}
        </Button>
        <Typography variant="h5">{submitBtnText}</Typography>
      </StyledToolbar>
      {isLoading && !isAddMode ? (
        <UserDetailSkeleton />
      ) : (
        <StyledForm onSubmit={handleSubmit} sx={{ width: '100% !important' }}>
          <TextField
            disabled={!isAddMode}
            name="username"
            label={t('username')}
            value={values.username}
            onChange={handleChange}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            autoComplete="off"
          />
          <TextField
            name="password"
            label={t('password')}
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
            autoComplete="off"
          />
          <TextField name="role" label={t('role')} value={values.role} disabled autoComplete="off" />
          <ImageUploadBox
            base64Photo={values.base64Photo}
            handleImageChange={handleImageChange}
            setFieldValue={setFieldValue}
          />
          {touched.base64Photo && errors.base64Photo && (
            <Typography color="error" variant="caption" sx={{ ml: 2, mt: -1 }}>
              {errors.base64Photo}
            </Typography>
          )}
          <SubmitButton
            isSubmitting={isSubmitting}
            label={submitBtnText}
            isDisabled={
              isSubmitting || isAddMode
                ? initialValues.username === values.username ||
                  initialValues.password === values.password ||
                  initialValues.base64Photo === values.base64Photo
                : values.password === user?.password && values.base64Photo === user?.base64Photo
            }
          />
        </StyledForm>
      )}
    </>
  );
}
