import { DateTime } from 'luxon';

// eslint-disable-next-line consistent-return
export const getDate = (dateString = '') => {
  if (dateString) {
    const date = DateTime.fromFormat(dateString, 'yyyy-MM-dd T', {
      zone: 'UTC',
    }).setLocale('en-us');
    return {
      month: date.toFormat('LLL'),
      day: date.toFormat('dd'),
      dateTime: `${dateString}Z`,
    };
  }
};
