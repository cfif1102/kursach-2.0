import { ChangeEvent, FC, useMemo, useState } from 'react';

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { GridPaginationModel } from '@mui/x-data-grid';

import { IEquipment } from '@@types';
import { useEquipmentsSearch } from '@api';
import { DataGrid } from '@components';
import { PARAMS } from '@constants';
import { useDebounce } from '@hooks';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { getEquipmentsColumns } from './equipments-search.constants';
import { EquipmentsSearchProps } from './equipments-search.types';

export const EquipmentsSearch: FC<EquipmentsSearchProps> = ({ onChange }) => {
  const [search, setSearch] = useState('');
  const searchDebounced = useDebounce(search, PARAMS.DEBOUNCE_TIME);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PARAMS.PAGE_SIZE,
  });

  const { data, isLoading, isError, isRefetching } = useEquipmentsSearch({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    name: searchDebounced,
  });

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelect = (equipment: IEquipment) => {
    onChange(equipment);
  };

  const isLoad = isLoading || isRefetching;

  const columns = useMemo(() => getEquipmentsColumns(isLoad, handleSelect), [isLoad]);

  const handleFlushSearch = () => {
    setSearch('');
  };

  if (isError) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        label="Название оборудования"
        size="small"
        sx={{ mb: 2, background: 'white' }}
        onChange={handleSearchChange}
        value={search}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleFlushSearch}>
                  <CloseOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <DataGrid
        loading={isLoad}
        disableRowSelectionOnClick
        columns={columns}
        rows={data?.items}
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
