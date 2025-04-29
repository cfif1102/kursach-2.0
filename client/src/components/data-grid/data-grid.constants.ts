import { COLORS } from '@constants';
import { SxProps } from '@mui/material';

export const DATA_GRID_SX: SxProps = {
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: COLORS.MAIN_BG,
    color: 'white',
  },

  '& .MuiDataGrid-columnHeader': {
    backgroundColor: COLORS.MAIN_BG,
    color: 'white',
  },

  '& .MuiDataGrid-iconButtonContainer button': {
    color: 'white',
  },

  '& .MuiDataGrid-iconButtonContainer svg': {
    color: 'white',
  },
};
