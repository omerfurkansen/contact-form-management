import UserDetail from '@/src/components/UserDetail';
import { Container } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Detail',
};

type UserDetailPageProps = {
  params: {
    id: number | 'new';
  };
};

export default function MessageDetailPage({ params }: UserDetailPageProps) {
  return (
    <Container sx={{ height: 'var(--content-height)' }} maxWidth="sm">
      <UserDetail id={params.id} />
    </Container>
  );
}
