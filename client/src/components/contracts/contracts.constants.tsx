import { PARAMS } from '@constants';
import { GridColDef, GridRowParams, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IContract } from '@@types';
import { CellLoader } from '@components/cell-loader';
import { FILLED_BUTTON_SX } from '@components/button/button.constants';
import { SxProps } from '@mui/material';

export const ADD_BTN_SX: SxProps = {
  ...FILLED_BUTTON_SX,
  mt: 2,
};

export const getContractColumns = (
  isLoading: boolean,
  editCb: (id: number) => void,
  deleteCb: (id: number) => void,
): GridColDef<IContract>[] => [
  {
    field: 'id',
    headerName: 'Код',
    editable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params) => (isLoading ? <CellLoader /> : params.value),
  },
  {
    field: 'contractNumber',
    headerName: 'Номер',
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

export const fakeContractData = Array(PARAMS.PAGE_SIZE)
  .fill({})
  .map((_, index) => ({
    id: index,
    contractNumber: '',
    customer: {
      id: index,
      name: '',
    },
  }));
