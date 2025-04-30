import { FC, useState, useMemo } from 'react';

import { Box } from '@mui/material';
import { GridPaginationModel } from '@mui/x-data-grid';

import { IFacility } from '@@types';
import { useDeleteFacility, useFacilities } from '@api';
import { Button, DataGrid, Dialog } from '@components';
import { PARAMS } from '@constants';
import { useModalControls } from '@hooks';

import { ADD_BTN_SX, fakeFacilitiesData, getFacilityColumns } from './facilities.constants';
import { AddFacilityModal } from './modals/add-facility-modal';
import { EditFacilityModal } from './modals/edit-facility-modal';


export const Facilities: FC = () => {
  const addModalControls = useModalControls();
  const editModalControls = useModalControls();
  const deleteDialogControls = useModalControls();

  const [facility, setFacility] = useState<IFacility | null>(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PARAMS.PAGE_SIZE,
  });

  const { data, isLoading, isRefetching } = useFacilities({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  const { mutate: deleteFacility } = useDeleteFacility();

  const isLoad = isLoading || isRefetching;

  const handleEdit = (id: number) => {
    if (!data?.items) {
      return;
    }

    const facilityFound = data.items.find((item) => item.id === id);

    if (!facilityFound) {
      return;
    }

    setFacility(facilityFound);

    editModalControls.handleOpen();
  };

  const handleModalEditClose = () => {
    setFacility(null);

    editModalControls.handleClose();
  };

  const declineDelete = () => {
    setFacility(null);

    deleteDialogControls.handleClose();
  };

  const okDelete = () => {
    if (!facility) {
      return;
    }

    deleteFacility(facility.id, {
      onSuccess: () => {
        setFacility(null);

        deleteDialogControls.handleClose();
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!data?.items) {
      return;
    }

    const facilityFound = data.items.find((item) => item.id === id);

    if (!facilityFound) {
      return;
    }

    setFacility(facilityFound);

    deleteDialogControls.handleOpen();
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

      <Button onClick={addModalControls.handleOpen} text="Добавить" sx={ADD_BTN_SX} />

      <AddFacilityModal onClose={addModalControls.handleClose} isOpen={addModalControls.open} />

      <Dialog
        onOk={okDelete}
        onDecline={declineDelete}
        open={deleteDialogControls.open}
        onClose={deleteDialogControls.handleClose}
        title="Удаление объекта"
        text="Вы действительно хотите удалить объект?"
      />

      {facility && (
        <EditFacilityModal
          isOpen={editModalControls.open}
          onClose={handleModalEditClose}
          item={facility}
        />
      )}
    </Box>
  );
};
