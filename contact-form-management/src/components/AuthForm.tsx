'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppStore } from '../lib/zustand/provider';
import { Button, TextField, IconButton, CircularProgress, Tooltip } from '@mui/material';
import { useFormik } from 'formik';
import { loginSchema } from '../lib/utils/validationSchema';
import { useSnackbar } from '../context/SnackbarContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { StyledForm, SubmitButton } from './styled';

export default function AuthForm() {
  const t = useTranslations('Login');
  const router = useRouter();
  const { login } = useAppStore((store) => store);
  const { showSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema({ username: t('usernameRequired'), password: t('passwordRequired') }),
    onSubmit: async (values) => {
      const error = await login(values.username, values.password);
      if (error) {
        showSnackbar(error, 'error');
      } else {
        showSnackbar(t('welcome', { name: values.username }), 'success');
        router.push('/messages');
      }
    },
  });

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextField
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
            <Tooltip title={showPassword ? t('hidePassword') : t('showPassword')}>
              <IconButton onClick={handleShowPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </Tooltip>
          ),
        }}
        autoComplete="off"
      />
      <SubmitButton
        isSubmitting={isSubmitting}
        isDisabled={isSubmitting || values.username === '' || values.password === ''}
        label={t('login')}
      />
    </StyledForm>
  );
}
