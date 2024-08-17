import MessageForm from '@/src/components/MessageForm';
import { Typography, Container } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('MessageForm');
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
      <Typography variant="h3">{t('title')}</Typography>
      <MessageForm />
    </Container>
  );
}
