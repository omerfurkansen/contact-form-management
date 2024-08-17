import UsersTable from '@/src/components/UsersTable';
import { Container, Toolbar, Typography } from '@mui/material';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import AddButton from '@/src/components/UsersTable/AddButton';

export const metadata: Metadata = {
  title: 'Users',
};

export default function UsersPage() {
  const t = useTranslations('Users');
  return (
    <Container sx={{ height: 'var(--content-height)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
        <Typography variant="h4" py={3}>
          {t('title')}
        </Typography>
        <AddButton label={t('addUser')} />
      </Toolbar>
      <UsersTable />
    </Container>
  );
}
