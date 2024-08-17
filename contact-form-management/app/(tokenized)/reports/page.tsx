import Reports from '@/src/components/Reports';
import { Container, Typography } from '@mui/material';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Reports',
};

export default function ReportsPage() {
  const t = useTranslations('Reports');
  return (
    <Container sx={{ height: 'var(--content-height)', overflowY: 'auto', pb: 'var(--footer-height)' }}>
      <Typography variant="h4" py={3}>
        {t('title')}
      </Typography>
      <Reports />
    </Container>
  );
}
