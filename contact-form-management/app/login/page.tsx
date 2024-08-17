import AuthForm from '@/src/components/AuthForm';
import { Typography, Container } from '@mui/material';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  const t = useTranslations('Login');
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        gap: 3,
      }}
    >
      <Typography variant="h4" textAlign="center">
        {t('title')}
      </Typography>
      <AuthForm />
    </Container>
  );
}
