'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '../../lib/zustand/provider';
import { useSnackbar } from '../../context/SnackbarContext';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { StyledContainer, StyledToolbar, GenderTextField, DetailTextField } from '../styled';
import MessageDetailSkeleton from './MessageDetailSkeleton';

export default function MessageDetail({ id }: { id: number }) {
  const t = useTranslations('MessageDetail');
  const router = useRouter();
  const { selectedMessage, getMessageById, readMessageById } = useAppStore((store) => store);
  const { showSnackbar } = useSnackbar();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      const fetchedMessage = await getMessageById(id);
      if (!fetchedMessage) {
        showSnackbar(t('messageNotFound'), 'error');
        router.push('/messages');
        return;
      }
      if (fetchedMessage?.read === 'false') {
        const error = await readMessageById(id);

        if (error) {
          showSnackbar(error, 'error');
        } else {
          showSnackbar(t('markedAsRead'), 'success');
        }
      }
      setLoading(false);
    };

    fetchMessage();
  }, [getMessageById, id, readMessageById, router, showSnackbar, t]);

  return (
    <>
      <StyledToolbar disableGutters>
        <Button
          onClick={() => router.push('/messages')}
          startIcon={<ArrowBack />}
          sx={{ '&:hover': { backgroundColor: 'transparent' } }}
        >
          {t('backToList')}
        </Button>
        <Typography variant="h5">{t('title')}</Typography>
      </StyledToolbar>
      {isLoading ? (
        <MessageDetailSkeleton />
      ) : (
        <StyledContainer>
          <DetailTextField label={t('name')} value={selectedMessage?.name} />
          <DetailTextField
            label={t('gender')}
            startAdornment={
              selectedMessage?.gender && (
                <GenderTextField gender={selectedMessage?.gender} label={{ male: t('male'), female: t('female') }} />
              )
            }
          />
          <DetailTextField label={t('country')} value={selectedMessage?.country} />
          <DetailTextField label={t('message')} value={selectedMessage?.message} withTextArea />
        </StyledContainer>
      )}
    </>
  );
}
