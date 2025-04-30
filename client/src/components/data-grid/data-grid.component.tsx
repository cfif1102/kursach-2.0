import { FC } from 'react';

import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';

import { DATA_GRID_SX } from './data-grid.constants';
import { DataGridProps } from './data-grid.types';

export const DataGrid: FC<DataGridProps> = (props) => {
  return <MuiDataGrid {...props} sx={DATA_GRID_SX} />;
};
