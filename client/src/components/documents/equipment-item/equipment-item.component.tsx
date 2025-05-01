import { FC } from 'react';

import { Box, IconButton, TextField } from '@mui/material';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { EquipmentItemProps } from './equipment-item.types';

export const EquipmentItem: FC<EquipmentItemProps> = ({ name, count, onDelete, onChange, end }) => {
  return (
    <Box sx={{ mb: 2, width: '100%' }} display="flex" flexDirection="row" alignItems="center">
      <TextField
        value={name}
        label="Название"
        size="small"
        sx={{
          background: 'white',
          flexGrow: 1,
        }}
      />

      <TextField
        value={count}
        label="Количество"
        size="small"
        sx={{
          background: 'white',
          flexGrow: 1,
          ml: 2,
        }}
      />

      {end !== undefined && (
        <TextField
          value={end}
          label="Номер и срок действия"
          size="small"
          sx={{
            background: 'white',
            flexGrow: 1,
            ml: 2,
          }}
        />
      )}

      <IconButton onClick={onChange}>
        <EditOutlinedIcon />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Box>
  );
};
