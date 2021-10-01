import { dcnb } from 'cnbuilder';

export const root = '';
export const listWrapper =
  'su-flex su-rs-mt-6 su-rs-mb-7 su-justify-center md:su-space-x-36';
export const pagesList =
  'su-list-none su-flex su-space-x-10 md:su-space-x-15 su-p-0 su-font-serif su-text-[26px] su-font-bold';
export const pageItem = ({ page } = {}) =>
  dcnb('su-mb-0', { 'su-px-9 md:su-px-11 su-bb': page === '...' });
export const pageLink = ({ active } = {}) =>
  dcnb('su-px-9 md:su-px-11 su-text-digital-red-xlight hocus:su-text-white', {
    'su-no-underline': !active,
    'su-underline su-text-white su-cursor-default su-pointer-events-none':
      active,
  });
export const pageNavigationLink =
  'su-text-20 su-no-underline su-font-regular su-self-center su-text-digital-red-xlight hocus:su-text-white su-mx-9 md:su-mx-11';
