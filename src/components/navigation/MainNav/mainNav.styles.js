import { dcnb } from 'cnbuilder';

export const root = 'su-hidden lg:su-flex children:su-mb-0';
export const menu =
  'su-flex su-flex-row su-items-end su-ml-auto su-list-unstyled children:su-mb-0';

// Mobile styles
export const rootMobile = 'lg:su-hidden su-flex-shrink-0';
export const menuCircles =
  'su-flex-shrink-0 su-w-34 su-h-34 su-ml-auto su-items-center su-flex su-justify-center su-justify-content-center lg:su-w-auto lg:su-h-[3.4rem] lg:su-pl-16 lg:su-pr-13 su-rounded-full lg:su-text-18 su-text-white su-leading-none su-border-2 su-border-solid su-border-digital-red-xlight su-transition-colors hocus:su-bg-cardinal-red-xxdark xl:hocus:su-bg-cardinal-red-xdark lg:hocus:su-no-underline su-self-center';
export const headerUserCircle =
  'su-flex su-justify-center su-transition su-leading su-text-center su-w-40 su-h-40 su-text-24 su-border-2 su-border-digital-red-xlight su-rounded-full group-hover:su-bg-cardinal-red-xdark group-focus:su-bg-cardinal-red-xdark';

export const burgerIconMobile =
  'su-transition-colors su-w-[2.2rem] group-hover:su-text-digital-red-xlight group-focus:su-text-digital-red-xlight';

const menuMobileCommon =
  'su-w-full su-border-t su-border-solid su-border-digital-red-light su-flex su-flex-col su-list-unstyled children:su-mb-0';
export const menuMobileSAA = ({ menuOpened } = {}) =>
  dcnb(menuMobileCommon, ' su-bg-black');
export const menuMobileHomesite = ({ menuOpened } = {}) =>
  dcnb(menuMobileCommon);

// export const root = ({ type, isOpen }) =>
// dcnb(
//   'su-modal su-fixed su-w-screen su-h-full su-overscroll-contain su-overflow-y-scroll su-overflow-x-hidden su-top-0 su-left-0 su-items-center su-justify-center su-z-[60]',
//   {
//     'su-flex': isOpen,
//     'su-hidden': !isOpen,
//     'su-bg-saa-black-dark': type === 'trip-filter',
//     'su-bg-cardinal-red-dark': type === 'main-menu',
//     'su-bg-saa-black su-bg-opacity-[97%]':
//       type !== 'trip-filter' && type !== 'main-menu',
//   }
// );
export const wrapper = () =>
  'su-absolute su-w-screen su-h-full su-basefont-19 su-pointer-events-auto';
export const closeButtonWrapper = ({ type }) =>
  dcnb({
    'su-cc su-flex su-justify-end': type !== 'trip-filter',
    'su-fixed su-top-0 su-right-20 sm:su-right-30 md:su-right-50 su-z-[60] su-rs-pt-1':
      type === 'trip-filter',
  });
export const closeButton = ({ type }) =>
  dcnb(
    'su-group su-bg-transparent su-text-white su-font-semibold hocus:su-underline su-text-m1 su-flex su-items-end su-absolute su-top-[2.2rem] su-right-20',
    {
      'hover:su-bg-digital-red-xlight hocus:su-rounded-full':
        type === 'main-menu',
      'hocus:su-bg-transparent': type !== 'main-menu',
    }
  );
export const closeIcon = ({ type }) =>
  dcnb('su-inline-block su-h-[1.1em] su-w-[1.1em]', {
    'su-transition-colors group-hover:su-text-palo-verde-light group-focus:su-text-palo-verde-light':
      type === 'trip-filter',
    'su-h-[1.3em] su-w-[1.3em] su-ml-0 su-p-2': type === 'main-menu',
    'su-ml-4': type !== 'main-menu',
  });
