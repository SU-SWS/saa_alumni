import { dcnb } from 'cnbuilder';

export const root =
  'su-group su-relative su-break-words su-border-black su-max-w-full su-bg-white su-h-full';
export const membershipCardWrapper = (disableHocus) =>
  dcnb(
    'su-basefont-23 su-rs-p-3 su-stretch-link su-w-full su-transition-all su-rounded su-border-3 su-border-saa-grey su-h-full',
    !disableHocus &&
      'hocus:su-border-digital-blue focus:su-outline-4 focus:su-outline-offset-4'
  );
export const initialAndSelectionWrapper =
  'su-flex-col lg:su-flex-row su-items-center su-gap-xs su-relative su-rs-mb-0 su-text-black';
export const initialWrapper =
  'su-leading su-text-center su-w-50 su-h-50 su-text-24 su-border-2 su-rounded-full su-text-saa-grey children:su-text-digital-red';
export const selectionWrapper =
  'sm:su-absolute su-self-end sm:su-self-auto su-right-0 md:su--right-20 lg:su-right-0 su-text-16 su-font-semibold';
export const checkLinkIcon =
  'su-inline-block su-text-digital-red-light su-w-[1.4em] su--mt-2 su-mr-2';
export const subheading =
  'su-text-center su-rs-mb-1 su-text-18 su-leading-tight su-mt-6';
export const membershipCardLink =
  'su-group su-flex su-items-end su-text-18 md:su-text-24 su-font-regular su-no-underline su-px-20 su-pt-10 su-pb-12 md:su-px-30 su-border-digital-red su-bg-digital-red su-text-white group-hocus:su-bg-cardinal-red-xdark group-hocus:su-text-white group-hocus:su-border-cardinal-red-xdark group-hocus:su-shadow-md';
export const membershipCardSelectedLink =
  'su-group su-flex su-items-end su-text-18 md:su-text-24 su-font-regular su-no-underline su-px-20 su-pt-10 su-pb-12 md:su-px-30 su-border-cardinal-red-xdark su-bg-cardinal-red-xdark su-text-white su-shadow-md';
export const membershipDetails = 'su-m-0 su-p-0 su-text-18';
