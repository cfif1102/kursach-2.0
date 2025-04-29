import { useFacilities } from '@api';
import { fakeFacilitiesData, getFacilityColumns } from './facilities.constants';
import { PARAMS } from '@constants';
import { Box } from '@mui/material';
import { GridPaginationModel, DataGrid } from '@mui/x-data-grid';
import { FC, useState, useMemo } from 'react';

export const Facilities: FC = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PARAMS.PAGE_SIZE,
  });

  const { data, isLoading, isRefetching } = useFacilities({
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

  const columns = useMemo(() => getFacilityColumns(isLoad, handleEdit, handleDelete), [isLoad]);

  return (
    <Box display="flex" flexDirection="column">
      <DataGrid
        loading={isLoad}
        disableRowSelectionOnClick
        columns={columns}
        rows={isLoad ? fakeFacilitiesData : data?.items}
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
