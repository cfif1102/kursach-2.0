import { FC } from 'react';

import { Box, IconButton, Modal, TextField, Typography } from '@mui/material';

import { Button, FILLED_BUTTON_SX } from '@components';
import { COLORS, MODAL_STYLES, PARAMS } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Controller, useForm } from 'react-hook-form';

import { EquipmentModalProps } from './equipment-modal.types';
import { EquipmentModalFormData, EquipmentModalSchema } from './equipment-modal.validation';

export const EquipmentModal: FC<EquipmentModalProps> = ({
  handleClose,
  handleSuccess,
  value,
  open,
  mode,
  label,
  end,
}) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(EquipmentModalSchema),
    defaultValues: {
      value,
      end,
    },
  });

  const onSubmit = async (data: EquipmentModalFormData) => {
    handleSuccess(data.value, data.end);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box display="flex" flexDirection="column" sx={MODAL_STYLES}>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
              fontSize: PARAMS.REGULAR_FONT_SIZE,
              color: COLORS.MAIN_BG,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {mode === 'edit' ? 'Редактирование оборудования' : 'Добавление оборудования'}
          </Typography>

          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
            <Controller
              name="value"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={label}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{
                    width: 300,
                  }}
                  size="small"
                />
              )}
            />

            {end !== undefined && (
              <Controller
                name="end"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={'Номер и срок действия'}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{
                      width: 300,
                      mt: 2,
                    }}
                    multiline
                    size="small"
                  />
                )}
              />
            )}

            <Button
              text={mode === 'add' ? 'Добавить' : 'Сохранить'}
              type="submit"
              sx={{ ...FILLED_BUTTON_SX, mt: 2 }}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
