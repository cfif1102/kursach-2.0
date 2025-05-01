import { SxProps } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { IFacility } from '@@types';
import { Button, CellLoader, FILLED_BUTTON_SX } from '@components';
import { COLORS, PARAMS } from '@constants';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export const ADD_BTN_SX: SxProps = {
  ...FILLED_BUTTON_SX,
  mt: 2,
};

export const getFacilityColumns = (
  isLoading: boolean,
  onSelectCb: (facility: IFacility) => void,
): GridColDef<IFacility>[] => [
  {
    field: 'id',
    headerName: 'Код',
    editable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params) => (isLoading ? <CellLoader /> : params.value),
  },
  {
    field: 'name',
    headerName: 'Название',
    editable: false,
    flex: 2,
    disableColumnMenu: true,
    renderCell: (params) => (isLoading ? <CellLoader /> : params.value),
  },
  {
    field: 'address',
    headerName: 'Адрес',
    editable: false,
    flex: 2,
    disableColumnMenu: true,
    renderCell: (params) => (isLoading ? <CellLoader /> : params.value),
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: '',
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Button
        text="Выбрать"
        icon={<CheckOutlinedIcon />}
        onClick={() => onSelectCb(params.row)}
        variant="outlined"
        sx={{
          color: COLORS.TEXT_COLOR,
          borderColor: COLORS.TEXT_COLOR,
          textTransform: 'unset',
        }}
      />
    ),
  },
];

export const fakeFacilityData = Array(PARAMS.PAGE_SIZE)
  .fill({})
  .map((_, index) => ({
    id: index,
    name: '',
    address: '',
    customer: {
      id: index,
      name: '',
    },
  }));
