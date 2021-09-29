import { DateTime } from 'luxon';

export const luxonDate = (dateString = '') => {
  const date = DateTime.fromFormat(dateString, 'yyyy-MM-dd T', {
    zone: 'UTC',
  })
    .setZone('America/Los_Angeles')
    .setLocale('en-us');
  return date;
};

export const getDate = (dateString = '') => {
  const date = luxonDate(dateString);
  return {
    month: date.toFormat('LLLL'),
    day: date.toFormat('d'),
    year: date.toFormat('yyyy'),
  };
};

export const getDuration = (startDate, endDate, unit = 'days') => {
  const start = luxonDate(startDate);
  const end = luxonDate(endDate);

  const duration = end.diff(start, unit).toObject();

  return duration;
};
