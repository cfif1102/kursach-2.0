import { ChangeEvent, FC, useMemo, useState } from 'react';
import { CustomerSearchProps } from './customers-search.types';
import { useDebounce } from '@hooks';
import { MODAL_STYLES, PARAMS } from '@constants';
import { useCustomersSearch } from '@api';
import { GridPaginationModel } from '@mui/x-data-grid';
import { Box, Modal, TextField } from '@mui/material';
import { DataGrid } from '@components/data-grid';
import { getCustomerColumns } from './customers-search.constants';
import { ICustomer } from '@@types';

export const CustomersSearch: FC<CustomerSearchProps> = ({ open, onClose, onChange }) => {
  const [search, setSearch] = useState('');
  const searchDebounced = useDebounce(search, PARAMS.DEBOUNCE_TIME);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PARAMS.PAGE_SIZE,
  });

  const { data, isLoading, isError, isRefetching } = useCustomersSearch({
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

  const handleSelect = (customer: ICustomer) => {
    onChange(customer);
    onClose();
  };

  const isLoad = isLoading || isRefetching;

  const columns = useMemo(() => getCustomerColumns(isLoad, handleSelect), [isLoad]);

  if (isError) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box display="flex" flexDirection="column" sx={{ ...MODAL_STYLES, width: '800px' }}>
        <TextField
          label="Название заказчика"
          size="small"
          sx={{ mb: 2 }}
          onChange={handleSearchChange}
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
    </Modal>
  );
};
