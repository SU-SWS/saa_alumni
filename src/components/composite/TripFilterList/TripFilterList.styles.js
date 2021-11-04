import { dcnb } from 'cnbuilder';

export const root = 'su-hidden lg:su-block su-rs-mt-2';
export const heading =
  'su-hidden lg:su-block su-rs-mb-0 su-type-1 su-text-white';
export const filterlist = 'su-bg-black-true';

export const rootMobile = 'su-block lg:su-hidden';
export const filterlistMobile = ({ panelOpened }) =>
  dcnb({
    'su-hidden': !panelOpened,
    'su-block su-cc': panelOpened,
  });
export const toggle =
  'su-group su-flex su-items-center su-w-full su-pl-20 sm:su-pl-30 md:su-pl-50 hocus:su-shadow-none hocus:su-underline su-py-20 su-pl-20 su-pr-80 su-text-20 su-text-white';
export const chevron = ({ panelOpened } = {}) =>
  dcnb(
    'su-absolute su-right-0 su-w-[3.4rem] su-pt-6 su-pb-5 su-px-5 su-rounded-full su-border-2 su-border-palo-verde-dark group-hocus:su-bg-palo-verde-dark su-mr-20 su-inline-block su-text-white su-transition',
    {
      'su-transform-gpu su-rotate-180': panelOpened,
    }
  );
