import { COLORS } from '@constants';
import { lighten } from 'polished';

export const MONTHS = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

export const START_VALS = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const getColors = (status: number) => {
  switch (status) {
    case 0:
      return 'none';
    case 1:
      return lighten(0.5, COLORS.MAIN_BG);
    case 2:
      return lighten(0.5, COLORS.SECONDARY);
    default:
      return 'none';
  }
};
