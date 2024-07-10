import { dcnb } from 'cnbuilder';

/**
 * Styles for the location search
 */
export const root =
  'su-autocomplete-field su-location-search su-group su-relative';
export const inputRoot =
  '!su-text-18 !su-font-sans !su-p-0 before:!su-border-b-0 after:!su-border-b-0 !su-border-b-2 !su-border-b-black-50 focus-within:!su-border-b-lagunita xl:!su-border xl:!su-border-b-2 xl:!su-rounded xl:!su-border-black-20 xl:!su-border-b-black-70 hover:xl:!su-border-lagunita-light hover:xl:!su-border-b-lagunita focus-within:xl:!su-border-lagunita-light focus-within:xl:!su-border-b-lagunita focus-within:xl:!su-ring-2 focus-within:xl:!su-ring-lagunita-light !su-mt-0 su-transition-colors';
export const input =
  'focus:!su-ring-0 !su-pl-8 xl:!su-pl-19 !su-pr-20 xl:!su-pr-40 !su-ml-36 !su-pt-19 !su-pb-20 !su-leading-display focus:!su-border-0 selection:su-bg-lagunita-20 !su-caret-lagunita !su-transition-colors placeholder:!su-opacity-100 placeholder:!su-text-black-70 placeholder:xl:!su-text-transparent';
export const popperMobile =
  '!su-w-[calc(100%_+_52px)] !su-relative !su-translate-y-0 !su--ml-26 !su-overflow-x-hidden !su-h-full';
export const paper =
  '!su-mt-18 xl:!su-mt-2 xl:!su-rounded !su-shadow-none xl:!su-shadow-xl !su-font-sans !su-text-18 xl:!su-border xl:!su-border-lagunita-light !su-w-full';
export const listbox = '!su-max-h-full';
export const listboxCountry = '!su-max-h-360';
export const listboxCountryMobile = '!su-max-h-full';
export const option = ({ selected }) =>
  dcnb(
    '!su-px-26 !su-py-14 xl:!su-px-14 xl:!su-py-10 xl:!su-mx-19 xl:!su-my-6 !su-my-0 !su-leading-display first:su-mt-20 last:su-mb-10 !su-text-black-70 xl:!su-text-black xl:!su-rounded-[2.8rem] hover:!su-text-lagunita-dark hover:!su-bg-lagunita-20 hover:!su-underline',
    {
      '!su-bg-lagunita-20 !su-text-lagunita-dark xl:!su-text-lagunita-dark xl:!su-bg-lagunita-20':
        selected,
    }
  );

export const fieldset = 'su-mt-18 xl:su-mt-0 xl:su-mb-18 su-mx-26 2xl:su-mx-27';
export const legend = '!su-mx-20 !su-mt-10 xl:!su-mx-0 xl:!su-mt-0 xl:su-mb-8';
export const locationWrapper = 'su-relative';
export const locationLabels = 'su-hidden xl:su-block su-mb-8';
export const clearLocation = '!su-bg-transparent su-text-transparent';
export const clearIcon =
  '!su-text-21 !su-text-black-70 hocus:!su-text-lagunita !su-absolute !su-right-20 !su--top-4';
export const pinIcon =
  'su-text-black-70 absolute su-top-21 su-left-8 xl:su-left-20 su-w-24';
export const toggleGroupWrapper =
  'su-px-45 su-mt-18 xl:su-mt-12 xl:su-px-0 su-mb-[200px] xl:su-mb-0';
export const toggleButtonGroup = 'su-w-full su-shadow';
export const toggleButton =
  'su-w-full su-transition-colors !su-leading-none !su-px-2 !su-pt-10 !su-pb-11 !su-border-lagunita-light hover:!su-bg-lagunita-20 focus-visible:!su-bg-lagunita-20 !su-text-lagunita hover:!su-text-lagunita-dark focus-visible:!su-text-lagunita-dark hocus:!su-underline aria-pressed:!su-bg-lagunita aria-pressed:!su-text-white !su-text-16 !su-font-sans !su-normal-case disabled:!su-su-bg-black-10 disabled:!su-su-border-black-40 disabled:!su-text-black-70 disabled:aria-pressed:!su-bg-black-70';
