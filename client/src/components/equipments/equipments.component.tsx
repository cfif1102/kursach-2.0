import { useDeleteEquipment, useEquipments } from '@api';
import { PARAMS } from '@constants';
import { FC, useMemo, useState } from 'react';
import { GridPaginationModel } from '@mui/x-data-grid';
import { ADD_BTN_SX, fakeEquipmentsData, getEquipmentColumns } from './equipments.constants';
import { Box } from '@mui/material';
import { useModalControls } from '@hooks';
import { AddEquipmentModal } from './modals/add-equipment-modal';
import { Button } from '@components/button';
import { DataGrid } from '@components/data-grid';
import { IEquipment } from '@@types';
import { EditEquipmentModal } from './modals/edit-equipment-modal';
import { Dialog } from '@components/dialog';

export const Equipments: FC = () => {
  const addModalControls = useModalControls();
  const editModalControls = useModalControls();
  const deleteDialogControls = useModalControls();

  const [equipment, setEquipment] = useState<IEquipment | null>(null);

  const { mutate: deleteEquipment } = useDeleteEquipment();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PARAMS.PAGE_SIZE,
  });

  const { data, isLoading, isRefetching } = useEquipments({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  const isLoad = isLoading || isRefetching;

  const handleEdit = (id: number) => {
    if (!data?.items) {
      return;
    }

    const equipmentFound = data.items.find((item) => item.id === id);

    if (!equipmentFound) {
      return;
    }

    setEquipment(equipmentFound);

    editModalControls.handleOpen();
  };

  const handleModalEditClose = () => {
    setEquipment(null);

    editModalControls.handleClose();
  };

  const declineDelete = () => {
    setEquipment(null);

    deleteDialogControls.handleClose();
  };

  const okDelete = () => {
    if (!equipment) {
      return;
    }

    deleteEquipment(equipment.id, {
      onSuccess: () => {
        setEquipment(null);

        deleteDialogControls.handleClose();
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!data?.items) {
      return;
    }

    const equipmentFound = data.items.find((item) => item.id === id);

    if (!equipmentFound) {
      return;
    }

    setEquipment(equipmentFound);

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
        rows={isLoad ? fakeEquipmentsData : data?.items}
        rowCount={data?.total}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        keepNonExistentRowsSelected
        disableVirtualization
      />

      <Button onClick={addModalControls.handleOpen} text="Добавить" sx={ADD_BTN_SX} />

      <AddEquipmentModal isOpen={addModalControls.open} onClose={addModalControls.handleClose} />

      <Dialog
        onOk={okDelete}
        onDecline={declineDelete}
        open={deleteDialogControls.open}
        onClose={deleteDialogControls.handleClose}
        title="Удаление оборудования"
        text="Вы действительно хотите удалить оборудование?"
      />

      {equipment && (
        <EditEquipmentModal
          isOpen={editModalControls.open}
          onClose={handleModalEditClose}
          item={equipment}
        />
      )}
    </Box>
  );
};
