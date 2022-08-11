export const container = 'basic-page su-relative su-flex-grow su-w-full';
export const fixedHero = 'su-fixed su-top-0 su-z-0 su-h-full su-w-full';
export const fixedHeroImg = 'su-object-cover su-h-full su-w-full';
export const header = 'su-rs-mt-7';

// Conditional styling based on single vs two column layout
export const gridContainerStyle = ({ isSingleColumn }) =>
  isSingleColumn
    ? 'su-relative su-cc su-z-10 su-rs-pb-8 su-bg-saa-black'
    : 'su-relative su-cc su-z-10 su-rs-pb-8 su-rs-pt-6';
export const contentStyle = ({ isSingleColumn }) =>
  isSingleColumn
    ? 'su-text-white'
    : 'su-sticky su-top-0 su-h-fit su-text-white';
export const formCardStyle = ({ isSingleColumn }) =>
  isSingleColumn
    ? 'md:su-col-2 xl:su-col-start-3 2xl:su-col-start-4'
    : 'lg:su-rs-mt-7 lg:su-col-start-7 xl:su-col-start-7 2xl:su-col-start-7';
