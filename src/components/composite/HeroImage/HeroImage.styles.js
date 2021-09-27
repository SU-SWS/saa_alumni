import { dcnb } from 'cnbuilder';

export const root = '';
export const overlay = ({ overlay: overlayType }) =>
  dcnb(
    'su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-b su-to-saa-black',
    {
      'su-from-black-true-opacity-20': overlayType === 'dark',
      'su-from-transparent': overlayType === 'normal',
    }
  );