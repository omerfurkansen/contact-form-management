import { StyledContainer } from '../styled';
import { Skeleton } from '@mui/material';

const UserDetailSkeleton = () => (
  <StyledContainer>
    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: '5px' }} />
    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: '5px' }} />
    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: '5px' }} />
    <Skeleton variant="rectangular" height={110} sx={{ borderRadius: '5px' }} />
    <Skeleton variant="rectangular" height={40} sx={{ borderRadius: '5px' }} />
  </StyledContainer>
);

export default UserDetailSkeleton;
