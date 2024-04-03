import { dcnb } from 'cnbuilder';

export const serifSuper = ({ blackText }) =>
  dcnb(
    'su-block su-max-w-prose su-font-serif su-leading-display su-type-2 su-mx-auto su-mb-05em su-text-shadow',
    {
      'xs:su-text-shadow-white': blackText === 'xs:su-text-black',
    }
  );

export const headline = ({ blackText }) =>
  dcnb(
    'su-block su-font-bold su-font-serif su-leading-tight su-tracking-normal su-mb-02em su-text-shadow-lg',
    {
      'xs:su-text-shadow-white-lg': blackText === 'xs:su-text-black',
    }
  );

export const sansSub = ({ blackText }) =>
  dcnb(
    'su-max-w-prose su-type-1 su-leading-display su-text-shadow su-mx-auto su-mb-0 su-text-shadow',
    {
      'xs:su-text-shadow-white': blackText === 'xs:su-text-black',
    }
  );
