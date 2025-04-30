import { FC, useState, useMemo } from 'react';

import { Box } from '@mui/material';
import { GridPaginationModel } from '@mui/x-data-grid';

import { ILicensee } from '@@types';
import { useDeleteLicensee, useLicensees } from '@api';
import { Button, DataGrid, Dialog } from '@components';
import { PARAMS } from '@constants';
import { useModalControls } from '@hooks';

import { ADD_BTN_SX, fakeLicenseeData, getLicenseeColumns } from './licensees.constants';
import { AddLicenseeModal } from './modals/add-licensee-modal';
import { EditLicenseeModal } from './modals/edit-licensee-modal';


export const Licensees: FC = () => {
  const addModalControls = useModalControls();
  const editModalControls = useModalControls();
  const deleteDialogControls = useModalControls();

  const [licensee, setLicensee] = useState<ILicensee | null>(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PARAMS.PAGE_SIZE,
  });

  const { mutate: deleteLicensee } = useDeleteLicensee();

  const { data, isLoading, isRefetching } = useLicensees({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  const isLoad = isLoading || isRefetching;

  const handleEdit = (id: number) => {
    if (!data?.items) {
      return;
    }

    const licenseeFound = data.items.find((item) => item.id === id);

    if (!licenseeFound) {
      return;
    }

    setLicensee(licenseeFound);

    editModalControls.handleOpen();
  };

  const handleModalEditClose = () => {
    setLicensee(null);

    editModalControls.handleClose();
  };

  const declineDelete = () => {
    setLicensee(null);

    deleteDialogControls.handleClose();
  };

  const okDelete = () => {
    if (!licensee) {
      return;
    }

    deleteLicensee(licensee.id, {
      onSuccess: () => {
        setLicensee(null);

        deleteDialogControls.handleClose();
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!data?.items) {
      return;
    }

    const licenseeFound = data.items.find((item) => item.id === id);

    if (!licenseeFound) {
      return;
    }

    setLicensee(licenseeFound);

    deleteDialogControls.handleOpen();
  };

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const columns = useMemo(() => getLicenseeColumns(isLoad, handleEdit, handleDelete), [isLoad]);

  return (
    <Box display="flex" flexDirection="column">
      <DataGrid
        loading={isLoad}
        disableRowSelectionOnClick
        columns={columns}
        rows={isLoad ? fakeLicenseeData : data?.items}
        rowCount={data?.total}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        keepNonExistentRowsSelected
        disableVirtualization
      />

      <Button onClick={addModalControls.handleOpen} text="Добавить" sx={ADD_BTN_SX} />

      <AddLicenseeModal onClose={addModalControls.handleClose} isOpen={addModalControls.open} />

      <Dialog
        onOk={okDelete}
        onDecline={declineDelete}
        open={deleteDialogControls.open}
        onClose={deleteDialogControls.handleClose}
        title="Удаление лицензиата"
        text="Вы действительно хотите удалить лицензиата?"
      />

      {licensee && (
        <EditLicenseeModal
          isOpen={editModalControls.open}
          onClose={handleModalEditClose}
          item={licensee}
        />
      )}
    </Box>
  );
};
