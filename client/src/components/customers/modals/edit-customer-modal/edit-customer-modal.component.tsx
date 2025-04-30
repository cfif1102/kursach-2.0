import { FC } from 'react';

import { Box, Modal, TextField } from '@mui/material';

import { useUpdateCustomer } from '@api';
import { Button, FILLED_BUTTON_SX } from '@components';
import { MODAL_STYLES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { EditCustomerProps } from './edit-customer-modal.types';
import { EditCustomerFormData, EditCustomerSchema } from './edit-customer-modal.validation';


export const EditCustomerModal: FC<EditCustomerProps> = ({ isOpen, onClose, item }) => {
  const { mutate: updateCustomer } = useUpdateCustomer();

  const { control, handleSubmit } = useForm<EditCustomerFormData>({
    resolver: yupResolver(EditCustomerSchema),
    defaultValues: {
      name: item.name,
    },
  });

  const onSubmit = (data: EditCustomerFormData) => {
    updateCustomer(
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

            <Button text="Сохранить" type="submit" sx={{ ...FILLED_BUTTON_SX, mt: 2 }} />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
