import { dcnb } from 'cnbuilder';

export const root = ({ type, isOpen }) =>
  dcnb(
    'su-modal su-fixed su-w-screen su-h-full su-overscroll-contain su-overflow-y-scroll su-overflow-x-hidden su-top-0 su-left-0 su-items-center su-justify-center su-z-[60]',
    {
      'su-flex': isOpen,
      'su-hidden': !isOpen,
      'su-bg-saa-black-dark': type === 'trip-filter',
      'su-bg-cardinal-red-xdark': type === 'main-menu',
      'su-bg-saa-black su-bg-opacity-[97%]':
        type !== 'trip-filter' && type !== 'main-menu',
    }
  );
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
    'su-group su-bg-transparent su-text-white su-font-semibold hocus:su-underline su-text-m1 su-flex su-items-end su-absolute su-top-[2.2rem] su-right-20 su-z-10',
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
