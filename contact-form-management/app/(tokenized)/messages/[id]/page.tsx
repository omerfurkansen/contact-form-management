import MessageDetail from '@/src/components/MessageDetail';
import { Container } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Message Detail',
};

type MessageDetailPageProps = {
  params: {
    id: string;
  };
};

export default function MessageDetailPage({ params }: MessageDetailPageProps) {
  return (
    <Container sx={{ height: 'var(--content-height)' }} maxWidth="sm">
      <MessageDetail id={+params.id} />
    </Container>
  );
}
