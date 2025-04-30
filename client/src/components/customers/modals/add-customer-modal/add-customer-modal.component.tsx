import { FC } from 'react';

import { Box, Modal, TextField } from '@mui/material';

import { useCreateCustomer } from '@api';
import { Button, FILLED_BUTTON_SX } from '@components';
import { MODAL_STYLES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { AddCustomerProps } from './add-customer-modal.types';
import { AddCustomerFormData, AddCustomerSchema } from './add-customer-modal.validation';


export const AddCustomerModal: FC<AddCustomerProps> = ({ isOpen, onClose }) => {
  const { mutate: createCustomer } = useCreateCustomer();

  const { control, handleSubmit } = useForm<AddCustomerFormData>({
    resolver: yupResolver(AddCustomerSchema),
  });

  const onSubmit = (data: AddCustomerFormData) => {
    createCustomer(data, {
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
                  label="Название заказчика"
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
