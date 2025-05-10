import { FC, useState } from 'react';

import { MONTHS, START_VALS } from './schedule-calendar.constants';
import { Table, TBody, Td, THead } from './schedule-calendar.styled';
import { ScheduleCalendarProps } from './schedule-calendar.types';

export const ScheduleCalendar: FC<ScheduleCalendarProps> = ({ onChange }) => {
  const [values, setValues] = useState(START_VALS);

  const handleSetValue = (row: number, column: number) => () =>
    setValues((prev) => {
      const vals = [[...prev[0]], [...prev[1]]];

      vals[row][column] = Number(!vals[row][column]);

      onChange(vals);

      return vals;
    });

  const handleSetDiscard = (row: number, column: number) => () =>
    setValues((prev) => {
      const vals = [[...prev[0]], [...prev[1]]];

      vals[row][column] = 2;

      onChange(vals);

      return vals;
    });

  return (
    <Table>
      <THead>
        <tr>
          <td>Тип оборудования</td>
          <td>Вид работ</td>

          {MONTHS.map((month, index) => (
            <td key={index}>{month}</td>
          ))}
        </tr>
      </THead>

      <TBody>
        {values.map((row, index) => (
          <tr key={index}>
            <td>ПСиСО</td>
            <td>Регламент №{index + 1}</td>

            {row.map((value, valIndex) => (
              <Td
                key={`${index}-${valIndex}`}
                status={value}
                onClick={handleSetValue(index, valIndex)}
                onDoubleClick={handleSetDiscard(index, valIndex)}
              />
            ))}
          </tr>
        ))}
      </TBody>
    </Table>
  );
};
