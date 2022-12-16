import { dcnb } from 'cnbuilder';

export const root =
  'su-group su-relative su-overflow-hidden su-bg-saa-black-dark su-break-words su-border-black su-w-full sm:su-max-w-[42rem] md:su-max-w-full';
export const content = 'su-rs-pt-1 su-rs-px-2 su-rs-pb-3';
export const link =
  'su-stretched-link su-group su-z-20 su-mb-08em su-type-2 su-no-underline hocus:su-underline su-underline-offset-[3px] su-decoration-[0.12em] su-decoration-digital-red-xlight focus:su-outline-none';
export const heading =
  'su-type-0 su-mt-0 su-font-bold su-relative su-inline su-text-white';
export const icon =
  'su-relative su-inline-block group-hover:su-text-white group-focus:su-text-white';
export const subheading =
  'su-mt-4 su-mb-0 su-font-semibold su-text-white su-leading-display';
export const description =
  'su-rs-mt-0 su-mb-0 su-card-paragraph su-text-black-20';
export const benefitsLink =
  'su-rs-mt-2 su-group su-flex su-items-end su-text-18 md:su-text-24 su-font-regular su-no-underline su-border-3 su-border-digital-red-xlight su-text-white hocus:su-bg-digital-red hocus:su-border-digital-red hocus:su-text-white hocus:su-shadow-md su-px-20 su-pt-10 su-pb-11 md:su-px-30 md:su-pt-16 md:su-pb-18';
export const benefitsLinkIcon = 'su-w-1em su-text-white';
export const membershipCardLink = (disabled) =>
  dcnb(
    'su-rs-mt-2 su-group su-flex su-items-end su-text-18 md:su-text-24 su-font-regular su-no-underline su-text-white su-px-20 su-pt-10 su-pb-11 md:su-px-30 md:su-pt-16 md:su-pb-18 su-border-solid su-border-3 su-transition-colors su-gradient-border su-border-to-rt-palo-verde-dark-to-saa-electric-blue su-bg-transparent',
    disabled
      ? 'su-pointer-events-none'
      : 'group-hocus:su-text-white group-hocus:su-bg-gradient-to-tr group-hocus:su-from-palo-verde-dark group-hocus:su-to-saa-electric-blue group-hocus:su-shadow-md'
  );
export const membershipCardSelectedLink =
  'su-rs-mt-2 su-group su-flex su-items-end su-text-18 md:su-text-24 su-font-regular su-no-underline su-text-white su-px-20 su-pt-10 su-pb-11 md:su-px-30 md:su-pt-16 md:su-pb-18 su-border-solid su-border-3 su-transition-colors su-gradient-border su-border-to-rt-palo-verde-dark-to-saa-electric-blue su-text-white su-bg-gradient-to-tr su-from-palo-verde-dark su-to-saa-electric-blue su-shadow-md hocus:su-text-white';
