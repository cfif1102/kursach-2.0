import { FC } from 'react';

import { Box, Modal, TextField } from '@mui/material';

import { useUpdateEquipment } from '@api';
import { Button, FILLED_BUTTON_SX } from '@components';
import { MODAL_STYLES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { EditEquipmentProps } from './edit-equipment-modal.types';
import { EditEquipmentFormData, EditEquipmentSchema } from './edit-equipment-modal.validation';


export const EditEquipmentModal: FC<EditEquipmentProps> = ({ isOpen, onClose, item }) => {
  const { mutate: updateEquipment } = useUpdateEquipment();

  const { control, handleSubmit } = useForm<EditEquipmentFormData>({
    resolver: yupResolver(EditEquipmentSchema),
    defaultValues: {
      name: item.name,
    },
  });

  const onSubmit = (data: EditEquipmentFormData) => {
    updateEquipment(
      { id: item.id, data },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box display="flex" flexDirection="column" sx={MODAL_STYLES}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Название оборудования"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{
                    width: 300,
                  }}
                  size="small"
                />
              )}
            />

            <Button text="Сохранить" type="submit" sx={{ ...FILLED_BUTTON_SX, mt: 2 }} />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
