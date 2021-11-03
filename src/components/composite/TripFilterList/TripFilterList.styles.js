import { dcnb } from 'cnbuilder';

export const root = 'su-hidden lg:su-block su-rs-mt-2';
export const heading =
  'su-hidden lg:su-block su-rs-mb-0 su-type-1 su-text-white';
export const toggle =
  'su-flex su-items-center su-w-full hocus:su-shadow-none hocus:su-underline su-py-20 su-pl-20 su-pr-80 su-text-20 su-text-white';
export const filterlist = 'su-bg-black-true';
export const rootMobile = 'su-block lg:su-hidden';
export const filterlistMobile = ({ panelOpened }) =>
  dcnb({
    'su-hidden': !panelOpened,
    'su-block': panelOpened,
  });
export const chevron = ({ panelOpened } = {}) =>
  dcnb(
    'su-absolute su-right-0 su-w-[3.4rem] su-pt-6 su-pb-5 su-px-5 su-bg-digital-red su-rounded-full group-hocus:!su-bg-digital-red-light su-mr-20 su-inline-block su-text-white su-transition',
    {
      'su-transform-gpu su-rotate-180': panelOpened,
    }
  );
