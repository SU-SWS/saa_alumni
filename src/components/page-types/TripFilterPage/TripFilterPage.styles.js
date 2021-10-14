import { dcnb } from 'cnbuilder';

export const page =
  'trip-filter-page su-relative su-flex-grow su-w-full su-bg-saa-black su-basefont-23';
export const header = 'su-basefont-23';
export const headerContent = 'su-rs-mt-6 su-rs-mb-8';
export const hero = 'su-aspect-w-5 su-aspect-h-2';
export const heading = ({ isShortTitle }) =>
  dcnb(
    'su-text-white su-text-m4 md:su-text-m6 xl:su-text-m7 su-mx-auto su-text-center su-mb-02em',
    {
      '2xl:su-text-m8': isShortTitle,
    }
  );
export const intro =
  'su-text-white su-mx-auto su-text-center su-max-w-prose su-subheading su-leading-display';
export const filterSection = 'su-cc su-rs-pb-6 su-items-start';
export const filterSidebar =
  'su-bg-black-true su-px-18 xl:su-px-26 2xl:su-px-38 su-rs-pt-2 su-rs-pb-4';
export const filterHeading =
  'su-type-0 su-text-white su-font-semibold su-uppercase su-tracking-normal';
export const filtersList = '';
export const activeFilters =
  'su-flex su-flex-row su-justify-between su-items-center su-mb-34';
export const filterChips = 'su-flex-1 children:su-mr-13 children:su-mb-13';
export const clearAll = 'su-p-8';
export const clearAllBtn =
  'su-group su-flex-row su-items-center su-block su-mt-[-0.7rem]';
export const clearAllText = 'su-relative';
export const clearAllHover =
  'su-absolute su-bottom-[-0.5rem] su-left-0 su-w-full su-pt-2 group-hocus:su-bg-gradient-to-r su-from-palo-verde-dark su-to-digital-blue';
export const clearAllIcon = 'su-text-saa-electric-blue su-ml-8';
export const filteredContent = 'su-text-white su-col-span-3';
export const trips =
  'su-gap-y-xl md:su-gap-y-[5rem] xl:su-gap-y-[7rem] su-justify-items-center';
