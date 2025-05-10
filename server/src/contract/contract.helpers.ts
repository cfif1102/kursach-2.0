import { MONTHS } from './contract.constants';

export function formatDate(date: Date) {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `от ${day} ${month} ${year} года`;
}
