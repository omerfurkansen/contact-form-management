import { StyledContainer } from '../styled';
import { Skeleton } from '@mui/material';

const MessageDetailSkeleton = () => (
  <StyledContainer>
    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: '5px' }} />
    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: '5px' }} />
    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: '5px' }} />
    <Skeleton variant="rectangular" height={115} sx={{ borderRadius: '5px' }} />
  </StyledContainer>
);

export default MessageDetailSkeleton;
