import { FC } from 'react';

import { Box, Skeleton } from '@mui/material';

export const CellLoader: FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Skeleton variant="text" height="15px" width="100%" />
    </Box>
  );
};
