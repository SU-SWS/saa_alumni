import { parse } from 'query-string';

export const utmParams = (locationSearch) => {
  // Get out of the url and keep track of specific utm parameters.
  const parsedSearch = parse(locationSearch);
  // utms variable will create a string of just the valid params we want to keep.
  let utms = '';
  const passParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];
  // Loop through the paramaters we want to continue to track and check to see
  // if the existing page url has them.
  passParams.forEach((i, v) => {
    if (parsedSearch[i] !== undefined) {
      utms += `${i}=${parsedSearch[i]}&`;
    }
  });
  // Strip off the last ampersand.
  utms = utms.replace(new RegExp('&$'), '');
  return utms;
};
