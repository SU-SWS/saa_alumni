import { dcnb } from 'cnbuilder';

/**
 * Styles for the location search
 */

export const root = 'su-group';
export const inputRoot = ({ locError }) =>
  dcnb(
    '!su-font-sans before:!su-border-b-0 after:!su-border-b-0 focus-within:!su-border-b-lagunita  lg:!su-rounded lg:!su-border-black-20  hover:lg:!su-border-lagunita-light hover:lg:!su-border-b-lagunita focus-within:lg:!su-border-lagunita-light focus-within:lg:!su-border-b-lagunita focus-within:lg:!su-ring-2 focus-within:lg:!su-ring-lagunita-light !su-mt-0 su-transition-colors !su-pr-0',
    {
      '!su-border-b-2 !su-border-b-black-50 lg:!su-border lg:!su-border-b-2 lg:!su-border-b-black-70':
        !locError,
      '!su-border !su-border-b-2 !su-border-digital-red lg:!su-border-b-digital-red':
        !!locError,
    }
  );
export const input =
  '!su-text-18 focus:!su-ring-0 !su-px-48 !su-py-18 !su-leading-display focus:!su-border-0 selection:su-bg-digital-red-20 !su-caret-digital-red !su-transition-colors placeholder:!su-opacity-100 placeholder:!su-text-black-70 placeholder:lg:!su-text-transparent !su-width-100';
export const popper = '';
export const popperMobile =
  '!su-w-[calc(100%_+_52px)] !su-relative !su-translate-y-0 !su--ml-26 !su-overflow-x-hidden !su-h-full';
export const paper =
  '!su-mt-18 lg:!su-mt-2 lg:!su-rounded !su-shadow-none lg:!su-shadow-lg !su-font-sans !su-text-18 lg:!su-border lg:!su-border-lagunita-light !su-w-full';
export const listbox = '!su-max-h-280';
export const listboxMobile = '!su-max-h-full';
export const option = ({ selected }) =>
  dcnb(
    '!su-px-26 !su-py-14 lg:!su-px-14 lg:!su-py-10 lg:!su-mx-19 lg:!su-my-6 !su-my-0 !su-leading-display first:su-mt-20 last:su-mb-10 !su-text-black-70 lg:!su-text-black lg:!su-rounded-[2.8rem] hover:!su-text-digital-red-dark hover:!su-bg-digital-red-20 hover:!su-underline',
    {
      '!su-bg-lagunita-20 !su-text-digital-red-dark lg:!su-text-lagunita-dark lg:!su-bg-digital-red-20':
        selected,
    }
  );
export const fieldset = 'su-mt-18 lg:su-mt-0 lg:su-mb-18 su-mx-26 2xl:su-mx-27';
export const legend =
  '!su-mx-20 !su-mt-10 lg:!su-mx-0 lg:!su-mt-0 lg:su-mb-8 su-text-18';
export const locationWrapper = 'su-relative';
export const locationLabels = '';
export const clearLocation = 'hocus:!su-bg-transparent !su-bg-transparent';
export const clearIcon =
  '!su-text-21 !su-text-black-70 hocus:!su-text-digital-red !su-mr-12 hocus:!su-bg-transparent';
export const pinIcon =
  'su-text-black-70 su-absolute su-top-22 su-left-8 lg:su-left-16 su-w-24';
export const toggleGroupWrapper =
  'su-px-45 su-mt-18 lg:su-mt-12 lg:su-px-0 su-mb-[200px] lg:su-mb-0';
export const toggleButtonGroup = 'su-w-full su-shadow';
export const toggleButton =
  'su-w-full su-transition-colors !su-leading-none !su-px-2 !su-pt-10 !su-pb-11 !su-border-digital-red-light hover:!su-bg-digital-red-20 focus-visible:!su-bg-digital-red-20 !su-text-digital-red hover:!su-text-digital-red-dark focus-visible:!su-text-digital-red-dark hocus:!su-underline aria-pressed:!su-bg-digital-red aria-pressed:!su-text-white !su-text-16 !su-font-sans !su-normal-case disabled:!su-bg-black-10 disabled:!su-border-black-40 disabled:!su-text-black-70 disabled:aria-pressed:!su-bg-black-70';
export const tabPanel = 'lg:su-rs-mb-3';
export const error =
  'su-flex su-items-center su-mt-18 su-text-18 children:su-text-digital-red su-border-digital-red su-border su-rounded su-p-6 su-bg-cardinal-red-10';
