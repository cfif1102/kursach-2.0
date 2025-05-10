import { ChangeEvent, FC, useCallback, useId } from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import { IEquipment } from '@@types';
import { useCreateActDocument, useCreatePassportDocument } from '@api';
import { Button, EquipmentsSearch, FILLED_BUTTON_SX, useDocumentsContext } from '@components';
import { useModalControls } from '@hooks';
import { downloadFile } from '@utils';
import { toast } from 'react-toastify';

import { DocEnums, DOCS_TYPES } from './documents.constants';
import { EquipmentItem } from './equipment-item';
import { EquipmentModal } from './equipment-modal';
import { FacilitySelect } from './facility-select';

export const Documents: FC = () => {
  const equipmentModalControls = useModalControls();

  const {
    setEquipments,
    setEquipment,
    equipment,
    equipments,
    setDocType,
    facility,
    docType,
    facilityText,
    setFacility,
    setFacilityText,
  } = useDocumentsContext();

  const { mutate: createActDocument } = useCreateActDocument();
  const { mutate: createPassportDocument } = useCreatePassportDocument();

  const selectedLabelId = useId();

  const handleDocChange = (e: SelectChangeEvent) => {
    setDocType(e.target.value as DocEnums);
  };

  const handleDeleteEquipment = (id: number) => () =>
    setEquipments((prev) => prev.filter((e) => e.data.id !== id));

  const addEquipment = useCallback((eq: IEquipment, count: number, end?: string) => {
    setEquipments((prev) => {
      if (prev.some((e) => e.data.id === eq.id)) {
        window.alert('Оборудование уже есть в списке!');

        return prev;
      }

      return [...prev, { data: eq, count, end }];
    });
  }, []);

  const handleEditEquipment = useCallback((eq: IEquipment, count: number, end?: string) => {
    setEquipments((prev) => prev.map((e) => (e.data.id === eq.id ? { ...e, count, end } : e)));
  }, []);

  const handleSetEquipment = useCallback(
    (eq: IEquipment, mode: 'edit' | 'add' = 'add', value: number = 0, end?: string) => {
      setEquipment({ item: eq, mode, value, end });

      equipmentModalControls.handleOpen();
    },
    [],
  );

  const handleSetEditEquipment = useCallback((eq: IEquipment, value: number, end?: string) => {
    handleSetEquipment(eq, 'edit', value, end);
  }, []);

  const handleCreateAct = () => {
    if (!equipments.length) {
      window.alert('Вы не выбрали оборудование');

      return;
    }

    if (!facility) {
      window.alert('Вы не выбрали объект');

      return;
    }

    if (docType === DocEnums.passport && !facilityText) {
      window.alert('Вы не ввели тип объекта');

      return;
    }

    switch (docType) {
      case DocEnums.act:
        {
          const equipmentsData = equipments.map(({ data, count }) => ({
            id: data.id,
            amount: count,
          }));

          const data = {
            objectId: facility.id,
            equipments: equipmentsData,
          };

          createActDocument(data, {
            onSuccess: ({ filename, blob }) => downloadFile(blob, filename),
          });
        }
        break;
      case DocEnums.passport:
        {
          const equipmentsData = equipments.map(({ data, count, end }) => ({
            id: data.id,
            amount: count,
            end: end || '',
          }));

          const data = {
            objectId: facility.id,
            equipments: equipmentsData,
            objectType: facilityText,
          };

          createPassportDocument(data, {
            onSuccess: ({ filename, blob }) => downloadFile(blob, filename),
            onError: () =>
              toast.error(
                'Не удалось создать документ. Вероятно, для объект нет лицензиата или контракта',
              ),
          });
        }
        break;
    }
  };

  return (
    <Box display="flex" flexDirection="row">
      <Box sx={{ width: '500px' }}>
        <EquipmentsSearch onChange={handleSetEquipment} />
      </Box>

      <Box display="flex" flexDirection="column" ml={2} flexGrow={1} justifyContent="start">
        <Box display="flex" flexDirection="row">
          <FacilitySelect facility={facility} onChange={setFacility} sx={{ flexGrow: 1 }} />

          <Box display="flex" flexDirection="column" sx={{ ml: 2 }}>
            <FormControl>
              <InputLabel id={selectedLabelId}>Тип документа</InputLabel>
              <Select
                labelId={selectedLabelId}
                value={docType}
                label="Тип документа"
                onChange={handleDocChange}
                size="small"
                sx={{
                  background: 'white',
                }}
              >
                {DOCS_TYPES.map(({ label, value }, index) => (
                  <MenuItem value={value} key={index}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              text="Создать"
              sx={{ ...FILLED_BUTTON_SX, width: '200px', mt: 2 }}
              onClick={handleCreateAct}
            />
          </Box>
        </Box>

        {docType === DocEnums.passport && (
          <TextField
            sx={{ mt: 2, background: 'white' }}
            size="small"
            label="Тип объекта"
            multiline
            rows={3}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFacilityText(e.target.value)}
          />
        )}

        <Box display="flex" flexDirection="column" mt={2}>
          {equipments.map(({ data: { id, name }, count, end }) => (
            <EquipmentItem
              key={id}
              name={name}
              count={count}
              onDelete={handleDeleteEquipment(id)}
              onChange={() => handleSetEditEquipment({ id, name }, count, end)}
              {...{ end: docType === DocEnums.act ? undefined : end ?? '' }}
            />
          ))}
        </Box>

        {equipment && (
          <EquipmentModal
            handleSuccess={(value, end) => {
              switch (equipment.mode) {
                case 'add':
                  {
                    addEquipment(equipment.item, value, end);
                  }
                  break;
                case 'edit':
                  {
                    handleEditEquipment(equipment.item, value, end);
                  }
                  break;
              }

              setEquipment(null);
            }}
            handleClose={() => {
              setEquipment(null);

              equipmentModalControls.handleClose();
            }}
            open={equipmentModalControls.open}
            mode={equipment.mode}
            value={equipment.value}
            label={equipment.item.name}
            end={docType === DocEnums.act ? undefined : equipment.end || ''}
          />
        )}
      </Box>
    </Box>
  );
};
