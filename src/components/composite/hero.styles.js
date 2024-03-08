import { dcnb } from 'cnbuilder';

export const serifSuper = ({ textColor }) =>
  dcnb(
    'su-block su-max-w-prose su-font-serif su-leading-display su-type-2 su-mx-auto su-mb-05em',
    {
      'su-text-shadow': textColor === 'su-text-white',
      'su-text-shadow-white': textColor === 'su-text-black',
    }
  );

export const headline = ({ textColor }) =>
  dcnb(
    'su-block su-font-bold su-font-serif su-leading-tight su-tracking-normal su-mb-02em',
    {
      'su-text-shadow-lg': textColor === 'su-text-white',
      'su-text-shadow-white-lg': textColor === 'su-text-black',
    }
  );

export const sansSub = ({ textColor }) =>
  dcnb(
    'su-max-w-prose su-type-1 su-leading-display su-text-shadow su-mx-auto su-mb-0',
    {
      'su-text-shadow': textColor === 'su-text-white',
      'su-text-shadow-white': textColor === 'su-text-black',
    }
  );
