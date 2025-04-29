import { useContracts } from '@api';
import { PARAMS } from '@constants';
import { FC, useMemo, useState } from 'react';
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import { fakeContractData, getContractColumns } from './contracts.constants';
import { Box } from '@mui/material';

export const Contracts: FC = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PARAMS.PAGE_SIZE,
  });

  const { data, isLoading, isRefetching } = useContracts({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  const isLoad = isLoading || isRefetching;

  const handleEdit = (id: number) => {
    console.log(id);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const columns = useMemo(() => getContractColumns(isLoad, handleEdit, handleDelete), [isLoad]);

  return (
    <Box display="flex" flexDirection="column">
      <DataGrid
        loading={isLoad}
        disableRowSelectionOnClick
        columns={columns}
        rows={isLoad ? fakeContractData : data?.items}
        rowCount={data?.total}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        keepNonExistentRowsSelected
        disableVirtualization
      />
    </Box>
  );
};
