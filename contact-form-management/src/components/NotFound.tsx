'use client';

import { BrokenImage } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Wrapper } from './styled';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <Wrapper>
      <BrokenImage fontSize="large" />
      <Typography variant="h5">{t('title')}</Typography>
      <Typography variant="subtitle1">{t('message')}</Typography>
    </Wrapper>
  );
}
