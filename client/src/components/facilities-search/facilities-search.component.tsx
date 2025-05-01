import { FC, useMemo, useState } from 'react';

import { Box, Modal } from '@mui/material';
import { GridPaginationModel } from '@mui/x-data-grid';

import { IFacility } from '@@types';
import { useFacilitiesSearch } from '@api';
import { DataGrid, SearchInput } from '@components';
import { MODAL_STYLES, PARAMS } from '@constants';
import { useDebounce } from '@hooks';

import { getFacilityColumns } from './facilities-search.constants';
import { FacilitiesSearchProps } from './facilities-search.types';

export const FacilitiesSearch: FC<FacilitiesSearchProps> = ({ open, onClose, onChange }) => {
  const [nameSearch, setNameSearch] = useState('');
  const [addressSearch, setAddressSearch] = useState('');

  const nameSearchDebounced = useDebounce(nameSearch, PARAMS.DEBOUNCE_TIME);
  const addressSearchDebounced = useDebounce(addressSearch, PARAMS.DEBOUNCE_TIME);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PARAMS.PAGE_SIZE,
  });

  const { data, isLoading, isError, isRefetching } = useFacilitiesSearch({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    name: nameSearchDebounced,
    address: addressSearchDebounced,
  });

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const handleSelect = (facility: IFacility) => {
    onChange(facility);
    onClose();
  };

  const isLoad = isLoading || isRefetching;

  const columns = useMemo(() => getFacilityColumns(isLoad, handleSelect), [isLoad]);

  if (isError) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box display="flex" flexDirection="column" sx={{ ...MODAL_STYLES, width: '800px' }}>
        <SearchInput label="Название объекта" sx={{ mb: 2 }} onChange={setNameSearch} />

        <SearchInput label="Адрес объекта" sx={{ mb: 2 }} onChange={setAddressSearch} />

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
    </Modal>
  );
};
