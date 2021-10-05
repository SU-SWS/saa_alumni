import { dcnb } from 'cnbuilder';

export const root = ({ checked }) =>
  dcnb(
    'su-group su-p-3 su-bg-black-true su-mt-6 focus-within:su-bg-gradient-to-bl hover:su-bg-gradient-to-bl focus-within:su-from-digital-blue hover:su-from-digital-blue focus-within:su-to-palo-verde-dark hover:su-to-palo-verde-dark su-cursor-pointer',
    {
      'su-bg-gradient-to-bl su-from-digital-blue su-to-palo-verde-dark':
        checked,
    }
  );
export const label =
  'su-relative su-text-16 xl:su-text-19 2xl:su-text-21 su-p-04em su-flex su-flex-row su-items-center su-text-white su-bg-black-true focus-within:su-bg-transparent group-hover:su-bg-transparent su-cursor-pointer';
export const icon = ({ checked }) =>
  dcnb('su-mr-8 su-w-[1em] su-flex-shrink-0', { 'su-opacity-0': !checked });
export const input = 'su-absolute su-opacity-0 su-w-[0] su-h-[0]';
