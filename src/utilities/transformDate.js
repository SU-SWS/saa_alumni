import { DateTime } from 'luxon';
import { luxonDate } from './dates';

export const formatFmDate = (tripDate) => {
  const date = luxonDate(tripDate).toLocaleString();
  return date;
};

export const formatEmailDate = (tripDate) => {
  const date = luxonDate(tripDate).toLocaleString(DateTime.DATE_FULL);
  return date;
};

export const formatUsDate = (tripDate) => {
  const date = luxonDate(tripDate);
  if (!date?.isValid) {
    return undefined;
  }
  const newDate = date.toLocaleString();
  return newDate;
};
