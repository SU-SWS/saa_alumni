import { dcnb } from 'cnbuilder';

export const container = 'basic-page su-relative su-flex-grow su-w-full';
export const fixedHero = 'su-fixed su-top-0 su-z-0 su-h-full su-w-full';
export const fixedHeroImg = 'su-object-cover su-h-full su-w-full';
export const contentWrapper =
  'su-relative sm:su-cc su-z-10 su-rs-pt-8 sm:su-rs-pb-8 su-text-white';
export const benefitsWrapper = '2xl:su-col-start-2';
export const superHead =
  'su-block su-max-w-prose su-font-semibold su-leading-display su-text-shadow-md su-type-2 su-text-center su-mx-auto su-rs-mb-2';
export const heading = 'su-rs-mb-5';
export const formWrapper =
  'su-basefont-23 su-w-full su-cc su-bg-saa-black-dark su-border-3 su-border-saa-black-dark su-rs-p-2 sm:su-rs-p-6';
export const logoWrapper = 'su-rs-mb-5';
export const logo = 'su-w-200 md:su-w-300 2xl:su-w-[350px]';
export const purchaseWrapper = '2xl:su-col-start-2';
export const cardGridHeading = 'su-rs-mb-4';
export const cardGridWrapper = 'su-rs-pb-3 su-gap-y-xl';
export const nextLinkDisabled =
  'su-rs-mt-2 su-group su-flex su-items-end su-text-18 md:su-text-24 su-no-underline su-font-regular su-text-white hocus:su-text-white hocus:su-shadow-md su-px-20 su-pt-10 su-pb-11 md:su-px-30 md:su-pt-16 md:su-pb-18 su-pointer-events-none su-bg-black-70 su-border-black-70 hocus:su-outline-0 hocus:su-bg-black-70 hocus:su-border-black-70';
export const nextLinkActive =
  'su-rs-mt-2 su-group su-flex su-items-end su-text-18 md:su-text-24 su-no-underline su-font-regular su-text-white hocus:su-text-white hocus:su-shadow-md su-px-20 su-pt-10 su-pb-11 md:su-px-30 md:su-pt-16 md:su-pb-18 hocus:su-underline su-bg-digital-red su-border-digital-red hocus:su-bg-cardinal-red-xdark hocus:su-border-cardinal-red-xdark';
export const nextLinkIcon = 'su-w-1em su-text-white group-hocus:su-text-white';
export const cardNoteWrapper = 'md:su-col-start-3 su-rs-py-4';
export const paymentOuterWrapper = (paymentOptionSection) =>
  dcnb(
    'su-transition-all su-origin-top su-h-0 su-ease-linear su-duration-150',
    paymentOptionSection
      ? 'su-visible su-scale-y-100 su-h-auto su-opacity-100'
      : 'su-invisible su-scale-y-0 su-h-0 su-opacity-0 su-cursor-none'
  );
export const paymentInnerWrapper =
  'su-rs-mb-3 su-bg-gradient-to-tr su-to-saa-electric-blue-dark su-from-palo-verde-xdark su-rs-px-1 sm:su-rs-px-2 su-rs-pb-5';
export const paymentHeadingWrapper = 'su-text-center su-rs-pt-4 su-rs-pb-0';
export const paymentCardsWrapper = 'su-gap-y-xl sm:su-rounded';
export const promoWrapper = 'su-w-full sm:su-w-auto';
export const promoLabel = 'su-type-0 su-font-semibold';
export const promoInput =
  'sm:su-w-[44rem] su-p-20 su-mt-03em su-rs-mb-2 su-bg-transparent su-rounded su-border su-border-solid su-border-black-30-opacity-40 su-border-b-2';
