import { dcnb } from 'cnbuilder';

export const root =
  'su-group su-relative su-break-words su-border-black su-max-w-full su-bg-saa-black-dark su-h-full';
export const membershipCardWrapper = (disableHocus) =>
  dcnb(
    'su-basefont-23 su-rs-p-3 su-stretch-link su-w-full su-transition-all su-rounded su-border-3 su-border-white su-h-full',
    !disableHocus &&
      'hocus:su-gradient-border hocus:su-border-to-rt-palo-verde-dark-to-saa-electric-blue focus:su-outline-4 focus:su-outline-offset-4'
  );
export const initialAndSelectionWrapper =
  'su-flex-col lg:su-flex-row su-items-center su-gap-xs su-relative su-rs-mb-0';
export const initialWrapper =
  'su-leading su-text-center su-w-50 su-h-50 su-text-24 su-border-2 su-rounded-full';
export const selectionWrapper =
  'sm:su-absolute su-self-end sm:su-self-auto su-right-0 md:su-right-[-20px] lg:su-right-0 su-text-16 su-font-semibold';
export const checkLinkIcon =
  'su-inline-block su-text-saa-electric-blue su-w-[1.4em] su-mt-[-2px] su-mr-[2px]';
export const subheading =
  'su-text-center su-rs-mb-1 su-text-18 su-leading-tight su-mt-6';
export const membershipCardLink =
  'su-group su-flex su-items-end su-text-18 md:su-text-24 su-font-regular su-no-underline su-text-white su-px-20 su-pt-10 su-pb-12 md:su-px-30 su-border-3 su-transition-colors su-gradient-border su-border-to-rt-palo-verde-dark-to-saa-electric-blue su-bg-transparent group-hocus:su-text-white group-hocus:su-bg-gradient-to-tr group-hocus:su-from-palo-verde-dark group-hocus:su-to-saa-electric-blue group-hocus:su-shadow-md';
export const membershipCardSelectedLink =
  'su-group su-flex su-items-end su-text-18 md:su-text-24 su-font-regular su-no-underline su-text-white su-px-20 su-pt-10 su-pb-12 md:su-px-30 su-border-3 su-transition-colors su-gradient-border su-border-to-rt-palo-verde-dark-to-saa-electric-blue su-text-white su-bg-gradient-to-tr su-from-palo-verde-dark su-to-saa-electric-blue su-shadow-md hocus:su-text-white';
export const membershipDetails = 'su-m-0 su-p-0 su-text-18';
