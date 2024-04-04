import { dcnb } from 'cnbuilder';

export const container = 'hero su-relative su-bg-saa-black lg:su-top-0';
export const imgWrapper =
  'su-absolute su-top-0 su-overflow-hidden su-w-full su-h-full';
export const img = 'su-w-full su-h-full su-object-cover';
export const gradientOverlay = ({ gradient }) =>
  dcnb(
    'su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-t su-from-saa-black',
    gradient
  );
export const textContainer = ({ isHideScroll }) => `su-relative su-rs-pt-9
  ${isHideScroll ? 'su-rs-pb-8' : 'su-rs-pb-4'}`;
export const flexbox = 'lg:su-mt-[19rem]';
export const textWrapper = ({ blackText }) =>
  dcnb('su-text-center su-text-white', blackText);
export const sansSuper =
  'su-block su-max-w-prose su-font-semibold su-leading-display su-text-shadow-md su-type-4 su-mx-auto su-mb-01em';
export const serifSuper = ({ blackText }) =>
  dcnb(
    'su-block su-max-w-prose su-font-serif su-leading-display su-type-2 su-mx-auto su-mb-05em su-text-shadow',
    {
      'xs:su-text-shadow-white': blackText === 'xs:su-text-black-true',
    }
  );
export const headline = ({ blackText }) =>
  dcnb(
    'su-block su-font-bold su-font-serif su-leading-tight su-tracking-normal su-mb-02em su-text-shadow-lg',
    {
      'xs:su-text-shadow-white-lg': blackText === 'xs:su-text-black-true',
    }
  );
export const sansSub = ({ blackText }) =>
  dcnb(
    'su-max-w-prose su-type-1 su-leading-display su-text-shadow su-mx-auto su-mb-0 su-text-shadow',
    {
      'xs:su-text-shadow-white': blackText === 'xs:su-text-black-true',
    }
  );
export const marginTop = ({ sansSub }) => (sansSub ? 'su-rs-mt-4' : '');
export const scroll = ({ blackText }) =>
  dcnb(
    'su-text-center su-text-white su-grow-0 su-rs-mt-5 su-font-serif su-font-regular su-text-19 md:su-text-22',
    blackText
  );
export const scrollText = 'su-mb-02em';
export const pageTitleLink = 'su-block su-mx-auto su-w-fit su-group';
export const arrowDownIcon =
  'su-transition-colors su-text-digital-red-xlight su-w-40 su-h-40 su-p-6 su-border-2 su-border-cardinal-red su-rounded-full group-hocus:su-text-white group-hocus:su-bg-cardinal-red-dark';
