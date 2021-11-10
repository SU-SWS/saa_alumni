import { dcnb } from 'cnbuilder';

export const root = 'su-hidden lg:su-block su-rs-mt-2';
export const heading =
  'su-hidden lg:su-block su-rs-mb-0 su-type-1 su-text-white';
export const filterlist = 'su-bg-saa-black-dark';

export const rootMobile = 'su-block lg:su-hidden su-bg-saa-black';
export const filterlistMobile = ({ panelOpened }) =>
  dcnb({
    'su-hidden': !panelOpened,
    'su-block su-pb-20 su-bg-saa-black su-border-b su-border-black-80':
      panelOpened,
  });
export const toggle = ({ panelOpened }) =>
  dcnb(
    'su-group su-flex su-items-center su-w-full su-pl-20 sm:su-pl-30 md:su-pl-50 su-underline-offset hocus:su-shadow-none hocus:su-underline hocus:su-bg-black-90 su-py-20 su-pl-20 su-pr-80 su-text-20 su-text-white',
    {
      'su-border-b su-border-black-80 su-bg-saa-black-dark': !panelOpened,
      '!su-bg-saa-black hover:!su-bg-black-80': panelOpened,
    }
  );
export const toggleHeading = 'su-type-0 su-mb-0';
export const chevron = ({ panelOpened } = {}) =>
  dcnb(
    'su-absolute su-right-0 su-w-[3.4rem] su-pt-6 su-pb-5 su-px-5 su-rounded-full su-border-2 su-border-palo-verde-dark group-hocus:su-bg-palo-verde-dark su-mr-20 sm:su-mr-30 md:su-mr-50 su-inline-block su-text-white su-transition',
    {
      'su-transform-gpu su-rotate-180': panelOpened,
    }
  );
