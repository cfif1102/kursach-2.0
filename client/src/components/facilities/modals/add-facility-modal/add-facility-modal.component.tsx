import { FC, useRef, useState } from 'react';

import { Box, Modal, TextField } from '@mui/material';

import { ICustomer } from '@@types';
import { useCreateFacility } from '@api';
import { Button, CustomersSearch, FILLED_BUTTON_SX } from '@components';
import { COLORS, MODAL_STYLES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useModalControls } from '@hooks';
import { useForm, Controller } from 'react-hook-form';

import { AddFacilityProps } from './add-facility-modal.types';
import { AddFacilityFormData, AddFacilitySchema } from './add-facility-modal.validation';


export const AddFacilityModal: FC<AddFacilityProps> = ({ isOpen, onClose }) => {
  const customerInputRef = useRef<HTMLInputElement | null>(null);

  const customerSearchControls = useModalControls();

  const { mutate: createFacility } = useCreateFacility();
  const [customer, setCustomer] = useState<ICustomer | null>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<AddFacilityFormData>({
    resolver: yupResolver(AddFacilitySchema),
  });

  const onSubmit = (data: AddFacilityFormData) => {
    createFacility(data, {
      onSuccess: () => onClose(),
    });
  };

  const handleCustomerSelect = (data: ICustomer) => {
    const { current } = customerInputRef;

    if (!current) {
      return;
    }

    setValue('customerId', data.id);
    clearErrors('customerId');

    setCustomer(data);

    current.focus();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box display="flex" flexDirection="column" sx={{ ...MODAL_STYLES, width: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Название объекта"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{
                    width: '100%',
                  }}
                  size="small"
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Название адреса"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{
                    width: '100%',
                    mt: 1,
                  }}
                  size="small"
                />
              )}
            />

            <TextField
              label="Заказчик"
              sx={{
                width: '100%',
                mt: 2,
                background: 'white',
              }}
              size="small"
              value={customer?.name || ''}
              ref={customerInputRef}
              error={Boolean(errors.customerId)}
              helperText={errors.customerId?.message}
              disabled
            />

            <Box display="flex" flexDirection="column">
              <CustomersSearch
                open={customerSearchControls.open}
                onClose={customerSearchControls.handleClose}
                onChange={handleCustomerSelect}
              />

              <Button
                text="Выбрать"
                variant="outlined"
                onClick={() => customerSearchControls.handleOpen()}
                sx={{
                  color: COLORS.TEXT_COLOR,
                  borderColor: COLORS.TEXT_COLOR,
                }}
              />
            </Box>

            <Button text="Создать" type="submit" sx={{ ...FILLED_BUTTON_SX, mt: 2 }} />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
