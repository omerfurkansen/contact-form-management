'use client';

import { useRouter } from 'next/navigation';
import { VpnKey, Home } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Wrapper, GoToHomepageButton } from './styled';

export default function NotAuthorized() {
  const t = useTranslations('NotAuthorized');
  const router = useRouter();

  const handleGoToHomepage = () => {
    router.push('/');
  };

  return (
    <Wrapper>
      <VpnKey fontSize="large" />
      <Typography variant="h5">{t('title')}</Typography>
      <Typography variant="subtitle1">{t('message')}</Typography>
      <GoToHomepageButton startIcon={<Home />} color="primary" onClick={handleGoToHomepage}>
        {t('backToHome')}
      </GoToHomepageButton>
    </Wrapper>
  );
}
