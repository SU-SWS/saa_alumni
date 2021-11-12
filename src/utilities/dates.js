import { DateTime } from 'luxon';

export const luxonDate = (dateString = '') => {
  const date = DateTime.fromFormat(dateString, 'yyyy-MM-dd T', {
    zone: 'UTC',
  }).setLocale('en-us');
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

export const luxonToday = () => {
  const todayDatestring = new Date().toISOString().split('T')[0];
  const today = DateTime.fromFormat(todayDatestring, 'yyyy-MM-dd', {
    zone: 'UTC',
  }).setLocale('en-us');
  return today;
};
