import { TableCell, TableRow, Skeleton } from '@mui/material';

const MessagesTableSkeleton = () => (
  <TableRow>
    <TableCell sx={{ width: 150 }}>
      <Skeleton variant="text" width={120} height={25} />
    </TableCell>
    <TableCell sx={{ width: 200 }}>
      <Skeleton variant="text" width={170} height={25} />
    </TableCell>
    <TableCell sx={{ width: 100 }}>
      <Skeleton variant="text" width={80} height={25} />
    </TableCell>
    <TableCell sx={{ width: 150 }}>
      <Skeleton variant="text" width={130} height={25} />
    </TableCell>
    <TableCell sx={{ width: 110 }}>
      <Skeleton variant="text" width={110} height={25} />
    </TableCell>
    <TableCell sx={{ width: 100 }}>
      <Skeleton variant="text" width={100} height={25} />
    </TableCell>
    <TableCell align="right">
      <Skeleton variant="circular" height={40} width={40} sx={{ marginLeft: 'auto' }} />
    </TableCell>
  </TableRow>
);

export default MessagesTableSkeleton;
