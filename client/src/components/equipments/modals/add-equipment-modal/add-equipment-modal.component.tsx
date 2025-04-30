import { FC } from 'react';

import { Box, Modal, TextField } from '@mui/material';

import { useCreateEquipment } from '@api';
import { Button, FILLED_BUTTON_SX } from '@components';
import { MODAL_STYLES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { AddEquipmentProps } from './add-equipment-modal.types';
import { AddEquipmentFormData, AddEquipmentSchema } from './add-equipment-modal.validation';

export const AddEquipmentModal: FC<AddEquipmentProps> = ({ isOpen, onClose }) => {
  const { mutate: createEquipment } = useCreateEquipment();

  const { control, handleSubmit } = useForm<AddEquipmentFormData>({
    resolver: yupResolver(AddEquipmentSchema),
  });

  const onSubmit = (data: AddEquipmentFormData) => {
    createEquipment(data, {
      onSuccess: () => onClose(),
    });
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

            <Button text="Создать" type="submit" sx={{ ...FILLED_BUTTON_SX, mt: 2 }} />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
