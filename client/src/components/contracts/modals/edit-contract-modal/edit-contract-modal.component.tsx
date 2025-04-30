import { FC, useRef, useState } from 'react';

import { Box, Modal, TextField } from '@mui/material';

import { ICustomer } from '@@types';
import { useUpdateContract } from '@api';
import { Button, CustomersSearch, FILLED_BUTTON_SX } from '@components';
import { COLORS, MODAL_STYLES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useModalControls } from '@hooks';
import { useForm, Controller } from 'react-hook-form';

import { EditContractProps } from './edit-contract-modal.types';
import { EditContractFormData, EditContractSchema } from './edit-contract-modal.validation';


export const EditContractModal: FC<EditContractProps> = ({ isOpen, onClose, item }) => {
  const customerInputRef = useRef<HTMLInputElement | null>(null);

  const customerSearchControls = useModalControls();

  const { mutate: updateContract } = useUpdateContract();
  const [customer, setCustomer] = useState<ICustomer>(item.customer);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<EditContractFormData>({
    resolver: yupResolver(EditContractSchema),
    defaultValues: {
      contractNumber: item.contractNumber,
      customerId: item.customer.id,
    },
  });

  const onSubmit = (data: EditContractFormData) => {
    updateContract(
      { id: item.id, data },
      {
        onSuccess: () => onClose(),
      },
    );
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
              name="contractNumber"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Номер контракта"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{
                    width: '100%',
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

            <Button text="Сохранить" type="submit" sx={{ ...FILLED_BUTTON_SX, mt: 2 }} />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
