import { FC } from 'react';

import { Box, TextField } from '@mui/material';

import { Button, FacilitiesSearch, FILLED_BUTTON_SX } from '@components';
import { useModalControls } from '@hooks';

import { FacilitySelectProps } from './facility-select.types';

export const FacilitySelect: FC<FacilitySelectProps> = ({ onChange, facility, sx }) => {
  const facilityControls = useModalControls();
  const value = facility ? `${facility.name}, ${facility.address}` : '';

  return (
    <Box display="flex" flexDirection="column" sx={sx}>
      <FacilitiesSearch
        open={facilityControls.open}
        onClose={facilityControls.handleClose}
        onChange={onChange}
      />

      <TextField
        label="Объект"
        sx={{
          width: '100%',
          background: 'white',
        }}
        size="small"
        value={value}
        disabled
      />

      <Button
        text="Выбрать"
        onClick={() => facilityControls.handleOpen()}
        sx={{ ...FILLED_BUTTON_SX, mt: 2 }}
      />
    </Box>
  );
};
