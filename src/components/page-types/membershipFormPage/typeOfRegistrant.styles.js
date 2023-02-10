import { dcnb } from 'cnbuilder';

export const container = 'basic-page su-relative su-flex-grow su-w-full';
export const fixedHero = 'su-fixed su-top-0 su-z-0 su-h-full su-w-full';
export const fixedHeroImg = 'su-object-cover su-h-full su-w-full';
export const contentWrapper =
  'su-relative su-cc su-z-10 su-rs-pb-8 su-rs-pt-6 su-text-white';
export const benefitsWrapper =
  'md:su-col-start-2 xl:su-col-start-3 2xl:su-col-start-4';
export const formWrapper =
  'su-basefont-23 su-w-full su-cc su-bg-saa-black-dark su-border-3 su-border-saa-black-dark';
export const logoWrapper = 'su-rs-py-2';
export const logo = 'su-w-200 md:su-w-300 2xl:su-w-[350px]';
export const superHead =
  'su-block su-max-w-prose su-font-semibold su-leading-display su-text-shadow-md su-type-2 su-text-center su-mx-auto su-mb-01em';
export const cardGridWrapper = 'su-rs-pb-3 su-rs-pt-1';
export const nextLink = (disabled) =>
  dcnb(
    'su-rs-mt-2 su-group su-flex su-items-end su-text-18 md:su-text-24 su-no-underline su-font-regular su-text-white hocus:su-text-white hocus:su-shadow-md su-px-20 su-pt-10 su-pb-11 md:su-px-30 md:su-pt-16 md:su-pb-18',
    disabled
      ? 'su-pointer-events-none su-bg-black-70 su-border-black-70 hocus:su-bg-black-70 hocus:su-border-black-70'
      : 'hocus:su-underline su-bg-digital-red su-border-digital-red hocus:su-bg-cardinal-red-xdark hocus:su-border-cardinal-red-xdark'
  );
export const nextLinkIcon = 'su-w-1em su-text-white group-hocus:su-text-white';
export const cardNoteWrapper = 'md:su-col-start-3 su-rs-py-4';
