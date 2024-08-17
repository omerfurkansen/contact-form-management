'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  ButtonGroup,
  Avatar,
} from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { useAppStore } from '../../lib/zustand/provider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StyledTableContainer, HeaderCell, BodyCellWithWidth, BodyCell, BodyTableRow } from '../styled';
import UsersTableSkeleton from './UsersTableSkeleton';
import { useTranslations } from 'next-intl';

export default function UsersTable() {
  const t = useTranslations('UsersTable');
  const router = useRouter();
  const { users, getAllUsers } = useAppStore((store) => store);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditDetails = (messageId: number) => {
    router.push(`/users/${messageId}`);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      await getAllUsers();
      setIsLoading(false);
    };

    fetchMessages();
  }, [getAllUsers]);

  const headerLabels = [t('photo'), t('username'), t('edit')];

  return (
    <StyledTableContainer>
      <Table aria-label="Users table" stickyHeader>
        <TableHead>
          <TableRow>
            {headerLabels.map((label) => (
              <HeaderCell key={label}>{label}</HeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <UsersTableSkeleton />
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                {t('noUsers')}
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <BodyTableRow key={user.id}>
                <BodyCellWithWidth
                  content={
                    <Avatar src={user.base64Photo} alt={user.username} sx={{ bgcolor: 'primary.contrastText' }} />
                  }
                  width={100}
                />
                <BodyCellWithWidth content={user.username} width={200} />
                <BodyCell align="right">
                  <ButtonGroup>
                    <Tooltip title={t('editUserDetails')}>
                      <IconButton
                        sx={{ '&:hover': { color: 'primary.main' } }}
                        onClick={() => handleEditDetails(user.id)}
                      >
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                  </ButtonGroup>
                </BodyCell>
              </BodyTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
