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
  Typography,
  TableSortLabel,
  Button,
} from '@mui/material';
import { VisibilityOutlined, DeleteOutline } from '@mui/icons-material';
import { useAppStore } from '../../lib/zustand/provider';
import { useCallback, useEffect, useRef, useState } from 'react';
import { USER_ROLE } from '../../lib/constants';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '../../context/SnackbarContext';
import { useTranslations, useFormatter } from 'next-intl';
import MessagesTableSkeleton from './MessagesTableSkeleton';
import { StatusChip } from './styled';
import {
  StyledTableContainer,
  HeaderCell,
  BodyCellWithWidth,
  BodyCell,
  BodyTableRow,
  StyledTablePagination,
  StyledTableButtons,
} from '../styled';
import { GetAllMessagesParams } from '@/src/lib/types';
import { getSortField } from '@/src/lib/helper';

export default function MessagesTable() {
  const format = useFormatter();
  const t = useTranslations('MessagesTable');
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const { messages, getAllMessages, user, deleteMessageById, messagesMeta } = useAppStore((store) => store);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<{
    page: GetAllMessagesParams['page'];
    pageSize: GetAllMessagesParams['pageSize'];
  }>({ page: 0, pageSize: 10 });
  const [sort, setSort] = useState<{
    sortField: GetAllMessagesParams['sortField'];
    sortOrder: GetAllMessagesParams['sortOrder'];
  }>({ sortField: 'creationDate', sortOrder: 'desc' });

  const tableRef = useRef<HTMLTableElement>(null);
  const [isInfiniteScroll, setInfiniteScroll] = useState(false);
  const [infiniteScrollMessages, setInfiniteScrollMessages] = useState<typeof messages>([]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value, 10) as GetAllMessagesParams['pageSize'];
    setPagination((prev) => ({ ...prev, pageSize: newPageSize }));
  };

  const handleSort = (sortField: string) => {
    if (isInfiniteScroll) {
      setInfiniteScrollMessages([]);
      setPagination((prev) => ({ ...prev, page: 0 }));
    }
    const newSortField = getSortField(sortField, t);
    setSort((prev) => ({
      sortField: newSortField,
      sortOrder: prev.sortField === newSortField && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSortIcon = (sortField: string) => {
    const newSortField = getSortField(sortField, t);
    if (sort.sortField === newSortField) {
      return sort.sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      return undefined;
    }
  };

  const handleViewDetails = (messageId: number) => {
    router.push(`/messages/${messageId}`);
  };

  const handleDelete = async (messageId: number) => {
    const error = await deleteMessageById(messageId);
    if (error) {
      showSnackbar(error, 'error');
    } else {
      showSnackbar(t('messageRemoveSuccess'), 'success');
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { messages } = await getAllMessages({
        page: pagination.page + 1,
        pageSize: pagination.pageSize,
        sortField: sort.sortField,
        sortOrder: sort.sortOrder,
      });
      if (isInfiniteScroll) {
        setInfiniteScrollMessages((prev) => [...prev, ...messages]);
      } else {
        setInfiniteScrollMessages([]);
      }
      setIsLoading(false);
    };

    fetchMessages();
  }, [getAllMessages, pagination, sort, isInfiniteScroll]);

  const headerLabels = [t('name'), t('message'), t('gender'), t('country'), t('status'), t('received'), t('actions')];
  const sortLabels = [t('name'), t('gender'), t('country'), t('received')];
  const rowsPerPageOptions = [5, 10, 20, 100];

  const handleScroll = useCallback(() => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        if (infiniteScrollMessages.length < messagesMeta.totalMessages) {
          const isInitial = pagination.page === 0;
          setPagination((prev) => ({ ...prev, page: isInitial ? 1 : prev.page + 1 }));
        }
      }
    }
  }, [pagination, infiniteScrollMessages, messagesMeta]);

  const toggleInfiniteScroll = () => {
    setPagination((prev) => ({ ...prev, page: 0, pageSize: 10 }));
    setInfiniteScroll((prev) => !prev);
  };

  useEffect(() => {
    const localRef = tableRef;

    if (isInfiniteScroll) {
      localRef.current?.addEventListener('scroll', handleScroll);
    }
    return () => {
      localRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [isInfiniteScroll, handleScroll]);

  return (
    <>
      <StyledTableContainer ref={tableRef}>
        <Table aria-label="Messages table" stickyHeader>
          <TableHead>
            <TableRow>
              {headerLabels.map((label) => (
                <HeaderCell key={label} sortDirection={sort.sortField === label ? sort.sortOrder : false}>
                  {sortLabels.includes(label) ? (
                    <TableSortLabel
                      active={sort.sortField === getSortField(label, t)}
                      direction={handleSortIcon(label)}
                      onClick={() => handleSort(label)}
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </HeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <MessagesTableSkeleton />
            ) : messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {t('noMessages')}
                </TableCell>
              </TableRow>
            ) : (
              (isInfiniteScroll ? [...infiniteScrollMessages] : [...messages]).map((message) => (
                <BodyTableRow key={message.id}>
                  <BodyCellWithWidth content={message.name} width={150} />
                  <BodyCellWithWidth content={message.message} width={200} />
                  <BodyCellWithWidth content={message.gender === 'male' ? t('male') : t('female')} width={100} />
                  <BodyCellWithWidth content={message.country} width={150} />
                  <BodyCellWithWidth
                    content={<StatusChip read={message.read} labels={{ read: t('read'), unread: t('unread') }} />}
                    width={110}
                  />
                  <BodyCellWithWidth
                    content={
                      <Tooltip
                        title={format.dateTime(new Date(message.creationDate), {
                          dateStyle: 'medium',
                          timeStyle: 'medium',
                        })}
                      >
                        <Typography variant="caption">{format.relativeTime(new Date(message.creationDate))}</Typography>
                      </Tooltip>
                    }
                    width={100}
                  />
                  <BodyCell align="right">
                    <ButtonGroup>
                      <Tooltip title={t('viewDetails')}>
                        <IconButton
                          sx={{ '&:hover': { color: 'primary.main' } }}
                          onClick={() => handleViewDetails(message.id)}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                      </Tooltip>
                      {user?.role === USER_ROLE.ADMIN && (
                        <Tooltip title={t('delete')}>
                          <IconButton
                            sx={{ '&:hover': { color: 'error.main' } }}
                            onClick={() => handleDelete(message.id)}
                          >
                            <DeleteOutline />
                          </IconButton>
                        </Tooltip>
                      )}
                    </ButtonGroup>
                  </BodyCell>
                </BodyTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <StyledTableButtons>
        <Button onClick={toggleInfiniteScroll} sx={{ width: { xs: '160px', sm: 'auto' } }}>
          {isInfiniteScroll ? t('disableInfiniteScroll') : t('enableInfiniteScroll')}
        </Button>
        {!isInfiniteScroll && (
          <StyledTablePagination
            component="div"
            rowsPerPageOptions={rowsPerPageOptions}
            count={messagesMeta.totalMessages}
            rowsPerPage={pagination.pageSize}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t('rowsPerPage')}
            labelDisplayedRows={({ from, to, count }) => t('displayedRows', { from, to, count })}
          />
        )}
      </StyledTableButtons>
    </>
  );
}
