import { TableCell, TableRow, Skeleton } from '@mui/material';

const UsersTableSkeleton = () => (
  <TableRow>
    <TableCell sx={{ width: 100 }}>
      <Skeleton variant="circular" height={40} width={40} />
    </TableCell>
    <TableCell sx={{ width: 200 }}>
      <Skeleton variant="text" width={100} height={25} />
    </TableCell>
    <TableCell align="right">
      <Skeleton variant="circular" height={40} width={40} sx={{ marginLeft: 'auto' }} />
    </TableCell>
  </TableRow>
);

export default UsersTableSkeleton;
