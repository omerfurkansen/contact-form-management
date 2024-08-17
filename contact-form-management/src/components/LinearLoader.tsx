'use client';

import { styled } from '@mui/material/styles';
import { LinearProgress } from '@mui/material';

const LinearLoader = styled(LinearProgress)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
});

export default LinearLoader;
