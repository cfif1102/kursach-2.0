import { useMemo, useState } from 'react';

import { Box } from '@mui/material';

import { IFacility } from '@@types';
import { useCreateScheduleDocument } from '@api';
import { Button } from '@components';
import { downloadFile } from '@utils';
import { toast } from 'react-toastify';

import { FacilitySelect } from '../documents/facility-select';
import { ScheduleCalendar } from '../schedule-calendar';

import { ScheduleHeader } from './schedule.styled';

export const Schedule = () => {
  const [schedule, setSchedule] = useState<number[][]>([]);
  const [facility, setFacility] = useState<IFacility | null>(null);

  const { mutate: createSchedule } = useCreateScheduleDocument();

  const year = useMemo(() => new Date().getFullYear(), []);

  const handleCreateDoc = () => {
    if (!facility) {
      window.alert('Выберите объект!');

      return;
    }

    const data = {
      schedule,
      facilityId: facility.id,
    };

    createSchedule(data, {
      onSuccess: ({ filename, blob }) => downloadFile(blob, filename),
      onError: () =>
        toast.error(
          'Не удалось создать документ. Вероятно, для объект нет лицензиата или контракта',
        ),
    });
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <ScheduleHeader>График проведения технического обслуживания на {year} год</ScheduleHeader>

        <Button text="Создать" onClick={handleCreateDoc} />
      </Box>

      <ScheduleCalendar onChange={setSchedule} />

      <FacilitySelect
        facility={facility}
        onChange={setFacility}
        sx={{ flexGrow: 1, width: '500px', mt: 2 }}
      />
    </Box>
  );
};
