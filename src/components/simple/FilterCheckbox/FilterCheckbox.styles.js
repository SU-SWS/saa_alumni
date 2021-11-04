import { dcnb } from 'cnbuilder';

export const root = ({ checked }) =>
  dcnb(
    'su-group su-pt-3 su-py-4 su-pl-20 sm:su-pl-30 md:su-pl-50 lg:su-p-3 hover:su-bg-palo-verde-dark focus-within:su-bg-palo-verde-dark lg:su-bg-saa-black-dark su-mt-6 lg:focus-within:su-bg-gradient-to-bl lg:hover:su-bg-gradient-to-bl lg:focus-within:su-from-saa-electric-blue lg:hover:su-from-saa-electric-blue lg:focus-within:su-to-palo-verde-dark lg:hover:su-to-palo-verde-dark su-cursor-pointer',
    {
      'lg:su-bg-gradient-to-bl lg:su-from-saa-electric-blue su-to-palo-verde-dark':
        checked,
    }
  );
export const label =
  'su-relative su-text-16 md:su-text-18 xl:su-text-19 2xl:su-text-21 su-p-04em su-flex su-flex-row su-items-center su-text-white lg:su-bg-saa-black-dark focus-within:su-bg-transparent group-hover:su-bg-transparent su-cursor-pointer group-hover:su-underline group-focus-within:su-underline lg:group-hover:su-no-underline lg:group-focus-within:su-no-underline';
export const icon = ({ checked }) =>
  dcnb('su-mr-8 su-w-[1.4em] lg:su-w-[1em] su-flex-shrink-0', {
    'su-opacity-0': !checked,
    'su-text-palo-verde-light group-focus-within:su-text-white group-hover:su-text-white lg:su-text-white':
      checked,
  });
export const input = 'su-absolute su-opacity-0 su-w-[0] su-h-[0]';
export const count =
  'su-text-14 md:su-text-16 xl:su-text-16 2xl:su-text-18 su-ml-04em';
