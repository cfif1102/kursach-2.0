import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { SxProps } from '@mui/material';
import { GridColDef, GridRowParams, GridActionsCellItem } from '@mui/x-data-grid';

import { IFacility } from '@@types';
import { CellLoader, FILLED_BUTTON_SX } from '@components';
import { PARAMS } from '@constants';

export const ADD_BTN_SX: SxProps = {
  ...FILLED_BUTTON_SX,
  mt: 2,
};

export const getFacilityColumns = (
  isLoading: boolean,
  editCb: (id: number) => void,
  deleteCb: (id: number) => void,
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
    field: 'customer',
    headerName: 'Заказчик',
    editable: false,
    flex: 2,
    disableColumnMenu: true,
    renderCell: (params) => (isLoading ? <CellLoader /> : params.row.customer.name),
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: '',
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Редактировать"
        onClick={() => editCb(Number(params.id))}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Удалить"
        onClick={() => deleteCb(Number(params.id))}
      />,
    ],
  },
];

export const fakeFacilitiesData = Array(PARAMS.PAGE_SIZE)
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
