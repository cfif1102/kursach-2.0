import { FC, useCallback, useId, useState } from 'react';

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { IEquipment, IFacility } from '@@types';
import { useCreateActDocument } from '@api';
import { Button, EquipmentsSearch, FILLED_BUTTON_SX } from '@components';
import { useModalControls } from '@hooks';

import { DocEnums, DOCS_TYPES } from './documents.constants';
import { EquipmentItem } from './equipment-item';
import { EquipmentModal } from './equipment-modal';
import { FacilitySelect } from './facility-select';

export const Documents: FC = () => {
  const equipmentModalControls = useModalControls();

  const [facility, setFacility] = useState<IFacility | null>(null);
  const [equipments, setEquipments] = useState<{ data: IEquipment; count: number }[]>([]);
  const [equipment, setEquipment] = useState<{
    item: IEquipment;
    mode: 'add' | 'edit';
    value: number;
  } | null>(null);

  const { mutate: createActDocument } = useCreateActDocument();

  const [docType, setDocType] = useState<DocEnums>(DocEnums.act);
  const selectedLabelId = useId();

  const handleDocChange = (e: SelectChangeEvent) => {
    setDocType(e.target.value as DocEnums);
  };

  const handleDeleteEquipment = (id: number) => () =>
    setEquipments((prev) => prev.filter((e) => e.data.id !== id));

  const addEquipment = useCallback((eq: IEquipment, count: number) => {
    setEquipments((prev) => {
      if (prev.some((e) => e.data.id === eq.id)) {
        window.alert('Оборудование уже есть в списке!');

        return prev;
      }

      return [...prev, { data: eq, count }];
    });
  }, []);

  const handleEditEquipment = useCallback((eq: IEquipment, count: number) => {
    setEquipments((prev) => prev.map((e) => (e.data.id === eq.id ? { ...e, count } : e)));
  }, []);

  const handleSetEquipment = useCallback(
    (eq: IEquipment, mode: 'edit' | 'add' = 'add', value: number = 0) => {
      setEquipment({ item: eq, mode, value });

      equipmentModalControls.handleOpen();
    },
    [],
  );

  const handleSetEditEquipment = useCallback((eq: IEquipment, value: number) => {
    handleSetEquipment(eq, 'edit', value);
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

    const equipmentsData = equipments.map(({ data, count }) => ({ id: data.id, amount: count }));

    const data = {
      objectId: facility.id,
      equipments: equipmentsData,
    };

    createActDocument(data, {
      onSuccess: (data) => {
        const { filename, blob } = data;

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;
        a.download = filename;

        document.body.appendChild(a);

        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
    });
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

        <Box display="flex" flexDirection="column" mt={2}>
          {equipments.map(({ data: { id, name }, count }) => (
            <EquipmentItem
              key={id}
              name={name}
              count={count}
              onDelete={handleDeleteEquipment(id)}
              onChange={() => handleSetEditEquipment({ id, name }, count)}
            />
          ))}
        </Box>

        {equipment && (
          <EquipmentModal
            handleSuccess={(value) => {
              switch (equipment.mode) {
                case 'add':
                  {
                    addEquipment(equipment.item, value);
                  }
                  break;
                case 'edit':
                  {
                    handleEditEquipment(equipment.item, value);
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
          />
        )}
      </Box>
    </Box>
  );
};
