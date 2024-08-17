import MessagesTable from '@/src/components/MessagesTable';
import { Typography, Container } from '@mui/material';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Messages',
};

export default function MessagesPage() {
  const t = useTranslations('Messages');
  return (
    <Container sx={{ height: 'var(--content-height)' }}>
      <Typography variant="h4" py={3}>
        {t('title')}
      </Typography>
      <MessagesTable />
    </Container>
  );
}
