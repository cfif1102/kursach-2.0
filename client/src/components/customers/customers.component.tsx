import { useCustomers, useDeleteCustomer } from '@api';
import { PARAMS } from '@constants';
import { FC, useMemo, useState } from 'react';
import { GridPaginationModel } from '@mui/x-data-grid';
import { ADD_BTN_SX, fakeCustomerData, getEquipmentColumns } from './customers.constants';
import { Box } from '@mui/material';
import { DataGrid } from '@components/data-grid';
import { useModalControls } from '@hooks';
import { Button } from '@components/button';
import { ICustomer } from '@@types';
import { AddCustomerModal } from './modals/add-customer-modal';
import { Dialog } from '@components/dialog';
import { EditCustomerModal } from './modals/edit-customer-modal';

export const Customers: FC = () => {
  const addModalControls = useModalControls();
  const editModalControls = useModalControls();
  const deleteDialogControls = useModalControls();

  const [customer, setCustomer] = useState<ICustomer | null>(null);

  const { mutate: deleteCustomer } = useDeleteCustomer();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PARAMS.PAGE_SIZE,
  });

  const { data, isLoading, isRefetching } = useCustomers({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  const isLoad = isLoading || isRefetching;

  const handleEdit = (id: number) => {
    if (!data?.items) {
      return;
    }

    const customerFound = data.items.find((item) => item.id === id);

    if (!customerFound) {
      return;
    }

    setCustomer(customerFound);

    editModalControls.handleOpen();
  };

  const handleModalEditClose = () => {
    setCustomer(null);

    editModalControls.handleClose();
  };

  const declineDelete = () => {
    setCustomer(null);

    deleteDialogControls.handleClose();
  };

  const okDelete = () => {
    if (!customer) {
      return;
    }

    deleteCustomer(customer.id, {
      onSuccess: () => {
        setCustomer(null);

        deleteDialogControls.handleClose();
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!data?.items) {
      return;
    }

    const customerFound = data.items.find((item) => item.id === id);

    if (!customerFound) {
      return;
    }

    setCustomer(customerFound);

    deleteDialogControls.handleOpen();
  };

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const columns = useMemo(() => getEquipmentColumns(isLoad, handleEdit, handleDelete), [isLoad]);

  return (
    <Box display="flex" flexDirection="column">
      <DataGrid
        loading={isLoad}
        disableRowSelectionOnClick
        columns={columns}
        rows={isLoad ? fakeCustomerData : data?.items}
        rowCount={data?.total}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        keepNonExistentRowsSelected
        disableVirtualization
      />

      <Button onClick={addModalControls.handleOpen} text="Добавить" sx={ADD_BTN_SX} />

      <AddCustomerModal isOpen={addModalControls.open} onClose={addModalControls.handleClose} />

      <Dialog
        onOk={okDelete}
        onDecline={declineDelete}
        open={deleteDialogControls.open}
        onClose={deleteDialogControls.handleClose}
        title="Удаление заказчика"
        text="Вы действительно хотите удалить заказчика?"
      />

      {customer && (
        <EditCustomerModal
          isOpen={editModalControls.open}
          onClose={handleModalEditClose}
          item={customer}
        />
      )}
    </Box>
  );
};
