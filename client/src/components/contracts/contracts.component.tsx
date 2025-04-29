import { useContracts, useDeleteFacility } from '@api';
import { ADD_BTN_SX, fakeContractData, getContractColumns } from './contracts.constants';
import { PARAMS } from '@constants';
import { Box } from '@mui/material';
import { GridPaginationModel } from '@mui/x-data-grid';
import { FC, useState, useMemo } from 'react';
import { DataGrid } from '@components/data-grid';
import { useModalControls } from '@hooks';
import { Button } from '@components/button';
import { IContract } from '@@types';
import { Dialog } from '@components/dialog';
import { AddContractModal } from './modals/add-contract-modal';
import { EditContractModal } from './modals/edit-contract-modal';

export const Contracts: FC = () => {
  const addModalControls = useModalControls();
  const editModalControls = useModalControls();
  const deleteDialogControls = useModalControls();

  const [contract, setContract] = useState<IContract | null>(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PARAMS.PAGE_SIZE,
  });

  const { data, isLoading, isRefetching } = useContracts({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  const { mutate: deleteFacility } = useDeleteFacility();

  const isLoad = isLoading || isRefetching;

  const handleEdit = (id: number) => {
    if (!data?.items) {
      return;
    }

    const contractFound = data.items.find((item) => item.id === id);

    if (!contractFound) {
      return;
    }

    setContract(contractFound);

    editModalControls.handleOpen();
  };

  const handleModalEditClose = () => {
    setContract(null);

    editModalControls.handleClose();
  };

  const declineDelete = () => {
    setContract(null);

    deleteDialogControls.handleClose();
  };

  const okDelete = () => {
    if (!contract) {
      return;
    }

    deleteFacility(contract.id, {
      onSuccess: () => {
        setContract(null);

        deleteDialogControls.handleClose();
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!data?.items) {
      return;
    }

    const contractFound = data.items.find((item) => item.id === id);

    if (!contractFound) {
      return;
    }

    setContract(contractFound);

    deleteDialogControls.handleOpen();
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

      <Button onClick={addModalControls.handleOpen} text="Добавить" sx={ADD_BTN_SX} />

      <AddContractModal onClose={addModalControls.handleClose} isOpen={addModalControls.open} />

      <Dialog
        onOk={okDelete}
        onDecline={declineDelete}
        open={deleteDialogControls.open}
        onClose={deleteDialogControls.handleClose}
        title="Удаление контракта"
        text="Вы действительно хотите удалить контракт?"
      />

      {contract && (
        <EditContractModal
          isOpen={editModalControls.open}
          onClose={handleModalEditClose}
          item={contract}
        />
      )}
    </Box>
  );
};
