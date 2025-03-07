import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY.MM.DD';

export const convertDateFormat = (
  dateInput: string | number | Date,
): string => {
  return dayjs(dateInput).format(DATE_FORMAT);
};
